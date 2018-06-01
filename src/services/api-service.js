import axios from 'axios';
import * as log from 'loglevel';
import _ from 'lodash';
import MockAdapter from 'axios-mock-adapter';
import {
  HttpClient,
  utils
} from 'plugjs';
import { STUBBED } from '../config';
import mockData from '../mock-data';

// Services
import { authService } from './auth-service';

/**
 * This service provides an interface to a websocket connection.
 */
class ApiService {
  constructor() {
    this._apiUrl = null;
    this._wsApiUrl = null;
    this._socket = null;
    this._namespacesInitialised = false;
    this._configLoaded = false;
    this._plugClient = null;

    this._connections = {};

    this.getValues = this._restCall;
    this.getBlock = this._getBlock;

    if (STUBBED) {
      this._mock = new MockAdapter(axios);

      this._mock.onGet(/.*\/state\/-?[0-9]+\/(\w+\.?)+%2F.*/).reply(200, mockData.values);
      this._mock.onGet(/.*\/state\/-?[0-9]+$/).reply(200, mockData.namespaces);
      this._mock.onGet(/.*\/block\/[0-9]+$/).reply(config => {
        const requestedHeight = config.url.match(/.*\/([0-9]+)$/)[1];
        const response = {
          ...mockData.block
        };
        response.height = Number.parseInt(requestedHeight, 10);
        return [200, response];
      });
      this._mock.onGet(/.*\/transform$/).reply(200, mockData.transforms);
      this._mock.onGet(/.*/).passThrough();
    }
  }
  get configLoaded() {
    return this._configLoaded;
  }
  init(config) {
    this._apiUrl = config.API_URL;
    this._wsApiUrl = config.WS_API_URL;
    this._configLoaded = true;
    this._plugClient = new HttpClient(config.PLUG_CLIENT_URL, 5000, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    log.info('ApiService config init', config);
  }
  _restCall({ path = '', object = 'state', height }) {
    const url = path.length
      ? `${this._apiUrl}/${object}/${height}/${encodeURIComponent(path)}`
      : `${this._apiUrl}/${object}/${height}`;

    return axios.get(url);
  }
  _getBlock(height) {
    return this._restCall({ height, object: 'block' });
  }
  getExplorerRoot({ height }) {
    return this._restCall({ height });
  }
  getTransforms() {
    return axios.get(`${this._apiUrl}/transform`);
  }
  async getNodeStatus() {
    const response = await this._plugClient.getNodeStatus();
    return response;
  }
  async getExplorerModels({ namespaces, height }) {
    const data = await Promise.all(namespaces.map(n => this._restCall({ path: n, height })));
    return data.map(response => response.data).map((d, i) => ({
      namespace: namespaces[i],
      key: d.fqdn,
      nodes: d.data,
      depth: 2
    }));
  }
  async sendTransaction({ transform, nonce, networkId }) {
    const response = await this._plugClient.broadcastTransform(
      transform,
      utils.hexToBuffer(authService.secretKey),
      nonce,
      networkId
    );
    return response;
  }
  disconnectFromCurrentExplorerHeight() {
    _.each(this._connections, (c, key) => {
      if (c.type === 'explorer') {
        c.connection.close();
        delete this._connections[key];
      }
    });

    this._namespacesInitialised = false;
  }
  subscribeToProposals({ onMessageReceived = null, onError = null }) {
    if (STUBBED) {
      return;
    }
    this._openSockets({
      keys: ['proposals'],
      type: 'proposals',
      connectionUrl: this._wsApiUrl,
      subscriptions: ['proposals'],
      callbacks: {
        onMessage: e => {
          if (onMessageReceived && typeof onMessageReceived === 'function') {
            const { data } = JSON.parse(e.data);
            onMessageReceived(data);
          }
        },
        onConnected: (e, key) => log.info('onConnected', `key:${key}`, e),
        onClosed: (e, key) => log.info('onClosed', `key:${key}`, e),
        onError: (e, key) => {
          if (typeof onError === 'function') {
            onError({ data: e, key });
          } else {
            log.error('onError', `key:${key}`, e);
          }
        }
      }
    });
  }
  subscribeToDashboard({ onMessageReceived = null, onError = null }) {
    if (STUBBED) {
      return;
    }
    this._openSockets({
      keys: ['monitor'],
      type: 'monitor',
      connectionUrl: this._wsApiUrl,
      subscriptions: ['monitor'],
      callbacks: {
        onMessage: e => {
          if (onMessageReceived && typeof onMessageReceived === 'function') {
            const data = JSON.parse(e.data);
            onMessageReceived(data);
          }
        },
        onConnected: (e, key) => log.info('onConnected', `key:${key}`, e),
        onClosed: (e, key) => log.info('onClosed', `key:${key}`, e),
        onError: (e, key) => {
          if (typeof onError === 'function') {
            onError({ data: e, key });
          } else {
            log.error('onError', `key:${key}`, e);
          }
        }
      }
    });
  }
  subscribeToExplorerRoot({ onNamespacesReceived = null, onModelsReceived = null }) {
    log.info('Api Service: subscribeToExplorerRoot');
    if (STUBBED) {
      onNamespacesReceived(mockData.namespaces);
      this._subscribeToExplorerNamespaces(mockData.namespaces.map(m => m.key), onModelsReceived);

      return;
    }
    // opening a connection to root doesn't require an explorer.get_node call
    this._openSockets({
      keys: ['/'],
      type: 'explorer',
      connectionUrl: this._wsApiUrl,
      subscriptions: ['explorer'],
      callbacks: {
        onMessage: e => {
          const { data } = JSON.parse(e.data);
          if (data.tree) {
            if (!this._namespacesInitialised) {
              // root node children will get a separate ws connection
              this._namespacesInitialised = true;

              if (onNamespacesReceived && typeof onNamespacesReceived === 'function') {
                onNamespacesReceived(data.tree);
              }

              this._subscribeToExplorerNamespaces(data.tree.map(m => m.key), onModelsReceived);
            }
          }
        },
        onConnected: (e, key) => {
          log.info('onConnected', `key:${key}`, e);
        },
        onClosed: (e, key) => {
          log.info('onClosed', `key:${key}`, e);
        },
        onError: (e, key) => {
          log.error('onError', `key:${key}`, e);
        }
      }
    });
  }
  _unsubscribeFromExplorer(key) {
    if (key in this._connections) {
      log.info(`Unsubscribing from explorer for path '${key}'`);
      this._sendMessage(key, { action: 'unsubscribe', path: 'explorer' });
    } else {
      log.error(`Unsubscribing from '${key}', but a connection for this key does not exist.`);
    }
  }
  _subscribeToExplorerNamespaces(namespaces = [], onModelsReceived) {
    log.info('_subscribeToExplorerNamespaces', namespaces);

    if (STUBBED) {
      onModelsReceived({
        depth: 2,
        key: mockData.namespaces[0].key,
        nodes: mockData.models
      });
      onModelsReceived({
        depth: 2,
        key: mockData.namespaces[1].key,
        nodes: mockData.models
      });
      onModelsReceived({
        depth: 2,
        key: mockData.namespaces[2].key,
        nodes: mockData.models
      });
    }

    this._openSockets({
      keys: namespaces,
      type: 'explorer',
      connectionUrl: this._wsApiUrl,
      subscriptions: ['explorer'],
      callbacks: {
        onMessage: (e, key) => {
          const { data, meta } = JSON.parse(e.data);

          if ('error' in meta) {
            log.error('onError', meta, data);
          } else if (data.tree && onModelsReceived && typeof onModelsReceived === 'function') {
            onModelsReceived({ depth: 2, key, nodes: data.tree });
          }
        },
        onConnected: (e, key) => {
          log.info('onConnected', `key:${key}`, e);
        },
        onClosed: (e, key) => {
          log.info('onClosed', `key:${key}`, e);
        },
        onError: (e, key) => {
          log.error('onError', `key:${key}`, e);
        }
      },
      initialMessage: key => ({ action: 'explorer.get_node', path: key })
    });
  }
  _sendMessage(key, message) {
    if (key in this._connections) {
      this._connections[key].connection.send(JSON.stringify(message));
    } else {
      log.error(`Failed to send message as connection '${key}' does not exist.`);
    }
  }
  _openSockets({
    keys = [],
    type = '',
    connectionUrl,
    subscriptions = [],
    callbacks,
    initialMessage = null
  }) {
    if (!connectionUrl) {
      return log.error('connectionUrl missing');
    }
    keys.forEach(key => {
      if (typeof key === 'string') {
        if (key in this._connections) {
          log.error(`A connection is already open for ${key}`);
        } else {
          const ws = new WebSocket(connectionUrl);
          ws.addEventListener('error', event => {
            if (typeof callbacks.onError === 'function') {
              callbacks.onError(event, key);
            } else {
              log.error('ERROR');
            }
          });
          ws.onopen = event => {
            // initialy subscribe to some events
            if (subscriptions && subscriptions.length) {
              ws.send(JSON.stringify({ action: 'subscribe', subscriptions }));
            }

            // initially send a message
            if (initialMessage) {
              switch (typeof initialMessage) {
                case 'object':
                  this._sendMessage(key, initialMessage);
                  break;
                case 'function':
                  this._sendMessage(key, initialMessage(key));
                  break;
                default:
                  log.error('Invalid initial message');
                  break;
              }
            }

            if (typeof callbacks.onConnected === 'function') {
              callbacks.onConnected(event, key);
            }
          };
          if (typeof callbacks.onClosed === 'function') {
            ws.onclose = event => callbacks.onClosed(event, key);
          }
          if (typeof callbacks.onError === 'function') {
            ws.onerror = event => callbacks.onError(event, key);
          }
          if (typeof callbacks.onMessage === 'function') {
            ws.onmessage = event => callbacks.onMessage(event, key);
          }

          this._connections[key] = { connection: ws, type };
        }
      } else {
        log.error('openConnectionsForEach was passed a non-string key', key);
      }
    });
  }
}
// ensure this is created only once
// any time this is imported, it will be the same instance
export const apiService = new ApiService();

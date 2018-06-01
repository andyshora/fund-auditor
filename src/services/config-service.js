import axios from 'axios';
import * as log from 'loglevel';
import { reactLocalStorage as storage } from 'reactjs-localstorage';
/**
 * This service loads server-defined configuration to be used at runtime
 */
class ConfigService {
  constructor({ configUrl }) {
    this._configUrl = configUrl;
  }
  init() {
    return this._fetchConfig();
  }
  _fetchConfig() {
    return axios.get(this._configUrl)
      .then(({ data }) => {
        log.info('Retreived config', data);
        return data;
      })
      .catch(error => log.error(`Error fetching config from ${this._configUrl}`, error));
  }
  static readSetting(key) {
    const val = storage.get(key);
    return val || null;
  }
  static writeSetting(key, value) {
    return storage.set(key, value);
  }
}

export const configService = new ConfigService({ configUrl: '/config.json' });
export const Storage = ConfigService;

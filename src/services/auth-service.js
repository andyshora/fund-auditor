import * as log from 'loglevel';
import { addressFromPublicKey, ed25519, utils } from 'plugjs';

// Services
import { Storage } from './config-service';

/**
 * This service manages authentication
 * ...but currently it's just a placeholder, todo
 */
class AuthService {
  constructor() {
    this._storage = Storage;
  }
  init() {
    if (this.publicKey && this.secretKey) {
      // log.info('keys found', this.publicKey, this.secretKey);
    } else {
      this._generateTempKeys();
    }
    return Promise.resolve({
      publicKey: this.publicKey,
      secretKey: this.secretKey,
      address: this.address
    });
  }
  _generateTempKeys() {
    log.warn('No keys found in localStorage... generating temporary keys');
    const seed = new Uint8Array(32);
    const myKeys = ed25519.keyPairFromSeed(seed);
    this._storage.writeSetting('PUBLIC_KEY', utils.bufferToHex(myKeys.publicKey));
    this._storage.writeSetting('SECRET_KEY', utils.bufferToHex(myKeys.secretKey));
    this._storage.writeSetting('ADDRESS', addressFromPublicKey(myKeys.publicKey));
  }
  get address() {
    return this._storage.readSetting('ADDRESS');
  }
  get publicKey() {
    return this._storage.readSetting('PUBLIC_KEY');
  }
  get secretKey() {
    return this._storage.readSetting('SECRET_KEY');
  }
  set publicKey(str) {
    this._storage.writeSetting('PUBLIC_KEY', str);
  }
  set secretKey(str) {
    this._storage.writeSetting('SECRET_KEY', str);
  }
  set address(str) {
    this._storage.writeSetting('ADDRESS', str);
  }
}

export const authService = new AuthService();

import {
  transforms,
  models,
  namespaces,
  values
} from '../mock-data';

/**
 * This service loads server-defined configuration to be used at runtime
 */
class MockDataService {
  _data = {
    transforms,
    models,
    namespaces,
    values
  };
  get(key) {
    return key in this._data
      ? this._data[key]
      : null;
  }
}

export const mockDataService = new MockDataService();

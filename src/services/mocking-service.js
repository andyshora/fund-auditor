import MockAdapter from 'axios-mock-adapter';
import mockData from '../mock-data';

/**
 * This service intercepts api requests in order to return fake data
 * which can allow the application to run locally.
 */
class MockingService {
  constructor(axios) {
    if (axios) {
      this._adapter = new MockAdapter(axios);
      this._initRoutes();
    }
  }
  _initRoutes() {
    this._adapter.onGet(/.*\/state\/-?[0-9]+\/(\w+\.?)+%2F.*/).reply(200, mockData.values);
    this._adapter.onGet(/.*\/state\/-?[0-9]+$/).reply(200, mockData.stateDepth0);
    // this._adapter.onGet(/.*\/state\/-?[0-9]+\/.*$/).reply(200, mockData.stateDepth1);
    this._adapter.onGet(/.*\/block\/[0-9]+$/).reply(config => {
      const requestedHeight = config.url.match(/.*\/([0-9]+)$/)[1];
      const response = {
        ...mockData.block
      };
      response.height = Number.parseInt(requestedHeight, 10);
      return [200, response];
    });
    this._adapter.onGet(/.*\/transform$/).reply(200, mockData.transforms);
    this._adapter.onGet(/.*/).passThrough();
  }
}

export default MockingService;

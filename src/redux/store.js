import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';

export const history = createHistory();

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default createStore(
  rootReducer,
  enhancers
);

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as log from 'loglevel';
import styled from 'styled-components';
import 'sanitize.css/sanitize.css';

import App from './views/app';
import { configService } from './services/config-service';
import Store from './redux/store';
import { appConfigLoaded } from './actions';

import './styles/index.css';

const target = document.querySelector('#root');

const AppWrapper = styled.div`
`;

if (module.hot) {
  // we're hot reloading only in development
  module.hot.accept();
  log.setLevel('trace');
} else {
  // production, disable unimportant logs below error
  log.setLevel('error');
}

configService.init()
  .then(config => {
    Store.dispatch(appConfigLoaded(config));
  });

render(
  <Provider store={Store}>
    <AppWrapper>
      <App />
    </AppWrapper>
  </Provider>,
  target
);

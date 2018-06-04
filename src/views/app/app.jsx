import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom';
import _ from 'lodash';
import * as log from 'loglevel';
import { appSelector } from '../../selectors';

// Views
import Transaction from '../transaction';
import Timeline from '../timeline';

// Components
import Error from '../../components/error';
import Loader from '../../components/loader';
import Notification from '../../components/notification';

import {
  MainSection,
  Header,
  LoadingWrapper,
  Nav,
  Wrapper
} from './app-styles';

import {
  authKeysSet,
  appError,
  appDismissError,
  appDismissNotification,
  monitorMessage,
  proposalsMessage
} from '../../actions';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <HashRouter>
          <div>
            <Header>
              <Nav>
                <NavLink activeClassName='--active' to='/timeline/1'>1</NavLink>
                <NavLink activeClassName='--active' to='/timeline/3'>3</NavLink>
              </Nav>
            </Header>
            <MainSection>
              <Switch>
                <Route path={'/transaction'} component={Transaction} />
                <Route path={'/timeline/:id?'} component={Timeline} />
                <Route path={'/'} component={Timeline} />
              </Switch>
            </MainSection>
          </div>
        </HashRouter>
      </Wrapper>
    );
  }
}

App.propTypes = {};

App.defaultProps = {
  errors: []
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

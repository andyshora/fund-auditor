import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import keydown from 'react-keydown';

import * as log from 'loglevel';

// Components
import TimelineDiagram from '../../components/timeline-diagram';

// Services
import { balanceService as balances } from '../../services/balance-service';

// Data
import {
  INITIAL_BALANCES,
  TRANSACTIONS
} from '../../mock-data/transactions';

// Styles
import { TimelineWrapper } from './timeline-styles';

class Timeline extends Component {
  _diagram = null
  _handlePrevTapped = () => this._diagram && this._diagram.prevStep()
  _handleNextTapped = () => this._diagram && this._diagram.nextStep()
  _handleResetTapped = () => this._diagram && this._diagram.resetView()
  componentDidMount() {
    const { match: { params: { id }} } = this.props;
    const dataSetId = typeof id === 'undefined' ? 1 : id;
    balances.init({
      id: dataSetId,
      transactions: TRANSACTIONS[dataSetId],
      initialBalances: INITIAL_BALANCES[dataSetId]
    });
  }
  @keydown('left')
  _onLeftTapped() {
    this._handlePrevTapped();
  }
  @keydown('right')
  _onRightTapped() {
    this._handleNextTapped();
  }
  render() {
    const { match: { params: { id }} } = this.props;
    const dataSetId = typeof id === 'undefined' ? 1 : id;
    return (
      <TimelineWrapper>
        <ContainerDimensions>
          {({ width, height }) => <TimelineDiagram
            ref={el => { this._diagram = el }}
            width={width}
            height={window.innerHeight}
            id={Number.parseInt(dataSetId, 10)} />}
        </ContainerDimensions>
        {this._diagram && (
          <div>
            <button onClick={this._handleResetTapped}>Reset</button>
          </div>
        )}
      </TimelineWrapper>
    );
  }
}

Timeline.propTypes = {
  match: PropTypes.object.isRequired
};

Timeline.defaultProps = {};

export default Timeline;

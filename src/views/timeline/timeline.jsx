import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import * as log from 'loglevel';

// Components
import TimelineDiagram from '../../components/timeline-diagram';

// Styles
import { TimelineWrapper } from './timeline-styles';

class Timeline extends Component {
  _diagram = null
  _handlePrevTapped = () => this._diagram && this._diagram.prevStep()
  _handleNextTapped = () => this._diagram && this._diagram.nextStep()
  render() {
    const { match: { params: { id }} } = this.props;
    return (
      <TimelineWrapper>
        <ContainerDimensions>
          {({ width, height }) => <TimelineDiagram
            ref={el => { this._diagram = el }}
            width={width}
            height={window.innerHeight}
            id={Number.parseInt(id, 10)} />}
        </ContainerDimensions>
        {this._diagram && (
          <div>
            <button onClick={this._handlePrevTapped}>Previous</button>
            <button onClick={this._handleNextTapped}>Next</button>
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

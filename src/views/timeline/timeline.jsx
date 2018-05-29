import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import * as log from 'loglevel';

// Components
import TimelineDiagram from '../../components/timeline-diagram';

// Styles
import { TimelineWrapper } from './timeline-styles';

const Timeline = ({ match: { params: { id }} }) => {
  return (
    <TimelineWrapper>
      <ContainerDimensions>
        {({ width, height }) => <TimelineDiagram width={width} height={window.innerHeight} />}
      </ContainerDimensions>
    </TimelineWrapper>
  );
};

Timeline.propTypes = {
  match: PropTypes.object.isRequired
};

Timeline.defaultProps = {};

export default Timeline;

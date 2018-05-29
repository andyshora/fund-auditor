import React from 'react';

// Services
import { shapesService as s } from '../../services/shapes-service';

// Styles
import { theme } from '../../styles/utils';
import { LoaderWrapper } from './loader-styles.js';

const Loader = () => {
  const blockPathData = s.blockAllSides(2, 1);
  return (
    <LoaderWrapper viewBox='-20 -30 100 60' width='200' height='80'>
      <g>
        <path
          fill={theme.viz.inactiveBlockColors[1]}
          stroke={theme.viz.inactiveBlockColors[2]}
          d={blockPathData[0]} />
        <path
          fill={theme.viz.inactiveBlockColors[1]}
          stroke={theme.viz.inactiveBlockColors[1]}
          d={blockPathData[1]} />
        <path
          fill={theme.viz.inactiveBlockColors[0]}
          stroke={theme.viz.inactiveBlockColors[0]}
          d={blockPathData[2]} />
        <path
          fill={theme.viz.inactiveBlockColors[1]}
          stroke={theme.viz.inactiveBlockColors[0]}
          d={blockPathData[3]} />
        <path
          fill={theme.viz.inactiveBlockColors[2]}
          stroke={theme.viz.inactiveBlockColors[0]}
          d={blockPathData[4]} />
      </g>
    </LoaderWrapper>
  );
};

export default Loader;

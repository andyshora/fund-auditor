import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as log from 'loglevel';

import { TRANSACTIONS } from '../../mock-data/transactions';

// Styles
import {
  TimelineDiagramWrapper,
  DiberseRect,
  NGORect,
  BeneficiaryRect,
  PartnerRect,
  TimeStepRect,
  TransactionLine,
  TransactionSource
} from './timeline-diagram-styles';

const layout = {
  positions: {
    orgs: [100, 200, 900],
    beneficiaries: {
      start: 400,
      end: 700
    }
  }
};

const LINES_HEIGHT = 600;

const _genBeneficiaryPosition = ({ index, numBeneficiaries }) => {

  const { start, end } = layout.positions.beneficiaries;
  const width = end - start;
  const fract = (numBeneficiaries === 1)
    ? 0.5
    : index / (numBeneficiaries - 1);
  return start + (fract * width);
};

const _getPosition = (str, numBeneficiaries) => {
  switch (str) {
    case 'dib':
    case 'diberse':
      return layout.positions.orgs[0];
    case 'ngo':
      return layout.positions.orgs[1];
    case 'par':
    case 'partner':
      return layout.positions.orgs[2];
    default:
      const arr = str.split('ben');
      return _genBeneficiaryPosition({ index: Number.parseInt(arr[1], 10), numBeneficiaries });
  }
};

const Transaction = ({
  from,
  to,
  numBeneficiaries,
  numSteps,
  step,
  scaledY
}) => {
  const fromPos = _getPosition(from, numBeneficiaries);
  const toPos = _getPosition(to, numBeneficiaries);

  const yPos = 200 + (step * (LINES_HEIGHT / (numSteps + 1)));
  return (
    <g>
      <TransactionLine x1={fromPos} x2={toPos} y1={scaledY(yPos)} y2={scaledY(yPos)}  />
      <TransactionSource r={5} cx={fromPos} cy={scaledY(yPos)} fill='black' />
    </g>
  );
};

class TimelineDiagram extends Component {
  render() {
    const {
      id,
      height,
      width
    } = this.props;

    const ratio = height / width;
    const numBeneficiaries = id;
    const numSteps = 1 + (numBeneficiaries * 3);

    const scaledY = val => ratio * val;

    const boundsBox = (
      <g>
        <rect stroke='black' fill='none' opacity={0.1} x={50} y={scaledY(50)} width={900} height={scaledY(900)} />
        <rect fill='cornflowerblue' opacity={0.2} x={300} y={scaledY(150)} width={500} height={scaledY(700)} />
      </g>
    );

    const orgLines = (
      <g>
        <DiberseRect stroke='black' fill='none' x={98} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
        <NGORect stroke='black' fill='none' x={198} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />

        {_.times(numBeneficiaries).map(index => {
          const xPos = _genBeneficiaryPosition({ index, numBeneficiaries });
          return <BeneficiaryRect
            key={index}
            stroke='black'
            fill='none'
            x={xPos - 2}
            y={scaledY(200)}
            width={4}
            height={scaledY(LINES_HEIGHT)} />;
        })}

        <PartnerRect stroke='black' fill='none' x={898} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
      </g>
    );

    const markers = (
      <g>
        <circle fill='black' r={2} cx={500} cy={scaledY(500)} />
        <circle fill='black' r={2} cx={50} cy={scaledY(500)} />
        <circle fill='black' r={2} cx={950} cy={scaledY(500)} />
        <circle fill='black' r={2} cx={500} cy={scaledY(50)} />
        <circle fill='black' r={2} cx={500} cy={scaledY(950)} />
      </g>
    );

    const timeSteps = (
      <g>
        {_.times(numSteps, i => (
          <TimeStepRect
            key={i}
            x={50}
            y={scaledY(200 + ((i + 1) * (LINES_HEIGHT / (numSteps + 1))))}
            height={1}
            width={900} />
        ))}
      </g>
    );

    const transactionLines = (
      <g>
        {TRANSACTIONS[id].map((t, i) => <Transaction
          key={i}
          {...t}
          scaledY={scaledY}
          numBeneficiaries={numBeneficiaries}
          numSteps={numSteps} />)}
      </g>
    );

    return (
      <TimelineDiagramWrapper viewBox={`0 0 1000 ${scaledY(1000)}`} width={width} height={height}>
        {timeSteps}
        {boundsBox}
        {orgLines}
        {transactionLines}
        <defs>
          <marker id='arrow' markerWidth='10' markerHeight='10' refX='5' refY='3' orient='auto' markerUnits='strokeWidth' viewBox='0 0 10 10'>
            <path d='M0,0 l0,6 l3,-3 z' fill='black' />
          </marker>
        </defs>
      </TimelineDiagramWrapper>
    );
  }
}

TimelineDiagram.propTypes = {
  id: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

TimelineDiagram.defaultProps = {};

export default TimelineDiagram;

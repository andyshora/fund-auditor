import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
      start: 350,
      end: 750
    }
  }
};

const NUM_STEPS = 10;
const LINES_HEIGHT = 600;
const NUM_BENEFICIARIES = 5;

const _genBeneficiaryPosition = index => {

  const { start, end } = layout.positions.beneficiaries;
  const width = end - start;

  return start + (index * (width / (NUM_BENEFICIARIES - 1)));

};

const _getPosition = str => {
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
      return _genBeneficiaryPosition(Number.parseInt(arr[1], 10));
  }
};

const Transaction = ({
  from,
  to,
  step,
  scaledY
}) => {
  const fromPos = _getPosition(from);
  const toPos = _getPosition(to);

  const yPos = 200 + (step * (LINES_HEIGHT / (NUM_STEPS + 1)));
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
      height,
      width
    } = this.props;

    const ratio = height / width;

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

        <BeneficiaryRect stroke='black' fill='none' x={348} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
        <BeneficiaryRect stroke='black' fill='none' x={448} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
        <BeneficiaryRect stroke='black' fill='none' x={548} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
        <BeneficiaryRect stroke='black' fill='none' x={648} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
        <BeneficiaryRect stroke='black' fill='none' x={748} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />

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
        {_.times(NUM_STEPS, i => <TimeStepRect x={50} y={scaledY(200 + ((i + 1) * (LINES_HEIGHT / (NUM_STEPS + 1))))} height={1} width={900} />)}
      </g>
    );
    const transactions = [
      {
        step: 0,
        from: 'dib',
        to: 'ngo',
        amount: 1000,
        type: 'tokens'
      },
      {
        step: 1,
        from: 'ngo',
        to: 'ben0',
        amount: 100,
        type: 'tokens'
      },
      {
        step: 2,
        from: 'ngo',
        to: 'ben1',
        amount: 100,
        type: 'tokens'
      },
      {
        step: 3,
        from: 'ngo',
        to: 'ben2',
        amount: 100,
        type: 'tokens'
      },
      {
        step: 4,
        from: 'ben2',
        to: 'par',
        amount: 100,
        type: 'tokens'
      },
      {
        step: 5,
        from: 'par',
        to: 'ben2',
        amount: 100,
        type: 'tokens'
      }
    ];
    const transactionLines = (
      <g>
        {transactions.map((t, i) => <Transaction {...t} scaledY={scaledY} />)}
      </g>
    );

    return (
      <TimelineDiagramWrapper viewBox={`0 0 1000 ${scaledY(1000)}`} width={width} height={height}>
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
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

TimelineDiagram.defaultProps = {};

export default TimelineDiagram;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as log from 'loglevel';

import { TRANSACTIONS } from '../../mock-data/transactions';

// Styles
import {
  OrgLabel,
  TimelineDiagramWrapper,
  DiberseRect,
  NGORect,
  BeneficiaryRect,
  PartnerRect,
  TimeStepRect,
  TransactionLine,
  TransactionSource,
  TransactionTokens,
  TransactionGroupOutline,
  TransactionGroup,
  TransLabel
} from './timeline-diagram-styles';

import { theme } from '../../styles/utils';

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

const _getColor = str => {
  switch (str) {
    case 'dib':
    case 'diberse':
      return theme.colors.main2;
    case 'ngo':
      return theme.colors.positive;
    case 'par':
    case 'partner':
      return theme.colors.main3;
    default:
      return theme.colors.alternate;
  }
}

const Transaction = ({
  active,
  amount,
  desc,
  from,
  to,
  numBeneficiaries,
  numSteps,
  onClick,
  step,
  scaledY,
  type
}) => {
  const fromPos = _getPosition(from, numBeneficiaries);
  const toPos = _getPosition(to, numBeneficiaries);

  const leftPos = Math.min(fromPos, toPos);
  const rightPos = Math.max(fromPos, toPos);
  const width = rightPos - leftPos;

  const yPos = 200 + (step * (LINES_HEIGHT / (numSteps + 1)));
  const animationDuration = 2;

  const description = desc
    ? desc
      .replace('#SENDER#', from)
      .replace('#RECIPIENT#', to)
      .replace('#TYPE#', type)
      .replace('#AMOUNT#', amount)
    : '';
  if (type) {
    const pathDataRect = `M${leftPos},${scaledY(yPos)} h${width} v10 h${-width} z`;
    const pathData = `M${leftPos},${scaledY(yPos - 20)} q0,20 20,20 h${width - 20} v1 h${-(width - 20)} q-20,0 -20,20 z`;
    return (
      <TransactionGroup active={active} onClick={onClick}>
        <rect
          fill={theme.colors.light}
          x={leftPos + 10}
          y={scaledY(yPos - 5)}
          width={(rightPos - leftPos) - 20}
          height={20} />
        <path d={pathDataRect} fill={`url(#grad-${step})`} fillOpacity={active ? 1 : 0.2} />
        {active && (
          <g clipPath={`url(#clip-${step})`}>
            <line
              x1={fromPos}
              y1={scaledY(yPos)}
              x2={fromPos + (fromPos < toPos ? 50 : -50)}
              y2={scaledY(yPos)}
              strokeDasharray='1,2'
              strokeWidth='20'
              stroke='white'>
              <animateTransform
                attributeName='transform'
                type='translate'
                from={`${fromPos - toPos},0`}
                to={`${toPos - fromPos},0`}
                dur={`${animationDuration}s`}
                repeatCount='indefinite' />
            </line>
          </g>
          )
        }
        <TransactionSource r={5} cx={fromPos} cy={scaledY(yPos + 6)} fill='white' />
        <TransactionSource r={5} cx={toPos} cy={scaledY(yPos + 6)} fill='white' />
        <defs>
          <linearGradient id={`grad-${step}`}>
            <stop offset='0%' stopColor={_getColor(leftPos === fromPos ? from : to)} />
            <stop offset='100%' stopColor={_getColor(leftPos === fromPos ? to : from)} />
          </linearGradient>
          <clipPath id={`clip-${step}`}>
            <path d={pathDataRect} fill='white' />
          </clipPath>
        </defs>
      </TransactionGroup>
    )
  }
  return (
    <TransactionGroup active={active}>
      <TransactionLine
        active={active}
        x1={fromPos}
        x2={toPos}
        y1={scaledY(yPos)}
        y2={scaledY(yPos)} />
      <TransactionSource r={5} cx={fromPos} cy={scaledY(yPos)} fill='black' />
      {active && _.times(8, i => (
        <TransactionTokens
          r={2}
          cx={fromPos}
          cy={scaledY(yPos)}
          opacity={1}
          fill='black'>
          <animate
            attributeType='XML'
            attributeName='cx'
            from={fromPos}
            to={toPos}
            dur={`${animationDuration}s`}
            begin={`${0.1 * i}s`}
            repeatCount='indefinite' />
        </TransactionTokens>
    ))}
      {active && <TransLabel x={leftPos + ((rightPos - leftPos) * 0.5)} y={scaledY(yPos - 10)}>{description}</TransLabel>}
      <TransactionGroupOutline
        active={active}
        onClick={onClick}
        x={leftPos - 15}
        y={scaledY(yPos - 15)}
        width={30 + (rightPos - leftPos)}
        height={scaledY(30)} />
    </TransactionGroup>
  );
};

class TimelineDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      description: this._getDescription(0)
    };

  }
  componentDidMount() {
    this.setState()
  }
  _getDescription(index) {
    const { id } = this.props;
    const t = TRANSACTIONS[id][index];
    return t.desc
      .replace('#SENDER#', t.from)
      .replace('#RECIPIENT#', t.to)
      .replace('#TYPE#', t.type)
      .replace('#AMOUNT#', t.amount);
  }
  _handleTransactionSelected = i => {
    this.setState({
      activeStep: i,
      description: this._getDescription(i)
    });
  }
  _getViewBox() {
    const {
      height,
      width
    } = this.props;
    const ratio = height / width;
    const scaledY = val => ratio * val;

    const zoom = 1;

    const x = 0;
    const y = 0;
    const w = 1000 * zoom;
    const h = scaledY(zoom * 1000);

    return `${x} ${y} ${w} ${h}`;
  }
  nextStep() {
    const { activeStep } = this.state;
    const { id: numBeneficiaries } = this.props;
    const numSteps = 1 + (numBeneficiaries * 3);
    const newStep = activeStep === numSteps ? 0 : activeStep + 1;

    this.setState({
      activeStep: newStep,
      description: this._getDescription(newStep)
    });
  }
  prevStep() {
    const { activeStep } = this.state;
    const { id: numBeneficiaries } = this.props;
    const numSteps = 1 + (numBeneficiaries * 3);
    const newStep = activeStep ? activeStep - 1 : numSteps;

    this.setState({
      activeStep: newStep,
      description: this._getDescription(newStep)
    });
  }
  render() {
    const {
      id,
      onTransactionSelected,
      height,
      width
    } = this.props;

    const {
      activeStep,
      description
    } = this.state;

    const ratio = height / width;
    const numBeneficiaries = id;
    const numSteps = 1 + (numBeneficiaries * 3);

    const scaledY = val => ratio * val;

    const boundsBox = (
      <g>
        <rect stroke='black' fill='none' opacity={0.1} x={50} y={scaledY(50)} width={900} height={scaledY(900)} />
      </g>
    );

    const benBox = (
      <g>
        <OrgLabel x={550} y={scaledY(120)}>Beneficiaries</OrgLabel>
        <rect fill='cornflowerblue' opacity={0} x={300} y={scaledY(150)} width={500} height={scaledY(700)} />
      </g>
    );

    const orgLines = (
      <g>
        <g>
          <OrgLabel x={100} y={scaledY(120)}>Diberse</OrgLabel>
          <DiberseRect stroke='black' fill='none' x={98} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.main2} cx={98} cy={scaledY(150)} />
        </g>
        <g>
          <OrgLabel x={200} y={scaledY(120)}>NGO</OrgLabel>
          <NGORect stroke='black' fill='none' x={198} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.positive} cx={198} cy={scaledY(150)} />
        </g>
        {_.times(numBeneficiaries).map(index => {
          const xPos = _genBeneficiaryPosition({ index, numBeneficiaries });
          return (
            <g>
              <circle r={5} fill={theme.colors.alternate} cx={xPos - 2} cy={scaledY(150)} />
              <BeneficiaryRect
                key={index}
                stroke='black'
                fill='none'
                x={xPos - 2}
                y={scaledY(200)}
                width={4}
                height={scaledY(LINES_HEIGHT)} />
            </g>
          );
        })}
        <g>
          <OrgLabel x={900} y={scaledY(120)}>Corp Partner</OrgLabel>
          <PartnerRect stroke='black' fill='none' x={898} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.main4} cx={898} cy={scaledY(150)} />
        </g>
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
          active={activeStep === t.step || activeStep == t.pairStep}
          onClick={() => this._handleTransactionSelected(t.step)}
          key={i}
          {...t}
          scaledY={scaledY}
          numBeneficiaries={numBeneficiaries}
          numSteps={numSteps} />)}
      </g>
    );

    return (
      <TimelineDiagramWrapper
        viewBox={this._getViewBox()}
        preserveAspectRatio='align xMinYMin'
        width={width}
        height={height}>
        {benBox}
        {orgLines}
        {transactionLines}
        <OrgLabel x={500} y={scaledY(900)}>{description}</OrgLabel>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as log from 'loglevel';

// Data
import {
  ORGS,
  TRANSACTIONS
} from '../../mock-data/transactions';

// Services
import { balanceService as balances } from '../../services/balance-service';

// Components
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from 'material-ui-icons';

// Styles
import {
  OrgLabel,
  TimelineDiagramWrapper,
  SVG,
  TransactionDescription,
  TransactionsNav,
  Balances,
  BalanceRow,
  BalanceCellChange,
  DisberseRect,
  NGORect,
  NodeLabel,
  OrgLines,
  BeneficiaryRect,
  PartnerRect,
  TimeStepRect,
  TransactionLine,
  TransactionSource,
  TransactionGroup,
  TransLabel,
  TransactionLines
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

const LINES_HEIGHT = 800;

const _getNiceName = abbrev => abbrev in ORGS ? ORGS[abbrev] : abbrev;

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
    case 'dis':
    case 'disberse':
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
    case 'disberse':
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

const _getNumSteps = numBeneficiaries => 3 + (numBeneficiaries * 3);

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

  const yPos = 200 + (step * (LINES_HEIGHT / (numSteps - 1)));
  const animationDuration = 4;
  const positiveDir = leftPos === fromPos;

  const fromOffset = positiveDir ? 5 : -5;
  const toOffset = positiveDir ? -5 : 5;
  const fromAnchor = positiveDir ? 'start' : 'end';
  const toAnchor = positiveDir ? 'end' : 'start';

  const description = desc
    ? desc
      .replace('#SENDER#', from)
      .replace('#RECIPIENT#', to)
      .replace('#TYPE#', type)
      .replace('#AMOUNT#', amount)
    : '';
  if (type) {
    const pathDataRect = `M${leftPos},${scaledY(yPos)} h${width} v${scaledY(10)} h${-width} z`;
    const pathData = `M${leftPos},${scaledY(yPos - 20)} q0,20 20,20 h${width - 20} v1 h${-(width - 20)} q-20,0 -20,20 z`;

    const bulletWidth = amount < 500 ? 20 : 50;
    const prefix = positiveDir ? '' : <tspan dy={-0.6}>←</tspan>;
    const suffix = positiveDir ? <tspan dy={-0.6}>→</tspan> : '';

    const bgFill = type === 'settle' ? 'white' : `url(#grad-${step})`;
    const stroke = type === 'settle' ? `url(#grad-${step})` : `none`;

    return (
      <TransactionGroup active={active} onClick={onClick}>
        {false && <rect
          fill={theme.colors.light}
          x={leftPos + 10}
          y={scaledY(yPos - 2)}
          width={(rightPos - leftPos) - 20}
          height={scaledY(14)} />}
        <path
          d={pathDataRect}
          fill={bgFill}
          fillOpacity={active ? 1 : 0.2}
          strokeDasharray='2,1'
          stroke={stroke} />
        {active && (
          <g clipPath={`url(#clip-${step})`}>
            <rect
              x={fromPos}
              y={scaledY(yPos - 10)}
              width={20}
              height={scaledY(20)}
              fill='url(#grad-transfer)'>
              <animateTransform
                attributeName='transform'
                type='translate'
                from={`${fromPos - toPos},0`}
                to={`${toPos - fromPos},0`}
                dur={`${animationDuration}s`}
                repeatCount='indefinite' />
            </rect>
          </g>
          )}
        <g>
          <TransactionSource
            r={scaledY(8)}
            cx={fromPos}
            cy={scaledY(yPos + 5)}
            fill='white' />
          <TransactionSource
            r={scaledY(8)}
            cx={toPos}
            cy={scaledY(yPos + 5)}
            fill='white' />
        </g>
        <g>
          <NodeLabel active={active} textAnchor={fromAnchor} x={fromPos + fromOffset} y={scaledY(yPos - 5)}>{_getNiceName(from)}</NodeLabel>
          {amount && <NodeLabel active={active} textAnchor={'middle'} x={leftPos + ((rightPos - leftPos) / 2)} y={scaledY(yPos + 30)}>{prefix} {amount} {type} {suffix}</NodeLabel>}
        </g>
        <g>
          <NodeLabel active={active} textAnchor={toAnchor} x={toPos + toOffset} y={scaledY(yPos - 5)}>{_getNiceName(to)}</NodeLabel>
        </g>
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
};

class TimelineDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      description: this._getDescription(0),
      showTransactions: false
    };

  }
  componentDidMount() {
    this._handleTransactionSelected(0);
  }
  _initialiseViewBox() {
    this._changeViewBox();
  }
  _changeViewBox(viewBox) {
    const nextViewBox = viewBox || this._getViewBox({});
    window.TweenMax.to(
      this.svg,
      1.5,
      {
        attr: {
          viewBox: nextViewBox
        },
        ease: window.Linear.easeInOut,
        paused: false,
        repeat: false
      }
    );
  }
  _getDescription = index => {
    log.info('_getDescription', index);
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
      description: this._getDescription(i),
      showTransactions: true
    }, () => {
      this._focusOnStep(i);
    });
  }
  /**
   * Calculate SVG viewBox bounds which are restricted to the first
   * transaction in a time step
   * @param  {number} step Time step
   * @return {string}      The viewBox dimensions string
   */
  _getBounds(step) {
    const {
      id: numBeneficiaries,
      height,
      width
    } = this.props;
    const ratio = height / width;
    const scaledY = val => ratio * val;

    const numSteps = TRANSACTIONS[numBeneficiaries].length;
    const { from, to } = _.find(TRANSACTIONS[numBeneficiaries], t => t.step === step);
    const fromPos = _getPosition(from, numBeneficiaries);
    const toPos = _getPosition(to, numBeneficiaries);

    const isWide = width >= 1000;
    // viewBox padding, so we can show some space around the active transaction line
    const padding = isWide ? 50 : 0;

    const left = Math.min(fromPos, toPos) - padding;
    const right = Math.max(fromPos, toPos) + padding;

    const yPos = 200 + (step * (LINES_HEIGHT / (numSteps - 1)));

    const top = yPos;
    const bottom = top + (right - left);

    return {
      left,
      right,
      top: scaledY(top),
      bottom: scaledY(bottom)
    };
  }
  _getViewBox({
    top = 400,
    bottom = 1400,
    left = 0,
    right = 1000
  }) {
    const {
      height,
      width
    } = this.props;
    const ratio = height / width;
    const scaledY = val => ratio * val;
    const isWide = width >= 1000;

    let x = left;
    let w = right - left;

    const minW = 400;
    if (w < minW) {
      left -= (minW - w) / 2;
      x = left;
      w = minW;
    }

    let y = Math.max(130, top - ((bottom - top) * 0.3));
    let h = scaledY(bottom - top);
    const leftOffset = isWide ? 150 : 0;
    const topOffset = isWide ? -100 : 0;


    const viewBox = `${x} ${y + topOffset} ${w + leftOffset} ${h}`;
    return viewBox;
  }
  _focusOnStep(step) {
    const bounds = this._getBounds(step);
    const nextViewBox = this._getViewBox(bounds);
    this._changeViewBox(nextViewBox);
  }
  resetView() {
    this.setState({
      activeStep: 0,
      description: this._getDescription(0)
    }, () => {
      const nextViewBox = this._getViewBox({});
      this._changeViewBox(nextViewBox);
    });
  }
  nextStep = () => {
    const { activeStep } = this.state;
    const { id } = this.props;
    const numSteps = TRANSACTIONS[id].length;
    const newStep = activeStep === numSteps - 1 ? 0 : activeStep + 1;

    this.setState({
      activeStep: newStep,
      description: this._getDescription(newStep)
    }, () => {
      this._focusOnStep(newStep);
    });
  }
  prevStep = () => {
    const { activeStep } = this.state;
    const { id } = this.props;
    const numSteps = TRANSACTIONS[id].length;
    const newStep = activeStep ? activeStep - 1 : numSteps - 1;

    this.setState({
      activeStep: newStep,
      description: this._getDescription(newStep)
    }, () => {
      this._focusOnStep(newStep);
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
      showTransactions,
      description
    } = this.state;

    const ratio = height / width;
    const numBeneficiaries = id;
    const numSteps = TRANSACTIONS[id].length;

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
      <OrgLines>
        <g>
          <OrgLabel x={100} y={scaledY(120)}>Disberse</OrgLabel>
          <DisberseRect stroke='black' fill='none' x={98} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.main2} cx={100} cy={scaledY(150)} />
        </g>
        <g>
          <OrgLabel x={200} y={scaledY(120)}>NGO</OrgLabel>
          <NGORect stroke='black' fill='none' x={198} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.positive} cx={200} cy={scaledY(150)} />
        </g>
        <g>
          {_.times(numBeneficiaries).map(index => {
            const xPos = _genBeneficiaryPosition({ index, numBeneficiaries });
            return (
              <g key={`${index}`}>
                <circle r={5} fill={theme.colors.alternate} cx={xPos} cy={scaledY(150)} />
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
        </g>
        <g>
          <OrgLabel x={900} y={scaledY(120)}>Partner</OrgLabel>
          <PartnerRect stroke='black' fill='none' x={898} y={scaledY(200)} width={4} height={scaledY(LINES_HEIGHT)} />
          <circle r={5} fill={theme.colors.main4} cx={900} cy={scaledY(150)} />
        </g>
      </OrgLines>
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
            y={scaledY(200 + (i * (LINES_HEIGHT / (numSteps - 1))))}
            height={1}
            width={900} />
        ))}
      </g>
    );

    const transactionLines = (
      <TransactionLines ref={el => { this.transactionLines = el; }} opacity={showTransactions ? 1 : 0}>
        {TRANSACTIONS[id].map((t, i) => {
          const { from, to, step } = t;
          const yPos = 200 + ((step + 1) * (LINES_HEIGHT / (numSteps + 1)));
          const fromPos = _getPosition(from, numBeneficiaries);
          const toPos = _getPosition(to, numBeneficiaries);
          return (
              <Transaction
                active={activeStep === t.step || activeStep == t.pairStep}
                onClick={() => this._handleTransactionSelected(t.step)}
                key={i}
                {...t}
                scaledY={scaledY}
                numBeneficiaries={numBeneficiaries}
                numSteps={numSteps} />
          );
        }
      )}
      </TransactionLines>
    );

    const iconProps = { color: theme.colors.dark, width: 50, height: 50 };

    const orgBalances = balances.orgs.map(
      org => {
        const b = balances._getBalanceWithinWindow(org, [0, activeStep]);
        return {
          org,
          name: _getNiceName(org),
          tokens: b.tokens || 0,
          USD: b.USD || 0,
        }
      }
    );

    const activeTransaction = _.find(TRANSACTIONS[id], { step: activeStep });
    const activeOrgs = [activeTransaction.from, activeTransaction.to];

    return (
      <TimelineDiagramWrapper>
        <SVG
          innerRef={el => { this.svg = el; }}
          width={width}
          height={height}>
          {benBox}
          {orgLines}
          {transactionLines}
          <defs>
            <marker id='arrow' markerWidth='10' markerHeight='10' refX='5' refY='3' orient='auto' markerUnits='strokeWidth' viewBox='0 0 10 10'>
              <path d='M0,0 l0,6 l3,-3 z' fill='black' />
            </marker>
            <linearGradient id='grad-transfer'>
              <stop offset='0%' stopColor={theme.colors.bright} stopOpacity={0} />
              <stop offset='30%' stopColor={theme.colors.bright} stopOpacity={0} />
              <stop offset='50%' stopColor={theme.colors.bright} stopOpacity={0.8} />
              <stop offset='70%' stopColor={theme.colors.bright} stopOpacity={0} />
              <stop offset='100%' stopColor={theme.colors.bright} stopOpacity={0} />
            </linearGradient>
          </defs>
        </SVG>

        <Balances>
          <h4>Balances at Step {activeStep + 1}</h4>
          <table cellSpacing={0} cellPadding={0}>
            <thead>
              <tr>
                <th>Org</th>
                <th>TOKENS</th>
                <th>USD</th>
              </tr>
            </thead>
            <tbody>
              {orgBalances.map(b => (
                <BalanceRow key={`row-${b.name}`} active={activeTransaction.type === 'settle' || activeOrgs.includes(b.org)}>
                  <td>{b.name}</td>
                  <td>{b.tokens || '0'} {
                      activeOrgs.includes(b.org)
                      && activeTransaction.type === 'tokens'
                      && <BalanceCellChange positive={activeTransaction.from === b.org}
                      ><span>{activeTransaction.from === b.org ? '-' : '+'}{activeTransaction.amount}</span></BalanceCellChange>
                  }
                  </td>
                  <td>
                    {b.USD || '0'} {
                        activeOrgs.includes(b.org)
                        && activeTransaction.type === 'USD'
                        && <BalanceCellChange positive={activeTransaction.from === b.org}
                        ><span>{activeTransaction.from === b.org ? '-' : '+'}{activeTransaction.amount}</span></BalanceCellChange>
                    }
                  </td>
                </BalanceRow>
              ))}
            </tbody>
          </table>
          {description && showTransactions && (
            <TransactionDescription onClick={this.nextStep}>
              <h3>{activeStep + 1}. {description}</h3>
            </TransactionDescription>
          )}
          {description && showTransactions && (
            <TransactionsNav>
              <ChevronLeftIcon onClick={this.prevStep} style={{ ...iconProps }} />
              <ChevronRightIcon onClick={this.nextStep} style={{ ...iconProps }} />
            </TransactionsNav>
          )}
        </Balances>

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

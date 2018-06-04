import styled from 'styled-components';

import { theme, media } from '../../styles/utils';

export const TimelineDiagramWrapper = styled.div`
  position: relative;
`;

export const SVG = styled.svg`
`;


export const TransactionsNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 2rem;
  ${media.fromLarge`margin: 0`}

  > svg {
    cursor: pointer;
    border: 1px solid ${theme.colors.dark};

    &:hover {
      background: ${theme.colors.main2};
      > path {
        fill: white;
      }
    }
  }
`;

export const TransactionDescription = styled.div`
  width: 100%;
  padding-bottom: 1rem;

  ${media.fromLarge`
    height: 100px;
    display: flex;
    align-items: center;
  `}

  h3 {
    width: 100%;
    padding: 1rem;
    text-align: center;
    background: ${theme.colors.light};
    color: ${theme.colors.dark};
    border: 1px solid ${theme.colors.dark};
  }
`;

export const Balances = styled.div`
  padding: 0.5rem 2rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: rgb(255, 255, 255);
  border-top: 1px solid ${theme.colors.dark};

  ${media.fromLarge`
    padding: 2rem;
    width: 360px;
    right: 0;
    top: 0;
    bottom: auto;
    border-top: none;
    border-left: 1px solid ${theme.colors.dark};
    border-bottom: 1px solid ${theme.colors.dark};
  `};

  > h4 {
    text-align: center;
  }

  > table {
    width: 100%;
    margin: 0 auto 2rem;

    td, th {
      padding: 1rem;
      font-size: 0.8rem;
      ${media.fromLarge`
        padding: 2rem 1rem;
        font-size: 1.2rem;
        `}
      text-align: center;
    }

    th {
      text-decoration: underline;
    }
  }
`;

export const BalanceRow = styled.tr`
  border-bottom: 1px dashed rgb(222, 222, 222);

  td {
    opacity: 0.5;
    position: relative;
  }
  ${props => props.active && `
    td {
      font-weight: bold;
      opacity: 1;
    }
  `}
`;
export const BalanceCellChange = styled.div`
  position: static;
  width: auto;
  text-align: center;

  ${media.fromLarge`
    position: absolute;
    width: 100%;
    bottom: 4px;
    right: 0;
  `}

  > span {
    border: 1px solid ${props => props.positive ? theme.colors.negative : theme.colors.positive};
    padding: 0.1rem 0.3rem;
    color: ${theme.colors.dark};
    border-radius: 2px;
    font-size: 0.6rem;

    ${media.fromLarge`font-size: 0.8rem;`}
  }
`;

export const OrgLabel = styled.text`
  text-anchor: middle;
  font-size: 2rem;
  text-transform: uppercase;
  ${media.fromMedium`font-size: 1.6rem;`}
`;

export const NodeLabel = styled.text`
  opacity: ${props => props.active ? 1 : 0.2};
  text-anchor: ${props => props.textAnchor || 'middle'};
  text-transform: uppercase;
  font-size: 1rem;

  ${media.fromMedium`font-size: 0.5rem;`}
`;

export const TransLabel = styled.text`
  text-anchor: middle;
  font-size: 1rem;
  text-transform: uppercase;
  fill: ${theme.colors.main2};
`;

export const DisberseRect = styled.rect`
  fill: ${theme.colors.main2};
  fill-opacity: 1;
  stroke: ${theme.colors.main2};
  stroke-opacity: 0;
`;

export const PartnerRect = styled.rect`
  fill: ${theme.colors.main3};
  fill-opacity: 1;
  stroke: ${theme.colors.main3};
  stroke-opacity: 0;
`;

export const NGORect = styled.rect`
  fill: ${theme.colors.positive};
  fill-opacity: 1;
  stroke: ${theme.colors.positive};
  stroke-opacity: 0;
`;

export const BeneficiaryRect = styled.rect`
  fill: ${theme.colors.alternate};
  fill-opacity: 1;
  stroke: ${theme.colors.alternate};
  stroke-opacity: 0;
`;

export const TimeStepRect = styled.rect`
  fill: ${theme.colors.main1};
  fill-opacity: 0.1;
`;

export const TransactionLines = styled.g`
`;

export const OrgLines = styled.g`
`;

export const TransactionLine = styled.line`
  stroke: ${theme.colors.main4};
  stroke-dasharray: 0, 0;
  marker-end: url(#arrow);
  opacity: ${props => props.active ? 1 : 0.2};
`;

export const TransactionJuice = styled.path`
  fill: ${theme.colors.light};
  stroke: ${theme.colors.dark};
`;

export const TransactionSource = styled.circle`
  stroke: ${theme.colors.main4};
  vector-effect: non-scaling-stroke;
`;

export const TransactionGroup = styled.g``;

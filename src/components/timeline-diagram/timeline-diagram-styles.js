import styled from 'styled-components';

import { theme, media } from '../../styles/utils';

export const TimelineDiagramWrapper = styled.svg`
`;

export const OrgLabel = styled.text`
  text-anchor: middle;
  font-size: 1.6rem;
  text-transform: uppercase;
`;

export const TransLabel = styled.text`
  text-anchor: middle;
  font-size: 1rem;
  text-transform: uppercase;
  fill: ${theme.colors.main2};
`;

export const DiberseRect = styled.rect`
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
`;

export const TransactionTokens = styled.circle`
  fill: ${theme.colors.main4};
`;

export const TransactionGroupOutline = styled.rect`
  fill: ${theme.colors.alternate};
  fill-opacity: 0;
  cursor: pointer;
  &:hover {
    fill-opacity: 0.1;
  }
`;

export const TransactionGroup = styled.g``;

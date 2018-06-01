import { createRequestPath } from './api';

const formatNumber = ({
  value,
  multiply = 1,
  stripZeros = false,
  numDp = 2,
  suffix = ''
}) => {
  const str = (value * multiply).toFixed(numDp);
  return stripZeros
    ? `${str.replace(/\.0+/, '')}${suffix}`
    : `${str}${suffix}`;
};

export { createRequestPath, formatNumber };

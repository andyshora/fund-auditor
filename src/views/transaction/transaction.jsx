import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
// import { TransactionWrapper } from './Transaction-styles';

const Transaction = ({ propName }) => {
  return (
    <div>
      <h2>Transaction</h2>
    </div>
  );
};

Transaction.propTypes = {
  propName: PropTypes.number
};

Transaction.defaultProps = {
  propName: null
};

export default Transaction;

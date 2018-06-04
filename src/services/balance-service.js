import * as log from 'loglevel';
import _ from 'lodash';

// Services
import { Storage } from './config-service';

const _getUniqueOrgs = transactions => {
  const froms = _.map(transactions, t => t.from);
  const tos = _.map(transactions, t => t.to);
  return _.uniq([...froms, ...tos]);
}
const _getUniqueTypes = transactions => _.uniqBy(transactions, t => t.type).map(t => t.type);

class BalanceService {
  id = null

  init({ id, transactions, initialBalances = null }) {
    if (this._id === id) {
      return;
    }

    this._id = id;
    this._transactions = transactions;
    this._balances = {};
    this._initialBalances = initialBalances;
    this._ins = {};
    this._outs = {};

    const _uniqueOrgs = _getUniqueOrgs(this._transactions);
    this._orgs = _uniqueOrgs;
    const _uniqueTypes = _getUniqueTypes(this._transactions);
    _uniqueOrgs.forEach(orgName => {
      const initialBalances = this._initialBalances[orgName] || {};
      this._balances[orgName] = {...initialBalances};
      this._ins[orgName] = [];
      this._outs[orgName] = [];
      _uniqueTypes.forEach(type => {
        this._balances[orgName][type] = this._balances[orgName][type] || 0;
      });
    });

    console.table(this._balances);

    this._parseTransactions();

  }
  _parseTransactions() {

    this._transactions.forEach(t => {
      const { type, amount, from, to, step } = t;
      // adjust from balance
      this._balances[from][type] -= amount;
      // adjust to balance
      this._balances[to][type] += amount;

      // add ins
      this._ins[to].push({
        from,
        amount,
        type,
        step
      });

      // add outs
      this._outs[from].push({
        to,
        amount,
        type,
        step
      });
    });
  }
  _getBalanceWithinWindow(orgName, timeWindow) {
    // log.info('_getBalanceWithinWindow', orgName, timeWindow, this._transactions);
    if (timeWindow.length !== 2) {
      return;
    }
    const balance = timeWindow[0] === 0 && orgName in this._initialBalances ? {...this._initialBalances[orgName]} : {};
    const filteredTransactions = _.filter(this._transactions, t => t.from === orgName || t.to === orgName);
    filteredTransactions.forEach(t => {
      const { type, amount, from, to, step } = t;
      const start = timeWindow[0];
      const end = timeWindow[1];

      if (t.step >= start && t.step <= end) {
        if (!(type in balance)) {
          balance[type] = 0;
        }
        if (t.from === orgName) {
          // log.info('type -= ', amount);
          balance[type] -= amount;
        } else if (t.to === orgName) {
          // log.info('type += ', amount);
          balance[type] += amount;
        }
      }
    }, this);

    // set initial balance if we're starting at 0
    // if (!timeWindow[0]) {
    //   const initialBalances = this._initialBalances[orgName];
    //
    //   for (let type in initialBalances) {
    //     const amount = initialBalances[type];
    //     if (type in balance) {
    //       balance[type] += amount;
    //     } else {
    //       balance[type] = amount;
    //     }
    //   }
    // }

    return balance;
  }
  getBalance(orgName, timeWindow) {
    // log.info('getBalance', orgName, timeWindow);
    if (timeWindow) {
      return this._getBalanceWithinWindow(orgName, timeWindow);
    }

    return orgName in this._balances
      ? this._balances[orgName]
      : null;
  }
  getIns(orgName, timeWindow) {
    log.info('getIns', orgName, timeWindow);

    return orgName in this._ins
      ? this._ins[orgName]
      : null;
  }
  getOuts(orgName, timeWindow) {
    log.info('getOuts', orgName, timeWindow);

    return orgName in this._outs
      ? this._outs[orgName]
      : null;
  }
  get orgs() {
    return _.sortBy(this._orgs, orgName => {
      switch (orgName) {
        case 'dis': return 1;
        case 'ngo': return 2;
        case 'par': return 10;
        default: return 3;
      }
    });
  }
}

export const balanceService = new BalanceService();

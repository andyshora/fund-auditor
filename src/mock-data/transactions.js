export const ORGS = {
  'ngo': 'NGO',
  'ben0': 'School A',
  'ben1': 'School B',
  'ben2': 'School C',
  'ben3': 'School D',
  'ben4': 'School E',
  'ben5': 'School F',
  'par': 'Local Partner',
  'dis': 'Plug'
};

export const INITIAL_BALANCES = {
  1: {
    'dis': {
      'USD': 100
    }
  },
  3: {
    'dis': {
      'USD': 300
    }
  }
};

export const TRANSACTIONS = {
  1: [
    {
      step: 0,
      from: 'dis',
      to: 'ngo',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens issued to NGO'
    },
    {
      step: 1,
      from: 'ngo',
      to: 'ben0',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens transferred to Beneficiary'
    },
    {
      step: 2,
      from: 'ben0',
      to: 'par',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Partner for conversion to local currency.'
    },
    {
      step: 3,
      pairStep: 2,
      from: 'par',
      to: 'ben0',
      amount: 98,
      type: 'USD',
      desc: 'Tokens converted into USD, minus 2% fee'
    },
    {
      step: 4,
      from: 'par',
      to: 'dis',
      amount: 0,
      type: 'settle',
      desc: 'Partner provides proof of all transactions to Plug'
    },
    {
      step: 5,
      from: 'par',
      to: 'dis',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens transferred back to Plug'
    },
    {
      step: 6,
      pairStep: 5,
      from: 'dis',
      to: 'par',
      amount: 100,
      type: 'USD',
      desc: 'Plug convert tokens into USD'
    }
  ],
  3: [
    {
      step: 0,
      from: 'dis',
      to: 'ngo',
      amount: 300,
      type: 'tokens',
      desc: 'Tokens issued to #RECIPIENT#'
    },
    {
      step: 1,
      from: 'ngo',
      to: 'ben0',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Beneficiary'
    },
    {
      step: 2,
      from: 'ngo',
      to: 'ben1',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Beneficiary'
    },
    {
      step: 3,
      from: 'ngo',
      to: 'ben2',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Beneficiary'
    },
    {
      step: 4,
      from: 'ben0',
      to: 'par',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Partner for Conversion'
    },
    {
      step: 5,
      pairStep: 4,
      from: 'par',
      to: 'ben0',
      amount: 100,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 6,
      from: 'ben1',
      to: 'par',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Partner for Conversion'
    },
    {
      step: 7,
      pairStep: 6,
      from: 'par',
      to: 'ben1',
      amount: 90,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 8,
      from: 'ben2',
      to: 'par',
      amount: 90,
      type: 'tokens',
      desc: 'Tokens sent to Partner for Conversion'
    },
    {
      step: 9,
      pairStep: 8,
      from: 'par',
      to: 'ben2',
      amount: 90,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 10,
      from: 'par',
      to: 'dis',
      amount: 0,
      type: 'settle',
      desc: 'Partner provides proof of all transactions back to Plug'
    }
  ]
};

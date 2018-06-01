export const TRANSACTIONS = {
  1: [
    {
      step: 0,
      from: 'dis',
      to: 'ngo',
      amount: 1000,
      type: 'tokens',
      desc: '#AMOUNT# #TYPE# issued to #RECIPIENT#'
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
      from: 'ben0',
      to: 'par',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Partner for Conversion'
    },
    {
      step: 3,
      pairStep: 2,
      from: 'par',
      to: 'ben0',
      amount: 100,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 4,
      from: 'par',
      to: 'dis',
      amount: 0,
      type: 'settle',
      desc: 'Partner provides proof of all transactions'
    }
  ],
  3: [
    {
      step: 0,
      from: 'dis',
      to: 'ngo',
      amount: 1000,
      type: 'tokens',
      desc: '#AMOUNT# #TYPE# sent from #SENDER# to #RECIPIENT#'
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
      amount: 100,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 8,
      from: 'ben2',
      to: 'par',
      amount: 100,
      type: 'tokens',
      desc: 'Tokens sent to Partner for Conversion'
    },
    {
      step: 9,
      pairStep: 8,
      from: 'par',
      to: 'ben2',
      amount: 100,
      type: 'USD',
      desc: 'Tokens successfully converted into #TYPE#'
    },
    {
      step: 10,
      from: 'par',
      to: 'dis',
      amount: 0,
      type: 'settle',
      desc: 'Partner provides proof of all transactions'
    }
  ]
};
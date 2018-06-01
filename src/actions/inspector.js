// Actions which result from interactions within the inspector
import {
  PROPOSAL_POOL_SHOWN,
  PROPOSAL_POOL_HIDDEN
} from '../action-types';

// Interation: the proposal has been expanded
export const proposalPoolShown = () => ({ type: PROPOSAL_POOL_SHOWN });

// Interation: the proposal has been collapsed, revealing the explorer view
export const proposalPoolHidden = () => ({ type: PROPOSAL_POOL_HIDDEN });

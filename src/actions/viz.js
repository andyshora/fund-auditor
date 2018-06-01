// Actions which result from interactions within a visualisation view
import {
  API_BLOCK_DATA_RECEIVED,
  VIZ_BLOCK_SELECTED,
  VIZ_COLLAPSED,
  VIZ_EXPANDED
} from '../action-types';

// Event: block data was received from the API
export const blockDataReceived = payload => ({ type: API_BLOCK_DATA_RECEIVED, payload });

// Interaction: a block in the chain has been selected
export const vizBlockSelected = payload => ({ type: VIZ_BLOCK_SELECTED, payload });

// Interation: the viz has been expanded
export const vizExpanded = () => ({ type: VIZ_EXPANDED });

// Interation: the viz has been collapsed
export const vizCollapsed = () => ({ type: VIZ_COLLAPSED });

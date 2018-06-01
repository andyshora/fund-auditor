import { WS_PROPOSALS_MESSAGE } from '../action-types';

export const proposalsMessage = payload => ({ type: WS_PROPOSALS_MESSAGE, payload });

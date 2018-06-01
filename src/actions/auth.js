// Actions which result from authentication events
import { AUTH_KEYS_SET } from '../action-types';

export const authKeysSet = payload => ({ type: AUTH_KEYS_SET, payload });

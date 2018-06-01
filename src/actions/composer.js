// Actions which result from interactions within the composer
import {
  COMPOSER_TRANSFORMS_RECEIVED,
  COMPOSER_TRANSFORM_RECEIVED
} from '../action-types';

export const composerTransformsReceived = payload => ({ type: COMPOSER_TRANSFORMS_RECEIVED, payload });
export const composerTransformReceived = payload => ({ type: COMPOSER_TRANSFORM_RECEIVED, payload });

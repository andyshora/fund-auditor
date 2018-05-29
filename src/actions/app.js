// Actions which concern the global application state
import {
  APP_CONFIG_LOADED,
  APP_ERROR,
  APP_DISMISS_ERROR,
  APP_NOTIFICATION,
  APP_DISMISS_NOTIFICATION
} from '../action-types';

// Event: something has gone very wrong. This will result in a global error state in the app.
export const appError = payload => ({ type: APP_ERROR, payload });

// Interaction: dismiss the currently active error notification
export const appDismissError = payload => ({ type: APP_DISMISS_ERROR, payload });

// Event: a notification needs to be shown
export const appNotification = payload => ({ type: APP_NOTIFICATION, payload });

// Interaction: dismiss the currently active notification
export const appDismissNotification = payload => ({ type: APP_DISMISS_NOTIFICATION, payload });

// Event: config loaded
export const appConfigLoaded = payload => ({ type: APP_CONFIG_LOADED, payload });

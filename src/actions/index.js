// Actions are dispatched in order for our reducers to update parts of the application state
// These actions may be dispatched in response to events (e.g. A Websocket connection error)
// or a user interaction (e.g. A button was clicked to select a block in the chain)

// Global App Actions
import {
  appConfigLoaded,
  appDismissError,
  appDismissNotification,
  appError,
  appNotification
} from './app';

// Plug auth
import { authKeysSet } from './auth';

// Dashboard metrics
import { monitorMessage } from './monitor';

// Proposals
import { proposalsMessage } from './proposals';

// Actions used in the explorer view
import {
  clearExplorer,
  folderSelected,
  explorerNodesReceived
} from './explorer';

import {
  proposalPoolShown,
  proposalPoolHidden
} from './inspector';

import { composerTransformsReceived } from './composer';

// Actions used in a visualisation
import {
  vizBlockSelected,
  vizExpanded,
  vizCollapsed,
  blockDataReceived
} from './viz';

// Websocket actions
import {
  wsConnected,
  wsOpened,
  wsClosed,
  wsError,
  wsSubscribe,
  wsMessage
} from './websocket';

export {
  appConfigLoaded,
  appDismissError,
  appError,
  appDismissNotification,
  appNotification,
  authKeysSet,
  blockDataReceived,
  clearExplorer,
  composerTransformsReceived,
  explorerNodesReceived,
  folderSelected,
  monitorMessage,
  proposalsMessage,
  proposalPoolShown,
  proposalPoolHidden,
  vizBlockSelected,
  vizExpanded,
  vizCollapsed,
  wsOpened,
  wsConnected,
  wsClosed,
  wsError,
  wsSubscribe,
  wsMessage
};

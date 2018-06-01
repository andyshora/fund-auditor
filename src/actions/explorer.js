// import * as log from 'loglevel';

// Actions which result from explorer interactions
import {
  EXPLORER_CLEAR_NODES,
  EXPLORER_FOLDER_SELECTED,
  EXPLORER_NODES_RECEIVED
} from '../action-types';

export const explorerNodesReceived = ({ depth, key, nodes }) => ({
  type: EXPLORER_NODES_RECEIVED,
  payload: { depth, key, nodes }
});

export const folderSelected = ({
  node,
  parentPaths,
  depth
}) => ({
  type: EXPLORER_FOLDER_SELECTED,
  payload: {
    node,
    parentPaths,
    depth
  }
});

export const clearExplorer = () => ({
  type: EXPLORER_CLEAR_NODES
});

// Actions which should be dispatched in response to events happening on a websocket connection

// Event: the ws connection has been opened successfully
export const wsConnected = event => ({ type: 'ws/connected', payload: { event } });
// Event: the ws connection has closed
export const wsClosed = event => {
  let type = 'ws/close';
  let message = 'ws closed';

  // closed event may be a connection error
  if (event.code !== 3001) {
    type = 'ws/error';
    message = 'ws connection error';
  }

  return {
    type,
    payload: {
      event,
      message
    }
  };
};
// Event: an error has occurred on ws connection
export const wsError = event => ({ type: 'ws/error', payload: { event } });

// Interaction: a request to subscribe to certain events on the ws connection
export const wsSubscribe = (subscriptions = []) => ({
  type: 'ws/send',
  payload: {
    action: 'subscribe',
    subscriptions
  }
});
// Event: a message has been received on the ws connection
export const wsMessage = event => {
  const data = JSON.parse(event.data);
  const keys = Object.keys(data);

  if (!keys || !keys.length) {
    return wsError(event);
  }

  const type = `ws/message/${keys[0]}`;
  // console.log('type', type, data[keys[0]]);

  return {
    type,
    payload: {
      data,
      event
    }
  };
};

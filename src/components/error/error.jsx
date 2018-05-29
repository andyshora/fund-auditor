import React from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';

// Components
import Key from '../key';
import {
  Close as CloseIcon
} from 'material-ui-icons';

import { ErrorWrapper } from './error-styles';

const Error = ({
  data,
  description,
  onClose,
  title
}) => {
  if (data) {
    log.error('App Error:', title, description, data);
  }

  const eventHandlers = {};

  if (typeof onClose === 'function') {
    eventHandlers.onClick = onClose;
  }
  return (
    <ErrorWrapper className='error'>
      {typeof onClose === 'function' && <CloseIcon {...eventHandlers} style={{ color: 'white', width: 50, height: 20 }} />}
      <h2>Error: {title}</h2>
      <p>{description}</p>
      <p><i>You can open the Browser Console to check for additional error details which may have been logged. Windows: <Key>ctrl</Key>+<Key>shift</Key>+<Key>J</Key> Mac: <Key>cmd</Key>+<Key>alt</Key>+<Key>J</Key></i></p>
    </ErrorWrapper>
  );
};

Error.propTypes = {
  data: PropTypes.any,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
  title: PropTypes.string
};

Error.defaultProps = {
  data: null,
  description: null,
  onClose: null,
  title: 'Error'
};

export default Error;

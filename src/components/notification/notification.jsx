import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Close as CloseIcon,
  Done as DoneIcon,
  Info as InfoIcon
} from 'material-ui-icons';

// Styles
import {
  NotificationWrapper,
  LeftSection,
  RightSection
} from './notification-styles';

class Notification extends Component {
  componentDidMount() {
    const { onClose, autoClose, autoCloseDelay } = this.props;
    if (autoClose) {
      setTimeout(() => {
        if (this.wrapper && typeof onClose === 'function') {
          onClose();
        }
      }, autoCloseDelay);
    }
  }
  render() {
    const {
      description,
      onClose,
      title,
      type
    } = this.props;

    const eventHandlers = {};

    if (typeof onClose === 'function') {
      eventHandlers.onClick = onClose;
    }

    return (
      <NotificationWrapper className='notification' {...eventHandlers} innerRef={el => { this.wrapper = el; }}>
        {typeof onClose === 'function'
          && <CloseIcon {...eventHandlers} style={{ color: 'white', width: 30, height: 30 }} />}
        <LeftSection>
          {type === 'success' && <DoneIcon style={{ color: 'white', width: 30, height: 30 }} />}
          {type === 'info' && <InfoIcon style={{ color: 'white', width: 30, height: 30 }} />}
        </LeftSection>
        <RightSection>
          <h2>{title}</h2>
          <p>{description}</p>
        </RightSection>
      </NotificationWrapper>
    );
  }
}

Notification.propTypes = {
  autoClose: PropTypes.bool,
  autoCloseDelay: PropTypes.number,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string
};

Notification.defaultProps = {
  autoClose: true,
  autoCloseDelay: 2000,
  description: null,
  onClose: null,
  title: 'Error',
  type: 'info'
};

export default Notification;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as log from 'loglevel';
import { utils as plugUtils, addressFromPublicKey } from 'plugjs';

// Actions
import {
  authKeysSet,
  appNotification
} from '../../actions';

// Services
import { authService } from '../../services/auth-service';

// Styles
import {
  FormButton,
  FormLabel,
  FormRow,
  FormSendRow,
  WrapperInset
} from '../shared-styles';
import { SettingsWrapper } from './settings-styles';

// Services
import { settingsSelector } from '../../selectors';

class Settings extends Component {
  _formFields = {}
  _handleFormSubmitted = () => {
    const { dispatch } = this.props;
    authService.publicKey = this._formFields.publicKey.value;
    authService.secretKey = this._formFields.secretKey.value;
    dispatch(authKeysSet({
      publicKey: this._formFields.publicKey.value,
      secretKey: this._formFields.secretKey.value,
      address: addressFromPublicKey(plugUtils.hexToBuffer(this._formFields.publicKey.value))
    }));
    dispatch(appNotification({
      title: 'Keys Saved',
      description: 'Public Key and Secret Key have been saved to the local storage in your Web Browser. These will be used in all Plug requests.',
      type: 'success'
    }));
  }
  render() {
    const { auth: { publicKey, secretKey } } = this.props;
    return (
      <WrapperInset>
        <SettingsWrapper>
          <h1>Settings</h1>
          <p>The following settings will persist in your browser:</p>
          <form>
            <FormRow>
              <FormLabel>Public Key</FormLabel>
              <textarea ref={el => { this._formFields.publicKey = el; }} defaultValue={publicKey} />
            </FormRow>
            <FormRow>
              <FormLabel>Secret Key</FormLabel>
              <textarea ref={el => { this._formFields.secretKey = el; }} defaultValue={secretKey} />
            </FormRow>
          </form>
          <FormSendRow>
            <FormButton onClick={this._handleFormSubmitted}>Save</FormButton>
          </FormSendRow>
        </SettingsWrapper>
      </WrapperInset>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default withRouter(connect(settingsSelector)(Settings));

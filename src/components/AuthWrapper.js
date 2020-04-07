import React, { Component } from "react";
import { InternalApp } from "./InternalApp";
import CustomSignIn from "./CustomSignIn";
import '../styles/auth.css';

import store from "../store";
import { Provider } from 'react-redux';


class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  updateUsername = (newUsername) => {
    this.setState({ username: newUsername });
  }

  render() {
    return (
      <Provider store={store}>
        <CustomSignIn
          authState={this.props.authState}
          updateUsername={this.updateUsername}
          onStateChange={this.props.onStateChange}
        />
        <InternalApp
          className="internalApp"
          authState={this.props.authState}
          onStateChange={this.props.onStateChange}
        />
      </Provider>
    );
  }
}

export default AuthWrapper;
import React, {Component} from "react";
import { Auth } from "aws-amplify";
import '../styles/auth.css';
import { connect } from 'react-redux';

class CustomSignIn extends Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];

    this.signIn = this.signIn.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.state = {
      username: '',
      password: '', 
      error: '',
      loading: false
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, error: "" });
  }

  async signIn() {
    const {username, password, loading} = this.state;
    console.log(`The user name is ${username} and password is ${password}`);
    try {
      this.setState({loading: true});
      await Auth.signIn(username, password);
      this.props.onStateChange("signedIn", {});
      this.setState({loading: false});
    } catch (err) {
      this.setState({loading: false});
      console.log(err);
      if (err.code === "UserNotConfirmedException") {
        this.props.updateUsername(username);
        await Auth.resendSignUp(username);
        this.props.onStateChange("confirmSignUp", {});
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
        this.setState({ error: err.message});
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        this.setState({ error: err.message });
      } else {
        this.setState({ error: err.message });
        console.error(err);
      }
    }
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }


  render() {
    const {error, loading} = this.state
    return (
      <div className="text-center">
      {this._validAuthStates.includes(this.props.authState) && (
          <form className="form-signin" onSubmit={this.handleFormSubmission}>
              <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
              <h1 className="h3 mb-5 font-weight-normal">Please sign in</h1>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="username" className="form-control mb-2" placeholder="Email address" onChange={this.handleInputChange} required autoFocus />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="password" className="form-control" placeholder="Password" onChange={this.handleInputChange} required />

                  <button className="btn btn-lg btn-primary btn-block" disabled={loading}  type="submit" onClick={this.handleInputChange} >Sign in</button>
              <div id="messageBox" className="row justify-content-center align-items-center mt-5" >
                      {error && 
                      <p className="text-danger">{this.state.error} </p>
                      }
                      {loading &&
                      <div class="spinner-grow" role="status">
                          <span class="sr-only">Loading...</span>
                      </div>
                      }   
              </div>

              <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
          </form>
      )}
      </div> 
  );
  }
}

export default connect()(CustomSignIn);
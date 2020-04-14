import React from "react";

import { connect } from "react-redux";

import AuthActions from "redux-store/models/auth";
import "./login.css";

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
  };

  handleChangeUsername = (event) => {
    this.setState({ userName: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.props.signInByEmail(userName, password);
  };

  render() {
    return (
      <React.Fragment>
        <div className="leftLogin"></div>
        <div className="login">
          <div className="title">
            <i className="fal fa-user-circle"></i>
            <div>Login</div>
          </div>
          <ul>
            <li>
              <input
                type="text"
                placeholder="Email addres"
                name="userName"
                onChange={this.handleChangeUsername}
                id="login-name"
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                onChange={this.handleChangePassword}
              />
            </li>
            <li>
              <button
                type="button"
                onClick={this.handleSubmit}
                className="loginBtn"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({});

export default connect(mapsStateToProps, { ...AuthActions })(Login);

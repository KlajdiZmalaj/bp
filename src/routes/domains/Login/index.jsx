import React from "react";

import { connect } from "react-redux";

import AuthActions from "redux-store/models/auth";
import "./login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="title">
          <i class="fal fa-user-circle"></i>
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
    );
  }
}

const mapsStateToProps = ({ auth }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register
});

export default connect(mapsStateToProps, { ...AuthActions })(Login);

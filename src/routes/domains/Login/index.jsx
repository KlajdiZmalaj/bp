import React from "react";

import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { subscribeSocketUser, subscribeSocketSupport } from "config/socket.js";

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
  socketCall = (data) => {
    subscribeSocketUser(data.id, this.props.addPrivateMsg);
    if (data.role.name === "support") {
      subscribeSocketSupport();
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.props.signInByEmail(userName, password, this.socketCall);
  };

  render() {
    const { loginMsg } = this.props;
    // console.log("loginMsg", loginMsg);
    return (
      <React.Fragment>
        <div className="leftLogin">
          <div className="logoLogin">
            <img src={images.logoFooter} alt="" />
          </div>
        </div>
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
              <form>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"
                  onChange={this.handleChangePassword}
                />
              </form>
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

          {loginMsg && <div className="loginMsg">{loginMsg}</div>}
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    loginMsg: state.auth.loginMsg,
  };
};

export default connect(mapsStateToProps, { ...AuthActions })(Login);

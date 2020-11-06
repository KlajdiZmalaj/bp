import React from "react";

import { connect } from "react-redux";
import images from "themes/images";
import { AuthActions, MainActions } from "redux-store/models";
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
    subscribeSocketUser(data.id, this.props);
    if (data.role.name === "support") {
      subscribeSocketSupport(this.props);
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
        <div className="leftLogin animated fadeIn">
          <div className="logoLogin">
            <img src={images.logoFooter} alt="" />
          </div>
        </div>
        <form className="login animated fadeIn" method="POST">
          <div className="title">
            <i className="fal fa-user-circle"></i>
            <div>Login</div>
          </div>
          <ul>
            <li>
              <input
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    this.handleSubmit(e);
                  }
                }}
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handleChangeUsername}
                id="loginUserName"
              />
            </li>
            <li>
              <input
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    this.handleSubmit(e);
                  }
                }}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={this.handleChangePassword}
              />
            </li>
            <li>
              <button
                type="submit"
                onClick={this.handleSubmit}
                className="loginBtn"
              >
                Login
              </button>
            </li>
          </ul>

          {loginMsg && <div className="loginMsg">{loginMsg}</div>}
        </form>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    loginMsg: state.auth.loginMsg,
  };
};

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  Login
);

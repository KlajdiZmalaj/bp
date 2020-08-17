import React from "react";
import "./styles.css";
import images from "themes/images";

import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { subscribeSocketUser, subscribeSocketSupport } from "config/socket.js";
class AdminLoginDom extends React.Component {
  state = {
    username: "",
    password: "",
    googleAuth: "",
  };
  socketCall = (data) => {
    subscribeSocketUser(data.id, this.props);
    if (data.role.name === "support") {
      subscribeSocketSupport(this.props);
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.signInByEmail(username, password, this.socketCall);
  };
  render() {
    const { username, password, googleAuth } = this.state;
    const { loginMsg } = this.props;
    return (
      <div className="AdminLogin">
        <div className="AdminLogin--Part--Blue">
          <span className="title">Log in</span>
        </div>
        <div className="AdminLogin--Part"></div>
        <div className="AdminLogin--LoginForm--Back">
          <div className="AdminLogin--LoginForm">
            <span>
              <input
                placeholder="USERNAME"
                type="text"
                value={username}
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                  });
                }}
              />
              <i className="fal fa-envelope"></i>
            </span>
            <span>
              <input
                placeholder="PASSWORD"
                type="password"
                value={password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />

              <i class="fal fa-key"></i>
            </span>
            <span>
              <input
                placeholder="GOOGLE AUTHENTICATOR"
                type="text"
                onChange={(e) => {
                  this.setState({
                    googleAuth: e.target.value,
                  });
                }}
                value={googleAuth}
              />
              <img src={images["google-authenticator"]} />
            </span>
            <button onClick={this.handleSubmit}>Log in</button>
          </div>
          {loginMsg && <div className="loginMsg">{loginMsg}</div>}
        </div>
      </div>
    );
  }
}
const mapsStateToProps = (state) => {
  return {
    loginMsg: state.auth.loginMsg,
  };
};

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  AdminLoginDom
);

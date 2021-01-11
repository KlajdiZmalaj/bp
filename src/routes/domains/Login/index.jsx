import React from "react";

import { connect } from "react-redux";
import images from "themes/images";
import { AuthActions, MainActions } from "redux-store/models";
import { subscribeSocketUser, subscribeSocketSupport } from "config/socket.js";
import { withRouter } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    isForgot: false,
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
  handleSubmit = async (event) => {
    event.preventDefault();
    const { userName, password, email, isForgot } = this.state;
    if (isForgot) {
      this.props.forgotPassword(email);
    } else {
      await this.props.signInByEmail(userName, password, this.socketCall);
      if (this.props.match) {
        window.location.hash = `dashboard/${
          this.props?.match?.params?.["link2"] || "ricariche"
        }`;
      }
    }
  };

  render() {
    const { isForgot } = this.state;
    const { loginMsg } = this.props;
    console.log("this.props.match", this.props?.match?.params?.["link2"]);
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
            {isForgot ? (
              <li>
                <input
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      this.handleSubmit(e);
                    }
                  }}
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  id="loginEmail"
                />
              </li>
            ) : (
              <>
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
              </>
            )}

            <li>
              <button
                type="submit"
                onClick={this.handleSubmit}
                className="loginBtn"
              >
                {isForgot ? "Vai" : "Login"}
              </button>
              <span onClick={() => this.setState({ isForgot: !isForgot })}>
                {!isForgot ? "Password dimenticata?" : "Accedi"}
              </span>
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

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions, ...MainActions })(Login)
);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { skin } from "config/api";
import AuthActions from "redux-store/models/auth";
import axios from "axios";
import { notification } from "antd";
class Verify extends Component {
  state = {
    password: "",
    password2: "",
    hasError: 0,
    redirect: false,
  };
  pw1Handler = (e) => {
    this.setState({ password: e.target.value });
  };
  pw2Handler = (e) => {
    this.setState({ password2: e.target.value });
  };
  submitVals = () => {
    const token = window.location.href.split("?token=")[1];
    const { password, password2 } = this.state;
    const { history } = this.props;
    if (password === password2) {
      axios
        .create({
          baseURL: "https://services-api.bpoint.store/api",
        })
        .post(`/users/resetPassword`, {
          token,
          password,
          confirm_password: password2,
          ...skin,
        })
        .then(
          (response) => {
            // console.log("response", response);
            this.setState({ hasError: false, redirect: true });
            setTimeout(() => {
              localStorage.setItem(
                "accountDataB",
                JSON.stringify(response.data)
              );
              this.props.setAccountInfo(response.data);
              history.push("/dashboard");
            }, 2000);
          },
          (error) => {
            console.log("response", error);
            notification["error"]({
              message: Object.values(error.response.data.errors),
            });
            this.setState({ hasError: true });
          }
        );
    } else {
      this.setState({ hasError: true });
    }
  };
  render() {
    const { hasError } = this.state;

    return (
      <div
        className="verifyAcc login"
        style={{ top: "50%", transform: "translate(-50%,-50%)" }}
      >
        <div className="title">
          {hasError === 0 ? (
            <i className="fas fa-check-circle"></i>
          ) : hasError ? (
            <i className="fas fa-times text-danger"></i>
          ) : (
            <i className="fas fa-check-circle text-success animated tada"></i>
          )}

          <div>Reset Password</div>
          <ul>
            <li>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="login-name"
                onChange={(e) => {
                  this.pw1Handler(e);
                }}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                id="password"
                onChange={(e) => {
                  this.pw2Handler(e);
                }}
              />
            </li>
            {hasError ? (
              <li className="hasError text-danger">Something Went Wrong!</li>
            ) : null}

            <li>
              <button
                type="button"
                className="loginBtn"
                onClick={() => {
                  this.submitVals();
                }}
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapsStateToProps = ({ state }) => ({});
export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(Verify)
);

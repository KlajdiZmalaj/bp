import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AuthActions from "redux-store/models/auth";
import axios from "axios";
class Verify extends Component {
  state = {
    password: "",
    password2: "",
    hasError: 0,
    redirect: false
  };
  pw1Handler = e => {
    this.setState({ password: e.target.value });
  };
  pw2Handler = e => {
    this.setState({ password2: e.target.value });
  };
  submitVals = () => {
    const token = window.location.href.split("?token=")[1];
    const { password, password2 } = this.state;
    const { history } = this.props;
    if (password === password2) {
      axios
        .create({
          baseURL: "https://services-api.bpoint.store/api"
        })
        .post(`/users/verify`, {
          token,
          password,
          confirm_password: password2
        })
        .then(
          response => {
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
          error => {
            // console.log("response", error);
            this.setState({ hasError: true });
          }
        );
    } else {
      this.setState({ hasError: true });
    }
  };
  render() {
    const { history, match } = this.props;
    const { hasError, redirect } = this.state;
    console.log("history", history, match);

    return (
      <div className="verifyAcc login">
        <div className="title">
          {hasError === 0 ? (
            <i className="fas fa-check-circle"></i>
          ) : hasError ? (
            <i className="fas fa-times text-danger"></i>
          ) : (
            <i className="fas fa-check-circle text-success animated tada"></i>
          )}

          <div>Verify Account</div>
          <ul>
            <li>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="login-name"
                onChange={e => {
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
                onChange={e => {
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
                Verify
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
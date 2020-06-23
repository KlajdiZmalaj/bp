import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import SingleError from "./SingleError";
import "./style.css";
export class SupportBody extends Component {
  componentDidMount() {
    this.props.getErrors();
  }

  render() {
    const { errors } = this.props;
    console.log("errors", errors);
    return (
      <div className="accountInfo">
        <div className="contentAcc supportContent">
          <div className="userList">
            <div className="userList--AllUsers">
              <div className="header">
                <span>id</span>
                <span>time</span>
                <span>title</span>
                <span>utente</span>
                <span>username</span>
                <span>description</span>
                <span className="deleteError">Delete</span>
              </div>
              {errors.map((error) => (
                <SingleError
                  deleteError={this.props.deleteError}
                  error={error}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const _ = (state) => {
  return {
    errors: state.auth.errors,
  };
};
export default connect(_, AuthActions)(SupportBody);

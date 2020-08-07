import React, { Component } from "react";
import Profile from "./Profile";
import UsersList from "./UsersList";
import { connect } from "react-redux";
import "./style.css";
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { activeAccount } = this.props;

    return (
      <div className="contentAcc">
        {activeAccount === 1 && <Profile />}
        {activeAccount === 2 && <UsersList />}
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    activeAccount: state.main.activeAccount,
  };
};

export default connect(mstp, null)(Content);

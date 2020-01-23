import React, { Component } from "react";
import Profile from "./Profile";
import Link from "./Link";
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
        {activeAccount === "Profile" && <Profile />}
        {activeAccount === "Link" && <Link />}
      </div>
    );
  }
}
const mstp = ({ main }) => ({
  activeAccount: main.activeAccount
});
export default connect(mstp, null)(Content);

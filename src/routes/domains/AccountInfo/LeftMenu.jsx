import React, { Component } from "react";
import { connect } from "react-redux";
import { MainActions } from "redux-store/models";

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="leftMenuAcc"></div>;
  }
}
const mstp = (state) => ({
  activeAccount: state.main.activeAccount,
});
export default connect(mstp, { ...MainActions })(LeftMenu);

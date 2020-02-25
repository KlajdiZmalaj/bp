import React, { Component } from "react";
import { profileLinks } from "config";
import { connect } from "react-redux";
import { MainActions } from "redux-store/models";

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("props", this.props);
    return (
      <div className="leftMenuAcc">
        {profileLinks.map(item => {
          // console.log("item.id", item.id);
          // return (
          //   <div
          //     className={item.id === this.props.activeAccount ? "active" : ""}
          //     onClick={() => {
          //       this.props.setAccount(item.id);
          //     }}
          //     key={item.id}
          //   >
          //     {item.name}
          //   </div>
          // );
        })}
      </div>
    );
  }
}
const mstp = state => ({
  activeAccount: state.main.activeAccount
});
export default connect(mstp, { ...MainActions })(LeftMenu);

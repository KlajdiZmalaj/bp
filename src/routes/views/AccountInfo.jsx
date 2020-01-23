import React, { Component } from "react";
import LeftMenu from "../domains/AccountInfo/LeftMenu";
import Content from "../domains/AccountInfo/Content";
class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="accountInfo">
        <LeftMenu />
        <Content />
      </div>
    );
  }
}

export default AccountInfo;

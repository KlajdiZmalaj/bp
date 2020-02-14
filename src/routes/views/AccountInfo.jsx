import React, { Component, Fragment } from "react";
import LeftMenu from "../domains/AccountInfo/LeftMenu";
import Content from "../domains/AccountInfo/Content";
import { Header, Azioni } from "shared-components";

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Header />
        {/* <Overview /> */}
        <Azioni active="account-info" />
        <div className="accountInfo">
          <LeftMenu />
          <Content />
        </div>
      </Fragment>
    );
  }
}

export default AccountInfo;

import React, { Component, Fragment } from "react";
import LeftMenu from "../domains/AccountInfo/LeftMenu";
import Content from "../domains/AccountInfo/Content";
import { Overview, Header } from "shared-components";

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Header />
        <Overview />
        <div className="accountInfo">
          <LeftMenu />
          <Content />
        </div>
      </Fragment>
    );
  }
}

export default AccountInfo;

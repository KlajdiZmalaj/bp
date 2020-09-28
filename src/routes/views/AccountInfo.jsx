import React, { Component, Fragment } from "react";
import LeftMenu from "../domains/AccountInfo/LeftMenu";
import Content from "../domains/AccountInfo/Content";
import { Header, Azioni } from "shared-components";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getAgents();
  }
  render() {
    return (
      <Fragment>
        <Header />
        {/* <Overview /> */}
        <Azioni activeMain="contabilita" active="account-info"></Azioni>
        <div className="accountInfo">
          <LeftMenu />
          <Content />
        </div>
      </Fragment>
    );
  }
}
export default connect(null, AuthActions)(AccountInfo);

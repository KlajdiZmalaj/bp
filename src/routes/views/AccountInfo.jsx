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
    if (
      this.props?.accountInfo?.profile?.role?.name !== "agency" &&
      this.props?.accountInfo?.profile?.role?.name !== "user"
    ) {
      this.props.getAgents();
    }
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
const mpStP = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mpStP, AuthActions)(AccountInfo);

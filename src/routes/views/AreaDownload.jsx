import React, { Component, Fragment } from "react";
import { Header, Azioni } from "shared-components";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import AreaDownload from "../domains/AreaDownload/AreaDownload";
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
        <Azioni activeMain="areaDownload" submenu="noSubmenu"></Azioni>
        <AreaDownload />
      </Fragment>
    );
  }
}
export default connect(null, AuthActions)(AccountInfo);

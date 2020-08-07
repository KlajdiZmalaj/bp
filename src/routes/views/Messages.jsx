import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

import { Azioni } from "shared-components";
import Messag from "../domains/Messages";

class Messages extends React.Component {
  render() {
    const { accountInfo } = this.props;
    let messages = [];
    if (accountInfo.messages) {
      messages = accountInfo.messages;
    }
    return (
      <div className="Container">
        <div className="container-fluid overview ">
          <Azioni active="annunci"></Azioni>

          <div className="panels-container">
            <div className="sort-annunci max-width">
              <h1 className="heading-tab mr-auto">Messages</h1>
              <ul className="m-0 p-0">
                <li>
                  <a href="#/">
                    <i className="fas fa-dot-circle"></i>Tutti
                  </a>
                </li>
                <li>
                  <a href="#/">
                    <i className="fas fa-dot-circle"></i>Privata
                  </a>
                </li>
                <li>
                  <a href="#/">
                    <i className="fas fa-dot-circle"></i>text
                  </a>
                </li>
                <li className="active">
                  <a href="#/">
                    <i className="fas fa-dot-circle"></i>text
                  </a>
                </li>
                <li>
                  <a href="#/">
                    <i className="fas fa-dot-circle"></i>text
                  </a>
                </li>
              </ul>
            </div>
            <Messag messages={messages}></Messag>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, AuthActions)(Messages);

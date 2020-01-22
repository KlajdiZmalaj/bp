import React from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";

import  Message  from "./Message";
import images from "themes/images";
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="row no-gutters max-width">
        {messages.map((msg, index) => {
          return (
              <Message key={index} msg={msg}></Message>

          );
        })}
        {/* <div className="col-md-12">
          <div className="panel-tab" data-toggle="collapse" data-target="#tab1">
            <i className="fas fa-dot-circle"></i>
            <h4>Lorem, ipsum.</h4>
            <span className="date-pane">12/12/2000</span>
            <img src={images.uparrow} alt="" />
          </div>

          <div
            className="nav nav-tabs panel-content panel-content-annunci collapse"
            id="tab1"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis
            nostrum pariatur.
          </div>
        </div> */}
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  accountInfo: state.auth.accountInfo
});

export default connect(mapsStateToProps, AuthActions)(Messages);

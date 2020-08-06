import React from "react";

import MainActions from "redux-store/models/main";
import { connect } from "react-redux";
class AdminLeftForm extends React.Component {
  render() {
    return (
      <div className="AdminLeftForm">
        <div className="AdminLeftForm--FirstBox">
          <div className="AdminLeftForm--FirstBox--Box">
            <div className="Bars">
              <span>NETWORK</span>
              <i className="fal fa-bars" onClick={this.props.handleClick}></i>
            </div>
          </div>
          <div className="AdminLeftForm--FirstBox--Box--active">
            <div className="AdminLeftForm--FirstBox--Box--Skinsvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
              >
                <circle className="a" cx="11" cy="11" r="11" />
              </svg>
              <span
                onClick={() => {
                  this.props.setActiveSkinId(1);
                }}
              >
                BPOINT
              </span>
            </div>
          </div>
        </div>

        <div className="AdminLeftForm--LastBox">
          <div className="AdminLeftForm--LastBox--Box">
            <i className="fal fa-envelope"></i>
            <span>MESSAGGI</span>
          </div>
          <div className="AdminLeftForm--LastBox--Box">
            <i className="fal fa-cogs"></i>
            <span>SETTINGS</span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null, { ...MainActions })(AdminLeftForm);

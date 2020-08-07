import React from "react";

import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";

import { connect } from "react-redux";
import { data } from "./adminRightForm";
import AdminRightFormStatisticheDetails from "./AdminRightFormStatisticheDetails";
class AdminLeftForm extends React.Component {
  state = {
    statModal: false,
    wallModal: false,
    ultModal: false,
  };
  render() {
    return (
      <React.Fragment>
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
            {this.props.screenWidth <= 1050 ? (
              <React.Fragment>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    this.props.editStatModal({
                      visibility: true,
                      statModal: {
                        graphData: data,
                        Tranzacioni: "2586.66",
                        Commisione: "2586.66",
                        Proviggioni: "2586.66",
                      },
                    });
                  }}
                >
                  <i className="fal fa-analytics"></i>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    this.setState({
                      statModal: false,
                      wallModal: true,
                      ultModal: false,
                    });
                  }}
                >
                  <i className="fal fa-heart-rate"></i>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    this.setState({
                      statModal: false,
                      wallModal: false,
                      ultModal: true,
                    });
                  }}
                >
                  <i className="fal fa-wallet"></i>
                </div>
              </React.Fragment>
            ) : null}
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
      </React.Fragment>
    );
  }
}
const mstp = (state) => ({
  screenWidth: state.main.screenWidth,
});
export default connect(mstp, { ...MainActions, ...AuthActions })(AdminLeftForm);

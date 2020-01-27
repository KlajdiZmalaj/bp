import React, { Component } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { toggleOverviewSelector } from "selectors/main";
import "./Overview.styles.scss";

class Overview extends Component {
  componentDidMount() {
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);

    if (data) {
      this.props.getPayments();
    }
  }

  render() {
    const {
      showOverview,
      toggleOverview,
      services,
      payments,
      accountInfo
    } = this.props;

    let provT = 0;
    if (payments && payments.length > 0) {
      provT = (payments || [])
        .map(item => parseFloat(item.percentage))
        .reduce((prev, next) => prev + next);
    }

    // let commT = 0;
    // if (payments && payments.length > 0) {
    //   commT = (payments || [])
    //     .map(item => item.commissione)
    //     .reduce((prev, next) => prev + next);
    // }

    return (
      <React.Fragment>
        <div className="max-width row">
          <div className="col-6 col-md-3 order-1">
            <a
              href="/#"
              className="overview-btn"
              onClick={() => toggleOverview(!showOverview)}
            >
              <i className="far fa-tachometer"></i> Overview{" "}
              <i
                className={
                  "fas fa-chevron-up " + (showOverview ? "" : "rotating")
                }
              ></i>
            </a>
          </div>
          <div
            className={
              "col-12 col-md-6 order-3 order-md-2 p-0 px-md-3 overview-list " +
              (showOverview ? "" : "hideWig")
            }
          >
            <ul>
              <li> Today</li>
              <li> Month</li>
              <li> year</li>
            </ul>
          </div>
          <div
            className={
              "col-6 col-md-3 order-2 order-md-3 download-overview " +
              (showOverview ? "" : "hideWig")
            }
          >
            <div className="col p-0">
              <button>
                <i className="fal fa-download"></i>
              </button>
              <button>
                Select Filter <i className="far fa-sliders-h"></i>
              </button>
            </div>
          </div>
        </div>
        <hr className="overviw-line" />
        <div
          className={
            " row max-width no-gutters p-2 pl-md-4 wigs-overview " +
            (showOverview ? "" : "hideWig")
          }
        >
          <div
            className=" col-md-4"
            data-aos="flip-down"
            data-aos-duration="1200"
          >
            <div className="wig wig1">
              <a href="/#">View Details</a>
              <h2>Saldo</h2>
              <h3>
                {accountInfo.profile &&
                  accountInfo.profile.wallet &&
                  accountInfo.profile.wallet}
                €
              </h3>
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="col-md-4" data-aos="flip-up" data-aos-duration="800">
            <div className="wig wig2">
              <a href="/#">View Details</a>
              {/* <h2>Commissioni</h2> */}
              <h2>Proviggioni</h2>
              <h3>{provT.toFixed(2)} €</h3>
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div
            className="col-md-4"
            data-aos="flip-down"
            data-aos-duration="1200"
          >
            <div className="wig wig3">
              <a href="/#">View Details</a>
              <h2>Proviggioni</h2>
              <h3>{provT.toFixed(2)}</h3>
              <i className="fal fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = state => ({
  showOverview: toggleOverviewSelector(state),
  services: state.services,
  payments: state.auth.payments,
  accountInfo: state.auth.accountInfo
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Overview
);

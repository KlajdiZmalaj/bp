import React, { Component } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { toggleOverviewSelector } from "selectors/main";
import "./Overview.styles.scss";
import sumBy from "lodash/sumBy";
import { get } from "lodash";
import "./anim.css";

class Overview extends Component {
  state = {
    overviewDashboard: {},
    activeFilter: 2,
    dashboardFromFilterTop: true,
    payments: this.props.payments
  };
  fromFilterTop = val => {
    this.setState({ dashboardFromFilterTop: val });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    let { payments } = prevState;
    let { dashboardFromFilterTop } = prevState;
    // console.log("abc", nextProps.payments, prevState.payments);
    if (nextProps.payments !== prevState.payments && dashboardFromFilterTop) {
      payments = nextProps.payments;
      dashboardFromFilterTop = false;
      return { ...prevState, payments, dashboardFromFilterTop };
    } else {
      dashboardFromFilterTop = true;
      return { ...prevState, dashboardFromFilterTop };
    }
  }

  componentDidMount() {
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);

    if (data) {
      this.props.getPayments();
    }
    setTimeout(() => {
      this.props.getOverviewDashboard(2);
    }, 500);
  }
  setDashboard = id => {
    this.setState({ activeFilter: id });
  };
  render() {
    const { activeFilter, dashboardFromFilterTop } = this.state;
    const {
      showOverview,
      toggleOverview,
      payments,
      accountInfo,
      dashboardData
    } = this.props;
    console.log("accountInfo", dashboardData, dashboardFromFilterTop);
    let provT = 0;
    let commT = 0;
    if (payments && payments.length > 0) {
      // provT = (payments || [])
      //   .map(item => parseFloat(item.percentage.replace(/,/g, "")))
      //   .reduce((prev, next) => prev + next);
      provT = sumBy(payments, function(o) {
        return parseFloat(o.percentage.replace(/,/g, "."));
      });
      commT = sumBy(payments, function(o) {
        return parseFloat(o.commissione.replace(/,/g, "."));
      });
    }
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
              <li
                className={
                  activeFilter === 1 && dashboardFromFilterTop
                    ? " activeFilter"
                    : ""
                }
                onClick={() => {
                  this.setDashboard(1);
                  this.props.getOverviewDashboard(1);
                  this.fromFilterTop(true);
                }}
              >
                Today
              </li>
              <li
                className={
                  activeFilter === 2 && dashboardFromFilterTop
                    ? " activeFilter"
                    : ""
                }
                onClick={() => {
                  this.setDashboard(2);
                  this.props.getOverviewDashboard(2);
                  this.fromFilterTop(true);
                }}
              >
                Month
              </li>
              <li
                className={
                  activeFilter === 3 && dashboardFromFilterTop
                    ? " activeFilter"
                    : ""
                }
                onClick={() => {
                  this.setDashboard(3);
                  this.props.getOverviewDashboard(3);
                  this.fromFilterTop(true);
                }}
              >
                year
              </li>
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
          <div className=" col-md-4 ">
            <div className="wig wig1 animated fadeInUp">
              <a href="/#">View Details</a>
              <h2>Saldo</h2>
              <h3>
                {dashboardFromFilterTop
                  ? get(dashboardData, "saldo")
                  : accountInfo.profile &&
                    accountInfo.profile.wallet &&
                    accountInfo.profile.wallet}
                €
              </h3>
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wig wig2  animated fadeInDown">
              <a href="/#">View Details</a>
              {/* <h2>Commissioni</h2> */}
              <h2>Commisione</h2>
              <h3>
                {dashboardFromFilterTop
                  ? get(dashboardData, "commissione")
                  : commT.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                €
              </h3>

              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="wig wig3 animated fadeInUp">
              <a href="/#">View Details</a>
              <h2>Proviggioni</h2>
              <h3>
                {dashboardFromFilterTop
                  ? get(dashboardData, "proviggioni")
                  : provT.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
                €
              </h3>
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
  accountInfo: state.auth.accountInfo,
  dashboardData: state.main.dashboardData
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Overview
);

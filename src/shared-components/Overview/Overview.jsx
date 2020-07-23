import React, { Component } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { toggleOverviewSelector } from "selectors/main";
import "./Overview.styles.scss";
import { get } from "lodash";
import "./anim.css";
// import CountUp from "./CountUp.jsx";
class Overview extends Component {
  state = {
    overviewDashboard: {},
    activeFilter: 2,
  };

  componentDidMount() {
    // const accountData = localStorage.getItem("accountDataB");
    // const data = JSON.parse(accountData);

    setTimeout(() => {
      this.props.getOverviewDashboard(2);
    }, 500);
  }
  setDashboard = (id) => {
    this.setState({ activeFilter: id });
  };
  render() {
    const { activeFilter } = this.state;
    const {
      showOverview,
      toggleOverview,
      dashboardData,
      fromFilterTop,
      dashboardFromFilterTop,
    } = this.props;

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
                  fromFilterTop(true);
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
                  fromFilterTop(true);
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
                  fromFilterTop(true);
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
        <div
          className={
            " row max-width no-gutters p-2 pl-md-4 wigs-overview " +
            (showOverview ? "" : "hideWig")
          }
        >
          <div className=" col-md-4 ">
            <div className="wig wig1 animated fadeIn">
              <span>View Details</span>
              <h2>Saldo</h2>
              <h3>{get(dashboardData, "saldo")}€</h3>
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wig wig2  animated fadeIn">
              <span>View Details</span>
              <h2>Commisione</h2>
              <h3>{get(dashboardData, "commissione") || 0}€</h3>

              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="wig wig3 animated fadeIn">
              <span>View Details</span>
              <h2>Proviggioni</h2>
              <h3>{get(dashboardData, "proviggioni") || 0}€</h3>
              <i className="fal fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  showOverview: toggleOverviewSelector(state),
  services: state.services,
  accountInfo: state.auth.accountInfo,
  dashboardData: state.main.dashboardData,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Overview
);

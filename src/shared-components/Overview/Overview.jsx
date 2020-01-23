import React, { Component } from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { toggleOverviewSelector } from "selectors/main";
import "./Overview.styles.scss";

class Overview extends Component {
  render() {
    const { showOverview, toggleOverview, services } = this.props;
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
              <h2>Overall Sale</h2>
              <h3>1234$</h3>
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="col-md-4" data-aos="flip-up" data-aos-duration="800">
            <div className="wig wig2">
              <a href="/#">View Details</a>
              <h2>Overall Visited</h2>
              <h3>1446</h3>
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
              <h2>Overall Growth</h2>
              <h3>65%</h3>
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
  services: state.services
});

export default connect(mapsStateToProps, MainActions)(Overview);

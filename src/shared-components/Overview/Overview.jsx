import React, { Component } from "react";
import images from "themes/images";

class Overview extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="max-width row">
          <div class="col-6 col-md-3 order-1">
            <a href="/#" class="overview-btn">
              <i class="far fa-tachometer"></i> Overview
              <i class="fas fa-chevron-up"></i>
            </a>
          </div>
          <div class="col-12 col-md-6 order-3 order-md-2 p-0 px-md-3 overview-list">
            <ul>
              <li>Today</li>
              <li>Month</li>
              <li>year</li>
            </ul>
          </div>
          <div class="col-6 col-md-3 order-2 order-md-3 download-overview">
            <div class="col p-0">
              <button>
                <i class="fal fa-download"></i>
              </button>
              <button>
                Select Filter <i class="far fa-sliders-h"></i>
              </button>
            </div>
          </div>
        </div>
        <hr class="overviw-line" />
        <div class=" row max-width no-gutters p-2 pl-md-4 wigs-overview">
          <div class=" col-md-4" data-aos="flip-down" data-aos-duration="1200">
            <div class="wig wig1">
              <a href="/#">View Details</a>
              <h2>Overall Sale</h2>
              <h3>1234$</h3>
              <i class="fas fa-tag"></i>
            </div>
          </div>
          <div class="col-md-4" data-aos="flip-up" data-aos-duration="800">
            <div class="wig wig2">
              <a href="/#">View Details</a>
              <h2>Overall Visited</h2>
              <h3>1446</h3>
              <i class="fas fa-user-alt"></i>
            </div>
          </div>
          <div class="col-md-4" data-aos="flip-down" data-aos-duration="1200">
            <div class="wig wig3">
              <a href="/#">View Details</a>
              <h2>Overall Growth</h2>
              <h3>65%</h3>
              <i class="fal fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Overview;

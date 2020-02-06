import React, { Component } from "react";

import images from "themes/images";

import { azioni } from "config";

class Azioni extends Component {
  render() {
    const { active } = this.props;
    return (
      <React.Fragment>
        <div className="row max-width mt-3">
          <div className="col pl-3 p-lg-0">
            <a href="/#" className="overview-btn">
              <img src={images.tickets} alt="ticket" /> Azioni
            </a>
          </div>
        </div>
        <hr className="overviw-line" />
        <div className="row max-width mt-2 azioni">
          {azioni.map(item => {
            return (
              <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2" key={item.id}>
                <a href={"#/" + item.link}>
                  <div
                    className={
                      "azioni-tab azioni-tab" +
                      item.id +
                      (active === item.link ? " active-tab" : "")
                    }
                  >
                    <i className="fas fa-dot-circle"></i>
                    <h2>{item.name}</h2>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}


export default Azioni

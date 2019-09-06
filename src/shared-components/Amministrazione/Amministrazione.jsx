import React, { Component } from "react";
import images from "themes/images";

import { administrazioni } from "config";

class Azioni extends Component {
  render() {
    const { active } = this.props;
    return (
      <React.Fragment>
        <div className="row max-width mt-3">
          <div className="col pl-3 p-lg-0">
            <a href="/#" className="overview-btn">
              <img src={images.admAZZ} alt="imageAdm" /> Amministrazione
            </a>
          </div>
        </div>
        <hr className="overviw-line" />

        <div className="row max-width mt-2 azioni">
          {administrazioni.map(item => {
            return (
              <div className="col-6 col-lg-2 p-0 pl-lg-2">
                <a href={"#/" + item.link}>
                  <div
                    className={
                      "azioni-tab adm-tab" +
                      item.id +
                      (active === item.link ? " active-tab adm" : " adm")
                    }
                  >
                    <i className="fas fa-dot-circle"></i>
                    <h2>{item.name}</h2>
                  </div>
                </a>
              </div>
            );
          })}

          {/* <div className="col-lg-4"></div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Azioni;

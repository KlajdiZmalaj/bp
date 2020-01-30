import React from "react";

import { Header, Overview, Azioni } from "shared-components";

class UseCode extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid overview ">
          <Azioni active="use-code"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci max-width border-0 mb-0">
              <h1 className="heading-tab mx-auto mt-5 mb-0">
                Utilizza codice VPTPlus
              </h1>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12 carica-conto">
                <p className="text-center">
                  Scrivi il codice o leggilo con apposito lettore
                </p>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fal fa-check"></i>Esegui
                    </span>
                  </div>
                </div>
                <a href="/#" className="mx-auto d-block mt-5">
                  <img
                    className="mx-auto d-block"
                    src="img/redCancek.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
      </div>
    );
  }
}

export default UseCode;

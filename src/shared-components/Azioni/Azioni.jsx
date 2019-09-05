import React, { Component } from "react";
import images from "themes/images";

class Azioni extends Component {
  render() {
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
          <div className="col-6 col-lg-2 p-0">
            <a href="#/annunci">
              <div className="azioni-tab azioni-tab1 ">
                <i className="fas fa-dot-circle"></i>
                <h2>ANNUnci</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2">
            <a href="#/carica-conto">
              <div className="azioni-tab azioni-tab2">
                <i className="fas fa-dot-circle"></i>
                <h2>carica conto</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="#/configura">
              <div className="azioni-tab azioni-tab3 ">
                <i className="fas fa-dot-circle"></i>
                <h2>configura</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2">
            <a href="#/useCode">
              <div className="azioni-tab azioni-tab4">
                <i className="fas fa-dot-circle"></i>
                <h2>usa codice</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="#/dashboard">
              <div className="azioni-tab azioni-tab5 active-tab">
                <i className="fas fa-dot-circle"></i>
                <h2>acquista</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-2 pr-lg-3">
            <a href="#/transazioni">
              <div className="azioni-tab azioni-tab6">
                <i className="fas fa-dot-circle"></i>
                <h2>Transazioni</h2>
              </div>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Azioni;

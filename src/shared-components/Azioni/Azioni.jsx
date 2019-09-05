import React, { Component } from "react";
import images from "themes/images";

class Azioni extends Component {
  render() {
    return (
      <React.Fragment>
        <div class="row max-width mt-3">
          <div class="col pl-3 p-lg-0">
            <a href="/#" class="overview-btn">
              <img src={images.tickets} alt="ticket" /> Azioni
            </a>
          </div>
        </div>
        <hr class="overviw-line" />
        <div class="row max-width mt-2 azioni">
          <div class="col-6 col-lg-2 p-0">
            <a href="annunci.html">
              <div class="azioni-tab azioni-tab1 ">
                <i class="fas fa-dot-circle"></i>
                <h2>ANNUnci</h2>
              </div>
            </a>
          </div>
          <div class="col-6 col-lg-2 p-0 pl-2 pl-lg-2">
            <a href="carica-conta.html">
              <div class="azioni-tab azioni-tab2">
                <i class="fas fa-dot-circle"></i>
                <h2>carica conto</h2>
              </div>
            </a>
          </div>
          <div class="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="configura.html">
              <div class="azioni-tab azioni-tab3 ">
                <i class="fas fa-dot-circle"></i>
                <h2>configura</h2>
              </div>
            </a>
          </div>
          <div class="col-6 col-lg-2 p-0 pl-2 pl-lg-2">
            <a href="useCode.html">
              <div class="azioni-tab azioni-tab4">
                <i class="fas fa-dot-circle"></i>
                <h2>usa codice</h2>
              </div>
            </a>
          </div>
          <div class="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="dashboard.html">
              <div class="azioni-tab azioni-tab5 active-tab">
                <i class="fas fa-dot-circle"></i>
                <h2>acquista</h2>
              </div>
            </a>
          </div>
          <div class="col-6 col-lg-2 p-0 pl-2 pr-lg-3">
            <a href="transazioni.html">
              <div class="azioni-tab azioni-tab6">
                <i class="fas fa-dot-circle"></i>
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

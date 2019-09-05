import React from "react";

import images from "themes/images";

class MainContent extends React.Component {
  render() {
    return (
      <div className="container-fluid overview ">
        <div className="max-width row">
          <div className="col-6 col-md-3 order-1">
            <a href="/#" className="overview-btn">
              <i className="far fa-tachometer"></i> Overview{" "}
              <i className="fas fa-chevron-up"></i>
            </a>
          </div>
          <div className="col-12 col-md-6 order-3 order-md-2 p-0 px-md-3 overview-list">
            <ul>
              <li>Today</li>
              <li>Month</li>
              <li>year</li>
            </ul>
          </div>
          <div className="col-6 col-md-3 order-2 order-md-3 download-overview">
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
        <div className="row max-width no-gutters  p-2 pl-md-4 wigs-overview">
          <div className=" col-md-4">
            <div className="wig wig1">
              <a href="#/">View Details</a>
              <h2>Overall Sale</h2>
              <h3>1234$</h3>
              <i className="fas fa-tag"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wig wig2">
              <a href="#/">View Details</a>
              <h2>Overall Visited</h2>
              <h3>1446</h3>
              <i className="fas fa-user-alt"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="wig wig3">
              <a href="#/">View Details</a>
              <h2>Overall Growth</h2>
              <h3>65%</h3>
              <i className="fal fa-arrow-down"></i>
            </div>
          </div>
        </div>
        <div className="row max-width mt-3">
          <div className="col pl-3 p-lg-0">
            <a href="#/" className="overview-btn">
              <img src={images.tickets} alt="ticketImage" /> Azioni
            </a>
          </div>
        </div>
        <hr className="overviw-line" />
        <div className="row max-width mt-2 azioni">
          <div className="col-6 col-lg-2 p-0">
            <a href="annunci.html">
              <div className="azioni-tab azioni-tab1 active-tab">
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
            <a href="configura.html">
              <div className="azioni-tab azioni-tab3">
                <i className="fas fa-dot-circle"></i>
                <h2>configura</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-2 pl-lg-2">
            <a href="useCode.html">
              <div className="azioni-tab azioni-tab4">
                <i className="fas fa-dot-circle"></i>
                <h2>usa codice</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-lg-2">
            <a href="dashboard.html">
              <div className="azioni-tab azioni-tab5">
                <i className="fas fa-dot-circle"></i>
                <h2>acquista</h2>
              </div>
            </a>
          </div>
          <div className="col-6 col-lg-2 p-0 pl-2 pr-lg-3">
            <a href="transazioni.html">
              <div className="azioni-tab azioni-tab6">
                <i className="fas fa-dot-circle"></i>
                <h2>Transazioni</h2>
              </div>
            </a>
          </div>
        </div>
        <div className="panels-container">
          <div className="sort-annunci max-width">
            <h1 className="heading-tab mr-auto">Annunci</h1>
            <ul className="m-0 p-0">
              <li>
                <a href="#/">
                  <i className="fas fa-dot-circle"></i>Tutti
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="fas fa-dot-circle"></i>Privata
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="fas fa-dot-circle"></i>text
                </a>
              </li>
              <li className="active">
                <a href="#/">
                  <i className="fas fa-dot-circle"></i>text
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="fas fa-dot-circle"></i>text
                </a>
              </li>
            </ul>
          </div>
          <div className="row no-gutters max-width">
            <div className="col-md-12">
              <div
                className="panel-tab"
                data-toggle="collapse"
                data-target="#tab1"
              >
                <i className="fas fa-dot-circle"></i>
                <h4>Lorem, ipsum.</h4>
                <span className="date-pane">12/12/2000</span>
                <img src={images.uparrow} alt="" />
              </div>

              <div
                className="nav nav-tabs panel-content panel-content-annunci collapse"
                id="tab1"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                quis nostrum pariatur.
              </div>

              <div
                className="panel-tab"
                data-toggle="collapse"
                data-target="#tab2"
              >
                <i className="fas fa-dot-circle"></i>
                <h4>Lorem ipsum dolor sit amet consectetur.</h4>
                <span className="date-pane">12/12/2000</span>
                <img src={images.uparrow} alt="" />
              </div>

              <div
                className="nav nav-tabs panel-content panel-content-annunci collapse"
                id="tab2"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic,
                sequi? Amet, placeat.
              </div>

              <div
                className="panel-tab"
                data-toggle="collapse"
                data-target="#tab3"
              >
                <i className="fas fa-dot-circle"></i>
                <h4>Lorem ipsum dolor sit amet.</h4>
                <span className="date-pane">12/12/2000</span>
                <img src={images.uparrow} alt="" />
              </div>

              <div
                className="nav nav-tabs panel-content panel-content-annunci collapse"
                id="tab3"
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptas commodi autem eos!
              </div>

              <div
                className="panel-tab"
                data-toggle="collapse"
                data-target="#tab4"
              >
                <i className="fas fa-dot-circle"></i>
                <h4>Lorem ipsum dolor sit amet.</h4>
                <span className="date-pane">12/12/2000</span>
                <img src={images.uparrow} alt="" />
              </div>

              <div
                className="nav nav-tabs panel-content panel-content-annunci collapse"
                id="tab4"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae consectetur amet dolores!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;

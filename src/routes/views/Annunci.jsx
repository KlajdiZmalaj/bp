import React from "react";

import { Header, Footer, Overview, Azioni } from "../../shared-components";
import images from "themes/images";
class Annunci extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid overview ">
          <Overview></Overview>
          <Azioni></Azioni>

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
        <Footer />
      </div>
    );
  }
}

export default Annunci;

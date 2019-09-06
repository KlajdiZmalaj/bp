import React from "react";

import {
  Header,
  Footer,
  Overview,
  Amministrazione
} from "../../shared-components";
import images from "themes/images";
class Impostazioni extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid overview ">
          <Overview></Overview>
          <Amministrazione active="impostazioni"></Amministrazione>

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0"></div>
            <div className="row no-gutters max-width">
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Impostazioni;

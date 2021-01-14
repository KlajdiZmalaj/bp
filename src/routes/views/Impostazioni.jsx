import React from "react";

import { Amministrazione } from "shared-components";

class Impostazioni extends React.Component {
  render() {
    return (
      <div className="Container">
        <div className="container-fluid overview ">
          <Amministrazione active="impostazioni"></Amministrazione>
          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni maxWidth border-0"></div>
            <div className="row no-gutters maxWidth">
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Impostazioni;

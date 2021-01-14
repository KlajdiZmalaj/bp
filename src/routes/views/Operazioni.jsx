import React from "react";

import { Amministrazione } from "shared-components";

class Operazioni extends React.Component {
  render() {
    return (
      <div className="Container">
        <div className="container-fluid overview ">
          <Amministrazione active="operazioni"></Amministrazione>

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni maxWidth border-0">
              <h1 className="heading-tab ">Elenco Transazioni Sospese</h1>
            </div>
            <div className="row no-gutters maxWidth">
              <div className="col-md-12">
                <table className="transTable">
                  <tbody>
                    <tr>
                      <td>USERNAME</td>
                      <td>TELEFONO</td>
                      <td>DATA</td>
                      <td>DESCRIPZIONE</td>
                      <td>VALORE</td>
                      <td>VPTPLUS CODE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Operazioni;

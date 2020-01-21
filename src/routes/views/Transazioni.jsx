import React from "react";

import { Header, Footer, Overview, Azioni } from "../../shared-components";

class Transazioni extends React.Component {
  render() {
    return (
      <div>

        <div className="container-fluid overview ">
          <Azioni active="transazioni"></Azioni>

          <div className="panels-container">
            <div className="sort-annunci sort-trasazioni max-width border-0">
              <h1 className="heading-tab ">Transazioni</h1>
              <div className="datepics ml-auto mr-2">
                <div className="dal">
                  <label htmlFor="dpic1">
                    <img src="img/calendar (1).svg" alt="" />
                  </label>
                  <input type="text" id="dpic1" placeholder="DAL" />
                  <i className="fas fa-chevron-down ml-auto"></i>
                </div>
                <div className="al">
                  <input type="text" id="dpic2" placeholder="AL" />
                  <i className="fas fa-chevron-down ml-auto"></i>
                </div>
                <div className="codice"></div>
              </div>
              <ul className="m-0 p-0">
                <li>
                  <a href="javascript:void(0)">
                    <i className="fas fa-dot-circle"></i>oggi
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fas fa-dot-circle"></i>ieri
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fas fa-dot-circle"></i>questa sett.
                  </a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">
                    <i className="fas fa-dot-circle"></i>questo messe
                  </a>
                </li>
              </ul>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12">
                <table className="transTable">
                  <tbody>
                    <tr>
                      <td>DATA</td>
                      <td>DESCRIZIONE</td>
                      <td>Valore</td>
                      <td>comissione</td>
                      <td>GUADAGNO</td>
                      <td>telefono</td>
                      <td>VPTPlus Code</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
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

export default Transazioni;

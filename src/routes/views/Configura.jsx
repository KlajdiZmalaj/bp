import React from "react";

import { Azioni, Header } from "shared-components";

class Configura extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid overview ">
          <Azioni active="configura"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci max-width">
              <h1 className="heading-tab mr-auto">Carica Conto</h1>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12 configura">
                <div className="titleConf">
                  <i className="fas fa-dot-circle"></i>
                  <h5>Dati Punto Vendita</h5>
                </div>
                <div className="row no-gutters inputsConf">
                  <div className="col-md-4">
                    <label>Rag. soc.</label>
                    <input type="text" />
                    <br />
                    <label>p. iva</label>
                    <input type="text" />
                    <br />
                    <label>provincia</label>
                    <input type="text" />
                    <br />
                    <label>Telefono</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>insegna</label>
                    <input type="text" />
                    <br />
                    <label>cod. fisc.</label>
                    <input type="text" />
                    <br />
                    <label>cap</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>email</label>
                    <input type="text" />
                    <br />
                    <label>indirizzo</label>
                    <input type="text" />
                    <br />
                    <label>localita</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="titleConf">
                  <i className="fas fa-dot-circle"></i>
                  <h5>Rappresentante Legale</h5>
                </div>
                <div className="row no-gutters inputsConf">
                  <div className="col-md-4">
                    <label>nome</label>
                    <input type="text" />
                    <br />
                    <label>tipo doc.</label>
                    <input type="text" />
                    <br />
                    <label>provincia</label>
                    <input type="text" />
                    <br />
                    <label>Telefono</label>
                    <input type="text" />
                    <br />
                    <label>data</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>cognome</label>
                    <input type="text" />
                    <br />
                    <label>n. documento</label>
                    <input type="text" />
                    <br />
                    <label>cap</label>
                    <input type="text" />
                    <br />
                    <label>citta` nascita</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>Cod. fisc.</label>
                    <input type="text" />
                    <br />
                    <label>indirizzo</label>
                    <input type="text" />
                    <br />
                    <label>LOCALITA`</label>
                    <input type="text" />
                    <br />
                    <label>provincia</label>
                    <input type="text" />
                  </div>
                </div>
                {/* <div className="titleConf">
                  <i className="fas fa-dot-circle"></i>
                  <h5>cambio password</h5>
                </div>
                <div className="row no-gutters inputsConf">
                  <div className="col-md-4">
                    <label>password attuale</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>nuova password</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-4">
                    <label>conferma</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="titleConf">
                  <i className="fas fa-dot-circle"></i>
                  <h5>Stampante in Uso</h5>
                </div>
                <div className="row no-gutters inputsConf">
                  <div className="col-md-8">
                    <label>Stampante selazionata</label>
                    <input type="text" />
                  </div>
                  <div className="col-md-1"></div>
                  <div className="col-md-1">
                    <label className="containerCheck">
                      A4
                      <input type="checkbox" checked />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-md-1">
                    <label className="containerCheck">
                      80MM
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="col-md-1">
                    <label className="containerCheck">
                      58MM
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
            */}
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

export default Configura;

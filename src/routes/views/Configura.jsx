import React from "react";

import { Azioni, Header } from "shared-components";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { get } from "lodash";
import { docType } from "config";
class Configura extends React.Component {
  componentDidMount() {}
  render() {
    const { accountInfo, usersConfigura } = this.props;
    console.log("usersConfigura", usersConfigura);
    if (
      get(accountInfo, "profile.id") &&
      Object.keys(usersConfigura).length < 1
    ) {
      this.props.getConfigura(accountInfo.profile.id);
    }
    let name = "";
    docType.forEach(el => {
      if (el.id === parseInt(usersConfigura.document_type)) {
        name = el.name;
      }
    });
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
                    <input
                      type="text"
                      value={usersConfigura.a_ragione_sociale}
                      disabled
                    />
                    <br />
                    <label>p. iva</label>
                    <input
                      type="text"
                      value={usersConfigura.a_p_iva}
                      disabled
                    />
                    <br />
                    <label>provincia</label>
                    <input
                      type="text"
                      value={usersConfigura.a_comune_code}
                      disabled
                    />
                    <br />
                    <label>Telefono</label>
                    <input type="text" value={usersConfigura.phone} disabled />
                  </div>
                  <div className="col-md-4">
                    <label>insegna</label>
                    <input
                      type="text"
                      value={usersConfigura.a_insegna}
                      disabled
                    />
                    <br />
                    <label>cod. fisc.</label>
                    <input
                      type="text"
                      value={usersConfigura.personal_number}
                      disabled
                    />
                    <br />
                    <label>cap</label>
                    <input type="text" value={usersConfigura.cap} disabled />
                  </div>
                  <div className="col-md-4">
                    <label>email</label>
                    <input type="text" value={usersConfigura.email} disabled />
                    <br />
                    <label>indirizzo</label>
                    <input
                      type="text"
                      value={usersConfigura.a_address}
                      disabled
                    />
                    <br />
                    <label>localita</label>
                    <input type="text" value={usersConfigura.a_city} disabled />
                  </div>
                </div>
                <div className="titleConf">
                  <i className="fas fa-dot-circle"></i>
                  <h5>Rappresentante Legale</h5>
                </div>
                <div className="row no-gutters inputsConf">
                  <div className="col-md-4">
                    <label>nome</label>
                    <input
                      type="text"
                      value={usersConfigura.first_name}
                      disabled
                    />
                    <br />
                    <label>tipo doc.</label>
                    <input type="text" value={name} disabled />
                    <br />
                    <label>provincia</label>
                    <input
                      type="text"
                      value={usersConfigura.comune_code}
                      disabled
                    />
                    <br />
                    <label>Telefono</label>
                    <input
                      type="text"
                      value={usersConfigura.a_comune_code}
                      disabled
                    />
                    <br />
                    <label>data</label>
                    <input
                      type="text"
                      value={usersConfigura.birthday}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <label>cognome</label>
                    <input
                      type="text"
                      value={usersConfigura.last_name}
                      disabled
                    />
                    <br />
                    <label>n. documento</label>
                    <input
                      type="text"
                      value={usersConfigura.document_number}
                      disabled
                    />
                    <br />
                    <label>cap</label>
                    <input type="text" value={usersConfigura.cap} disabled />
                    <br />
                    <label>citta` nascita</label>
                    <input
                      type="text"
                      value={usersConfigura.birth_place}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Cod. fisc.</label>
                    <input
                      type="text"
                      value={usersConfigura.personal_number}
                      disabled
                    />
                    <br />
                    <label>indirizzo</label>
                    <input
                      type="text"
                      value={usersConfigura.address}
                      disabled
                    />
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

const mapsStateToProps = state => ({
  accountInfo: state.auth.accountInfo,
  usersConfigura: state.auth.usersConfigura
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Configura
);

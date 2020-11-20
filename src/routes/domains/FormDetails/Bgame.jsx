import React, { Component } from "react";
import { Select, notification, DatePicker } from "antd";
import moment from "moment";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import VirtualizedSelect from "react-virtualized-select";
import countriesArray from "config/countryArr";
const { Option } = Select;

class Eventi extends Component {
  state = {
    nome: "",
    cognome: "",
    data_nascita: "",
    sesso: "",
    nazione_nascita: "",
    comune_nascita: "",
    codice: "",
    comune_residenca: "",
    indirizzo: "",
    cap: "",
    telefono: "",
    cellullare: "",
    email: "",
    tipo_documenta: "",
    documento: "",
    rilasciato_da: "",
    data_rilascio: "",
    data_scadenza: "",
    nname: "",
    pword: "",
    domanda_segreta: "",
    risposta_segreta: "",
    provincia_nascita: "",
  };

  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        nome: "",
        cognome: "",
        data_nascita: "",
        sesso: "",
        nazione_nascita: "",
        comune_nascita: "",
        codice: "",
        comune_residenca: "",
        indirizzo: "",
        cap: "",
        telefono: "",
        cellullare: "",
        email: "",
        tipo_documenta: "",
        documento: "",
        rilasciato_da: "",
        data_rilascio: "",
        data_scadenza: "",
        nname: "",
        pword: "",
        domanda_segreta: "",
        risposta_segreta: "",
        provincia_nascita: "",
      });
      notification["success"]({
        message: "Azione completata",
        description: msg.msg,
        placement: "bottomRight",
      });
    } else {
      notification["error"]({
        message: msg.msg[0],
        description: msg.msg[1],
        placement: "bottomRight",
        duration: 5,
      });
    }
  };
  submitData = () => {
    const {
      nome,
      cognome,
      data_nascita,
      sesso,
      nazione_nascita,
      comune_nascita,
      codice,
      comune_residenca,
      indirizzo,
      cap,
      telefono,
      cellullare,
      email,
      tipo_documenta,
      documento,
      rilasciato_da,
      data_rilascio,
      data_scadenza,
      nname,
      pword,
      domanda_segreta,
      risposta_segreta,
      provincia_nascita,
    } = this.state;
    // this.props.sendDataForm(
    //
  };
  render() {
    const { nome_agenzia, color, goBack, isMobile, activeService } = this.props;
    const {
      nome,
      cognome,
      data_nascita,
      sesso,
      nazione_nascita,
      comune_nascita,
      codice,
      comune_residenca,
      indirizzo,
      cap,
      telefono,
      cellullare,
      email,
      tipo_documenta,
      documento,
      rilasciato_da,
      data_rilascio,
      data_scadenza,
      nname,
      pword,
      domanda_segreta,
      risposta_segreta,
      provincia_nascita,
    } = this.state;
    return (
      <div className="formsContainer--body animated fadeIn eventi">
        {!isMobile && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
          </div>
        )}

        <div className="rightForm">
          <div className="rightForm--header">
            {!isMobile && (
              <div className="TitleBack">
                <i class="fal fa-chevron-left Arrow" onClick={goBack}></i>
                Registra USER
              </div>
            )}

            {isMobile && (
              <div className="TitleBack">
                <i className="fal fa-receipt"></i> {activeService}{" "}
              </div>
            )}
            <img src={images[`${nome_agenzia}-logo`]} alt="" />
          </div>
          <div className="rightForm--left">
            <div className="formsContainer--body__item d-none">
              <div className="label">Nome</div>
              <input
                value={nome}
                type="text"
                onChange={(e) => {
                  this.setState({ nome: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Cognome </div>
              <input
                value={cognome}
                onChange={(e) => {
                  this.setState({ cognome: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">Data Nascita</div>
              <DatePicker
                showTime
                onChange={(e) => {
                  this.setState({
                    data_nascita: moment(e).format("DD/MM/YYYY"),
                  });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Sesso </div>

              <Select
                onChange={(value) => {
                  this.setState({ sesso: value });
                }}
                defaultValue={"M"}
              >
                <Option value="M">Maschile</Option>
                <Option value="F">Feminile</Option>
              </Select>
              {/* Comune nascita nazione nascita codice fiscale */}
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Nazione Nascita</div>
              <input
                value={nazione_nascita}
                onChange={(e) => {
                  this.setState({ link: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Provincia Nascita</div>

              <VirtualizedSelect
                options={countriesArray.map((country) => ({
                  label: country.sigla,
                  value: country.sigla,
                }))}
                onChange={(province_of_birth) =>
                  this.setState({
                    provincia_nascita: province_of_birth
                      ? province_of_birth.value
                      : null,
                  })
                }
                value={provincia_nascita}
                maxHeight={100}
                placeholder={"Select"}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Comune Nascita *</div>

              <VirtualizedSelect
                options={countriesArray.map((country) => ({
                  label: country.provincia,
                  value: country.provincia,
                }))}
                onChange={(province_of_birth) =>
                  this.setState({
                    comune_nascita: province_of_birth
                      ? province_of_birth.value
                      : null,
                  })
                }
                value={comune_nascita}
                maxHeight={100}
                placeholder={"Select"}
              />
            </div>

            <div className="formsContainer--body__item datiPass">
              <div className="label"> Indirizzo</div>
              <input
                value={indirizzo}
                type="text"
                onChange={(e) => {
                  this.setState({ indirizzo: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item datiPass">
              <div className="label"> Cap</div>
              <input
                value={cap}
                type="text"
                onChange={(e) => {
                  this.setState({ cap: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item datiPass">
              <div className="label"> Indirizzo</div>
              <input
                value={telefono}
                type="text"
                onChange={(e) => {
                  this.setState({ indirizzo: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="rightForm--right">
            <div className="formsContainer--body__item ">
              <div className="label">Cellullare </div>
              <input
                value={cellullare}
                type="text"
                onChange={(e) => {
                  this.setState({ cellullare: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Email</div>
              <input
                value={email}
                type="text"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Tipo Documento</div>
              <Select
                onChange={(value) => {
                  this.setState({ tipo_documenta: value });
                }}
                defaultValue={"0"}
              >
                <Option value="0">Carta d` identita</Option>
              </Select>
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">Data Rilascio</div>
              <DatePicker
                showTime
                onChange={(e) => {
                  this.setState({
                    data_rilascio: moment(e).format("DD/MM/YYYY"),
                  });
                }}
              />
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">Data Scadenza</div>
              <DatePicker
                showTime
                onChange={(e) => {
                  this.setState({
                    data_scadenza: moment(e).format("DD/MM/YYYY"),
                  });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Nickname</div>
              <input
                value={nname}
                type="text"
                autoComplete={false}
                onChange={(e) => {
                  this.setState({ nname: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Password</div>
              <input
                value={pword}
                autoComplete={false}
                type="password"
                onChange={(e) => {
                  this.setState({ pword: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Domanda Segreta</div>
              <input
                value={domanda_segreta}
                type="text"
                onChange={(e) => {
                  this.setState({ domanda_segreta: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Risposta Segreta</div>
              <input
                value={risposta_segreta}
                type="text"
                onChange={(e) => {
                  this.setState({ risposta_segreta: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item submit">
              <button
                style={{ backgroundColor: color }}
                onClick={this.submitData}
              >
                Invia
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...AuthActions, ...MainActions })(Eventi);

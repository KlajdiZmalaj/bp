import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox } from "antd";
import { AuthActions } from "redux-store/models";
import FormContainerBody from "./FormContainerBody";
import { InputForForm } from "./PersonaFisicaForm";
import "./VisureStyles.scss";

class AziendaOImpresaForm extends Component {
  state = {
    ragione_sociale: "",
    partita_iva: "",
    codice_fiscale: "",
    provincia_sede_legale: "",
    commune_sede_legale: "",
    inddirizzo_sede_legale: "",
    email: "",
    phone_number: "",
    via_sms: false,
  };
  render() {
    const {
      ragione_sociale,
      partita_iva,
      codice_fiscale,
      provincia_sede_legale,
      commune_sede_legale,
      inddirizzo_sede_legale,
      email,
      phone_number,
    } = this.state;
    return (
      <FormContainerBody
        headerTitle={"INDICA I DATI DELL' AZIENDA"}
        form={
          <div className="VisureFormContainer">
            <div className="FormPart">
              <InputForForm
                labelName="Ragione Sociale"
                value={ragione_sociale}
                handleChange={(e) => {
                  this.setState({ ragione_sociale: e.target.value });
                }}
                type={"text"}
              />
              <InputForForm
                labelName="Partita Iva"
                value={partita_iva}
                handleChange={(e) => {
                  this.setState({ partita_iva: e.target.value });
                }}
                type={"text"}
              />
              <InputForForm
                labelName="Codice Fiscale"
                value={codice_fiscale}
                handleChange={(e) => {
                  this.setState({ codice_fiscale: e.target.value });
                }}
                type={"text"}
              />
            </div>
            <div className="FormPart">
              <InputForForm
                labelName="Provincia sede legale"
                value={provincia_sede_legale}
                handleChange={(e) => {
                  this.setState({ provincia_sede_legale: e.target.value });
                }}
                type={"text"}
              />
              <InputForForm
                labelName="Commune sede legale"
                value={commune_sede_legale}
                handleChange={(e) => {
                  this.setState({ commune_sede_legale: e.target.value });
                }}
                type={"text"}
              />
              <InputForForm
                labelName="Indirizzo sede legale"
                value={inddirizzo_sede_legale}
                handleChange={(e) => {
                  this.setState({ inddirizzo_sede_legale: e.target.value });
                }}
                type={"text"}
              />
            </div>
            <div className="FormPart">
              <InputForForm
                labelName="Email"
                value={email}
                handleChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                type={"text"}
              />
              <InputForForm
                labelName="Phone Number"
                value={phone_number}
                handleChange={(e) => {
                  this.setState({ phone_number: e.target.value });
                }}
                type={"text"}
              />
              <div className="FormContainerInput viaSms">
                <Checkbox
                  defaultChecked={false}
                  onChange={(e) => {
                    this.setState({ via_sms: e.target.checked });
                  }}
                >
                  Avvisiami via SMS + 0.5 &euro;
                </Checkbox>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}
const mstp = (state) => {
  return {};
};
export default connect(mstp, AuthActions)(AziendaOImpresaForm);

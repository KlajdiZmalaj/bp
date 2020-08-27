import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { notification } from "antd";

import FormContainerBody from "./FormContainerBody";
import { DatePicker } from "antd";
import moment from "moment";
import "./VisureStyles.css";
export const InputForForm = ({
  readOnly,
  labelName,
  value,
  handleChange,
  type,
}) => {
  return (
    <div className="formsContainer--body__item">
      <div className="label">{labelName}</div>
      <input
        readOnly={readOnly}
        value={value || ""}
        onChange={handleChange}
        type={type}
      />
    </div>
  );
};
class PersonaFisicaForm extends Component {
  state = {
    nome: "",
    cognome: "",
    codice_fiscale: "",
    data_di_nascita: "",
    luogo_di_nascita: "",
    provincia: "",
    address: "",
    telefono: "",
    email: "",
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        nome: "",
        cognome: "",
        codice_fiscale: "",
        data_di_nascita: "",
        luogo_di_nascita: "",
        provincia: "",
        address: "",
        telefono: "",
        email: "",
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
        duration: "5",
      });
    }
  };
  render() {
    const { activeService } = this.props;
    const {
      nome,
      cognome,
      codice_fiscale,
      data_di_nascita,
      luogo_di_nascita,
      provincia,
      address,
      telefono,
      email,
    } = this.state;
    return (
      <FormContainerBody
        goBack={this.props.goBack}
        resetOfState={this.resetState}
        data={{
          ...this.state,
          servizi: activeService.name,
          price: activeService.price,
          sc: activeService.sco,
        }}
        type={1}
        headerTitle={"INDICA I DATI DELLA PERSONA"}
        leftForm={
          <div>
            <InputForForm
              labelName="Servizi"
              value={activeService.name || "Seleziona servizo"}
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />
            <InputForForm
              labelName="Nome"
              value={nome}
              handleChange={(e) => {
                this.setState({ nome: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Cognome"
              value={cognome}
              handleChange={(e) => {
                this.setState({ cognome: e.target.value });
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
            <InputForForm
              labelName="Luogo di nascita"
              value={luogo_di_nascita}
              handleChange={(e) => {
                this.setState({ luogo_di_nascita: e.target.value });
              }}
              type={"text"}
            />
            <div className="formsContainer--body__item">
              <div className="label">Data di nascita</div>
              {data_di_nascita === "" ? (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  onChange={(e) => {
                    console.log(
                      "DatePicker",
                      e,
                      moment(e).format(),
                      moment(e).format("DD/MM/YYYY")
                    );
                    this.setState({
                      data_di_nascita: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              ) : (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  onChange={(e) => {
                    console.log(
                      "DatePicker",
                      e,
                      moment(e).format(),
                      moment(e).format("DD/MM/YYYY")
                    );
                    this.setState({
                      data_di_nascita: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              )}
            </div>
          </div>
        }
        rightForm={
          <div>
            <InputForForm
              labelName="Provincia di residenza"
              value={provincia}
              handleChange={(e) => {
                this.setState({ provincia: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Indirizo di residenza "
              value={address}
              handleChange={(e) => {
                this.setState({ address: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Telefono"
              value={telefono}
              handleChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Email"
              value={email}
              handleChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Prezzo"
              value={
                activeService.price
                  ? `${activeService.price}€`
                  : "Seleziona servizo"
              }
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />
          </div>
        }
      />
    );
  }
}
const mstp = (state) => {
  return {};
};
export default connect(mstp, AuthActions)(PersonaFisicaForm);

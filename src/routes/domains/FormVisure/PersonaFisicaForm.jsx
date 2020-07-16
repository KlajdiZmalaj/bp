import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import FormContainerBody from "./FormContainerBody";
import { DatePicker } from "antd";
import moment from "moment";
import "./VisureStyles.scss";
export const InputForForm = ({ labelName, value, handleChange, type }) => {
  return (
    <div className="FormContainerInput">
      <div>{labelName}</div>
      <input
        className=" ant-input"
        value={value}
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
    provincia_di_residenza: "",
    indirizo_di_residenza: "",
    telefono: "",
    email: "",
  };
  render() {
    const {
      nome,
      cognome,
      codice_fiscale,
      data_di_nascita,
      luogo_di_nascita,
      provincia_di_residenza,
      indirizo_di_residenza,
      telefono,
      email,
    } = this.state;
    return (
      <FormContainerBody
        headerTitle={"INDICA I DATI DELLA PERSONA"}
        form={
          <div>
            <div className="VisureFormContainer">
              <div className="FormPart">
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
              </div>
              <div className="FormPart">
                <InputForForm
                  labelName="Codice Fiscale"
                  value={codice_fiscale}
                  handleChange={(e) => {
                    this.setState({ codice_fiscale: e.target.value });
                  }}
                  type={"text"}
                />
                <div className="FormContainerInput">
                  {" "}
                  <div className="label">Data di nascita</div>
                  <DatePicker
                    className="ant-input"
                    showTime
                    onChange={(e) => {
                      this.setState({ data_di_nascita: moment(e).format() });
                    }}
                  />
                </div>
                <InputForForm
                  labelName="Luogo di nascita"
                  value={luogo_di_nascita}
                  handleChange={(e) => {
                    this.setState({ luogo_di_nascita: e.target.value });
                  }}
                  type={"text"}
                />
              </div>
              <div className="FormPart">
                <InputForForm
                  labelName="Provincia di residenza"
                  value={provincia_di_residenza}
                  handleChange={(e) => {
                    this.setState({ provincia_di_residenza: e.target.value });
                  }}
                  type={"text"}
                />
                <InputForForm
                  labelName="Indirizo di residenza "
                  value={indirizo_di_residenza}
                  handleChange={(e) => {
                    this.setState({ indirizo_di_residenza: e.target.value });
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
              </div>
            </div>
            <div className="VisureFormContainer">
              <div className="FormPart">
                <InputForForm
                  labelName="Email"
                  value={email}
                  handleChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  type={"text"}
                />
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
export default connect(mstp, AuthActions)(PersonaFisicaForm);

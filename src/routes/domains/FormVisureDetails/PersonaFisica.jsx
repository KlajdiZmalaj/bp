import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { notification, DatePicker } from "antd";
import { AuthActions } from "redux-store/models";
import FormSubmiter from "./FormSubmiter";
import "./styles.css";
const InputForForm = ({ labelName, value, handleChange, type }) => {
  return (
    <div className="itemCol full">
      <div className="inputLabel">{labelName}</div>
      <input
        className="ant-input"
        value={value}
        onChange={handleChange}
        type={type}
      />
    </div>
  );
};
class PersonaFisica extends Component {
  state = {
    nome: this.props.VisureById.nome,
    cognome: this.props.VisureById.cognome,
    codice_fiscale: this.props.VisureById.codice_fiscale,
    data_di_nascita: this.props.VisureById.data_di_nascita,
    luogo_di_nascita: this.props.VisureById.luogo_di_nascita,
    provincia: this.props.VisureById.provincia,
    address: this.props.VisureById.address,
    telefono: this.props.VisureById.telefono,
    email: this.props.VisureById.email,
    price: this.props.VisureById.total_cost,
    servizi: this.props.VisureById.servizi,
  };
  callBack = (msg) => {
    if (!msg.error) {
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
  submitData = async () => {
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
      price,
      servizi,
    } = await this.state;

    await this.props.updateVisura(
      this.props.VisureById.id,
      1,
      codice_fiscale,
      provincia,
      address,
      telefono,
      email,
      price,
      "",
      "",
      "",
      nome,
      cognome,
      data_di_nascita,
      luogo_di_nascita,
      this.callBack,
      servizi
    );
  };
  render() {
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
      price,
      servizi,
    } = this.state;
    return (
      <React.Fragment>
        <div className="formBody">
          <div className="formBody--col">
            <InputForForm
              labelName="Servizi"
              value={servizi}
              handleChange={(e) => {
                this.setState({ servizi: e.target.value });
              }}
              type={"text"}
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
            <div className="itemCol full">
              <div className="inputLabel">Data di nascita</div>
              {data_di_nascita === "" ? (
                <DatePicker
                  value={null}
                  onChange={(e) => {
                    this.setState({ data_di_nascita: moment(e).format() });
                  }}
                />
              ) : (
                <DatePicker
                  value={moment(
                    data_di_nascita != "" ? data_di_nascita : new Date()
                  )}
                  onChange={(e) => {
                    this.setState({ data_di_nascita: moment(e).format() });
                  }}
                />
              )}
            </div>
          </div>
          <div className="formBody--col">
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
          </div>
        </div>

        <FormSubmiter
          price={price}
          priceChange={(e) => {
            this.setState({ price: e });
          }}
          sendOffert={this.submitData}
        />
      </React.Fragment>
    );
  }
}
// const mstp = (state) => {
//   return {};
// };
export default connect(null, AuthActions)(PersonaFisica);

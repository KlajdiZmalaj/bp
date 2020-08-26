import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "antd";
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
class AziendaOImpresaForm extends Component {
  state = {
    ragione_sociale: this.props.VisureById.ragione_sociale,
    p_iva: this.props.VisureById.p_iva,
    codice_fiscale: this.props.VisureById.codice_fiscale,
    provincia: this.props.VisureById.provincia,
    comune: this.props.VisureById.comune,
    address: this.props.VisureById.address,
    email: this.props.VisureById.email,
    telefono: this.props.VisureById.telefono,
    price: this.props.VisureById.total_cost,
    via_sms: false,
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
      codice_fiscale,
      provincia,
      address,
      telefono,
      email,
      price,

      ragione_sociale,
      p_iva,
      comune,
      servizi,
    } = await this.state;

    await this.props.updateVisura(
      this.props.VisureById.id,
      2,
      codice_fiscale,
      provincia,
      address,
      telefono,
      email,
      price,
      ragione_sociale,
      p_iva,
      comune,
      "",
      "",
      "",
      "",
      this.callBack,
      servizi
    );
  };
  render() {
    const {
      ragione_sociale,
      p_iva,
      codice_fiscale,
      provincia,
      comune,
      address,
      price,
      email,
      telefono,
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
              labelName="Ragione Sociale"
              value={ragione_sociale}
              handleChange={(e) => {
                this.setState({ ragione_sociale: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Partita Iva"
              value={p_iva}
              handleChange={(e) => {
                this.setState({ p_iva: e.target.value });
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
              labelName="Provincia sede legale"
              value={provincia}
              handleChange={(e) => {
                this.setState({ provincia: e.target.value });
              }}
              type={"text"}
            />
          </div>
          <div className="formBody--col">
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
              value={telefono}
              handleChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Commune sede legale"
              value={comune}
              handleChange={(e) => {
                this.setState({ comune: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Indirizzo sede legale"
              value={address}
              handleChange={(e) => {
                this.setState({ address: e.target.value });
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
export default connect(null, AuthActions)(AziendaOImpresaForm);

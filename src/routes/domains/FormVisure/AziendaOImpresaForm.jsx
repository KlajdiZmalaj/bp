import React, { Component } from "react";
import { connect } from "react-redux";
import { notification } from "antd";
import { AuthActions } from "redux-store/models";
import FormContainerBody from "./FormContainerBody";
import { InputForForm } from "./PersonaFisicaForm";
import "./VisureStyles.css";

class AziendaOImpresaForm extends Component {
  state = {
    ragione_sociale: "",
    p_iva: "",
    codice_fiscale: "",
    provincia: "",
    comune: "",
    address: "",
    email: "",
    telefono: "",
    via_sms: false,
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        ragione_sociale: "",
        p_iva: "",
        codice_fiscale: "",
        provincia: "",
        comune: "",
        address: "",
        email: "",
        telefono: "",
        via_sms: false,
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
  render() {
    const {
      ragione_sociale,
      p_iva,
      codice_fiscale,
      provincia,
      comune,
      address,
      email,
      telefono,
    } = this.state;
    const { activeService } = this.props;

    return (
      <FormContainerBody
        goBack={this.props.goBack}
        resetOfState={this.resetState}
        type={2}
        data={{
          ...this.state,
          servizi: activeService.name,
          price: activeService.price,
          sc: activeService.sco,
        }}
        headerTitle={"INDICA I DATI DELL' AZIENDA"}
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
        }
        rightForm={
          <div>
            <InputForForm
              goBack={this.props.goBack}
              resetOfState={this.resetState}
              data={this.state}
              labelName="Indirizzo sede legale"
              value={address}
              handleChange={(e) => {
                this.setState({ address: e.target.value });
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
            {/* <div className="formsContainer--body__item">
              <Checkbox
                defaultChecked={false}
                onChange={(e) => {
                  this.setState({ via_sms: e.target.checked });
                }}
              >
                Avvisiami via SMS + 0.5 &euro;
              </Checkbox>
            </div> */}
            <InputForForm
              info="costo"
              labelName="Costo del servizio"
              value={
                activeService.price
                  ? `da ???${activeService.price} + iva`
                  : "Seleziona servizo"
              }
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />
            <InputForForm
              info="time"
              labelName="Tempi di consegna"
              value={
                activeService.price
                  ? `${activeService.time}`
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
export default connect(mstp, AuthActions)(AziendaOImpresaForm);

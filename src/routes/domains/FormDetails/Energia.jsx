import React, { Component, Fragment } from "react";
import { notification } from "antd";
import MyInput from "./Input";
import FormSubmiter from "./FormSubmiter";
import { Radio, Select } from "antd";
const { Option } = Select;
class ShopOnline extends Component {
  state = {
    formData: {},
  };
  componentDidMount() {
    const { TicketByTcketId } = this.props;
    this.setState({
      ...TicketByTcketId,
    });
  }
  componentDidUpdate(prevProps) {
    const { TicketByTcketId } = this.props;
    if (prevProps.TicketByTcketId !== TicketByTcketId) {
      this.setState({
        ...TicketByTcketId,
      });
    }
  }

  resetState = () => {};
  submitData = () => {
    this.props.updateDataForm();
  };
  render() {
    const { editable } = this.props;
    const {
      tipologia_persona,
      tipologia_contratto,
      nome_cognome_consulento,
      codice_consulento,
      telefono,
      email,
      //tipologia_persona === 1
      nome,
      cognome,
      luogo_nascita,
      data_nascita,
      codice_fiscale,
      //tipologia_persona else
      ragione_sociale,
      p_iva,
      nome_cognome_rappresentante,
      codice_rappresentante,
      //
      residenza_comune,
      residenza_indirizzo,
      residenza_civico,
      residenza_cap,
      corrispondenza,
      //corrispondenza  === 2
      corrispondenza_comune,
      corrispondenza_indirizzo,
      corrispondenza_civico,
      corrispondenza_cap,
      //
      fornitura,
      //fornitura ===2
      fornitura_comune,
      fornitura_indirizzo,
      fornitura_civico,
      fornitura_cap,
      //
      confermo_fornitura,
      confermo_econimoche,
      confermo_informativa,
      confermo_presa_visione,
      marketing,
      dati_personali,
    } = this.state;
    return (
      <React.Fragment>
        <div className="formBody">
          <div className="formBody--col">
            <MyInput
              labelName={"Nome e Cognome Consulente "}
              type={"text"}
              editable={editable}
              value={nome_cognome_consulento}
              handleChange={(e) => {
                this.setState({ nome_cognome_consulento: e.target.value });
              }}
            />
            <MyInput
              labelName={"Codice Consulente"}
              type={"text"}
              editable={editable}
              value={codice_consulento}
              handleChange={(e) => {
                this.setState({ codice_consulento: e.target.value });
              }}
            />
            <div className="itemCol full">
              <label className="inputLabel">Tipologia:</label>
              <Select
                onChange={(e) => {
                  this.setState({
                    tipologia_persona: e,
                  });
                }}
                value={tipologia_persona}
              >
                <Option value={1}>Persona</Option>
                <Option value={2}>Business</Option>
              </Select>
            </div>
            <div className="itemCol full">
              <label className="inputLabel">Offerta Business:</label>
              <Select
                onChange={(e) => {
                  this.setState({
                    tipologia_contratto: e,
                  });
                }}
                value={tipologia_contratto}
              >
                <Option value={1}>Luce</Option>
                <Option value={2}>Gas</Option>
                <Option value={3}>Luce & Gas</Option>
              </Select>
            </div>
            {parseInt(tipologia_persona || "0") === 1 && (
              <>
                <MyInput
                  labelName={"Nome"}
                  type={"text"}
                  editable={editable}
                  value={nome}
                  handleChange={(e) => {
                    this.setState({ nome: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Cognome"}
                  type={"text"}
                  editable={editable}
                  value={cognome}
                  handleChange={(e) => {
                    this.setState({ cognome: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Luogo di nascita:"}
                  type={"text"}
                  editable={editable}
                  value={luogo_nascita}
                  handleChange={(e) => {
                    this.setState({ luogo_nascita: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Data di nascita:"}
                  type={"text"}
                  editable={editable}
                  value={data_nascita}
                  handleChange={(e) => {
                    this.setState({ data_nascita: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Codice Fiscale:"}
                  type={"text"}
                  editable={editable}
                  value={codice_fiscale}
                  handleChange={(e) => {
                    this.setState({ codice_fiscale: e.target.value });
                  }}
                />
              </>
            )}
            {parseInt(tipologia_persona || "0") === 2 && (
              <>
                <MyInput
                  labelName={"Ragione Sociale"}
                  type={"text"}
                  editable={editable}
                  value={ragione_sociale}
                  handleChange={(e) => {
                    this.setState({ ragione_sociale: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Partita IVA"}
                  type={"text"}
                  editable={editable}
                  value={p_iva}
                  handleChange={(e) => {
                    this.setState({ p_iva: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Nome e Cognome del Legale Rappresentante"}
                  type={"text"}
                  editable={editable}
                  value={nome_cognome_rappresentante}
                  handleChange={(e) => {
                    this.setState({
                      nome_cognome_rappresentante: e.target.value,
                    });
                  }}
                />
                <MyInput
                  labelName={"Codice Fiscale del Legale Rappresentante"}
                  type={"text"}
                  editable={editable}
                  value={codice_rappresentante}
                  handleChange={(e) => {
                    this.setState({ codice_rappresentante: e.target.value });
                  }}
                />
              </>
            )}

            <MyInput
              labelName={"Telefono"}
              type={"text"}
              editable={editable}
              value={telefono}
              handleChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
            />
            <MyInput
              labelName={"E-mail"}
              type={"text"}
              editable={editable}
              value={email}
              handleChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="formBody--col">
            <MyInput
              labelName={"Indirizo Residenza:"}
              type={"text"}
              editable={editable}
              value={residenza_indirizzo}
              handleChange={(e) => {
                this.setState({ residenza_indirizzo: e.target.value });
              }}
            />
            <MyInput
              labelName={"Civico:"}
              type={"text"}
              editable={editable}
              value={residenza_civico}
              handleChange={(e) => {
                this.setState({ residenza_civico: e.target.value });
              }}
            />
            <MyInput
              labelName={"Cap di residenza:"}
              type={"text"}
              editable={editable}
              value={residenza_cap}
              handleChange={(e) => {
                this.setState({ residenza_cap: e.target.value });
              }}
            />
            <MyInput
              labelName={"Comune di residenza:"}
              type={"text"}
              editable={editable}
              value={residenza_comune}
              handleChange={(e) => {
                this.setState({ residenza_comune: e.target.value });
              }}
            />
          </div>
          <div className="formBody--col">
            <MyInput
              labelName={"Comune di residenza:"}
              type={"text"}
              editable={editable}
              value={residenza_comune}
              handleChange={(e) => {
                this.setState({ residenza_comune: e.target.value });
              }}
            />
          </div>
        </div>
        <FormSubmiter
          price={0}
          priceChange={(e) => {
            this.setState({ price: e });
          }}
          sendOffert={this.submitData}
        />
      </React.Fragment>
    );
  }
}

export default ShopOnline;

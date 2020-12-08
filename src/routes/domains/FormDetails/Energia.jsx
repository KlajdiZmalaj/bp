import React, { Component } from "react";
import MyInput from "./Input";
import { Select, Popconfirm, message } from "antd";
import { connect } from "react-redux";
import {
  userConfirmation,
  // , uploadPdf
} from "services/auth";
import { AuthActions } from "redux-store/models";

const { Option } = Select;

class Energia extends Component {
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
    this.props.updateDataForm(
      8,
      "",
      "",
      "",
      "",
      "",
      async () => {
        await this.props.getTicketByTicketId(this.props.TicketByTcketId.id);
        this.props.getDataFormDetails();
      },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      this.props.TicketByTcketId.id,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      { ...this.state }
    );
  };
  render() {
    const { TicketByTcketId, accountInfo, getDataFormDetails } = this.props;
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
      fornitura,
      // //fornitura ===2
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
    const editable = false;
    // console.log("TicketByTcketId", TicketByTcketId);
    const isAdmOrSuport =
      accountInfo?.profile?.role?.name === "support" ||
      accountInfo?.profile?.role?.name === "main_admin";
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
                value={(tipologia_persona || 0).toString()}
              >
                <Option value={"1"}>Persona</Option>
                <Option value={"2"}>Business</Option>
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
                value={(tipologia_contratto || 0).toString()}
              >
                <Option value={"1"}>Luce</Option>
                <Option value={"2"}>Gas</Option>
                <Option value={"3"}>Luce / Gas</Option>
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
            <div className="itemCol full luceCheck">
              <label className="inputLabel">
                L’indirizzo per invio di corrispondenza coincide con la sede di
                residenza?
              </label>
              <Select
                onChange={(e) => {
                  this.setState({
                    corrispondenza: e,
                  });
                }}
                value={(corrispondenza || 0).toString()}
              >
                <Option value={"1"}>Si</Option>
                <Option value={"2"}>No</Option>
              </Select>
            </div>
            {parseInt(corrispondenza || "0") === 2 && (
              <>
                <MyInput
                  labelName={"Corrispondenza comune"}
                  type={"text"}
                  editable={editable}
                  value={corrispondenza_comune}
                  handleChange={(e) => {
                    this.setState({ corrispondenza_comune: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Corrispondenza indirizzo"}
                  type={"text"}
                  editable={editable}
                  value={corrispondenza_indirizzo}
                  handleChange={(e) => {
                    this.setState({ corrispondenza_indirizzo: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Corrispondenza civico"}
                  type={"text"}
                  editable={editable}
                  value={corrispondenza_civico}
                  handleChange={(e) => {
                    this.setState({ corrispondenza_civico: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Corrispondenza cap"}
                  type={"text"}
                  editable={editable}
                  value={corrispondenza_cap}
                  handleChange={(e) => {
                    this.setState({ corrispondenza_cap: e.target.value });
                  }}
                />
              </>
            )}
            <div className="itemCol full luceCheck">
              <label className="inputLabel">
                L’indirizzo di fornitura coincide con la sede di residenza?
              </label>
              <Select
                onChange={(e) => {
                  this.setState({
                    fornitura: e,
                  });
                }}
                value={(fornitura || 0).toString()}
              >
                <Option value={"1"}>Si</Option>
                <Option value={"2"}>No</Option>
              </Select>
            </div>
            {parseInt(fornitura || "0") === 2 && (
              <>
                <MyInput
                  labelName={"Fornitura comune"}
                  type={"text"}
                  editable={editable}
                  value={fornitura_comune}
                  handleChange={(e) => {
                    this.setState({ fornitura_comune: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Fornitura indirizzo"}
                  type={"text"}
                  editable={editable}
                  value={fornitura_indirizzo}
                  handleChange={(e) => {
                    this.setState({ fornitura_indirizzo: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Fornitura civico"}
                  type={"text"}
                  editable={editable}
                  value={fornitura_civico}
                  handleChange={(e) => {
                    this.setState({ fornitura_civico: e.target.value });
                  }}
                />
                <MyInput
                  labelName={"Fornitura cap"}
                  type={"text"}
                  editable={editable}
                  value={fornitura_cap}
                  handleChange={(e) => {
                    this.setState({ fornitura_cap: e.target.value });
                  }}
                />
              </>
            )}

            <div className="itemCol full luceCheck">
              <label className="inputLabel">Condizioni di fornitura</label>
              <Select
                onChange={(e) => {
                  this.setState({
                    confermo_fornitura: e,
                  });
                }}
                value={confermo_fornitura}
              >
                <Option value={"true"}>Confermo</Option>
                <Option value={"false"}>Annulla</Option>
              </Select>
            </div>
            <div className="itemCol full luceCheck">
              <label className="inputLabel">Condizioni economiche</label>
              <Select
                onChange={(e) => {
                  this.setState({
                    confermo_econimoche: e,
                  });
                }}
                value={confermo_econimoche}
              >
                <Option value={"true"}>Confermo</Option>
                <Option value={"false"}>Annulla</Option>
              </Select>
            </div>

            <div className="itemCol full luceCheck">
              <label className="inputLabel">
                Conferma presa visione informativa tutela dati personali
              </label>
              <Select
                onChange={(e) => {
                  this.setState({
                    confermo_presa_visione: e,
                  });
                }}
                value={confermo_presa_visione}
              >
                <Option value={"true"}>Confermo</Option>
                <Option value={"false"}>Annulla</Option>
              </Select>
            </div>
            <div className="itemCol full luceCheck">
              <label className="inputLabel">Nota informativa e info</label>
              <Select
                onChange={(e) => {
                  this.setState({
                    confermo_informativa: e,
                  });
                }}
                value={confermo_informativa}
              >
                <Option value={"true"}>Confermo</Option>
                <Option value={"false"}>Annulla</Option>
              </Select>
            </div>
            <div className="itemCol full luceCheck">
              <label className="inputLabel">
                Acconsento al trattamento dati per attività di marketing
              </label>
              <Select
                onChange={(e) => {
                  this.setState({
                    marketing: e,
                  });
                }}
                value={`${marketing}`}
              >
                <Option value={"true"}>Si</Option>
                <Option value={"false"}>No</Option>
              </Select>
            </div>
            <div className="itemCol full luceCheck">
              <label className="inputLabel">
                Acconsento alla comunicazione di dati personali a terzi
              </label>
              <Select
                onChange={(e) => {
                  this.setState({
                    dati_personali: e,
                  });
                }}
                value={`${dati_personali}`}
              >
                <Option value={"true"}>Si</Option>
                <Option value={"false"}>No</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="formStatus">
          <div className="formStatus--btns">
            <div
              className={`formStatus--btns__item${
                TicketByTcketId.status_num === 1 ||
                TicketByTcketId.status_num === 3 ||
                (TicketByTcketId.status_num === 4 && !TicketByTcketId.paid) ||
                (TicketByTcketId.status_num === 4 && TicketByTcketId.paid)
                  ? " active"
                  : ""
              }`}
            >
              {isAdmOrSuport ? "Nuova Richiesta" : "In Attesa"}
              <span></span>
            </div>
            <Popconfirm
              placement="top"
              title="Vuoi attivare il contratto?"
              onConfirm={() => {
                if (TicketByTcketId.status_num === 1) {
                  this.submitData();
                } else {
                  message.error("Contratto e Attivato 1 volta");
                }
              }}
              onCancel={() => {}}
              okText="Si"
              cancelText="No"
            >
              <div
                className={`formStatus--btns__item${
                  TicketByTcketId.status_num === 3 ||
                  (TicketByTcketId.status_num === 4 && !TicketByTcketId.paid) ||
                  (TicketByTcketId.status_num === 4 && TicketByTcketId.paid)
                    ? " active"
                    : ""
                }`}
              >
                Contratto Attivato <span></span>
              </div>
            </Popconfirm>
            <Popconfirm
              placement="top"
              title="Pagamento Eseguito?"
              onConfirm={() => {
                if (TicketByTcketId.status_num === 3) {
                  userConfirmation(
                    () => {},
                    TicketByTcketId.id,
                    4,
                    () => {},
                    getDataFormDetails,
                    null
                  );
                } else {
                  message.error("Pagamento Eseguito 1 volta");
                }
              }}
              onCancel={() => {}}
              okText="Si"
              cancelText="No"
            >
              <div
                className={`formStatus--btns__item${
                  (TicketByTcketId.status_num === 4 && !TicketByTcketId.paid) ||
                  (TicketByTcketId.status_num === 4 && TicketByTcketId.paid)
                    ? " active"
                    : ""
                }`}
              >
                Pagamento Eseguito <span></span>
              </div>
            </Popconfirm>

            <div
              className={`formStatus--btns__item${
                TicketByTcketId.status_num === 4 && TicketByTcketId.paid
                  ? " active"
                  : ""
              }`}
            >
              Provvigione Approvata <span></span>
            </div>
          </div>
          {isAdmOrSuport &&
            (TicketByTcketId.status_num === 1 ||
              TicketByTcketId.status_num === 3) && (
              <div
                className={"formSubmit--button -c"}
                onClick={() => {
                  userConfirmation(
                    () => {},
                    TicketByTcketId.id,
                    5,
                    () => {},
                    getDataFormDetails,
                    null
                  );
                }}
              >
                <span>ANNULLATO</span>
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default connect((state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
}, AuthActions)(Energia);

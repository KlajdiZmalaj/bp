import React, { Component } from "react";
import { notification, Radio } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import {
  Item,
  SubTitle,
  TrueFalse,
  TrueFalse2,
  Download,
  Category,
} from "./FormsComponents";
import { GenerateCF } from "shared-components";
import { Portal } from "shared-components/GenerateCF";
class Energia extends Component {
  state = {
    tipologia: 1,
    offerta: 1,
    corrispondenza: {
      title: `L’indirizzo per invio di corrispondenza
        coincide con la sede di residenza?`,
      status: true,
    },
    fornitura: {
      title: `L’indirizzo di fornitura coincide con la
        sede di residenza?`,
      status: true,
    },
    fornituraCon: {
      title: `Condizioni di fornitura*`,
      status: true,
    },
    economicCon: {
      title: `Condizioni economiche*`,
      status: true,
    },
    notaInfo: {
      title: `Nota informativa e info`,
      status: true,
    },
    personalData: {
      title: `Conferma presa visione informativa tutela dati personali`,
      status: true,
    },
    marketingCon: {
      title: `Acconsento al trattamento dati per
        attività di marketing`,
      status: true,
    },
    terziCon: {
      title: `Acconsento alla comunicazione di dati
        personali a terzi`,
      status: true,
    },
  };

  resetState = () => {};
  submitData = () => {
    const s = this.state;
    this.props.sendPrenotazione(
      {
        type: 8,
        // ========== luce / gas -> start ==========
        tipologia_persona: s.tipologia,
        tipologia_contratto: s.offerta,

        nome_cognome_consulento: "nome_cognome_consulento",
        codice_consulento: "adadadadad",

        telefono: s.tel,
        email: s.mail,
        conferma_email: s.mail,
        //tipologia_persona === 1
        nome: s.name,
        cognome: s.lastname,
        luogo_nascita: s.nascita,
        data_nascita: s.datanascita,
        codice_fiscale: s.codfisc,
        //tipologia_persona else
        ragione_sociale: s.ragsc,
        p_iva: s.piva,
        nome_cognome_rappresentante: s.name_lastname_reppresentante,
        codice_rappresentante: s.codfisc_reppresentante,
        //
        residenza_comune: s.city,
        residenza_indirizzo: s.address,
        residenza_civico: s.civico,
        residenza_cap: s.cap,
        corrispondenza: s.corrispondenza.status ? 1 : 2,
        //corrispondenza  === 2
        corrispondenza_comune: "null",
        corrispondenza_indirizzo: "null",
        corrispondenza_civico: "null",
        corrispondenza_cap: "null",
        //
        fornitura: s.fornitura.status ? 1 : 2,
        //fornitura ===2
        fornitura_comune: "null",
        fornitura_indirizzo: "null",
        fornitura_civico: "null",
        fornitura_cap: "null",
        //
        confermo_fornitura: s.fornituraCon.status.toString(),
        confermo_econimoche: s.economicCon.status.toString(),
        confermo_informativa: s.notaInfo.status.toString(),
        confermo_presa_visione: s.personalData.status.toString(),
        marketing: s.marketingCon.status,
        dati_personali: s.terziCon.status,
      },
      this.resetState
    );
  };

  render() {
    const { nome_agenzia, color, goBack, isMobile, activeService } = this.props;
    const {
      tipologia,
      // offerta,
      lastname,
      name,
      tel,
      note,
      nascita,
      mail,
      province,
      city,
      cap,
      address,
      datanascita,
      codfisc,
      corrispondenza,
      fornitura,
      fornituraCon,
      economicCon,
      notaInfo,
      personalData,
      terziCon,
      marketingCon,
      codfisc_reppresentante,
      name_lastname_reppresentante,
      ragsc,
      piva,
      civico,
    } = this.state;
    return (
      <div className="formsContainer--body animated fadeIn auto">
        {!isMobile && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
          </div>
        )}

        <div className="rightForm auto">
          <div className="rightForm--header">
            {!isMobile && (
              <div className="TitleBack" style={{ color }}>
                <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
                LUCE / GAS
              </div>
            )}

            {isMobile && (
              <div className="TitleBack">
                <i className="fal fa-receipt"></i> {activeService}{" "}
              </div>
            )}
            <img className={"energia"} src={images[`energia-logo`]} alt="" />
          </div>
          <div className="rightForm--left">
            <Item
              type="radio"
              label="Tipologia"
              value={tipologia}
              handleChange={(e) => {
                this.setState({ tipologia: e });
              }}
              JSX={() => (
                <>
                  <Radio value={1}>Persona</Radio>
                  <Radio value={2}>Business</Radio>
                </>
              )}
            />
            <SubTitle title="OFFERTA BUSINESS" color={color} />
            <div className="rightForm--categories">
              <Category
                handleChange={() => {
                  this.setState({ offerta: 1 });
                }}
                offerta={this.state.offerta}
                category={1}
                desc={"0,0765€/kWh"}
                name={"LUCE"}
                svg="bulb"
              />
              <Category
                handleChange={() => {
                  this.setState({ offerta: 2 });
                }}
                offerta={this.state.offerta}
                category={2}
                desc={"0,25€/Smc"}
                name={"GAS"}
                svg="fire"
              />
              <Category
                handleChange={() => {
                  this.setState({ offerta: 3 });
                }}
                offerta={this.state.offerta}
                category={3}
                desc={[
                  <>
                    0,0765€/kWh
                    <br />
                    0,25€/Smc
                  </>,
                ]}
                name={"LUCE+GAS"}
                svg="fire-bulb"
              />
            </div>
            <SubTitle title="DATI INTESTATARIO BOLLETTA" color={color} />
            {parseInt(tipologia) === 1 && (
              <div className="formsContainer--body__semiCont mt-2">
                <div className="formsContainer--body__item semi">
                  <div className="label">
                    Nome <span className="Red">*</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>
                <div className="formsContainer--body__item semi">
                  <div className="label">
                    Cognome <span className="Red">*</span>
                  </div>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) =>
                      this.setState({ lastname: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <Item
              label="Telefono"
              value={tel}
              Icon={() => (
                <i className="fal fa-phone inputI" aria-hidden="true"></i>
              )}
              handleChange={(e) => {
                this.setState({ tel: e });
              }}
            />
            <Item
              label="E-mail"
              value={mail}
              Icon={() => (
                <i className="fal fa-envelope inputI" aria-hidden="true"></i>
              )}
              handleChange={(e) => {
                this.setState({ mail: e });
              }}
            />
            {parseInt(tipologia) === 1 ? (
              <>
                <Item
                  label="Luogo Di Nascita"
                  value={nascita}
                  Icon={() => null}
                  handleChange={(e) => {
                    this.setState({ nascita: e });
                  }}
                />
                <Item
                  label="Data Di Nascita"
                  value={datanascita}
                  type="date"
                  Icon={() => null}
                  handleChange={(e) => {
                    this.setState({ datanascita: e });
                  }}
                />
                <Item
                  label="Codice Fiscale"
                  value={codfisc}
                  handleChange={(e) => {
                    this.setState({
                      codfisc: e,
                    });
                  }}
                  isCF
                  CFPopUp={this.state.CFPopUp}
                  openCF={(CFPopUp) => {
                    this.setState({ CFPopUp });
                  }}
                />
              </>
            ) : (
              <>
                <Item
                  label="Ragione sociale"
                  value={ragsc}
                  Icon={() => null}
                  handleChange={(e) => {
                    this.setState({ ragsc: e });
                  }}
                />
                <Item
                  label="Partita IVA"
                  value={piva}
                  Icon={() => null}
                  handleChange={(e) => {
                    this.setState({ piva: e });
                  }}
                />
                <Item
                  label="Nome e Cognome del Legale Rappresentante"
                  value={name_lastname_reppresentante}
                  Icon={() => null}
                  handleChange={(e) => {
                    this.setState({ name_lastname_reppresentante: e });
                  }}
                />
                <Item
                  label="Codice Fiscale del Legale Rappresentante"
                  value={codfisc_reppresentante}
                  handleChange={(e) => {
                    this.setState({
                      codfisc_reppresentante: e,
                    });
                  }}
                  isCF
                  CFPopUp={this.state.CFPopUp}
                  openCF={(CFPopUp) => {
                    this.setState({ CFPopUp });
                  }}
                />
              </>
            )}

            <SubTitle title="INDIRIZZO DI RESIDENZA" color={color} />
            <Item
              label="Indirizo Residenza"
              value={address}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ address: e });
              }}
            />
            <Item
              label="Cap"
              value={cap}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ cap: e });
              }}
            />
            <Item
              label="Civico"
              value={civico}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ civico: e });
              }}
            />
            <Item
              label="Citta"
              value={city}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ city: e });
              }}
            />
            <Item
              label="Provincia"
              value={province}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ province: e });
              }}
            />
          </div>

          <div className="rightForm--right">
            <SubTitle title="INDIRIZZO DI CORRISPONDENZA" color={color} />
            <TrueFalse
              item={corrispondenza}
              handleChange={(status) => {
                this.setState({
                  corrispondenza: {
                    ...corrispondenza,
                    status,
                  },
                });
              }}
            />
            <SubTitle title="INDIRIZZO DI FORNITURA" color={color} />
            <TrueFalse
              item={fornitura}
              handleChange={(status) => {
                this.setState({
                  fornitura: {
                    ...fornitura,
                    status,
                  },
                });
              }}
            />
            <SubTitle
              title="DOCUMENTI CONTRATTUALI DA SCARICARE"
              color={color}
              right={null}
              down={"Dichiaro Di Aver Preso Visione Dei Seguenti Allegati:"}
            />
            <Download title={"Condizioni di fornitura"} link={"#"} />
            <Download title={"Condizioni Tecnico Economiche"} link={"#"} />
            <Download title={"Nota informativa e info"} link={"#"} />
            <SubTitle
              title="CONFERME PRESA VISIONE"
              color={color}
              right={"CONFERMO"}
              down={"Dichiaro Di Aver Preso Visione Dei Seguenti Allegati:"}
            />
            <TrueFalse2
              item={fornituraCon}
              handleChange={(status) => {
                this.setState({
                  fornituraCon: {
                    ...fornituraCon,
                    status,
                  },
                });
              }}
            />
            <TrueFalse2
              item={economicCon}
              handleChange={(status) => {
                this.setState({
                  economicCon: {
                    ...economicCon,
                    status,
                  },
                });
              }}
            />
            <TrueFalse2
              item={notaInfo}
              handleChange={(status) => {
                this.setState({
                  notaInfo: {
                    ...notaInfo,
                    status,
                  },
                });
              }}
            />
            <SubTitle
              title="INFORMATIVA SULLA TUTELA DEI DATI PERSONALI"
              color={color}
              right={"CONFERMO"}
              down={null}
            />
            <TrueFalse2
              item={personalData}
              handleChange={(status) => {
                this.setState({
                  personalData: {
                    ...personalData,
                    status,
                  },
                });
              }}
            />
            <TrueFalse
              item={marketingCon}
              handleChange={(status) => {
                this.setState({
                  marketingCon: {
                    ...marketingCon,
                    status,
                  },
                });
              }}
            />
            <TrueFalse
              item={terziCon}
              handleChange={(status) => {
                this.setState({
                  terziCon: {
                    ...terziCon,
                    status,
                  },
                });
              }}
            />
            <Item
              label="Notes"
              value={note}
              Icon={() => null}
              type="notes"
              handleChange={(e) => {
                this.setState({ note: e });
              }}
            />
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
        {this.state.CFPopUp && (
          <Portal>
            <GenerateCF
              color1="rgb(24, 129, 155)"
              color2="#fff"
              setCF={(cf) => {
                this.setState({ codfisc: cf });
              }}
              closeBox={() => {
                this.setState({ CFPopUp: false });
              }}
            />
          </Portal>
        )}
      </div>
    );
  }
}
const mstp = (state) => ({
  tipi_documento: state.auth.SelectData?.tipi_documento,
  nazioni: state.auth.SelectData?.nazioni,
  province: state.auth.SelectData?.province,
  comuni: state.auth.SelectData?.comuni,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(Energia);

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
    tipologia: "2",
    offerta: 1,
    corrispondenza: {
      title: `L’indirizzo per invio di corrispondenza
        coincide con la sede di residenza?`,
      status: false,
    },
    fornitura: {
      title: `L’indirizzo di fornitura coincide con la
        sede di residenza?`,
      status: false,
    },
    fornituraCon: {
      title: `Condizioni di fornitura*`,
      status: false,
    },
    economicCon: {
      title: `Condizioni economiche*`,
      status: false,
    },
    notaInfo: {
      title: `Nota informativa e info`,
      status: false,
    },
    personalData: {
      title: `Conferma presa visione informativa tutela dati personali`,
      status: false,
    },
    marketingCon: {
      title: `Acconsento al trattamento dati per
        attività di marketing`,
      status: false,
    },
    terziCon: {
      title: `Acconsento alla comunicazione di dati
        personali a terzi`,
      status: false,
    },
  };

  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        tipologia: "1",
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
  submitData = () => {};

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
                  <Radio value={"2"}>Persona</Radio>
                  <Radio value={"1"}>Business</Radio>
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
                  onChange={(e) => this.setState({ lastname: e.target.value })}
                />
              </div>
            </div>
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

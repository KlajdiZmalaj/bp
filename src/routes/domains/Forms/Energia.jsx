import React, { Component } from "react";
import { Select, notification, Radio, Slider } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
const { Option } = Select;

const SubTitle = ({ title, color, right, down }) => {
  return (
    <div
      className="rightForm--subtitle"
      style={{ borderBottom: `1px solid ${color}`, color }}
    >
      <div>
        {title} {down && <span>{down}</span>}{" "}
      </div>
      <span className="right">{right}</span>
    </div>
  );
};
const Item = ({ label, value, handleChange, Icon }) => {
  return (
    <div className="formsContainer--body__item">
      <div className="label">
        {label} <span className="Red">*</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <Icon />
    </div>
  );
};
const TrueFalse = ({ item, handleChange }) => (
  <div className="formsContainer--body__checks">
    <span>{item.title}</span>
    <div className="btns">
      <div
        className={item.status ? "active" : ""}
        onClick={() => handleChange(true)}
      >
        <i
          className={`far fa-${item.status ? "dot-circle" : "circle"}`}
          aria-hidden="true"
        ></i>
        Si
      </div>
      <div
        className={!item.status ? "active" : ""}
        onClick={() => handleChange(false)}
      >
        <i
          className={`far fa-${!item.status ? "dot-circle" : "circle"}`}
          aria-hidden="true"
        ></i>
        No
      </div>
    </div>
  </div>
);
const TrueFalse2 = ({ item, handleChange }) => (
  <div
    className="formsContainer--body__checks2"
    onClick={() => handleChange(!item.status)}
  >
    <span>{item.title}</span>
    {item.status ? (
      <i className="far fa-check-square"></i>
    ) : (
      <i className="far fa-square"></i>
    )}
  </div>
);
const Download = ({ title, link }) => (
  <a href={link} download className="download-bar">
    <i className="fas fa-file-pdf" aria-hidden="true"></i>
    <span> {title}</span>
    <i className="fal fa-download" aria-hidden="true"></i>
  </a>
);
class Auto extends Component {
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
      offerta,
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
            <div className="formsContainer--body__item ">
              <div className="label">
                Tipologia <span className="Red">*</span>
              </div>
              <Radio.Group
                onChange={(e) => {
                  this.setState({
                    tipologia: e.target.value,
                  });
                }}
                value={tipologia}
              >
                <Radio value={"2"}>Persona</Radio>
                <Radio value={"1"}>Business</Radio>
              </Radio.Group>
            </div>
            <SubTitle title="OFFERTA BUSINESS" color={color} />
            <div className="rightForm--categories">
              <div
                onClick={() => this.setState({ offerta: 1 })}
                className={
                  "rightForm--categories__item" +
                  (offerta === 1 ? " active" : "")
                }
              >
                <svg className={`svgFont bulb`}>
                  <use xlinkHref={`#bulb`}></use>
                </svg>
                <span>0,0765€/kWh</span>
                <div>LUCE</div>
              </div>
              <div
                className="rightForm--categories__item"
                onClick={() => this.setState({ offerta: 2 })}
                className={
                  "rightForm--categories__item" +
                  (offerta === 2 ? " active" : "")
                }
              >
                <svg className={`svgFont fire`}>
                  <use xlinkHref={`#fire`}></use>
                </svg>
                <span>0,25€/Smc</span>
                <div>GAS</div>
              </div>
              <div
                className="rightForm--categories__item"
                onClick={() => this.setState({ offerta: 3 })}
                className={
                  "rightForm--categories__item" +
                  (offerta === 3 ? " active" : "")
                }
              >
                <svg className={`svgFont fire-bulb`}>
                  <use xlinkHref={`#fire-bulb`}></use>
                </svg>
                <span>
                  0,0765€/kWh <br /> 0,25€/Smc
                </span>
                <div>LUCE+GAS</div>
              </div>
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
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ datanascita: e });
              }}
            />
            <Item
              label="Codice Fiscale"
              value={codfisc}
              Icon={() => null}
              handleChange={(e) => {
                this.setState({ codfisc: e });
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
export default connect(mstp, { ...AuthActions, ...MainActions })(Auto);

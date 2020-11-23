import React, { Component } from "react";
import { Select, notification, Radio, Slider } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { autoConfig } from "config";
import { Item } from "./FormsComponents";
import { GenerateCF } from "shared-components";
import { Portal } from "shared-components/GenerateCF";
const { Option } = Select;
class Auto extends Component {
  state = {
    tipologia: "1",
    nome: "",
    cognome: "",
    codice_fiscale: "",
    indirizo_residenca: "",
    ragione_sociale: "",
    p_iva: "",
    email: "",
    telefono: "",
    canone_mensile: 400,
    marca: Object.keys(autoConfig)[0],
    modello: Object.values(autoConfig)[0].models[0],
    alimentazione: "1",
    cambio: "1",
    percorrenza: "",
    colore: Object.values(autoConfig)[0].colors[0],
    note: "",
    CFPopUp: false,
  };

  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        tipologia: "1",
        nome: "",
        cognome: "",
        codice_fiscale: "",
        ragione_sociale: "",
        indirizo_residenca: "",
        p_iva: "",
        email: "",
        telefono: "",
        canone_mensile: 400,
        marca: 0,
        modello: "",
        alimentazione: "1",
        cambio: "1",
        percorrenza: "",
        colore: "",
        note: "",
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
  submitData = () => {
    //
  };

  render() {
    const { nome_agenzia, color, goBack, isMobile, activeService } = this.props;
    const {
      tipologia,
      nome,
      cognome,
      codice_fiscale,
      indirizo_residenca,
      p_iva,
      email,
      telefono,
      canone_mensile,
      marca,
      modello,
      alimentazione,
      cambio,
      percorrenza,
      colore,
      ragione_sociale,
      note,
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
              <div className="TitleBack" style={{ color: color }}>
                <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
                NOLEGGIO AUTO
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
                this.setState({
                  tipologia: e,
                });
              }}
              JSX={() => (
                <>
                  <Radio value={"1"}>Business</Radio>
                  <Radio value={"2"}>Persona</Radio>
                </>
              )}
            />
            <Item
              label="Nome"
              value={nome}
              handleChange={(e) => {
                this.setState({
                  nome: e,
                });
              }}
            />
            <Item
              label="Cognome"
              value={cognome}
              handleChange={(e) => {
                this.setState({
                  cognome: e,
                });
              }}
            />

            {parseInt(tipologia) === 2 && (
              <Item
                label="Codice Fiscale"
                value={codice_fiscale}
                handleChange={(e) => {
                  this.setState({
                    codice_fiscale: e,
                  });
                }}
                isCF
                CFPopUp={this.state.CFPopUp}
                openCF={(CFPopUp) => {
                  this.setState({ CFPopUp });
                }}
              />
            )}
            <Item
              label="Indirizzo Residenza"
              value={indirizo_residenca}
              handleChange={(e) => {
                this.setState({
                  indirizo_residenca: e,
                });
              }}
            />
            <Item
              label="Ragione Sociale"
              value={ragione_sociale}
              handleChange={(e) => {
                this.setState({
                  ragione_sociale: e,
                });
              }}
            />
            <Item
              label="P.IVA"
              value={p_iva}
              handleChange={(e) => {
                this.setState({
                  p_iva: e,
                });
              }}
            />
            <Item
              label="Email"
              value={email}
              handleChange={(e) => {
                this.setState({
                  email: e,
                });
              }}
            />
            <Item
              label="Telefono"
              value={telefono}
              handleChange={(e) => {
                this.setState({
                  telefono: e,
                });
              }}
              Icon={() => <i className="fal fa-phone inputI" />}
            />
          </div>

          <div className="rightForm--right">
            <div className="Slider">
              <div className="label">
                Canone Mensile (€) <span className="Red">*</span>
              </div>
              <div className="Container">
                <Slider
                  min={0}
                  max={800}
                  defaultValue={400}
                  value={canone_mensile}
                  onChange={(value) => {
                    this.setState({ canone_mensile: value });
                  }}
                />
              </div>
            </div>
            <div className="formsContainer--body__semiCont ">
              <div className="formsContainer--body__item semi">
                <div className="label">
                  Marca <span className="Red">*</span>
                </div>
                <Select
                  onChange={(value) => {
                    this.setState({
                      marca: value,
                      modello: autoConfig[value].models[0],
                      colore: autoConfig[value].colors[0],
                    });
                  }}
                  defaultValue={autoConfig[marca].name}
                  value={autoConfig[marca].name}
                >
                  {Object.keys(autoConfig).map((carId) => {
                    return (
                      <Option value={carId} key={carId}>
                        {autoConfig[carId].name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="formsContainer--body__item semi">
                <div className="label">
                  Modello <span className="Red">*</span>
                </div>
                <Select
                  onChange={(value) => {
                    this.setState({ modello: value });
                  }}
                  defaultValue={""}
                  value={modello}
                >
                  {autoConfig[marca].models.map((model) => {
                    return (
                      <Option value={model} key={model}>
                        {model}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>

            <div className="formsContainer--body__item Ali">
              <div className="label">
                Alimentazione<span className="Red">*</span>
              </div>
              <Radio.Group
                onChange={(e) => {
                  this.setState({
                    alimentazione: e.target.value,
                  });
                }}
                value={alimentazione}
              >
                <Radio value={"1"}>Benzina</Radio>
                <Radio value={"2"}>Gpl/Metano</Radio>
                <Radio value={"3"}>Diesel</Radio>
                <Radio value={"4"}>Elettrica</Radio>
              </Radio.Group>
            </div>
            <Item
              type="radio"
              label="Cambio"
              value={cambio}
              handleChange={(e) => {
                this.setState({
                  cambio: e,
                });
              }}
              JSX={() => (
                <>
                  <Radio value={"1"}>Manuale</Radio>
                  <Radio value={"2"}>Automatico</Radio>
                </>
              )}
            />
            <Item
              label="Percorrenza (Km/Anno)"
              value={percorrenza}
              handleChange={(e) => {
                this.setState({
                  percorrenza: e,
                });
              }}
            />

            <div className="formsContainer--body__item ">
              <div className="label">
                Preferenza Colore <span className="Red">*</span>
              </div>
              <Select
                onChange={(value) => {
                  this.setState({ colore: value });
                }}
                defaultValue={""}
                value={colore}
              >
                {autoConfig[marca].colors.map((color) => {
                  return (
                    <Option value={color} key={color}>
                      {color}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Item
              label="NOTE"
              value={note}
              handleChange={(e) => {
                this.setState({
                  note: e,
                });
              }}
              type="notes"
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
              color1="rgb(34, 160, 148)"
              color2="#fff"
              setCF={(cf) => {
                this.setState({ codice_fiscale: cf });
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
export default connect(mstp, { ...AuthActions, ...MainActions })(Auto);

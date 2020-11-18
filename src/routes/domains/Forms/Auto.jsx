import React, { Component } from "react";
import { Select, notification, Radio, Slider } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
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
    marca: "Fiat",
    modello: "500XL",
    alimentazione: "1",
    cambio: "1",
    percorrenza: "",
    colore: "Colore",
    note: "",
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
        marca: "Fiat",
        modello: "500XL",
        alimentazione: "1",
        cambio: "1",
        percorrenza: "",
        colore: "Colore",
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
    // const {
    //   tipologia,
    //   nome,
    //   cognome,
    //   codice_fiscale,
    //   indirizo_residenca,
    //   p_iva,
    //   email,
    //   telefono,
    //   canone_mensile,
    //   marca,
    //   modello,
    //   alimentazione,
    //   cambio,
    //   percorrenza,
    //   ragione_sociale,
    //   colore,
    //   note,
    // } = this.state;
    // this.props.createUserBgame(
    // );
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
                <Radio value={"1"}>Business</Radio>
                <Radio value={"2"}>Persona</Radio>
              </Radio.Group>
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">
                Nome <span className="Red">*</span>
              </div>
              <input
                value={nome}
                type="text"
                placeholder="Nome"
                onChange={(e) => {
                  this.setState({ nome: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">
                Cognome <span className="Red">*</span>
              </div>
              <input
                value={cognome}
                placeholder="Cognome"
                onChange={(e) => {
                  this.setState({ cognome: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item datiPass">
              <div className="label"> Codice Fiscale</div>
              <input
                value={codice_fiscale}
                type="text"
                placeholder="Codice Fiscale"
                onChange={(e) => {
                  this.setState({ codice_fiscale: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">
                Indirizzo Residenza <span className="Red">*</span>
              </div>
              <input
                value={indirizo_residenca}
                type="text"
                placeholder="Indirizo Residenza"
                onChange={(e) => {
                  this.setState({ indirizo_residenca: e.target.value });
                }}
              />{" "}
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">Ragione Sociale</div>
              <input
                value={ragione_sociale}
                placeholder="Ragione Sociale"
                type="text"
                onChange={(e) => {
                  this.setState({ ragione_sociale: e.target.value });
                }}
              />{" "}
            </div>{" "}
            <div className="formsContainer--body__item">
              <div className="label">
                P.IVA <span className="Red">*</span>
              </div>
              <input
                value={p_iva}
                placeholder="P IVA"
                type="text"
                onChange={(e) => {
                  this.setState({ p_iva: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item semi">
              <div className="label">
                Email <span className="Red">*</span>
              </div>
              <input
                value={email}
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
              <i className="fal fa-envelope inputI" />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">
                Telefono <span className="Red">*</span>
              </div>
              <input
                value={telefono}
                placeholder="Telefono"
                type="text"
                onChange={(e) => {
                  this.setState({ telefono: e.target.value });
                }}
              />
              <i className="fal fa-phone inputI" />
            </div>
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
                    this.setState({ marca: value });
                  }}
                  defaultValue={"Fiat"}
                  value={marca}
                >
                  <Option value="Fiat">Fiat</Option>
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
                  defaultValue={"500XL"}
                  value={modello}
                >
                  <Option value="500XL">500XL</Option>
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
            <div className="formsContainer--body__item ">
              <div className="label">
                Cambio<span className="Red">*</span>
              </div>
              <Radio.Group
                onChange={(e) => {
                  this.setState({
                    cambio: e.target.value,
                  });
                }}
                value={cambio}
              >
                <Radio value={"1"}>Manuale</Radio>
                <Radio value={"2"}>Automatico</Radio>
              </Radio.Group>
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">
                Percorrenza (Km/Anno) <span className="Red">*</span>
              </div>
              <input
                value={percorrenza}
                placeholder="Percorrenza"
                type="text"
                onChange={(e) => {
                  this.setState({ percorrenza: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">
                Preferenza Colore <span className="Red">*</span>
              </div>
              <Select
                onChange={(value) => {
                  this.setState({ colore: value });
                }}
                defaultValue={"Colore"}
                value={colore}
              >
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
              </Select>
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">NOTE</div>
              <textarea
                value={note}
                type="text"
                placeholder="Note"
                onChange={(e) => {
                  this.setState({ note: e.target.value });
                }}
              />
            </div>
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

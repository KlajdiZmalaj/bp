import React, { Component } from "react";
import { Radio, notification } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";

class OnlineShop extends Component {
  state = {
    link: "",
    prezzo_prodotto: "",
    consegna_a: "Nome Agenzia",
    nome: "",
    cognome: "",
    company_name: "",
    destinazione: "",
    email: "",
    telefono: "",
    note_acquisti: "",
    cita: "",
    provincia: "",
    note: "",
    stato: "",
    indirizzo1: "",
    indirizzo2: "",
    cap: "",
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        prezzo_prodotto: "",
        consegna_a: "Nome Agenzia",
        nome: "",
        cognome: "",
        company_name: "",
        destinazione: "",
        email: "",
        telefono: "",
        note_acquisti: "",
        cita: "",
        provincia: "",
        note: "",
        stato: "",
        indirizzo1: "",
        indirizzo2: "",
        cap: "",
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
        duration: "5",
      });
    }
  };
  submitData = () => {
    // const {
    //   link,
    //   prezzo_prodotto,
    //   consegna_a,
    //   nome,
    //   cognome,
    //   company_name,
    //   destinazione,
    //   email,
    //   telefono,
    //   note_acquisti,
    //   cita,
    //   provincia,
    //   note,
    //   stato,
    //   indirizzo1,
    //   indirizzo2,
    //   cap,
    // } = this.state;
    // Send Data
  };
  render() {
    const {
      link,
      prezzo_prodotto,
      consegna_a,
      nome,
      cognome,
      company_name,
      email,
      telefono,
      note_acquisti,
      cita,
      provincia,
      note,
      stato,
      indirizzo1,
      indirizzo2,
      cap,
    } = this.state;
    const { nome_agenzia, color, goBack } = this.props;
    return (
      <div className="formsContainer--body animated fadeIn OnlineShop">
        {true && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
            <img
              src={images[`${nome_agenzia}-logo`]}
              alt=""
              className="imgLogo"
            />
          </div>
        )}

        <div className="rightFormOnlShop">
          <div className="rightForm--header">
            {true && (
              <div className="TitleBack">
                <i class="fal fa-chevron-left Arrow" onClick={goBack}></i>
                ONLINE SHOP
              </div>
            )}

            {/* {isMobile && (
              <div className="TitleBack">
                {" "}
                <i className="fal fa-receipt"></i> {activeService}{" "}
              </div>
            )}  *
            {/ *<img src={images[`${nome_agenzia}-logo`]} alt="" />  */}
          </div>

          <div className="MainForm">
            <div className="MainForm--left">
              <div className="formsContainer--body__item">
                <div className="label">Link Prodotto</div>
                <input
                  className="questionInput"
                  value={link || ""}
                  onChange={(e) => {
                    this.setState({ link: e.target.value });
                  }}
                  type="text"
                />
                <i className="fal fa-question-circle" />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">Prezzo Prodotto</div>
                <div className="EuroInput">
                  <span className="Euro">€</span>
                  <input
                    value={prezzo_prodotto || ""}
                    className="questionInput"
                    onChange={(e) => {
                      this.setState({ prezzo_prodotto: e.target.value });
                    }}
                    type="text"
                  />{" "}
                </div>

                <i className="fal fa-question-circle" />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">Consegna a:</div>
                <Radio.Group
                  onChange={(e) => {
                    this.setState({
                      consegna_a: e.target.value,
                    });
                  }}
                  value={consegna_a}
                >
                  <Radio value={"Nome Agenzia"}>Nome Agenzia</Radio>
                  <Radio value={"Indirizzo Cliente"}>Indirizzo Cliente</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="MainForm--right">
              <div className="label">Note acquisti</div>
              <textarea
                onChange={(e) => {
                  this.setState({ note_acquisti: e.target.value });
                }}
                value={note_acquisti || ""}
              />
            </div>
          </div>
          {consegna_a === "Nome Agenzia" && (
            <div className="SubForm">
              <div className="MainForm--left">
                <div className="formsContainer--body__item">
                  <div className="label">
                    Nome <span className="red">*</span>
                  </div>
                  <input
                    value={nome || ""}
                    onChange={(e) => {
                      this.setState({ nome: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Cognome <span className="red">*</span>
                  </div>
                  <input
                    value={cognome || ""}
                    onChange={(e) => {
                      this.setState({ cognome: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">Company Name </div>
                  <input
                    value={company_name || ""}
                    onChange={(e) => {
                      this.setState({ company_name: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Email <span className="red">*</span>
                  </div>
                  <input
                    value={email || ""}
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Telefono <span className="red">*</span>
                  </div>
                  <input
                    value={telefono || ""}
                    onChange={(e) => {
                      this.setState({ telefono: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Stato <span className="red">*</span>
                  </div>
                  <input
                    value={stato || ""}
                    onChange={(e) => {
                      this.setState({ stato: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Cita <span className="red">*</span>
                  </div>
                  <input
                    value={cita || ""}
                    onChange={(e) => {
                      this.setState({ cita: e.target.value });
                    }}
                    type="text"
                  />
                </div>
              </div>
              <div className="MainForm--right">
                <div className="formsContainer--body__item">
                  <div className="label">
                    Indirizzo 1 <span className="red">*</span>
                  </div>
                  <input
                    value={indirizzo1 || ""}
                    onChange={(e) => {
                      this.setState({ indirizzo1: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">Indirizzo 2 </div>
                  <input
                    value={indirizzo2 || ""}
                    onChange={(e) => {
                      this.setState({ indirizzo2: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    CAP <span className="red">*</span>
                  </div>
                  <input
                    value={cap || ""}
                    onChange={(e) => {
                      this.setState({ cap: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">
                    Provincia <span className="red">*</span>
                  </div>
                  <input
                    value={provincia || ""}
                    onChange={(e) => {
                      this.setState({ provincia: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div className="formsContainer--body__item">
                  <div className="label">Note </div>
                  <input
                    value={note || ""}
                    onChange={(e) => {
                      this.setState({ note: e.target.value });
                    }}
                    type="text"
                  />
                </div>
                <div class="formsContainer--body__item submit">
                  <button style={{ backgroundColor: color }}>Invia</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...AuthActions, ...MainActions })(OnlineShop);

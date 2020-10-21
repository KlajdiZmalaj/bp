import React, { Component } from "react";
import { Radio, notification } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";

class OnlineShop extends Component {
  state = {
    link: "",
    price: "",
    consegna: 2,
    nome: "",
    cognome: "",
    email: "",
    phone: "",
    extra_data: "",
    citta: "",
    provincia: "",
    note_address: "",
    stato: "",
    address1: "",
    address2: "",
    cap: "",
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        price: "",
        consegna: 2,
        nome: "",
        cognome: "",
        email: "",
        phone: "",
        extra_data: "",
        citta: "",
        provincia: "",
        note_address: "",
        stato: "",
        address1: "",
        address2: "",
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
        duration: 5,
      });
    }
  };
  submitData = () => {
    const {
      link,
      price,
      consegna,
      nome,
      cognome,
      email,
      phone,
      extra_data,
      citta,
      provincia,
      note_address,
      stato,
      address1,
      address2,
      cap,
      company_name,
    } = this.state;
    this.props.buyTicketOnline(
      4,
      link,
      "shop-online",
      extra_data,
      price,
      consegna,
      nome,
      cognome,
      email,
      phone,
      stato,
      citta,
      address1,
      address2,
      provincia,
      cap,
      note_address,
      company_name,
      this.resetState
    );
  };
  render() {
    const {
      link,
      price,
      consegna,
      nome,
      cognome,
      company_name,
      email,
      phone,
      extra_data,
      citta,
      provincia,
      note_address,
      stato,
      address1,
      address2,
      cap,
    } = this.state;
    const { nome_agenzia, color, goBack, isMobile } = this.props;
    return (
      <div
        className={`formsContainer--body animated fadeIn OnlineShop${
          isMobile ? "M" : ""
        }`}
      >
        {!isMobile && (
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
            {!isMobile && (
              <div className="TitleBack">
                <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
                ONLINE SHOP
              </div>
            )}
            {isMobile && (
              <div className="TitleBack">
                {" "}
                <i className="fal fa-shopping-bag"></i> {nome_agenzia}{" "}
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
          {isMobile && <div className="AfterTitleBack">Online Shop</div>}

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
                  placeholder="Link"
                  type="text"
                />
                <i className="fal fa-question-circle" />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">Prezzo Prodotto</div>
                <div className="EuroInput">
                  <span className="Euro">€</span>
                  <input
                    value={price || ""}
                    className="questionInput"
                    onChange={(e) => {
                      this.setState({ price: e.target.value });
                    }}
                    placeholder="Prezzo Prodotto"
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
                      consegna: e.target.value,
                    });
                  }}
                  value={consegna}
                >
                  <Radio value={1}>Nome Agenzia</Radio>
                  <Radio value={2}>Indirizzo Cliente</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className="MainForm--right">
              <div className="label">Note Acquisti</div>
              <textarea
                onChange={(e) => {
                  this.setState({ extra_data: e.target.value });
                }}
                placeholder="Note (opzionali)"
                value={extra_data || ""}
              />
              {consegna === 1 && (
                <div className="formsContainer--body__item submit">
                  <button
                    style={{ backgroundColor: color }}
                    onClick={this.submitData}
                  >
                    Invia
                  </button>
                </div>
              )}
            </div>
          </div>
          {consegna === 2 && (
            <div className="SubForm">
              <div className="Top">
                <div>Consegna a:</div>
              </div>
              <div className="Bottom">
                <div className="MainForm--left L">
                  <div
                    className={`formsContainer--body__item ${
                      isMobile ? "M" : ""
                    }`}
                  >
                    <div className="label">
                      Nome <span className="red">*</span>
                    </div>
                    <input
                      value={nome || ""}
                      onChange={(e) => {
                        this.setState({ nome: e.target.value });
                      }}
                      placeholder="Nome"
                      type="text"
                    />
                  </div>
                  <div
                    className={`formsContainer--body__item ${
                      isMobile ? "M" : ""
                    }`}
                  >
                    <div className="label">
                      Cognome <span className="red">*</span>
                    </div>
                    <input
                      value={cognome || ""}
                      onChange={(e) => {
                        this.setState({ cognome: e.target.value });
                      }}
                      placeholder="Cognome"
                      type="text"
                    />
                  </div>
                  <div className="formsContainer--body__item">
                    <div className="label">Nome agenzia</div>
                    <input
                      value={company_name || ""}
                      onChange={(e) => {
                        this.setState({ company_name: e.target.value });
                      }}
                      placeholder="Nome agenzia"
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
                      placeholder="Email"
                      type="text"
                    />
                  </div>
                  <div className="formsContainer--body__item">
                    <div className="label">
                      Telefono <span className="red">*</span>
                    </div>
                    <input
                      value={phone || ""}
                      onChange={(e) => {
                        this.setState({ phone: e.target.value });
                      }}
                      placeholder="Telefono"
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
                      placeholder="Italia"
                      type="text"
                    />
                  </div>
                  <div className="formsContainer--body__item">
                    <div className="label">
                      citta <span className="red">*</span>
                    </div>
                    <input
                      value={citta || ""}
                      onChange={(e) => {
                        this.setState({ citta: e.target.value });
                      }}
                      placeholder="Citta"
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
                      value={address1 || ""}
                      onChange={(e) => {
                        this.setState({ address1: e.target.value });
                      }}
                      placeholder=" Indirizzo 1"
                      type="text"
                    />
                  </div>
                  <div className="formsContainer--body__item">
                    <div className="label">Indirizzo 2 </div>
                    <input
                      value={address2 || ""}
                      onChange={(e) => {
                        this.setState({ address2: e.target.value });
                      }}
                      placeholder=" Indirizzo 2"
                      type="text"
                    />
                  </div>
                  <div
                    className={`formsContainer--body__item ${
                      isMobile ? "M" : ""
                    }`}
                  >
                    <div className="label">
                      CAP <span className="red">*</span>
                    </div>
                    <input
                      value={cap || ""}
                      onChange={(e) => {
                        this.setState({ cap: e.target.value });
                      }}
                      placeholder="Cap"
                      type="text"
                    />
                  </div>
                  <div
                    className={`formsContainer--body__item ${
                      isMobile ? "M" : ""
                    }`}
                  >
                    <div className="label">
                      Provincia <span className="red">*</span>
                    </div>
                    <input
                      value={provincia || ""}
                      onChange={(e) => {
                        this.setState({ provincia: e.target.value });
                      }}
                      placeholder=" Provincia"
                      type="text"
                    />
                  </div>
                  <div className="formsContainer--body__item">
                    <div className="label">note address </div>
                    <textarea
                      value={note_address || ""}
                      onChange={(e) => {
                        this.setState({ note_address: e.target.value });
                      }}
                      placeholder="Note (opzionali)"
                      type="text"
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

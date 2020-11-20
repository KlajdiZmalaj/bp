import React, { Component } from "react";
import { Radio, notification } from "antd";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Item } from "./FormsComponents";
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
              <div className="TitleBack" style={{ color: color }}>
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
              <Item
                label="Link Prodotto"
                value={link}
                // type="radio"
                handleChange={(e) => {
                  this.setState({ link: e });
                }}
                Icon={() => <i className="fal fa-question-circle" />}
              />

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
              <Item
                label="Consegna a:"
                type="radio"
                value={consegna}
                // type="radio"
                handleChange={(e) => {
                  this.setState({ consegna: e });
                }}
                JSX={() => (
                  <>
                    <Radio value={1}>Nome Agenzia</Radio>
                    <Radio value={2}>Indirizzo Cliente</Radio>
                  </>
                )}
                Icon={() => <i className="fal fa-question-circle" />}
              />
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
                  <Item
                    label="Nome agenzia"
                    value={company_name}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ company_name: e });
                    }}
                  />
                  <Item
                    label="Email"
                    value={email}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ email: e });
                    }}
                  />
                  <Item
                    label="Telefono"
                    value={phone}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ phone: e });
                    }}
                  />
                  <Item
                    label="Stato"
                    value={stato}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ stato: e });
                    }}
                  />
                  <Item
                    label="Citta"
                    value={citta}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ citta: e });
                    }}
                  />
                </div>
                <div className="MainForm--right">
                  <Item
                    label="Indirizzo 1"
                    value={address1}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ address1: e });
                    }}
                  />
                  <Item
                    label="Indirizzo 2 "
                    value={address2}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ address2: e });
                    }}
                  />

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
                  <Item
                    label="Note address"
                    type="note"
                    value={note_address}
                    // type="radio"
                    handleChange={(e) => {
                      this.setState({ note_address: e });
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

import React, { Component } from "react";
import { notification } from "antd";
import images from "themes/images";
class Voli extends Component {
  state = { bagaglio: 1 };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        nome_agenzia: "",
        extra_data: "",
        bagaglio: 1,
        bagaglio_stiva: "",
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
    const { link, extra_data, bagaglio, bagaglio_stiva } = this.state;
    this.props.sendDataForm(
      this.props.typee,
      link,
      this.props.nome_agenzia,
      extra_data,
      bagaglio,
      bagaglio_stiva,
      this.resetState
    );
  };
  render() {
    const { nome_agenzia, color, accountInfo } = this.props;
    return (
      <div className="formsContainer--body animated fadeIn">
        <div className="leftForm">
          <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
          <img
            src={images[`${nome_agenzia}-logo`]}
            alt=""
            className="imgLogo"
          />
          <div className="overlayImg" style={{ backgroundColor: color }}></div>
        </div>
        <div className="rightForm">
          <div className="rightForm--header">
            Prenotazione Biglietti{" "}
            <img src={images[`${nome_agenzia}-logo`]} alt="" />
          </div>
          <div className="rightForm--left">
            <div className="formsContainer--body__item datiPass">
              <div className="label">Dati Passegeri</div>
              <textarea
                value={this.state.extra_data || ""}
                onChange={(e) => {
                  this.setState({ extra_data: e.target.value });
                }}
                name="passageri"
                rows="4"
                cols="50"
                placeholder="Nome, Cognome, Data di nascita, Telefono, E-mail"
              ></textarea>
            </div>
          </div>
          <div className="rightForm--right">
            <div className="formsContainer--body__item">
              <div className="label">Nome Agenzia</div>
              <input
                value={accountInfo?.profile?.name || ""}
                type="text"
                disabled
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Link</div>
              <input
                style={{
                  color: "#096ecc",
                  textDecoration: "underline",
                }}
                value={this.state.link || ""}
                onChange={(e) => {
                  this.setState({ link: e.target.value });
                }}
                type="text"
              />
            </div>

            <div className="formsContainer--body__item">
              <div className="label">Massimo Bagaglio A Mano (8Kg)</div>
              <div className="radioWrapper">
                <div className="radioGr">
                  <span>A mano</span>
                  <input
                    checked={this.state.bagaglio == 1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ bagaglio: e.target.value });
                      }
                    }}
                    type="radio"
                    name="bagaglio"
                    value="1"
                    id="bagaglio1"
                  />
                  <label htmlFor="bagaglio1" className="customRadio">
                    <span></span>
                  </label>
                </div>
                <div className="radioGr">
                  <span>In stiva</span>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ bagaglio: e.target.value });
                      }
                    }}
                    type="radio"
                    name="bagaglio"
                    value="2"
                    id="bagaglio2"
                    checked={this.state.bagaglio == 2}
                  />
                  <label htmlFor="bagaglio2" className="customRadio">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
            <div
              className={
                "formsContainer--body__item" +
                (this.state.bagaglio == 2 ? "" : " invisible")
              }
            >
              <div className="label">Bagaglio in stiva</div>
              <input
                value={this.state.bagaglio_stiva || ""}
                onChange={(e) => {
                  this.setState({ bagaglio_stiva: e.target.value });
                }}
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
    );
  }
}

export default Voli;

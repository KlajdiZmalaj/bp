import React, { Component } from "react";
import { notification } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import images from "themes/images";

class Treni extends Component {
  state = {};
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        nome_agenzia: "",
        extra_data: "",
        partenza: "",
        partenza_stazione: "",
        andata_time: "",
        destinazione: "",
        destinazione_stazione: "",
        tipologia_biglietto: "",
        compagnie: "",
        adulti: "",
        ragazzi: "",
        ritorno_date: "",
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
    const {
      link,
      extra_data,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      tipologia_biglietto,
      compagnie,
      adulti,
      ragazzi,
      ritorno_date,
    } = this.state;
    this.props.sendDataForm(
      this.props.typee,
      link,
      this.props.accountInfo?.profile?.name,
      extra_data,
      null,
      null,
      this.resetState,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      compagnie,
      adulti,
      ragazzi,
      tipologia_biglietto,
      ritorno_date,
      "",
      "",
      "",
      "",
      "",
      ""
    );
  };

  render() {
    const { nome_agenzia, color } = this.props;

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
            <div className="formsContainer--body__item">
              <div className="label">Nome Agenzia</div>
              <input
                value={this.props.accountInfo?.profile?.name}
                type="text"
                disabled
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Partenza</div>
              <input
                value={this.state.partenza}
                type="text"
                onChange={(e) => {
                  this.setState({ partenza: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Stazione</div>
              <input
                value={this.state.partenza_stazione}
                type="text"
                onChange={(e) => {
                  this.setState({ partenza_stazione: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Andata</div>
              <DatePicker
                showTime
                onChange={(e) => {
                  //   console.log("ca ka picker", moment(e).format());
                  this.setState({ andata_time: moment(e).format() });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Tipologia Biglietto</div>
              <div className="radioWrapper">
                <div className="radioGr">
                  <span>Andata e ritorna </span>
                  <input
                    checked={this.state.tipologia_biglietto == 1}
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ tipologia_biglietto: e.target.value });
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
                  <span>Solo Andata</span>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ tipologia_biglietto: e.target.value });
                      }
                    }}
                    type="radio"
                    name="bagaglio"
                    value="2"
                    id="bagaglio2"
                    checked={this.state.tipologia_biglietto == 2}
                  />
                  <label htmlFor="bagaglio2" className="customRadio">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="formsContainer--body__item datiPass">
              <div className="label">
                Nome passeggeri e dettagli per il biglietto
              </div>
              <textarea
                value={this.state.extra_data}
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
              <div className="label">Link</div>
              <input
                value={this.state.link}
                onChange={(e) => {
                  this.setState({ link: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Destinazione</div>
              <input
                value={this.state.destinazione}
                type="text"
                onChange={(e) => {
                  this.setState({ destinazione: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Destinazione Stazione</div>
              <input
                value={this.state.destinazione_stazione}
                type="text"
                onChange={(e) => {
                  this.setState({ destinazione_stazione: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Ritorno</div>
              <DatePicker
                showTime
                onChange={(e) => {
                  this.setState({ ritorno_date: moment(e).format() });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Compagnie</div>
              <div className="radioWrapper">
                <div className="radioGr">
                  <span>Trenitalia </span>
                  <input
                    checked={this.state.compagnie == "trenitalia"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ compagnie: "trenitalia" });
                      }
                    }}
                    type="radio"
                    name="c"
                    value="1"
                    id="c1"
                  />
                  <label htmlFor="c1" className="customRadio">
                    <span></span>
                  </label>
                </div>
                <div className="radioGr">
                  <span>Italo</span>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        this.setState({ compagnie: "Italo" });
                      }
                    }}
                    type="radio"
                    name="c"
                    value="2"
                    id="c2"
                    checked={this.state.compagnie == "Italo"}
                  />
                  <label htmlFor="c2" className="customRadio">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Adulti</div>
              <input
                value={this.state.adulti}
                type="text"
                onChange={(e) => {
                  this.setState({ adulti: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Ragazzi</div>
              <input
                value={this.state.ragazzi}
                type="text"
                onChange={(e) => {
                  this.setState({ ragazzi: e.target.value });
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

export default Treni;

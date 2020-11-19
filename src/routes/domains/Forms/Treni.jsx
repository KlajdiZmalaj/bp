import React, { Component } from "react";
import { notification } from "antd";
import moment from "moment";
import images from "themes/images";
import DatePicker from "shared-components/DatePicker/DatePicker";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import TreniUserFrom from "./VoliUserFrom";
// const Trenitalia = require("api-trenitalia");

class Treni extends Component {
  state = {
    adults: 1,
    childrens: 0,
    hasDD: false,
    travalers: {},
    tipologia_biglietto: "1",
    prezzo: null,
  };
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
        prezzo: null,
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
  setTravalers = (travalers, travaler) => {
    this.setState((prevState) => {
      return {
        travalers: prevState.travalers
          ? {
              ...prevState.travalers,
              ...travalers,
              [`${travaler}`]: {
                ...prevState.travalers[travaler],
                ...travalers[travaler],
              },
            }
          : {
              ...travalers,
              [`${travaler}`]: {
                ...travalers[travaler],
              },
            },
      };
    });
  };
  submitData = () => {
    const {
      link,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      tipologia_biglietto,
      compagnie,

      ritorno_date,
      travalers,
      adults,
      childrens,
    } = this.state;
    this.props.sendDataForm(
      this.state.prezzo,
      this.props.typee,
      link,
      this.props.nome_agenzia,
      JSON.stringify(travalers),
      null,
      null,
      this.resetState,
      partenza,
      partenza_stazione,
      andata_time,
      destinazione,
      destinazione_stazione,
      compagnie,
      adults,
      childrens,
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
  componentDidUpdate() {
    if (
      this.props.nome_agenzia === "flixbus" &&
      this.state.compagnie !== "flixbus"
    ) {
      this.setState({ compagnie: "flixbus" });
    }
  }
  render() {
    const { nome_agenzia, color, goBack, isMobile, activeService } = this.props;
    const { adults, childrens, hasDD } = this.state;

    return (
      <div className="formsContainer--body animated fadeIn treni">
        {!isMobile && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
            <img
              src={images[`${nome_agenzia}-logo`]}
              alt=""
              className="imgLogo"
            />
            <div
              className="overlayImg"
              style={{ backgroundColor: color }}
            ></div>
          </div>
        )}

        <div className="rightForm">
          <div
            className="rightForm--header"
            // onClick={async () => {
            //   console.log("clicked");
            //   const t = new Trenitalia();
            //   const stations_from = await t.autocomplete("milano");
            //   const station_from = stations_from[0].name;
            //   const stations_to = await t.autocomplete("bari");
            //   const station_to = stations_to[0].name;

            //   const date = moment().add(3, "months").format("DD/MM/YYYY");
            //   const solutions = await t.getOneWaySolutions(
            //     station_from,
            //     station_to,
            //     date,
            //     "13",
            //     2,
            //     0
            //   );
            //   console.log("solutions", solutions);
            // }}
          >
            {!isMobile && (
              <div
                className="TitleBack"
                style={{ color: color }}
                onClick={goBack}
              >
                <i className="fal fa-chevron-left Arrow"></i>
                Prenotazione Biglietti{" "}
              </div>
            )}
            {isMobile && (
              <div className="TitleBack">
                {" "}
                <i className="fa fa-train" aria-hidden="true"></i>{" "}
                {activeService}{" "}
              </div>
            )}

            <img
              className={nome_agenzia}
              src={images[`${nome_agenzia}-logo`]}
              alt=""
            />
          </div>
          <div className="rightForm--left">
            <div className="formsContainer--body__item">
              <div className="label">Travalers</div>
              <div
                className="travalersSelector"
                onClick={() => this.setState({ hasDD: !hasDD })}
              >
                <span>{adults}</span> Adulti, <span>{childrens}</span>Bambini
              </div>
              {(hasDD || isMobile) && (
                <div className="travalersSelectorDD">
                  <div className="travalersSelectorDD--item">
                    <span>Adulti</span>
                    <div>
                      <i
                        onClick={() =>
                          this.setState({ adults: adults < 1 ? 0 : adults - 1 })
                        }
                        className="fal fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                      {adults}
                      <i
                        onClick={() =>
                          this.setState({
                            adults: adults >= 6 ? 6 : adults + 1,
                          })
                        }
                        className="fal fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>

                  <div className="travalersSelectorDD--item">
                    <span>Bambini</span>
                    <div>
                      <i
                        onClick={() =>
                          this.setState({
                            childrens: childrens < 1 ? 0 : childrens - 1,
                          })
                        }
                        className="fal fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                      {childrens}
                      <i
                        onClick={() =>
                          this.setState({
                            childrens: childrens >= 6 ? 6 : childrens + 1,
                          })
                        }
                        className="fal fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {new Array(adults)
              .join(".")
              .split(".")
              .map((a, b) => {
                return (
                  adults > 0 && (
                    <TreniUserFrom
                      handleChangeName={this.setTravalers}
                      handleChangeCognome={this.setTravalers}
                      handleChangeDate={this.setTravalers}
                      handleChangeTel={this.setTravalers}
                      handleChangeEmail={this.setTravalers}
                      ind={b}
                      isAdult={true}
                      key={b}
                    />
                  )
                );
              })}
            {new Array(childrens)
              .join(".")
              .split(".")
              .map((a, b) => {
                return (
                  childrens > 0 && (
                    <TreniUserFrom
                      handleChangeName={this.setTravalers}
                      handleChangeCognome={this.setTravalers}
                      handleChangeDate={this.setTravalers}
                      handleChangeTel={this.setTravalers}
                      handleChangeEmail={this.setTravalers}
                      ind={b}
                      isChild={true}
                      key={b}
                    />
                  )
                );
              })}

            <div className="formsContainer--body__item d-none">
              <div className="label">Nome Agenzia</div>
              <input
                value={this.props.accountInfo?.profile?.name || ""}
                type="text"
                disabled
              />
            </div>
            <div className="addPadding">
              {this.state.tipologia_biglietto === "2" ? (
                <div className="formsContainer--body__item semi">
                  <div className="label">Andata</div>
                  <DatePicker
                    showTime
                    onChange={(e) => {
                      this.setState({ andata_time: moment(e).format() });
                    }}
                  />
                </div>
              ) : (
                <React.Fragment>
                  <div className="formsContainer--body__item semi">
                    <div className="label">Andata</div>
                    <DatePicker
                      showTime
                      onChange={(e) => {
                        this.setState({ andata_time: moment(e).format() });
                      }}
                    />
                  </div>
                  <div className="formsContainer--body__item semi">
                    <div className="label">Ritorno</div>
                    <DatePicker
                      showTime
                      onChange={(e) => {
                        this.setState({ ritorno_date: moment(e).format() });
                      }}
                    />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="rightForm--right">
            <div className="formsContainer--body__item">
              <div className="label">Link</div>
              <input
                value={this.state.link || ""}
                onChange={(e) => {
                  this.setState({ link: e.target.value });
                }}
                type="text"
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Prezzo</div>
              <input
                value={this.state.prezzo || ""}
                onChange={(e) => {
                  this.setState({ prezzo: e.target.value });
                }}
                type="text"
              />
            </div>

            <div className="formsContainer--body__item">
              <div className="label">Stazione</div>
              <input
                value={this.state.partenza_stazione || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ partenza_stazione: e.target.value });
                }}
              />
            </div>

            <div className="formsContainer--body__item">
              <div className="label">Destinazione Stazione</div>
              <input
                value={this.state.destinazione_stazione || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ destinazione_stazione: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">Destinazione</div>
              <input
                value={this.state.destinazione || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ destinazione: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item ">
              <div className="label">Partenza</div>
              <input
                value={this.state.partenza || ""}
                type="text"
                onChange={(e) => {
                  this.setState({ partenza: e.target.value });
                }}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Tipologia Biglietto</div>
              <div className="radioWrapper">
                <div className="radioGr">
                  <span>Andata e ritorno </span>
                  <input
                    checked={this.state.tipologia_biglietto === "1"}
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
                    checked={this.state.tipologia_biglietto === "2"}
                  />
                  <label htmlFor="bagaglio2" className="customRadio">
                    <span></span>
                  </label>
                </div>
              </div>
            </div>

            {nome_agenzia === "flixbus" ? null : (
              <div className="formsContainer--body__item">
                <div className="label">Compagnie</div>
                <div className="radioWrapper">
                  <div className="radioGr">
                    <span>TrenItalia </span>
                    <input
                      checked={this.state.compagnie === "trenitalia"}
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
                    <span>Italio</span>
                    <input
                      onChange={(e) => {
                        if (e.target.checked) {
                          this.setState({ compagnie: "italio" });
                        }
                      }}
                      type="radio"
                      name="c"
                      value="2"
                      id="c2"
                      checked={this.state.compagnie === "italio"}
                    />
                    <label htmlFor="c2" className="customRadio">
                      <span></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

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
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...AuthActions, ...MainActions })(Treni);

import React, { Component } from "react";
import { notification } from "antd";
import images from "themes/images";
import VoliUserFrom from "./VoliUserFrom";
import Swiper from "react-id-swiper";
class Voli extends Component {
  state = {
    bagaglio: 1,
    adults: 0,
    childrens: 0,
    hasDD: false,
    travalers: {},
  };
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
    const { nome_agenzia, color, accountInfo, goBack } = this.props;
    const { adults, childrens, hasDD, travalers } = this.state;
    const params = {
      spaceBetween: 0,
      loop: false,
      slidesPerView: 1,
      freeMode: false,
      pagination: {
        el: ".swiper-pagination",
      },
    };
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
            <div className="TitleBack">
              <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
              Prenotazione Biglietti{" "}
            </div>{" "}
            <img src={images[`${nome_agenzia}-logo`]} alt="" />
          </div>
          <div className="rightForm--left">
            <div className="formsContainer--body__item">
              <div className="label">Travalers</div>
              <div
                className="travalersSelector"
                onClick={() => this.setState({ hasDD: !hasDD })}
              >
                <span>{adults}</span> Adults, <span>{childrens}</span>Childrens
              </div>
              {hasDD && (
                <div className="travalersSelectorDD">
                  <div className="travalersSelectorDD--item">
                    <span>Adults</span>
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
                    <span>Childrens</span>
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
                    <VoliUserFrom
                      handleChangeName={(travalers, travaler) => {
                        if (this.state.travalers[`${travaler}`]) {
                          this.setState({
                            travalers: {
                              ...this.state.travalers[`${travaler}`],
                              ...travalers,
                            },
                          });
                        } else {
                          this.setState({
                            travalers: {
                              ...this.state.travalers,
                              ...travalers,
                            },
                          });
                        }
                      }}
                      handleChangeCognome={(travalers, travaler) => {
                        if (this.state.travalers[`${travaler}`]) {
                          this.setState({
                            travalers: {
                              ...this.state.travalers[`${travaler}`],
                              ...travalers,
                            },
                          });
                        } else {
                          this.setState({
                            travalers: {
                              ...this.state.travalers,
                              ...travalers,
                            },
                          });
                        }
                      }}
                      handleChangeDate={(travalers) => {
                        this.setState({
                          travalers: { ...this.state.travalers, ...travalers },
                        });
                      }}
                      handleChangeTel={(travalers) => {
                        this.setState({
                          travalers: { ...this.state.travalers, ...travalers },
                        });
                      }}
                      handleChangeEmail={(travalers) => {
                        this.setState({
                          travalers: { ...this.state.travalers, ...travalers },
                        });
                      }}
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
                    <VoliUserFrom ind={b} isChild={true} key={b} />
                  )
                );
              })}
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

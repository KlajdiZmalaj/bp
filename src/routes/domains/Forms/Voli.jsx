import React, { Component } from "react";
import { notification } from "antd";
import images from "themes/images";
import VoliUserFrom from "./VoliUserFrom";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
class Voli extends Component {
  state = {
    bagaglio: "1",
    adults: 1,
    childrens: 0,
    hasDD: false,
    travalers: {},
    Prezzo: null,
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        link: "",
        nome_agenzia: "",
        extra_data: "",
        bagaglio: 1,
        bagaglio_stiva: "",
        Prezzo: null,
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
    const { link, bagaglio, bagaglio_stiva } = this.state;
    this.props.sendDataForm(
      this.state.prezzo,
      this.props.typee,
      link,
      this.props.nome_agenzia,
      JSON.stringify(this.state.travalers),
      bagaglio,
      bagaglio_stiva,
      this.resetState
    );
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
  render() {
    const {
      nome_agenzia,
      color,
      accountInfo,
      goBack,
      isMobile,
      activeService,
    } = this.props;
    const { adults, childrens, hasDD } = this.state;
    // const params = {
    //   spaceBetween: 0,
    //   loop: false,
    //   slidesPerView: 1,
    //   freeMode: false,
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    // };
    //console.log("voliiiii");
    return (
      <div className="formsContainer--body animated fadeIn voli">
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
          <div className="rightForm--header">
            {!isMobile && (
              <div className="TitleBack" style={{ color: color }}>
                <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
                Prenotazione Biglietti{" "}
              </div>
            )}
            {isMobile && activeService && (
              <div className="TitleBack">
                <i className="fa fa-plane" aria-hidden="true"></i>
                {activeService}
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
                    <VoliUserFrom
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
                    <VoliUserFrom
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
          </div>
          <div className="rightForm--right">
            <div className="formsContainer--body__item d-none">
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
              <div className="label">Massimo Bagaglio A Mano (8Kg)</div>
              <div className="radioWrapper">
                <div className="radioGr">
                  <span>A mano</span>
                  <input
                    checked={this.state.bagaglio === "1"}
                    onChange={(e) => {
                      this.setState({ bagaglio: e.target.value });
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
                      this.setState({ bagaglio: e.target.value });
                    }}
                    type="radio"
                    name="bagaglio"
                    value="2"
                    id="bagaglio2"
                    checked={this.state.bagaglio === "2"}
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
                (this.state.bagaglio === "2" ? "" : " invisible")
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
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...AuthActions, ...MainActions })(Voli);

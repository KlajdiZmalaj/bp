import React, { Component } from "react";
import "./newheader.css";
import images from "themes/images";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import MainActions from "redux-store/models/main";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { numberWithCommas } from "utils/HelperFunc";
import Chat from "shared-components/Chat/Chat";
import { Header as HeaderMob } from "shared-componentsMobile";
import ClickOut from "react-onclickout";
//
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobMenu: false,
      ads: false,
      regType: 1,
      msg: false,
      visibleMoney: false,
    };
  }
  toggleprivMsgs = () => {
    this.setState({ msg: !this.state.msg });
  };
  toggleAds = () => {
    this.setState({ ads: !this.state.ads });
  };
  toggleMobileMeu = () => {
    this.setState({ isMobMenu: !this.state.isMobMenu });
  };

  render() {
    const { accountInfo, screenWidth, ads, privMsg, skinExtras } = this.props;
    const { isDDopem, visibleMoney } = this.state;
    let isLoggedin = false;
    if (accountInfo.token) {
      isLoggedin = true;
    }
    return screenWidth > 1024 ? (
      <header className="header">
        <div className="headermaxW maxWidth">
          <div className="topNav">
            <div className="left">
              <div>
                <i className="fal fa-phone"></i> {skinExtras.cel}
              </div>
              <div>
                <i className="fal fa-envelope"></i>
                {skinExtras.mail}
              </div>
            </div>
            <div className="right">
              <div style={{ marginRight: "15px" }}>
                <Chat />
              </div>
              <div className="icons">
                {accountInfo?.profile?.role && (
                  <>
                    <div>
                      <i onClick={this.toggleAds} className="fas fa-bell"></i>
                      <span>{ads && ads.length}</span>
                      {this.state.ads ? (
                        <ClickOut
                          onClickOut={() => {
                            this.setState({ ads: false });
                          }}
                        >
                          <div
                            className={"ads" + (this.state.ads ? " viz" : "")}
                          >
                            {ads.slice(0, 10).map((add) => {
                              return (
                                <div
                                  key={add.id}
                                  onClick={() => {
                                    this.toggleAds();
                                    this.props.history.push("/annunci");
                                  }}
                                >
                                  {add.title}
                                </div>
                              );
                            })}
                          </div>
                        </ClickOut>
                      ) : (
                        <div className={"ads" + (this.state.ads ? " viz" : "")}>
                          {ads.slice(0, 10).map((add) => {
                            return (
                              <div
                                key={add.id}
                                onClick={() => {
                                  this.toggleAds();
                                  this.props.history.push("/annunci");
                                }}
                              >
                                {add.title}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      <i
                        onClick={this.toggleprivMsgs}
                        className="fas fa-envelope"
                      ></i>
                      <span
                        className={`${
                          privMsg && privMsg.length > 0 ? "pulse" : ""
                        }`}
                      >
                        {privMsg && privMsg.length}
                      </span>
                      {this.state.msg ? (
                        <ClickOut
                          onClickOut={() => {
                            this.setState({ msg: false });
                          }}
                        >
                          <div
                            className={"ads" + (this.state.msg ? " viz" : "")}
                          >
                            {privMsg.map((add) => {
                              return (
                                <div
                                  key={add.id}
                                  onClick={() => {
                                    this.toggleprivMsgs();
                                    if (add.ticket_id) {
                                      window.location.hash =
                                        "dettagli-prenotazioni";
                                      // this.props.getTicketByTicketId(
                                      //   add.ticket_id
                                      // );
                                    }
                                    if (add?.text?.includes("ID:")) {
                                      window.location.hash = "account-info";

                                      this.props.getUserByUserId(
                                        add.text
                                          .split("ID:")[1]
                                          .split("Username")[0]
                                      );
                                    }
                                  }}
                                  data-id={add.id}
                                >
                                  {add.title}{" "}
                                  {add?.text?.includes("ID:") &&
                                    add.text.split("Username:")[1]}
                                </div>
                              );
                            })}
                          </div>
                        </ClickOut>
                      ) : (
                        <div className={"ads" + (this.state.msg ? " viz" : "")}>
                          {privMsg.slice(0, 10).map((add, ind) => {
                            return (
                              <div
                                key={ind}
                                onClick={() => {
                                  this.toggleprivMsgs();
                                }}
                              >
                                {add.title}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => {
                        this.props.history.push("/configura");
                      }}
                    >
                      <i className="fas fa-cog"></i>
                    </div>
                  </>
                )}
              </div>
              <div className="userinfo">
                {get(accountInfo, "profile.role.name") === "agent" && (
                  <div
                    className="register"
                    onClick={() => {
                      this.props.history.push("/registerAgency");
                    }}
                  >
                    Registra Agenzia
                  </div>
                )}
                {get(accountInfo, "profile.role.name") === "agency" && (
                  <div
                    className="register"
                    onClick={() => {
                      this.props.history.push("/ru");
                    }}
                  >
                    Registra Nuovi Utenti
                  </div>
                )}
                {get(accountInfo, "profile.role.name") === "super_admin" && (
                  <div
                    onClick={() => {
                      if (this.state.regType === 1) {
                        this.props.history.push("/registerAgency");
                      }
                      if (this.state.regType === 2) {
                        this.props.history.push("/registerAgent");
                      }
                    }}
                    className="register"
                  >
                    Registra
                  </div>
                )}
                {get(accountInfo, "profile.role.name") === "super_admin" && (
                  <div className="registerDropDown">
                    <i
                      onClick={() => {
                        this.setState({ isDDopem: !this.state.isDDopem });
                      }}
                      className={`fal fa-chevron-${isDDopem ? "up" : "down"}`}
                      aria-hidden="true"
                    ></i>
                    {isDDopem && (
                      <div className="wrapperReg animated bounceIn">
                        <div
                          className="registerDropDown--item"
                          onClick={() => {
                            this.setState({ regType: 1, isDDopem: false });
                            this.props.history.push("/registerAgency");
                          }}
                        >
                          Agenzia
                        </div>
                        <div
                          className="registerDropDown--item"
                          onClick={() => {
                            this.setState({ regType: 2, isDDopem: false });
                            this.props.history.push("/registerAgent");
                          }}
                        >
                          Agente
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="name">{get(accountInfo, "profile.name")}</div>
                {isLoggedin && (
                  <div className="money">
                    {visibleMoney ? (
                      <>
                        {" "}
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => this.setState({ visibleMoney: false })}
                          className="fal fa-eye-slash mr-1"
                          aria-hidden="true"
                        ></i>
                        {numberWithCommas(get(accountInfo, "profile.wallet"))}???{" "}
                      </>
                    ) : (
                      <i
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ visibleMoney: true })}
                        className="fal fa-eye"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                )}
              </div>
              <button
                className="logoutBtn"
                onClick={() => {
                  if (!isLoggedin) {
                    this.props.history.push("/login");
                  }
                  if (isLoggedin) {
                    this.props.logOut();
                  }
                }}
              >
                {isLoggedin ? "LOGOUT" : "LOGIN"}
              </button>
            </div>
          </div>
        </div>
        <nav>
          <div className="headermaxW maxWidth">
            <div
              className="logo"
              onClick={() => {
                this.props.history.push("/dashboard");
              }}
            >
              <img src={images.logo} alt="" />
            </div>
            <div className="navLinks">
              <div className="item">
                <a href={skinExtras.link1}>azienda</a>
              </div>
              <div className="item">
                <a href={skinExtras.link2}>servizi</a>
              </div>
              <div className="item">
                <a href={skinExtras.link3}>area riservata</a>
              </div>
              <div className="item">
                {" "}
                <a href={skinExtras.link4}>contatti</a>{" "}
              </div>
              <div className="item">
                {" "}
                <a href={skinExtras.link5}>affilia la tua attivita</a>{" "}
              </div>
            </div>
          </div>
        </nav>
      </header>
    ) : (
      <HeaderMob />
    );
  }
}
const mstp = (state) => {
  const { accountInfo, user, ads, privMsg, skinExtras } = state.auth;
  const { screenWidth, navbarSearch } = state.main;
  return {
    accountInfo,
    user,
    navbarSearch,
    screenWidth,
    ads,
    privMsg,
    skinExtras,
  };
};
export default withRouter(
  connect(mstp, Object.assign({}, AuthActions, MainActions))(Header)
);

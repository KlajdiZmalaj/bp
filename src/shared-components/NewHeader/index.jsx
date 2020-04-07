import React, { Component } from "react";
import "./newheader.css";
import images from "themes/images";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
import MainActions from "redux-store/models/main";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobMenu: false,
      ads: false,
    };
  }
  toggleAds = () => {
    this.setState({ ads: !this.state.ads });
  };
  toggleMobileMeu = () => {
    this.setState({ isMobMenu: !this.state.isMobMenu });
  };
  componentDidMount() {
    this.props.getAds();
  }
  render() {
    const { accountInfo, screenWidth, user, ads } = this.props;
    const { isMobMenu } = this.state;
    console.log("ads", ads);
    let isLoggedin = false;
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);
    if (data) {
      isLoggedin = true;
    }
    console.log("isLoggedin", isLoggedin);
    return screenWidth > 860 ? (
      <header className="header">
        <div className="headermaxW">
          <div className="topNav">
            <div className="left">
              <div>
                <i className="fal fa-phone"></i> +39 1231313
              </div>
              <div>
                <i className="fal fa-envelope"></i>info@bpoint.store
              </div>
            </div>
            <div className="right">
              <div className="icons">
                <div>
                  <i onClick={this.toggleAds} className="fas fa-bell"></i>
                  <span>{ads && ads.length}</span>
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
                </div>
                <div>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <i className="fas fa-cog"></i>
                </div>
              </div>
              <div className="userinfo">
                <div
                  className="register"
                  onClick={() => {
                    get(accountInfo, "profile.role.id") == 1
                      ? this.props.history.push("/registerAgency")
                      : this.props.history.push("/registerUser");
                  }}
                >
                  {get(accountInfo, "profile.role.id") == 1
                    ? "Registra Agenzia"
                    : "Register User"}
                </div>
                <div className="name">{get(accountInfo, "profile.name")}</div>
                {isLoggedin && (
                  <div className="money">
                    {get(accountInfo, "profile.wallet")}€
                  </div>
                )}
              </div>
              <button
                className="logoutBtn"
                onClick={() => {
                  if (isLoggedin) {
                    this.props.logOut();
                  } else {
                    this.props.history.push("/login");
                  }
                }}
              >
                {isLoggedin ? "LOGOUT" : "LOGIN"}
              </button>
            </div>
          </div>
        </div>
        <nav>
          <div className="headermaxW">
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
                <a href="https://bpoint.store/index.php/chi-siamo/">azienda</a>
              </div>
              <div className="item">
                <a href="https://bpoint.store/servizi/">servizi</a>
              </div>
              <div className="item">
                <a href="https://bpoint.store/">area riservata</a>
              </div>
              <div className="item">
                {" "}
                <a href="https://bpoint.store/contatti/">contatti</a>{" "}
              </div>
              <div className="item">
                {" "}
                <a href="https://bpoint.store/affiliazioni/">
                  affilia la tua attivita
                </a>{" "}
              </div>
            </div>
          </div>
        </nav>
      </header>
    ) : (
      <header className="mobHeader">
        <div className="top">
          <button onClick={this.toggleMobileMeu}>
            <i className="fal fa-bars"></i>
          </button>
          <div className="logo">
            <img src={images.logo} alt="" />
          </div>
        </div>
        <div className={"bottom" + (isMobMenu ? " opened" : "")}>
          <div className="userinfo">
            <div className="name">{get(accountInfo, "profile.name")}</div>
            <div className="money">{get(accountInfo, "profile.wallet")}€</div>
          </div>
          <div className="navLinks">
            <div className="item">azienda</div>
            <div className="item">servizi</div>
            <div className="item">area riservata</div>
            <div className="item">contatti</div>
            <div className="item">affilia la tua attivita</div>
          </div>
          <div className="icons">
            <div>
              <i className="fas fa-bell"></i>
              <span>{ads && ads.length}</span>
            </div>
            <div>
              <i className="fas fa-envelope"></i>
              <span>2</span>
            </div>
            <div>
              <i className="fas fa-cog"></i>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mstp = (state) => {
  const { accountInfo, user, ads } = state.auth;
  const { screenWidth, navbarSearch } = state.main;
  return {
    accountInfo,
    user,
    navbarSearch,
    screenWidth,
    ads,
  };
};
export default withRouter(
  connect(mstp, Object.assign({}, AuthActions, MainActions))(Header)
);

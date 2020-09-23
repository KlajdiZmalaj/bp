import React, { Component, Fragment } from "react";
import { get, includes } from "lodash";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { newAzioni, newAzioniSubmenu } from "config";
import "swiper/css/swiper.css";
import "./newAzioni.css";
import Statistiche from "../Statistiche/Statistiche";
class Azioni extends Component {
  state = {
    active: { url: "dashboard/ricariche" },
    className: "",
    classNameBelongTo: "",
  };
  componentDidMount() {
    let url = window.location.href.slice(
      window.location.href.indexOf("#/") + "#/".length
    );
    this.setState({ active: { ...{ url } } });
  }
  render() {
    const { active, activeMain, accountInfo } = this.props;
    return (
      <Fragment>
        <Statistiche />
        <div className="MenuC">
          <div className="Menu">
            {newAzioni &&
              Array.isArray(newAzioni) &&
              newAzioni.map((azioni) => {
                return (
                  includes(
                    azioni.displayRole,
                    get(accountInfo, "profile.role.name")
                  ) && (
                    <div
                      key={azioni.id}
                      className={`${
                        azioni.active === activeMain ? "active" : "none"
                      }`}
                    >
                      <a href={"#/" + azioni.link}>
                        <div>
                          <i className={azioni.i} />
                          <span>{azioni.name}</span>
                        </div>
                      </a>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <div className="Submenu">
          <div className="MenuS">
            {newAzioniSubmenu[activeMain]?.map((item) => {
              return (
                includes(
                  item.displayRole,
                  get(accountInfo, "profile.role.name")
                ) && (
                  <div
                    id={item.link}
                    key={item.id}
                    onClick={() => {
                      if (activeMain === "dashboard") {
                        this.setState({ active: { ...{ url: item.link } } });
                      }
                    }}
                    className={`${
                      activeMain === "dashboard"
                        ? item.link === this.state.active.url
                          ? "active"
                          : "none"
                        : active === item.link
                        ? "active"
                        : "none"
                    }`}
                  >
                    <a href={"#/" + item.link}>
                      <div>
                        <span>{item.name}</span>
                      </div>
                    </a>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, AuthActions)(Azioni);

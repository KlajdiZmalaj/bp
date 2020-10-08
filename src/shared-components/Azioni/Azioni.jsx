import React, { Component, Fragment } from "react";
import { includes } from "lodash";
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
    this.setState({
      active: {
        ...(this.props?.match?.params.id || url === "forms"
          ? { url }
          : { url: "dashboard/ricariche" }),
      },
    });
  }
  componentDidUpdate(prevProps) {
    const id = this.props?.match?.params.id;
    const previd = prevProps?.match?.params.id;
    if (id === "ricariche" && id !== previd) {
      this.setState({ active: { url: `dashboard/${id}` } });
    }
    if (id === "pagamenti" && id !== previd) {
      this.setState({ active: { url: `dashboard/${id}` } });
    }
  }
  render() {
    const {
      active,
      activeMain,
      accountInfo,
      screenWidth,
      submenu,
    } = this.props;
    const userRole = accountInfo?.profile?.role?.name
      ? accountInfo?.profile?.role?.name
      : "noUser";
    return (
      screenWidth > 1024 && (
        <Fragment>
          <Statistiche userRole={userRole} />
          <div className="MenuC">
            <div
              className="Menu"
              style={userRole === "noUser" ? { display: "none" } : {}}
            >
              {newAzioni &&
                Array.isArray(newAzioni) &&
                newAzioni.map((azioni) => {
                  return (
                    includes(azioni.displayRole, userRole) && (
                      <div
                        key={azioni.id}
                        className={`${
                          azioni.active === activeMain ? "active" : "none"
                        }`}
                      >
                        {azioni.type === "span" ? (
                          <label
                            onClick={() => {
                              this.props.editReportistica(
                                !this.props.ReportisticaDet
                              );
                            }}
                          >
                            <div>
                              <i className={azioni.i} />
                              <span>{azioni.name}</span>
                            </div>
                          </label>
                        ) : (
                          <a href={"#/" + azioni.link}>
                            <div>
                              <i className={azioni.i} />
                              <span>{azioni.name}</span>
                            </div>
                          </a>
                        )}
                      </div>
                    )
                  );
                })}
            </div>
          </div>
          {submenu !== "noSubmenu" && (
            <div className="Submenu">
              <div className="MenuS">
                {newAzioniSubmenu[activeMain]?.map((item) => {
                  return (
                    includes(item.displayRole, userRole) && (
                      <div
                        id={item.link}
                        key={item.id}
                        onClick={() => {
                          if (activeMain === "dashboard") {
                            this.setState({
                              active: { ...{ url: item.link } },
                            });
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
                        {item.type === "span" ? (
                          <label>
                            <div>
                              <span>{item.name}</span>
                            </div>
                          </label>
                        ) : (
                          <a href={"#/" + item.link}>
                            <div>
                              <span>{item.name}</span>
                            </div>
                          </a>
                        )}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}
        </Fragment>
      )
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
  ReportisticaDet: state.auth.ReportisticaDet,
  screenWidth: state.main.screenWidth,
});

export default connect(mapsStateToProps, AuthActions)(Azioni);

import React from "react";

import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import "./adminLeftForm.css";
import { connect } from "react-redux";
import Chat from "shared-components/Chat/Chat";

class AdminLeftForm extends React.Component {
  state = {
    statModal: false,
    wallModal: false,
    ultModal: false,
  };
  async componentDidMount() {
    await setTimeout(() => {
      const { Statistiche, TrCoPro, leUltimeTransazioniDet } = this.props;
      this.props.editStatModal({
        visibility: false,
        data: {
          graphData: Statistiche,
          Tranzacioni: TrCoPro?.importo,
          Commisione: TrCoPro?.commissione,
          Proviggioni: TrCoPro?.proviggioni,
        },
      });
      this.props.editUltModal({
        visibility: false,
        data: {
          leUltimeTransazioniDet: leUltimeTransazioniDet,
        },
      });
    }, 600);
  }
  async componentDidUpdate(prevProps) {
    if (this.props.activeSkinId !== prevProps.activeSkinId) {
      await setTimeout(() => {
        const { Statistiche, TrCoPro, leUltimeTransazioniDet } = this.props;
        this.props.editStatModal({
          visibility: false,
          data: {
            graphData: Statistiche,
            Tranzacioni: TrCoPro?.importo,
            Commisione: TrCoPro?.commissione,
            Proviggioni: TrCoPro?.proviggioni,
          },
        });
        this.props.editUltModal({
          visibility: false,
          data: {
            leUltimeTransazioniDet: leUltimeTransazioniDet,
          },
        });
      }, 600);
    }
  }
  CloseWindowOnClick = () => {
    if (this.props.screenWidth <= 550) {
      this.props.setVisible(!this.props.visible);
    }
  };
  render() {
    const {
      setActiveSkinId,
      leUltimeTransazioniDet,
      screenWidth,
      editDepModal,
      editStatModal,
      editUltModal,
      skinList,
      activeSkinId,
      accountInfo,
    } = this.props;
    return (
      <React.Fragment>
        <div className="AdminLeftForm">
          <div className="AdminLeftForm--FirstBox">
            {skinList &&
              Array.isArray(skinList) &&
              skinList.map((skin) => (
                <div
                  onClick={() => {
                    setActiveSkinId(activeSkinId === skin.id ? -1 : skin.id);
                    this.CloseWindowOnClick();
                  }}
                  className={`AdminLeftForm--FirstBox--Box${
                    activeSkinId === skin.id ? "--active" : ""
                  }`}
                  key={skin.id}
                >
                  <div className="AdminLeftForm--FirstBox--Box--Skinsvg">
                    <img
                      src={
                        skin.id === 1 ||
                        skin.id === 3 ||
                        skin.id === 4 ||
                        skin.id === 5 ||
                        skin.id === 6 ||
                        skin.id === 8
                          ? require(`../../../assets/images${
                              skin.id === 8 ? 6 : skin.id
                            }/favicon-32x32.svg`)
                          : require(`../../../assets/images${1}/favicon-32x32.svg`)
                      }
                      alt=""
                    />
                    <span>{skin.username.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            {accountInfo.profile.role.name !== "support" && (
              <div
                style={{ cursor: "pointer" }}
                className={`AdminLeftForm--FirstBox--Box`}
                key={"createSkin"}
              >
                <div className="AdminLeftForm--FirstBox--Box--Skinsvg">
                  <i className="fal fa-plus"></i>

                  <span
                    onClick={() => {
                      this.props.history.push("/back-office/CreateSkin");
                      this.props.addEditSkinDetails({
                        skinId: -1,
                        skinName: "newSkin",
                        skinPannel: false,
                        stepNumber: 0,
                      });
                    }}
                  >
                    Aggiungi Skin
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="AdminLeftForm--LastBox">
            {screenWidth <= 1320 ? (
              <React.Fragment>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    const { Statistiche, TrCoPro, statModalVis } = this.props;
                    if (statModalVis) {
                      editStatModal({
                        visibility: false,
                        data: "",
                      });
                    } else {
                      editStatModal({
                        visibility: true,
                        data: {
                          graphData: Statistiche,
                          Tranzacioni: TrCoPro?.importo,
                          Commisione: TrCoPro?.commissione,
                          Proviggioni: TrCoPro?.proviggioni,
                        },
                      });
                    }
                    editUltModal({
                      visibility: false,
                      data: "",
                    });
                    editDepModal({
                      visibility: false,
                      data: "",
                    });
                    this.CloseWindowOnClick();
                  }}
                >
                  <i className="fal fa-analytics"></i>
                  <span>STATISTICHE</span>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    const { ultModalVis } = this.props;
                    if (ultModalVis) {
                      editUltModal({
                        visibility: false,
                        data: "",
                      });
                    } else {
                      editUltModal({
                        visibility: true,
                        data: {
                          leUltimeTransazioniDet: leUltimeTransazioniDet,
                        },
                      });
                    }
                    editStatModal({
                      visibility: false,
                      data: "",
                    });
                    editDepModal({
                      visibility: false,
                      data: "",
                    });
                    this.CloseWindowOnClick();
                  }}
                >
                  <i className="fal fa-heart-rate"></i>
                  <span>TRANSAZIONI</span>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    const { depModalVis } = this.props;
                    if (depModalVis) {
                      editDepModal({
                        visibility: false,
                        data: "",
                      });
                    } else {
                      editDepModal({
                        visibility: true,
                        data: {
                          graphData: "full",
                        },
                      });
                    }

                    editStatModal({
                      visibility: false,
                      data: "",
                    });
                    editUltModal({
                      visibility: false,
                      data: "",
                    });
                    this.CloseWindowOnClick();
                  }}
                >
                  <i className="fal fa-wallet"></i>
                  <span>DEP / ADDEB</span>
                </div>
              </React.Fragment>
            ) : null}
            {!this.props.small && (
              <div
                className="AdminLeftForm--LastBox--Box "
                onClick={this.CloseWindowOnClick}
              >
                <Chat />
              </div>
            )}
            <div
              className="AdminLeftForm--LastBox--Box"
              onClick={this.CloseWindowOnClick}
            >
              <i className="fal fa-envelope"></i>
              <span>MESSAGGI</span>
            </div>
            <div
              className="AdminLeftForm--LastBox--Box"
              onClick={this.CloseWindowOnClick}
            >
              <i className="fal fa-cogs"></i>
              <span>SETTINGS</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mstp = (state) => ({
  screenWidth: state.main.screenWidth,
  skinList: state.auth.skinList,
  activeSkinId: state.main.activeSkinId,
  TrCoPro: state.auth.Statistiche?.total,
  Statistiche: state.auth.Statistiche?.data,
  leUltimeTransazioniDet: state.auth.leUltimeTransazioniDet,
  accountInfo: state.auth.accountInfo,
  statModalVis: state.auth.statModal.visibility,
  ultModalVis: state.auth.ultModal.visibility,
  depModalVis: state.auth.depModal.visibility,
});
export default connect(mstp, { ...MainActions, ...AuthActions })(AdminLeftForm);

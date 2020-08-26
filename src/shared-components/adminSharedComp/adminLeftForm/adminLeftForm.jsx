import React from "react";

import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import "./adminLeftForm.css";
import { connect } from "react-redux";

class AdminLeftForm extends React.Component {
  state = {
    statModal: false,
    wallModal: false,
    ultModal: false,
  };
  render() {
    const {
      handleClick,
      setActiveSkinId,
      graphData,
      leUltimeTransazioniDet,
      Tranzacioni,
      Proviggioni,
      Commisione,
      screenWidth,
      editDepModal,
      editStatModal,
      editUltModal,
      skinList,
      activeSkinId,
    } = this.props;
    return (
      <React.Fragment>
        <div className="AdminLeftForm">
          <div className="AdminLeftForm--FirstBox">
            <div className="AdminLeftForm--FirstBox--Box">
              <div className="Bars">
                <span>NETWORK</span>
                <i className="fal fa-bars" onClick={handleClick}></i>
              </div>
            </div>
            {skinList &&
              Array.isArray(skinList) &&
              skinList.map((skin) => (
                <div
                  className={`AdminLeftForm--FirstBox--Box${
                    activeSkinId === skin.id ? "--active" : ""
                  }`}
                  key={skin.id}
                >
                  <div className="AdminLeftForm--FirstBox--Box--Skinsvg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                    >
                      <circle className="a" cx="11" cy="11" r="11" />
                    </svg>

                    <span
                      onClick={() => {
                        console.log(activeSkinId, skin.id);
                        setActiveSkinId(activeSkinId == skin.id ? -1 : skin.id);
                      }}
                    >
                      {skin.username.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            <div
              style={{ cursor: "pointer" }}
              className={`AdminLeftForm--FirstBox--Box`}
              key={"createSkin"}
            >
              <div className="AdminLeftForm--FirstBox--Box--Skinsvg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <circle className="a" cx="11" cy="11" r="11" />
                </svg>

                <span
                  onClick={() => {
                    this.props.goToAdminPanel(false);
                    this.props.addEditSkinDetails({
                      skinId: -1,
                      skinName: "newSkin",
                      skinPannel: false,
                      stepNumber: 0,
                    });
                  }}
                >
                  Create Add Skin
                </span>
              </div>
            </div>
          </div>

          <div className="AdminLeftForm--LastBox">
            {screenWidth <= 1050 ? (
              <React.Fragment>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    editStatModal({
                      visibility: true,
                      data: {
                        graphData: graphData,
                        Tranzacioni: Tranzacioni,
                        Commisione: Commisione,
                        Proviggioni: Proviggioni,
                      },
                    });
                    editUltModal({
                      visibility: false,
                      data: "",
                    });
                    editDepModal({
                      visibility: false,
                      data: "",
                    });
                  }}
                >
                  <i className="fal fa-analytics"></i>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    editUltModal({
                      visibility: true,
                      data: {
                        leUltimeTransazioniDet: leUltimeTransazioniDet,
                      },
                    });
                    editStatModal({
                      visibility: false,
                      data: "",
                    });
                    editDepModal({
                      visibility: false,
                      data: "",
                    });
                  }}
                >
                  <i className="fal fa-heart-rate"></i>
                </div>
                <div
                  className="AdminLeftForm--LastBox--Box"
                  onClick={() => {
                    editDepModal({
                      visibility: true,
                      data: {
                        graphData: "full",
                      },
                    });
                    editStatModal({
                      visibility: false,
                      data: "",
                    });
                    editUltModal({
                      visibility: false,
                      data: "",
                    });
                  }}
                >
                  <i className="fal fa-wallet"></i>
                </div>
              </React.Fragment>
            ) : null}
            <div className="AdminLeftForm--LastBox--Box">
              <i className="fal fa-envelope"></i>
              <span>MESSAGGI</span>
            </div>
            <div className="AdminLeftForm--LastBox--Box">
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
});
export default connect(mstp, { ...MainActions, ...AuthActions })(AdminLeftForm);

import React from "react";

const RowDetailsMobile = ({ mobilePopUp, mobilePopUpData }) => {
  return mobilePopUpData.status ? (
    <React.Fragment>
      <div className="rowPopUp ">
        <div className="rowPopUp--header">
          Dettagli{" "}
          <i
            onClick={() => {
              mobilePopUp({});
            }}
            className="fal fa-times"
            aria-hidden="true"
          ></i>{" "}
        </div>
        <div className="rowPopUp--body">
          <div className="rowPopUp--body__item">
            <span>Status</span>
            <span>{mobilePopUpData.status}</span>
          </div>

          <div className="rowPopUp--body__item">
            <span>ID</span>
            <span>{mobilePopUpData.id}</span>
          </div>

          <div className="rowPopUp--body__item">
            <span>Skin</span>
            <span>{mobilePopUpData.skin}</span>
          </div>

          <div className="rowPopUp--body__item">
            <span>Soggetto</span>
            <span>
              Prenotazione Biglieto {mobilePopUpData.type}{" "}
              {mobilePopUpData.nome_agenzia}
            </span>
          </div>

          <div className="rowPopUp--body__item">
            <span>User</span>
            <span>{mobilePopUpData.user}</span>
          </div>

          <div className="rowPopUp--body__item">
            <span>Data</span>
            <span>{mobilePopUpData.updated_at}</span>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          mobilePopUp({});
        }}
        className="backDrop"
      ></div>
    </React.Fragment>
  ) : null;
};
export default RowDetailsMobile;

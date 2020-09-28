import React from "react";
import { numberWithCommas } from "utils/HelperFunc";

const ModalResPForTabMain = ({ Close, mobilePopUpData, exception }) => (
  <React.Fragment>
    <div className="rowPopUp ">
      <div className="rowPopUp--header">
        Dettagli{" "}
        <i
          onClick={() => {
            Close();
          }}
          className="fal fa-times"
          aria-hidden="true"
        ></i>{" "}
      </div>
      <div className="rowPopUp--body">
        {/* {mobilePopUpData &&
          typeof mobilePopUpData === "object" &&
          Object.keys(mobilePopUpData).map(
            (key, index) =>
              !exception ||
              (key != exception && (
                <div
                  className="rowPopUp--body__item"
                  key={`${mobilePopUpData[key]}${index}`}
                >
                  <span>
                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                  </span>
                  <span>{mobilePopUpData[key]}</span>
                </div>
              ))
          )} */}
        <div className="rowPopUp--body__item">
          <span>Saldo</span>
          <span>
            {mobilePopUpData.saldo !== "-" ? mobilePopUpData.saldo + "€" : "-"}
          </span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Service Name</span>
          <span>{mobilePopUpData.service_name}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Prezzo</span>
          <span>{numberWithCommas(mobilePopUpData.price1000 / 1000)}€</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Data</span>
          <span>{mobilePopUpData.executed_date}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Barcode</span>
          <span>{mobilePopUpData.barcode}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Proviggione</span>
          <span>{mobilePopUpData.percentage}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Commissione</span>
          <span>{mobilePopUpData.commissione}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>User</span>
          <span>{mobilePopUpData.agency_name}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Address</span>
          <span>{mobilePopUpData.agency_address}</span>
        </div>
        <div className="rowPopUp--body__item">
          <span>Cel.</span>
          <span>{mobilePopUpData.agency_phone}</span>
        </div>
      </div>
    </div>

    <div
      onClick={() => {
        Close();
      }}
      className="backDrop"
    ></div>
  </React.Fragment>
);
export default ModalResPForTabMain;

import React from "react";
import { numberWithCommas } from "utils/HelperFunc";

import "./aRFUD.css";
const AdminRightFormUltimeDetailsHelper = ({ leUltimeTransazioniDet }) => (
  <div className="AdminRightForm--Box--LeUltime--Dropdown">
    {leUltimeTransazioniDet.map((Tranzacioni, i) => (
      <div className="AdminRightForm--Box--LeUltime--Dropdown--Row" key={i}>
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Date">
          {Tranzacioni.date}
        </span>
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Id">
          {Tranzacioni.barcode}
        </span>

        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data User">
          {Tranzacioni.user}
        </span>
        <span className="AdminRightForm--Box--LeUltime--Dropdown--Row--Data Price">
          {(numberWithCommas(Tranzacioni.cost) + "€").toString()}
        </span>
      </div>
    ))}
  </div>
);
class AdminRightFormUltimeDetails extends React.Component {
  componentWillUnmount() {
    if (this.props.ModalOrNo) {
      this.props.Close({ visibility: false, data: "" });
    }
  }
  render() {
    const {
      leUltimeTransazioniDet,
      ModalOrNo,
      Close,
      menuSkinVisible,
    } = this.props;
    return (
      <React.Fragment>
        {ModalOrNo === true ? (
          <div
            className={`${
              !menuSkinVisible ? "RightFormModal Big" : "RightFormModal"
            }`}
          >
            <div
              className="backDrop"
              onClick={() => {
                Close({ visibility: false, data: "" });
              }}
            ></div>
            <div className="Header">LE ULTIME TRANSAZIONI</div>

            <AdminRightFormUltimeDetailsHelper
              leUltimeTransazioniDet={leUltimeTransazioniDet}
            />
            <div className="Close">
              <i
                className="fal fa-times"
                onClick={() => {
                  Close({ visibility: false, data: "" });
                }}
              ></i>
            </div>
          </div>
        ) : (
          <AdminRightFormUltimeDetailsHelper
            leUltimeTransazioniDet={leUltimeTransazioniDet}
          />
        )}
      </React.Fragment>
    );
  }
}
export default AdminRightFormUltimeDetails;

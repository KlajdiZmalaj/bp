import React, { useEffect } from "react";
import { AuthActions } from "redux-store/models";
import "../domains/QRBarcode/style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function Main({ getCodiceTicket, match: { params } }) {
  const barcode = params.barcode;
  useEffect(() => {
    // console.log("ca ka", barcode, getCodiceTicket);
    getCodiceTicket(barcode, "omeLale");
  }, [barcode, getCodiceTicket]);
  return (
    <div className="qrBarcode m-auto p-4">
      <button
        onClick={() => {
          window.location.hash = "dashboard";
        }}
      >
        Dashboard <i className="fal fa-backward" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default withRouter(connect(null, { ...AuthActions })(Main));

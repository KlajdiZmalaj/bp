import React from "react";
import { AuthActions } from "redux-store/models";
import "../domains/QRBarcode/style.css";
import { connect } from "react-redux";

function Main({ getBarcodeData }) {
  return <div className="qrBarcode">qr barcode</div>;
}

export default connect(null, { ...AuthActions })(Main);

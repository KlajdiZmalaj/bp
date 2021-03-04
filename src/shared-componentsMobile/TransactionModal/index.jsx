import React from "react";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";

const TransactionModal = ({ setTransactionModal, msg, ok, cancel }) => (
  <div className="transactionModal">
    <div className="title">ACQUISTO ESEGUITO</div>
    <div className="msg">{msg}</div>
    <img src={images["transactionModalImg"]} alt="" />
    <button
      onClick={() => {
        ok();
      }}
    >
      <i className="fal fa-print" aria-hidden="true"></i>
      STAMPA L’ORDINE
    </button>
    <button
      onClick={() => {
        cancel();
        setTransactionModal(false);
      }}
    >
      <i className="fal fa-backward" aria-hidden="true"></i>
      Torna Indietro
    </button>
  </div>
);
export default connect(null, AuthActions)(TransactionModal);

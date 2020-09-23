import React, { useEffect, useState, useRef } from "react";
import { AuthActions } from "redux-store/models";
import "../domains/QRBarcode/style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";
import images from "themes/images";

function Main({
  getCodiceTicket,
  match: { params },
  paymentsFromCode,
  skinExtras,
}) {
  const barcode = params.barcode;
  const refElem = useRef({});
  useEffect(() => {
    getCodiceTicket(barcode, "omeLale");
  }, [barcode]);
  console.log("%c barcode", window.log3, barcode, paymentsFromCode);
  return (
    <div className="qrBarcode m-auto p-4">
      <button
        onClick={() => {
          window.location.hash = "dashboard";
        }}
      >
        Dashboard <i className="fal fa-backward" aria-hidden="true"></i>
      </button>
      {paymentsFromCode && (
        <div className="printModal" ref={refElem}>
          <div className="headerModal">
            <img className="logo" src={images.logo} alt="" />
            <span className="superSmall text-bold">
              MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
            </span>
            <span className="superSmall">{skinExtras.address}</span>
            <span className="superSmall link">{skinExtras.email}</span>
            <span className="superSmall ">Tel: {skinExtras.cel}</span>
            <span className="superSmall tel">P.IVA 03852290406</span>

            {/* <span>BPOINT</span> */}

            <span className="fontSmall text-bold">
              {paymentsFromCode.agency_name}
            </span>
            <span className="fontSmall address">
              {paymentsFromCode.agency_address}
            </span>
            {/* <span className="userCel">
                    {" "}
                    Telefono: <b>{this.state.phone}</b>{" "}
                  </span> */}
            {/* BPOINT<br></br>
                  PUNTA ANCORA DI GALASSI GABRIELE<br></br>
                  VIA DEL LAVORO, 29 - IMOLA<br></br>
                  Telefono: 335398618<br></br> */}
          </div>
          {paymentsFromCode && paymentsFromCode.receipt_type === "base64" ? (
            <div>
              <iframe
                style={{
                  width: "100%",
                  height: "443px",
                }}
                id="iframepdf"
                src={`data:application/pdf;base64,${paymentsFromCode.receipt}`}
              ></iframe>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  paymentsFromCode &&
                  paymentsFromCode.receipt &&
                  paymentsFromCode.receipt
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\t/g, "\u00a0")
                    .replace(/\n/g, "<br/> ")
                    .replace(/\+/g, " ")
                    .replace(/: /g, ":<div class='marginB'></div>")
                    .replace(
                      /<div class='marginB'><\/div>([^>]+)<br\/>/g,
                      "<div class='marginB'></div><div class='marginC'>$1</div><br/>"
                    ),
              }}
            />
          )}

          <img
            className="barcodeModal"
            src={`https://barcode.tec-it.com/barcode.ashx?data=${barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
            alt=""
          />
          <ReactToPrint
            trigger={() => <div className="printBtn">Print</div>}
            content={() => refElem.current}
            bodyClass="afterprint"
            // copyStyles="false"
          />
        </div>
      )}
    </div>
  );
}

const mstp = (state) => {
  return {
    paymentsFromCode: state.auth.paymentsFromCode,
    skinExtras: state.auth.skinExtras,
  };
};
export default withRouter(connect(mstp, { ...AuthActions })(Main));

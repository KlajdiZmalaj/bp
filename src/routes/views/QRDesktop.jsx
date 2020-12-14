import React, { useEffect, useRef } from "react";
import { AuthActions } from "redux-store/models";
import "../domains/QRBarcode/style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactToPrint from "react-to-print";
import images from "themes/images";
import { Document, Page, pdfjs } from "react-pdf";
import { b64toBlob } from "utils";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const printPdfReceipt = (data, type) => {
  if (data.receipt_type === "base64") {
    var myBlob = b64toBlob(data.receipt, "application/pdf");
    var blobUrl = URL.createObjectURL(myBlob);
    if (type === "print") {
      window
        .open(
          blobUrl,
          "_blank",
          "toolbar=no,scrollbars=no,resizable=no,top=50,left=500,width=700,height=700"
        )
        .print();
    }
    if (type === "download") {
      const linkSource = `data:application/pdf;base64,${data.receipt}`;
      const downloadLink = document.createElement("a");
      const fileName = "Ticket.pdf";

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
    if (type === "return") {
      return blobUrl;
    }
  }
};

function Main({
  getCodiceTicket,
  match: { params },
  paymentsFromCode,
  skinExtras,
}) {
  const barcode = params.barcode;
  const refElem = useRef({});
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
                    GALASSI GABRIELE<br></br>
                  VIA DEL LAVORO, 29 - IMOLA<br></br>
                  Telefono: 335398618<br></br> */}
          </div>
          {paymentsFromCode && paymentsFromCode.receipt_type === "base64" ? (
            <div>
              <Document
                renderMode="canvas"
                file={printPdfReceipt(paymentsFromCode, "return")}
              >
                <Page width={380} pageNumber={1} />
              </Document>
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html:
                  paymentsFromCode &&
                  paymentsFromCode.receipt &&
                  paymentsFromCode.receipt
                    // .replace(/</g, "&lt;")
                    // .replace(/>/g, "&gt;")
                    .replace(/(?=<a).*(?=a>)a>/g, "")
                    .replace(/\t/g, "\u00a0")
                    .replace(/\n/g, "<br/> ")
                    .replace(/\+/g, " ")
                    .replace(/: /g, ":<div class='marginB'></div>")
                    .replace(
                      /<div class='marginB'><\/div>([^>]+)<br\/>/g,
                      "<div class='marginB'></div><div class='marginC'>$1</div><br/>"
                    ),
              }}
            ></div>
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

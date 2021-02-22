import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { Modal } from "antd";
import images from "themes/images";
import { Document, Page } from "react-pdf";
import ReactToPrint from "react-to-print";
import { b64toBlob } from "utils";

class PrintTicket extends React.Component {
  printPdfReceipt = (data, type) => {
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
  render() {
    const { arr, skinExtras } = this.props;
    const barcode = Array.isArray(arr) ? arr[0]?.barcode : arr?.barcode;
    const receipt = Array.isArray(arr) ? arr[0]?.receipt : arr?.receipt;
    console.log("ca ka tickettt", barcode, receipt);
    return barcode && receipt ? (
      <Modal
        title={null}
        visible={true}
        onOk={this.handleOk}
        onCancel={() => {
          this.props.setSocketReceipt({});
        }}
        footer={null}
      >
        {
          <div
            className="printModal aaaa"
            ref={(el) => (this.componentRef = el)}
          >
            <div className="headerModal">
              <img className="logo" src={images.logo} alt="" />
              <span className="superSmall text-bold">
                <span> {skinExtras.account_name} </span>
              </span>
              <span className="superSmall">{skinExtras.address}</span>
              <span className="superSmall link">{skinExtras.email}</span>
              <span className="superSmall ">Tel: {skinExtras.cel}</span>
              <span className="superSmall tel">P.IVA 03852290406</span>

              {/* <span>BPOINT</span> */}

              <span className="fontSmall text-bold">{arr.agency_name}</span>
              <span className="fontSmall address">{arr.agency_address}</span>
              {/* <span className="userCel">
                    {" "}
                    Telefono: <b>{this.state.phone}</b>{" "}
                  </span> */}
              {/* BPOINT<br></br>
                    GALASSI GABRIELE<br></br>
                  VIA DEL LAVORO, 29 - IMOLA<br></br>
                  Telefono: 335398618<br></br> */}
            </div>
            {arr && arr.receipt_type === "base64" ? (
              <div>
                {/* <embed
                      type="application/pdf"
                      style={{
                        width: "100%",
                        height: "443px",
                      }}
                      id="iframepdf"
                      src={`data:application/pdf;base64,${arr.receipt}`}
                    ></embed> */}
                <Document
                  renderMode="canvas"
                  file={this.printPdfReceipt(arr, "return")}
                >
                  <Page width={380} pageNumber={1} />
                </Document>

                <div
                  className="printBtn"
                  onClick={() => {
                    this.printPdfReceipt(arr, "print");
                  }}
                >
                  Print Ticket
                </div>
                <div
                  className="printBtn"
                  onClick={() => {
                    this.printPdfReceipt(arr, "download");
                  }}
                >
                  Download Ticket
                </div>
              </div>
            ) : (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      arr &&
                      arr.receipt &&
                      arr.receipt
                        // .replace(/</g, "&lt;")
                        // .replace(/>/g, "&gt;")
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
              </>
            )}

            <img
              className="qrCodeImg"
              src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${barcode}&size=420x420&margin=10`}
              alt=""
            />
            <img
              className="barcodeModal"
              src={`https://barcode.tec-it.com/barcode.ashx?data=${
                barcode || 0
              }&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
              alt=""
            />
            <ReactToPrint
              trigger={() => <div className="printBtn">Print</div>}
              content={() => this.componentRef}
              bodyClass="afterprint"
              // copyStyles="false"
            />
          </div>
        }
      </Modal>
    ) : null;
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id,
  skinExtras: state.auth.skinExtras,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  PrintTicket
);

import React from "react";
import images from "themes/images";
import { connect } from "react-redux";
import { Modal } from "antd";
import ReactToPrint from "react-to-print";
import AuthActions from "redux-store/models/auth";
import { Document, Page } from "react-pdf";
import "./pagoPaConfirm.css";
class PrintTicketSerap extends React.Component {
  state = {
    visible: true,
  };
  printPdfReceipt = (data, type) => {
    if (data.receipt_type === "base64") {
      const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {
          type: contentType,
        });
        return blob;
      };
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
    const { bolletiniBianchi, skinExtras } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        title={null}
        visible={visible}
        className={`${
          bolletiniBianchi?.CheckVerificationDebtPositionId ? "Conferma" : ""
        }`}
        onOk={() => {
          this.setState({ visible: false });
        }}
        onCancel={() => {
          this.setState({ visible: false });
          this.props.setBolletiniBianchi(null);
        }}
        footer={null}
      >
        {bolletiniBianchi &&
          (bolletiniBianchi?.receipt ? (
            <div className="printModal" ref={(el) => (this.componentRef = el)}>
              <div className="headerModal">
                <img className="logo" src={images.logo} alt="" />
                <span className="superSmall text-bold">
                  MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
                </span>
                <span className="superSmall">{skinExtras.address}</span>
                <span className="superSmall link">{skinExtras.email}</span>
                <span className="superSmall ">Tel: {skinExtras.cel}</span>
                <span className="superSmall tel">P.IVA 03852290406</span>
                <span className="fontSmall text-bold">
                  {bolletiniBianchi.agency_name}
                </span>
                <span className="fontSmall address">
                  {bolletiniBianchi.agency_address}
                </span>
              </div>
              {bolletiniBianchi &&
              bolletiniBianchi.receipt_type === "base64" ? (
                <div>
                  <Document
                    renderMode="canvas"
                    file={this.printPdfReceipt(bolletiniBianchi, "return")}
                  >
                    <Page width={380} pageNumber={1} />
                  </Document>
                  <div
                    className="printBtn"
                    onClick={() => {
                      this.printPdfReceipt(bolletiniBianchi, "print");
                    }}
                  >
                    Print Ticket
                  </div>
                  <div
                    className="printBtn"
                    onClick={() => {
                      this.printPdfReceipt(bolletiniBianchi, "download");
                    }}
                  >
                    Download Ticket
                  </div>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      bolletiniBianchi &&
                      bolletiniBianchi.receipt &&
                      bolletiniBianchi.receipt
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
                className="qrCodeImg"
                src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${bolletiniBianchi.barcode}&size=420x420&margin=10`}
                alt=""
              />
              <img
                className="barcodeModal"
                src={`https://barcode.tec-it.com/barcode.ashx?data=${bolletiniBianchi.barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
                alt=""
              />
              <ReactToPrint
                trigger={() => <div className="printBtn">Print</div>}
                content={() => this.componentRef}
                bodyClass="afterprint"
              />
            </div>
          ) : (
            <div className="pagoPaConfirm">
              <i className="fas fa-info-circle"></i>

              <div className="Info">
                <div>
                  <span>Importo:</span>{" "}
                  <span>
                    {parseFloat(
                      this.props.service_id === "PAGF24"
                        ? bolletiniBianchi?.importo
                        : bolletiniBianchi?.Amount
                    ).toLocaleString("it-IT", { minimumFractionDigits: 2 }) +
                      "€"}
                  </span>
                </div>
                <div>
                  <span>Commissione:</span>{" "}
                  <span>
                    {parseFloat(
                      this.props.service_id === "PAGF24"
                        ? bolletiniBianchi?.fee
                        : bolletiniBianchi?.FeesAmount
                    ).toLocaleString("it-IT", { minimumFractionDigits: 2 }) +
                      "€"}
                  </span>
                </div>
                <div>
                  <span>Totale:</span>{" "}
                  <span>
                    {parseFloat(
                      this.props.service_id === "PAGF24"
                        ? parseFloat(bolletiniBianchi?.importo) +
                            parseFloat(bolletiniBianchi?.fee)
                        : bolletiniBianchi?.TotalAmount
                    ).toLocaleString("it-IT", { minimumFractionDigits: 2 }) +
                      "€"}
                  </span>
                </div>
              </div>
              <div className="Buttons">
                <h2>Confermi Pagamento ?</h2>

                <button
                  onClick={() => {
                    if (this.props.service_id === "PAGF24") {
                      this.props.setPayFSaga(
                        this.props?.service_id,
                        bolletiniBianchi?.importo,
                        bolletiniBianchi?.fee,
                        bolletiniBianchi?.pagamento_id
                      );
                      this.props.setBolletiniBianchi(null);
                    } else {
                      this.props.payPagoPa(
                        this.props.service_id,
                        bolletiniBianchi.TotalAmount,
                        bolletiniBianchi.FeesAmount,
                        bolletiniBianchi.CheckVerificationDebtPositionId
                      );
                      this.props.setBolletiniBianchi(null);
                    }
                  }}
                >
                  Si
                </button>
                <button
                  onClick={() => {
                    this.setState({ visible: false });
                  }}
                >
                  No
                </button>
              </div>
            </div>
          ))}
      </Modal>
    );
  }
}
const mpstp = (state) => ({
  bolletiniBianchi: state.auth.bolletiniBianchi,
  skinExtras: state.auth.skinExtras,
});
export default connect(mpstp, AuthActions)(PrintTicketSerap);

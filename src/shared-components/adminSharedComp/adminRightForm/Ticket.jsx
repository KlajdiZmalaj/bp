import React from "react";
import images from "themes/images";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const printPdfReceipt = (data, type) => {
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

class Ticket extends React.Component {
  componentWillUnmount() {
    this.props.openModalForAdmin(false);
  }
  printDocument() {
    // html2canvas(document.querySelector("#divToPrint")).then((canvas) => {
    //   const pdf = new jsPDF();
    //   const width = pdf.internal.pageSize.width;
    //   const height = pdf.internal.pageSize.height;
    //   const imgData = canvas.toDataURL("image/png");
    //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //   pdf.save("download.pdf");
    // });
  }

  render() {
    const {
      skinExtras,
      paymentsFromCode,
      openModalForAdmin,
      ModalDetails,
    } = this.props;
    return (
      <React.Fragment>
        <div
          className="Close"
          onClick={() => {
            openModalForAdmin(false);
          }}
        >
          <i className="fal fa-times"></i>
        </div>
        <div
          className="printModal"
          id="divToPrint"
          ref={(el) => (this.componentRef = el)}
        >
          <div className="ContainerOfData">
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
                {ModalDetails.agency_name.charAt(0).toUpperCase() +
                  ModalDetails.agency_name.slice(1).toLocaleLowerCase()}
              </span>
              <span className="fontSmall address">
                {ModalDetails.address.charAt(0).toUpperCase() +
                  ModalDetails.address.slice(1).toLocaleLowerCase()}
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
              src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${ModalDetails.barcode}&size=420x420&margin=10`}
              alt=""
            />
            <img
              className="barcodeModal"
              src={`https://barcode.tec-it.com/barcode.ashx?data=${ModalDetails.barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
              alt=""
            />
          </div>

          {/* <div className="Buttons">
            <button className="Buttons--Print">
              <span>PRINT</span>
              <i className="fal fa-print"></i>
            </button>
           
          </div> */}
          <button
            className="printBtn Buttons--Download"
            onClick={this.printDocument}
          >
            <span>DOWNLOAD</span>
            <i className="fal fa-arrow-to-bottom"></i>
          </button>
          <button className="printBtn Buttons--Send">
            <span>Send</span>
            <i className="fal fa-envelope-open"></i>
          </button>
          <ReactToPrint
            trigger={() => (
              <button className="printBtn Buttons--Print">
                <span>PRINT</span>
                <i className="fal fa-print"></i>
              </button>
            )}
            content={() => this.componentRef}
            bodyClass="afterprint"
            // copyStyles="false"
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  skinExtras: state.auth.skinExtras,
  paymentsFromCode: state.auth.paymentsFromCode,
  ModalDetails: state.auth.ModalDetails,
});
export default connect(mapsStateToProps, { ...AuthActions })(Ticket);

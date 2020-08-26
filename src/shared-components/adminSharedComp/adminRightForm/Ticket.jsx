import React from "react";
import images from "themes/images";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";

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

const styles = {
  printModal: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "98vh",
    height: "100%",
    padding: " 0 15px",
    position: "fixed",
    top: "71px",
    right: "0",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "99vh",
    border: " 1px solid #ebeced",
    paddingRight: "10px",
  },
};

const mapsStateToProps = (state) => ({
  skinExtras: state.auth.skinExtras,
  paymentsFromCode: state.auth.paymentsFromCode,
  ModalDetails: state.auth.ModalDetails,
});
export default connect(mapsStateToProps, { ...AuthActions })(Ticket);

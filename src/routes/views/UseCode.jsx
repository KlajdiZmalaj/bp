import React from "react";
import ReactToPrint from "react-to-print";
import { Header, Overview, Azioni } from "shared-components";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import images from "themes/images";
class UseCode extends React.Component {
  state = {
    inputVal: "",
    popUpViz: false,
  };
  togglePopUp = (popUpViz) => {
    this.setState({ popUpViz });
  };
  inputHandler = (e) => {
    this.setState({ inputVal: e.target.value });
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let btn = document.querySelector(".input-group-append");
      btn.click();
    }
  };
  componentDidMount() {
    let input = document.querySelector(".form-control");
    input.focus();
  }
  render() {
    const { inputVal, popUpViz } = this.state;
    const { paymentsFromCode } = this.props;
    // console.log("paymentsFromCode", paymentsFromCode, inputVal);
    return (
      <div>
        <Header></Header>
        <Overview></Overview>
        <div className="container-fluid overview ">
          <Azioni active="use-code"></Azioni>
          <div className="panels-container">
            <div className="sort-annunci max-width border-0 mb-0">
              <h1 className="heading-tab mx-auto mb-0">
                Utilizza codice VPTPlus
              </h1>
            </div>
            <div className="row no-gutters max-width">
              <div className="col-md-12 carica-conto">
                <p className="text-center">
                  Scrivi il codice o leggilo con apposito lettore
                </p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    onChange={(e) => {
                      this.inputHandler(e);
                    }}
                    onKeyPress={this.handleKeyPress}
                    className="form-control"
                  />
                  <div
                    className="input-group-append"
                    onClick={() => {
                      this.props.getCodiceTicket(inputVal);
                      this.togglePopUp(true);
                    }}
                  >
                    <span className="input-group-text">
                      <i className="fal fa-check"></i>Esegui
                    </span>
                  </div>
                </div>
                <a href="/#" className="mx-auto d-block mt-5">
                  <img
                    className="mx-auto d-block"
                    src="img/redCancek.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          {popUpViz && (
            <React.Fragment>
              <div className={"popUpPrint"}>
                <div className="closeP">
                  <i
                    className="fal fa-times"
                    onClick={() => {
                      this.togglePopUp(false);
                    }}
                  ></i>
                </div>
                {Object.keys(paymentsFromCode).length < 1 ? (
                  <React.Fragment>
                    <h2>Codice non valido</h2>
                    <i className="fal fa-exclamation-triangle warning"></i>
                  </React.Fragment>
                ) : (
                  <div
                    className="printModal"
                    ref={(el) => (this.componentRef = el)}
                  >
                    <div className="headerModal">
                      <img className="logo" src={images.logo} alt="" />
                      <span className="superSmall text-bold">
                        MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
                      </span>
                      <span className="superSmall">
                        V.le XXIII Settembre 1845 n. 67 Rimini (RN) Italia
                      </span>
                      <span className="superSmall link">
                        www.bpoint.store - info@bpoint.store
                      </span>
                      <span className="superSmall ">Tel: +39 0541 087890</span>
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: paymentsFromCode.receipt

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
                      src={`https://barcode.tec-it.com/barcode.ashx?data=${inputVal}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
                      alt=""
                    />
                    <ReactToPrint
                      trigger={() => <div className="printBtn">Print</div>}
                      content={() => this.componentRef}
                      bodyClass="afterprint"
                      // copyStyles="false"
                    />
                  </div>
                )}
              </div>
              <div
                className="backDrop"
                onClick={() => {
                  this.togglePopUp(false);
                }}
              ></div>
            </React.Fragment>
          )}
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  paymentsFromCode: state.auth.paymentsFromCode,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  UseCode
);

import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import images from "../../themes/images";
import ReactToPrint from "react-to-print";

class ModulePopUp4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceMobile: this.props.serviceSelected,
      tel_no: "",
      barcode: "21312",
      toPrint: false,
      confermaMsg: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  hideAlert = () => {
    this.props.setRechargeMobile({});
  };
  setPrint = (val) => {
    this.setState({ toPrint: val });
  };
  handleChange(event) {
    this.setState({ tel_no: event.target.value });
  }

  changeService = (service) => {
    this.setState({ serviceMobile: service });
  };

  handleSubmit(service_id, tel_no) {
    this.props.getRechargeMobile(service_id, tel_no);
  }

  addNr = (nr) => {
    this.setState({ tel_no: this.state.tel_no.concat(nr) });
  };
  clear = () => {
    this.setState({ tel_no: "" });
  };

  render() {
    const { service_s, rechargeMobile, service } = this.props;
    // const {serviceType}=this.props;
    // console.log("rechargeMobile", rechargeMobile.wallet, service_s);

    const { serviceMobile, tel_no, toPrint } = this.state;
    // const {confermaMsg}=this.state
    // const arr = {
    //   message: "User transactions fetched successfully",
    //   receipt:
    //     " \n RICARICA VODAFONE\n \nTerminalID:             IT016546\n Date:                 17.01.2020\nTime:                   12:20:03\n Trace-Nr.:                103503\nReceipt-Nr.:                5343\n\n--------------------------------\n Codice Transazione\n 97732011\n\nHai acquistato Giga Ricarica 5.\nhai 3 Giga validi per un mese e\ndi ricarica.\nCon Giga Ricarica 10, a 10 euro\nGiga validi per un mese e 9 euro\nricarica.\nI 3 Giga sono validi\nper un mese e si disattivano\nin automatico.\nRiceverai un SMS\n di conferma dell'acquisto e\nsuccessivamente l'SMS di con\nferm dell'attivazione dei 3 Gi\n ga.    I 3 Giga non sono cumulab\nili   con eventuali Giga residui\ndi unGiga Ricarica acquistata e\nntro igiorno precedente. Per inf\n ormazi  vai su voda.it/gigaricar\n ica       Scontrino non fiscale.\n \n NUMERO DI TELEFONO\n - 3406148006 -\n Importo 10 Euro\n \nLA RICARICA VERRA'\n ACCREDITATA ENTRO 24 OR\n E.     Per assistenza chiama il\n190         o vai su www.190.it\nIVA ASSOLTA AI SENSI DELL\n 'EX   ART.74 co.1,lett.d> DPR 63\n 3/72     da Vodafone Italia S.p.\n A            P.Iva 08539010010\n Operazione eseguita da Eur\n onet   Pay ' Transaction service\nsrl         P.Iva 05445540965\n\nTRANSAZIONE ESEGUITA\n\r\n\r\n",
    //   barcode: "0000073721475",
    //   wallet: "983.00",
    // };
    return (
      <div className="modulePopUP modulePopUP1 telRechanrge">
        <div className="module container-fluid max-width_modulePopUP max-width_modulePopUP-carrier">
          <div className="row">
            <div className="col-7 leftCol_Module">
              <div className="row">
                <div className="col-3 p-0">
                  <table className="LeftSide-BTNs" data-aos="flip-left">
                    <tbody>
                      <tr>
                        <td className="carrierLogo" colSpan="3">
                          <img src="img/TIM_logo_2016.svg" alt="" />
                        </td>
                      </tr>
                      {(service_s.services || []).map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className={
                              item.service_id.toString() ===
                              serviceMobile.service_id.toString()
                                ? "active"
                                : ""
                            }
                            onClick={() => this.changeService(item)}
                          >
                            <td className="CarrierPrice">
                              {/* 5 <sup>+1</sup> */}
                              {item.cost}
                            </td>
                            <td className="CurrencyTD ">
                              <p className="Currency">Euro</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="col-9 ">
                  <div className="rightCarrierCOL" data-aos="flip-right">
                    {this.state.confermaMsg && (
                      <div className="confermaMsg animated bounce">
                        <div className="info">
                          Stai eseguiendo una ricarica da €
                          {serviceMobile.cost.toString()}. <br /> Confermi?
                        </div>
                        <div className="buttons">
                          <button
                            onClick={() => {
                              this.handleSubmit(
                                serviceMobile.service_id,
                                tel_no
                              );
                              this.setPrint(true);
                              this.setState({ confermaMsg: false });
                            }}
                          >
                            Si
                          </button>
                          <button
                            onClick={() => {
                              this.setState({ confermaMsg: false });
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="row no-gutters">
                      <h4>{serviceMobile.name}</h4>
                    </div>

                    {service.type.toString() === "1" && (
                      <div className="row no-gutters">
                        <h5>INSERIRE IL NUMERO DI TELEFONO DA RICARICARE</h5>
                      </div>
                    )}
                    {service.type.toString() === "1" && (
                      <div className="row no-gutters">
                        <input
                          type="text"
                          className="displayedVal text-center"
                          value={this.state.tel_no}
                          onChange={this.handleChange}
                          placeholder="_ _ _ _ _ _ _ _ _ "
                          // disabled
                        />
                      </div>
                    )}
                    <div className="row numpadCarrier">
                      {service.type.toString() === "1" && (
                        <div className="col-8">
                          <table>
                            <tbody>
                              <tr>
                                <td id="num1" onClick={() => this.addNr(1)}>
                                  1
                                </td>
                                <td id="num2" onClick={() => this.addNr(2)}>
                                  2
                                </td>
                                <td id="num3" onClick={() => this.addNr(3)}>
                                  3
                                </td>
                              </tr>
                              <tr>
                                <td id="num4" onClick={() => this.addNr(4)}>
                                  4
                                </td>
                                <td id="num5" onClick={() => this.addNr(5)}>
                                  5
                                </td>
                                <td id="num6" onClick={() => this.addNr(6)}>
                                  6
                                </td>
                              </tr>
                              <tr>
                                <td id="num7" onClick={() => this.addNr(7)}>
                                  7
                                </td>
                                <td id="num8" onClick={() => this.addNr(8)}>
                                  8
                                </td>
                                <td id="num9" onClick={() => this.addNr(9)}>
                                  9
                                </td>
                              </tr>
                              <tr>
                                <td id="num0" onClick={() => this.addNr(0)}>
                                  0
                                </td>
                                <td id="numC" onClick={this.clear}>
                                  C
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div
                        className={
                          "col-4 " +
                          (service.type.toString() === "1" ? "" : "notNumbers")
                        }
                        style={{ paddingRight: "30px" }}
                      >
                        <table className="_modulePopUP__tableCarrier">
                          <tbody>
                            <tr>
                              <td
                                onClick={() => {
                                  this.setState({ confermaMsg: true });
                                }}
                              >
                                <h3>esegui</h3>
                                <img src={images.checkSymbol} alt="" />
                              </td>
                            </tr>
                            <tr>
                              <td className="stampCup">
                                <h3>stampa</h3>
                                <p>
                                  pre <br /> scontrino
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="CancelModule"
                                onClick={() => this.props.togglePopUp(false)}
                              >
                                <h3>anulla</h3>
                                <img src={images.close} alt="" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {(rechargeMobile.errors || rechargeMobile.message) && (
                  <div className="messages">
                    <div className="closeM" onClick={this.hideAlert}>
                      chiudi messaggi
                    </div>
                    {rechargeMobile.errors &&
                      Object.keys(rechargeMobile.errors).map((item, index) => {
                        return (
                          <div className="errorM" key={index}>
                            <i className="fad fa-exclamation text-danger"></i>
                            {rechargeMobile.errors[item]}
                          </div>
                        );
                      })}

                    {rechargeMobile.message && (
                      <div className="infoM">
                        <i className="fad fa-info text-info"></i>{" "}
                        {rechargeMobile.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {rechargeMobile.receipt && toPrint && (
              <div className="col-5 rightCol_Module">
                <div className="row no-gutters">
                  <div className="">
                    <div
                      className="printModal p-2"
                      ref={(el) => (this.printT = el)}
                    >
                      <div className="headerModal">
                        <img className="logo" src={images.logo} alt="" />
                        <span className="superSmall text-bold">
                          MAPE{" "}
                          <span>di Hristova Mariya Hristova e C.s.a.s.</span>
                        </span>
                        <span className="superSmall">
                          {this.props.skinExtras.address}
                        </span>
                        <span className="superSmall link">
                          {this.props.skinExtras.mail}
                        </span>
                        <span className="superSmall ">
                          Tel: {this.props.skinExtras.cel}
                        </span>
                        <span className="superSmall tel">
                          P.IVA 03852290406
                        </span>
                        <span className="fontSmall text-bold">
                          {rechargeMobile.agency_name}
                        </span>
                        <span className="fontSmall address">
                          {rechargeMobile.agency_address}
                        </span>
                        {/* <span className="userCel">
                          {" "}
                          Telefono: <b>{rechargeMobile.agency_phone}</b>{" "}
                        </span> */}
                        {/* <span>BPOINT</span> */}
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: rechargeMobile.receipt
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
                        src={`https://barcode.tec-it.com/barcode.ashx?data=${rechargeMobile.barcode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`}
                        alt=""
                      />
                      {/* <h6>OTC srl</h6>
                          <span className="__cupon--body__address">
                            Via Risorgimento n.50 - castel san pietro terme
                          </span>
                          <span className="__cupon--body__phone">234234234</span>
                          <h6>Scontrino Verifica</h6>
                          <h6>
                            Prodotto: TIM <span className="changePrice">30</span> EURO
                          </h6> */}
                      {/* <div className="col-12 _modulePopUP__cupon--table">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Numero di telefono</td>
                                </tr>
                                <tr>
                                  <td className="phoneNum">239423242</td>
                                </tr>
                              </tbody>
                            </table>
                            <table className="import-bottom">
                              <tbody>
                                <tr>
                                  <td>
                                    Importo: <br />€
                                    <span className="changePrice">30</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div> */}
                      <div className="btn-group" role="group">
                        <ReactToPrint
                          trigger={() => (
                            <button type="button" className="stampBtn">
                              <img src={images.checkSymbol} alt="" />
                              <br />
                              Stampa
                            </button>
                          )}
                          content={() => this.printT}
                          bodyClass="afterprint"
                          // copyStyles="false"
                        />

                        <button
                          type="button"
                          className="anullaBtn"
                          onClick={() => {
                            this.setPrint(false);
                          }}
                        >
                          <img src={images.close} alt="" /> <br />
                          Anulla
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_s: state.auth.service_s,
  rechargeMobile: state.auth.rechargeMobile,
  skinExtras: state.auth.skinExtras,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp4
);

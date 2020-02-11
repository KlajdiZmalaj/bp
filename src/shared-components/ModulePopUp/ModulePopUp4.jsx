import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import PrintTicket from "./PrintTicket";
import Bolletino from "./Bolletino";
import images from "../../themes/images";

class ModulePopUp4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceMobile: this.props.serviceSelected,
      tel_no: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ tel_no: event.target.value });
  }

  changeService = service => {
    this.setState({ serviceMobile: service });
  };

  handleSubmit(service_id, tel_no) {
    this.props.getRechargeMobile(service_id, tel_no);
  }

  addNr = nr => {
    this.setState({ tel_no: this.state.tel_no.concat(nr) });
  };
  clear = () => {
    this.setState({ tel_no: "" });
  };

  render() {
    const { service_s, rechargeMobile, serviceType, service } = this.props;
    console.log("rechargeMobile", rechargeMobile.wallet);

    const { serviceMobile, tel_no } = this.state;

    const arr = {
      message: "User transactions fetched successfully",
      receipt:
        " \n RICARICA VODAFONE\n \nTerminalID:             IT016546\n Date:                 17.01.2020\nTime:                   12:20:03\n Trace-Nr.:                103503\nReceipt-Nr.:                5343\n\n--------------------------------\n Codice Transazione\n 97732011\n\nHai acquistato Giga Ricarica 5.\nhai 3 Giga validi per un mese e\ndi ricarica.\nCon Giga Ricarica 10, a 10 euro\nGiga validi per un mese e 9 euro\nricarica.\nI 3 Giga sono validi\nper un mese e si disattivano\nin automatico.\nRiceverai un SMS\n di conferma dell'acquisto e\nsuccessivamente l'SMS di con\nferm dell'attivazione dei 3 Gi\n ga.    I 3 Giga non sono cumulab\nili   con eventuali Giga residui\ndi unGiga Ricarica acquistata e\nntro igiorno precedente. Per inf\n ormazi  vai su voda.it/gigaricar\n ica       Scontrino non fiscale.\n \n NUMERO DI TELEFONO\n - 3406148006 -\n Importo 10 Euro\n \nLA RICARICA VERRA'\n ACCREDITATA ENTRO 24 OR\n E.     Per assistenza chiama il\n190         o vai su www.190.it\nIVA ASSOLTA AI SENSI DELL\n 'EX   ART.74 co.1,lett.d> DPR 63\n 3/72     da Vodafone Italia S.p.\n A            P.Iva 08539010010\n Operazione eseguita da Eur\n onet   Pay ' Transaction service\nsrl         P.Iva 05445540965\n\nTRANSAZIONE ESEGUITA\n\r\n\r\n",
      barcode: "0000073721475",
      wallet: "983.00"
    };
    return (
      <div className="modulePopUP modulePopUP1 telRechanrge">
        <div className="module container-fluid max-width_modulePopUP max-width_modulePopUP-carrier">
          {rechargeMobile.errors &&
            Object.keys(rechargeMobile.errors).map(item => {
              return (
                <div className="error alertError">
                  <span className="closeAlert" onClick={this.hideAlert}>
                    X
                  </span>
                  {rechargeMobile.errors[item]}
                </div>
              );
            })}
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
                      {service_s.map((item, index) => {
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
                                onClick={() =>
                                  this.handleSubmit(
                                    serviceMobile.service_id,
                                    tel_no
                                  )
                                }
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
              </div>
            </div>
            {rechargeMobile.receipt && (
              <div className="col-5 rightCol_Module">
                <div className="row no-gutters">
                  <div className="_modulePopUP__cupon">
                    <div className="_modulePopUP__cupon--header">
                      <img src="img/print.svg" alt="" />
                      <h3>Stampa dello scontrino</h3>
                    </div>
                    <div className="_modulePopUP__cupon--body ">
                      <img src="img/logoGray.svg" alt="" />

                      <div
                        dangerouslySetInnerHTML={{
                          __html: rechargeMobile.receipt
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/\t/g, "\u00a0")
                            .replace(/\n/g, "<br/>")
                        }}
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
                        <button type="button" className="btn btn-secondary">
                          <img src={images.checkSymbol} alt="" />
                          <br />
                          Stampa
                        </button>
                        <button type="button" className="btn btn-secondary">
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

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service_s: state.auth.service_s,
  rechargeMobile: state.auth.rechargeMobile
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp4
);

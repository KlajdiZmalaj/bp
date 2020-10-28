import React, { Fragment } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import { BannerColors } from "config/index";

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
      changeInput: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  range(start, end) {
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(i);
    }
    return array;
  }
  componentDidMount() {
    if (this.state?.serviceMobile?.service_id.toString() === "BGM001") {
      if (parseInt(this.state.serviceMobile?.cost) === 0) {
        this.changeService({
          cost: "10.00",
          name: "BGame Voucher",
          service_id: "BGM001",
          type: "1",
        });
      }
    }
  }
  componentDidUpdate() {
    if (this.state.serviceMobile?.service_id.toString() === "BGM001") {
      if (parseInt(this.state.serviceMobile?.cost) === 0) {
        this.changeService({
          cost: "10.00",
          name: "BGame Voucher",
          service_id: "BGM001",
          type: "1",
        });
      }
    }
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
    if (this.props.service_s.id === "BGAM") {
      this.props.getBgameVoucherReq(service_id, tel_no);
    } else {
      this.props.getRechargeMobile(service_id, tel_no);
    }
  }

  addNr = (nr) => {
    if (nr === ".") {
      this.setState({
        tel_no: this.state.tel_no.includes(",")
          ? this.state.tel_no
          : this.state.tel_no.concat(","),
      });
    } else {
      this.setState({ tel_no: this.state.tel_no.concat(nr) });
    }
  };
  replaceNr = (nr) => {
    this.setState({ tel_no: nr.toString() });
  };
  clearOne = () => {
    this.setState((state) => ({ tel_no: state.tel_no.slice(0, -1) }));
  };
  clear = () => {
    this.setState({ tel_no: "" });
  };
  componentWillUnmount() {
    this.setState({ changeInput: false });
  }
  render() {
    const { service_s, rechargeMobile, service } = this.props;
    // const {serviceType}=this.props;
    // console.log("rechargeMobile", rechargeMobile.wallet, service_s);
    const BgameServices = [
      {
        cost: "10.00",
        name: "BGame Voucher",
        service_id: "BGM001",
        type: "1",
      },
      {
        cost: "25.00",
        name: "BGame Voucher",
        service_id: "BGM001",
        type: "1",
      },
      {
        cost: "50.00",
        name: "BGame Voucher",
        service_id: "BGM001",
        type: "1",
      },
      {
        cost: "100.00",
        name: "BGame Voucher",
        service_id: "BGM001",
        type: "1",
      },
    ];
    const { serviceMobile, tel_no, toPrint, changeInput } = this.state;
    //console.log("service", service_s, service, serviceMobile);
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
        <div
          className={`leftCol_Module Popup4 ${
            this.props.serviceType === "SCMS"
              ? "game"
              : service.type.toString() === "0" || service_s.id === "BGAM"
              ? "small"
              : ""
          }`}
        >
          <div className="row">
            {this.state.confermaMsg && (
              <div className="confermaMsg animated bounce">
                <div className="info">
                  Stai eseguiendo una ricarica da €
                  {service_s.id === "BGAM"
                    ? !this.state.changeInput
                      ? serviceMobile.cost
                      : tel_no
                    : serviceMobile.cost}
                  . <br /> Confermi?
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      this.handleSubmit(
                        serviceMobile.service_id,
                        service.type.toString() === "1"
                          ? service_s.id === "BGAM" && !this.state.changeInput
                            ? serviceMobile.cost
                            : tel_no
                          : null
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
            <div className="Close">
              <span
                className="CloseButton"
                onClick={() => this.props.togglePopUp(false)}
              >
                <img src={images.close} alt="" />
              </span>
            </div>
            <div className="Logo">
              <div className="Logo--Help">
                <img src={images[service_s?.id]} alt="" />
              </div>
            </div>
            <div className="ServiceHeader">
              <h4>{service_s.name}</h4>
              {service.type.toString() === "1" && service_s.id !== "BGAM" ? (
                <h5>INSERIRE IL NUMERO DI TELEFONO DA RICARICARE</h5>
              ) : (
                this.props.serviceType === "SCMS" && (
                  <h5>SELEZIONA LE RICARICHE IN BASSO ED ESEGUI</h5>
                )
              )}
            </div>
            {(service.type.toString() === "1" && service_s.id !== "BGAM") ||
            changeInput === true ? (
              <div className={`NumPadContainer ${changeInput ? "bgm" : ""}`}>
                <div className="NumPd">
                  {!changeInput && <span>+39</span>}
                  <input
                    className={`${changeInput ? "bgm" : ""}`}
                    type="text"
                    placeholder="_ _ _ _ _ _ _"
                    value={
                      changeInput ? `${this.state.tel_no}` : this.state.tel_no
                    }
                    onChange={this.handleChange}
                  />
                  {!changeInput && <i className="fas fa-address-book"></i>}
                </div>
                <div className="Numbers">
                  {service_s.id === "BGAM" ? (
                    <Fragment>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "0", "x"].map((num) => (
                        <span
                          key={num}
                          id={`num${num}`}
                          className={`bgm ${num === "x" ? "x" : ""}`}
                          onClick={() =>
                            num === "x" ? this.clearOne() : this.addNr(num)
                          }
                        >
                          {num === "x" ? (
                            <span>
                              <i className="fal fa-times" />
                              <div className="triangle"></div>
                            </span>
                          ) : (
                            num
                          )}
                        </span>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "CE"].map((num) => (
                        <span
                          key={num}
                          id={`num${num}`}
                          onClick={() =>
                            num === "CE"
                              ? this.clear()
                              : num === "C"
                              ? this.clearOne()
                              : this.addNr(num)
                          }
                        >
                          {num}
                        </span>
                      ))}
                    </Fragment>
                  )}
                </div>
              </div>
            ) : (
              this.props.serviceType === "SCMS" && (
                <div className="GamingBanner">
                  <div
                    className="img"
                    style={{
                      background: `${
                        BannerColors?.[
                          serviceMobile?.service_id.substring(0, 3)
                        ]
                      }`,
                    }}
                  >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img
                      src={
                        images?.[
                          `Service${serviceMobile?.service_id.substring(0, 3)}`
                        ]
                      }
                    />
                  </div>
                </div>
              )
            )}

            <div className="TotalServices">
              <React.Fragment>
                {(service_s.id === "BGAM"
                  ? BgameServices
                  : service_s.services || []
                ).map((item, index) => {
                  return (
                    service_s.id === "BGAM"
                      ? parseFloat(item?.cost) ===
                        parseFloat(serviceMobile.cost)
                      : item.service_id.toString() ===
                        serviceMobile.service_id.toString()
                  ) ? (
                    <div
                      key={`${item.service_id}${index}`}
                      className={`serv ${
                        (
                          service_s.id === "BGAM"
                            ? parseFloat(item?.cost) ===
                              parseFloat(serviceMobile.cost)
                            : item.service_id.toString() ===
                              serviceMobile.service_id.toString()
                        )
                          ? "active"
                          : ""
                      }`}
                      onClick={() => this.changeService(item)}
                    >
                      <div className="Upper">
                        <div className="Upper--Left"></div>
                        <div className="Upper--Right"></div>
                      </div>
                      <div className="Bottom">
                        <span className="Price">{parseInt(item.cost)}</span>
                        <span className="Euro">€</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`${item.service_id}${index}`}
                      className={`serv ${
                        (
                          service_s.id === "BGAM"
                            ? parseFloat(item?.cost) ===
                              parseFloat(serviceMobile.cost)
                            : item.service_id.toString() ===
                              serviceMobile.service_id.toString()
                        )
                          ? "active"
                          : ""
                      }`}
                      onClick={() => this.changeService(item)}
                    >
                      <span className="Price">{parseInt(item.cost)}</span>
                      <span className="Euro">€</span>
                    </div>
                  );
                })}
                {serviceMobile.service_id.toString() === "BGM001" ? (
                  changeInput ? (
                    <div
                      className="serv"
                      onClick={() => {
                        this.setState({ changeInput: false });
                      }}
                    >
                      <span>x</span>
                    </div>
                  ) : (
                    <div
                      className="serv"
                      onClick={() => {
                        this.setState({ changeInput: true });
                      }}
                    >
                      <span>+</span>
                    </div>
                  )
                ) : (
                  service_s.services &&
                  Array.isArray(service_s.services) &&
                  service_s.services.length < 5 &&
                  this.range(service_s.services.length + 1, 5).map((item) => {
                    return <div key={item} className="serv noborder"></div>;
                  })
                )}
              </React.Fragment>
            </div>

            <div className="Confimation Buttons">
              <span className="stampCup">
                <h3>stampa</h3>
                <i className="fal fa-print" />
              </span>

              <span
                onClick={() => {
                  if (this.props.accountInfo?.token) {
                    this.setState({ confermaMsg: true });
                  } else {
                    window.location.hash = "login";
                    this.props.togglePopUp(false);
                    this.setPrint(true);
                  }
                }}
              >
                <h3>esegui</h3>
                <i className="fal fa-check" />
              </span>
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
            <div className=" no-gutters">
              <div className="">
                <div
                  className="printModal p-2"
                  ref={(el) => (this.printT = el)}
                >
                  <div className="headerModal">
                    <img className="logo" src={images.logo} alt="" />
                    <span className="superSmall text-bold">
                      MAPE <span>di Hristova Mariya Hristova e C.s.a.s.</span>
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
                    <span className="superSmall tel">P.IVA 03852290406</span>
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
                    className="qrCodeImg"
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2F${window.location.host}%2F%23%2Fqr%2F${rechargeMobile.barcode}&size=420x420&margin=10`}
                    alt=""
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
    );
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_s: state.auth.service_s,
  rechargeMobile: state.auth.rechargeMobile,
  skinExtras: state.auth.skinExtras,
  accountInfo: state.auth.accountInfo,
  serviceType: state.auth.serviceType,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp4
);

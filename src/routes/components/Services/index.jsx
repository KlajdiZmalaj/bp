import React from "react";
import "./index-service.style.scss";

import images from "themes/images";
class Service extends React.Component {
  constructor() {
    super();

    this.state = {
      isShowing: false
    };
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  state = {
    numero_conto_corrente: "",
    importo: "",
    intestato_a: "",
    causale: "",
    eseguito_da: "",
    via_piazza: "",
    citta: "",
    provincia: ""
  };

  render() {
    const { serviceSelected, servicesItems } = this.props;
    console.log("servicesItems", servicesItems[serviceSelected]);
    const arrayServices = servicesItems[serviceSelected];

    return (
      <div>
        <div
          className={
            "col-md-3 tab-content " + (serviceSelected === "" ? "" : "d-block")
          }
        >
          {/* <!--first ITEMS  Bolletini postali services--> */}
          {arrayServices &&
            arrayServices.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    "tab-pane fade in panel-services " +
                    (serviceSelected !== "#service1" ? "active show" : "")
                  }
                >
                  <table className="bolletini bolletini1">
                    <tbody>
                      <tr>
                        <td onClick={this.openModalHandler}>
                          <img src={images.billDark} alt="" />
                          <p>{item.name}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}

          {/* <!--first ITEMS bollo auto services--> */}
          <div
            id="service2"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service2" ? "active show" : "")
            }
          >
            <table className="bolletini bolletini2">
              <tbody>
                <tr>
                  <td>
                    <img src={images.Car} alt="" />
                    <p>Bollo Auto</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!-- first ITEMS postepay services--> */}
          <div
            id="service3"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service3" ? "active show" : "")
            }
          >
            <table className="bolletini bolletini3">
              <tbody>
                <tr>
                  <td>
                    <img src={images.postpayimg} alt="" />
                    <p>post pay</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--SECOND ITEMS (dirette services)--> */}
          <div
            id="service4"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service4" ? "active show" : "")
            }
          >
            <table className="carriers">
              <tbody>
                <tr>
                  <td>
                    <img src={images.TIM_logo_2016} alt="" />
                    <p>tim</p>
                  </td>
                  <td>
                    <img src={images.vodafone} alt="" />
                    <p>vodafone</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.wind_logo_svg_vector} alt="" />
                    <p>Bollettini rav</p>
                  </td>
                  <td>
                    <img src={images.three_logo} alt="" />
                    <p>tre</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.posteitalia} alt="" />
                    <p>poste mobile</p>
                  </td>
                  <td>
                    <img src={images.coop} alt="" />
                    <p>coop voce</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--THIRD ITEMS (phone,telecom,onnet libra,idt services)--> */}
          <div
            id="service5"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service5" ? "active show" : "")
            }
          >
            <table className="phoneall">
              <tbody>
                <tr>
                  <td>
                    <p>new colombus</p>
                    <h3>
                      5<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <p>new colombus</p>
                    <h3>
                      12<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>easy africa</p>
                    <h3>
                      5<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <p>easy east europe</p>
                    <h3>
                      5<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>easy south africa</p>
                    <h3>
                      5<sup>€</sup>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--4th ITEMS (credit cards services)--> */}
          <div
            id="service6"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service6" ? "active show" : "")
            }
          >
            <table className=" phoneall cardeCredite">
              <tbody>
                <tr>
                  <td>
                    <img src={images.paysafe} alt="" />
                    <h3>
                      10<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.paysafe} alt="" />
                    <h3>
                      25<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.paysafe} alt="" />
                    <h3>
                      50<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.paysafe} alt="" />
                    <h3>
                      100<sup>€</sup>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--5th ITEMS (scommesso sprotive services)--> */}
          <div
            id="service7"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service7" ? "active show" : "")
            }
          >
            <table className=" phoneall cardeCredite">
              <tbody>
                <tr>
                  <td>
                    <img src={images.Stanleybet_logo_international} alt="" />
                    <h3>
                      5<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.Stanleybet_logo_international} alt="" />
                    <h3>
                      10<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.Stanleybet_logo_international} alt="" />
                    <h3>
                      25<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.Stanleybet_logo_international} alt="" />
                    <h3>
                      50<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.Stanleybet_logo_international} alt="" />
                    <h3>
                      100<sup>€</sup>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--6th ITEMS (TVs services)--> */}
          <div
            id="service8"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service8" ? "active show" : "")
            }
          >
            <table className=" phoneall cardeCredite">
              <tbody>
                <tr>
                  <td>
                    <img src={images.Sky_Italia_Logo_2018} alt="" />
                    <h3>
                      15<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.Sky_Italia_Logo_2018} alt="" />
                    <h3>
                      25<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.Sky_Italia_Logo_2018} alt="" />
                    <h3>
                      50<sup>€</sup>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--7th ITEMS (gift card services)--> */}
          <div
            id="service9"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service9" ? "active show" : "")
            }
          >
            <table className=" phoneall giftCards">
              <tbody>
                <tr>
                  <td>
                    <img src={images.Amazon_logo} alt="" />
                    <h3>
                      10<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.Amazon_logo} alt="" />
                    <h3>
                      25<sup>€</sup>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.Amazon_logo} alt="" />
                    <h3>
                      50<sup>€</sup>
                    </h3>
                  </td>
                  <td>
                    <img src={images.Amazon_logo} alt="" />
                    <h3>
                      100<sup>€</sup>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!--8th ITEMS (crypto valute services)--> */}
          <div
            id="service10"
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected === "#service10" ? "active show" : "")
            }
          >
            <table className=" phoneall cryptoValute">
              <tbody>
                <tr>
                  <td>
                    <img src={images.bitcoinorange} alt="" />
                    <p>Bitcoin</p>
                  </td>
                  <td>
                    <img src={images.bitcoingreen} alt="" />
                    <p>Bitcoin cash</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.ethereum} alt="" />
                    <p>etherum </p>
                  </td>
                  <td>
                    <img src={images.riple} alt="" />
                    <p>ripple</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={images.litecoin} alt="" />
                    <p>litecoin </p>
                  </td>
                  <td>
                    <img src={images.dashcoin} alt="" />
                    <p>
                      DASH <br /> DIGITAL CASH
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cancelMobile">
            <img src={images.cancelMob} alt="" />
          </div>
        </div>

        {this.state.isShowing ? (
          <div className="modulePopUP1">
            <div className="module container-fluid max-width_modulePopUP">
              <div className="row">
                <div className="col-12 leftCol_Module">
                  <div className="row no-gutters">
                    <div className="col-12 col-lg-6">
                      <table className="_modulePopUP__table">
                        <tbody>
                          <tr>
                            <td>
                              <div>
                                <img src="img/bill-dark.svg" alt="" />
                                <p>
                                  Bollettini <br /> Bianchi
                                </p>
                              </div>
                            </td>
                            <td>
                              <div>
                                Servizio attivo tutti i giorni <br />
                                ferali dalle 8,30 alle 19,30
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-lg-6">
                      <table className="_modulePopUP__table2">
                        <tbody>
                          <tr>
                            <td>
                              <h3>esegui</h3>
                              <img src="img/check-symbol.svg" alt="" />
                            </td>
                            <td>
                              <h3>esegui</h3>
                              <p>
                                pagemento <br /> diferito
                              </p>
                            </td>
                            <td className="stampCup">
                              <h3>stampa</h3>
                              <p>
                                pre <br /> scontrino
                              </p>
                            </td>
                            <td
                              className="CancelModule"
                              onClick={this.closeModalHandler}
                            >
                              <h3>anulla</h3>
                              <img src="img/close.svg" alt="" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row no-gutters _modulePopUP__body">
                    <div className="col-12 col-lg-9 ">
                      <h2>CONTI CORRENTI POSTALI - Ricevuta di Accredito</h2>
                    </div>
                    <div className="col-12 col-lg-3">
                      <img
                        className="bacnoPosta"
                        src="img/bancoposta.svg"
                        alt=""
                      />
                    </div>
                    <div className="col-12 col-lg-7">
                      <div className="euroboll">
                        <img src="img/euro.svg" alt="" />{" "}
                        <span>sul C/C n.</span>{" "}
                        <input type="text" id="numero_conto_corrente" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-5 mt-2 mt-lg-0">
                      <div className="euroboll">
                        <span>di Euro</span> <input type="text" id="importo" />
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div className="euroboll">
                        <span>INTESTATO A</span>
                      </div>
                    </div>
                    <div className="col-9 ">
                      <div className="euroboll">
                        <input
                          className="py-4 pl-2 mt-2"
                          type="text"
                          id="intestato_a"
                        />
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div className="euroboll">
                        <span>CAUSALE</span>
                      </div>
                    </div>
                    <div className="col-9 ">
                      <div className="euroboll">
                        <input
                          className="py-4 pl-2 mt-3"
                          type="text"
                          id="causale"
                        />
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div className="euroboll">
                        <span>ESEGUITO DA</span>
                      </div>
                    </div>
                    <div className="col-9 ">
                      <div className="euroboll">
                        <input
                          className="py-1 pl-2 mt-3"
                          type="text"
                          id="eseguito_da"
                        />
                      </div>
                    </div>

                    <div className="col-3 ">
                      <div className="euroboll">
                        <span>VIA-PIAZZA</span>
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="euroboll">
                        <input
                          className="py-1 pl-2 mt-3 mb-3"
                          type="text"
                          id="via_piazza"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="euroboll">
                        <input
                          className="py-1 pl-2 mt-3 mb-3"
                          type="text"
                          id="citta"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="euroboll">
                        <input
                          className="py-1 pl-2 mt-3 mb-3"
                          type="text"
                          id="provincia"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="euroboll">
                        <span>CONDIZIONI</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="euroboll">
                        <div className="contitions-boll">
                          <p>
                            CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE
                            SERVIZI POSTALI PROFILI NORMATIVI
                          </p>
                          <p>
                            Il pagamento dei bollettini postali è un servizio di
                            pagamento per il cui esercizio professionale è
                            necessaria un'apposita autorizzazione rilasciata
                            dalla Banca d'Italia. In particolare, l'articolo
                            114-sexies del Testo unico bancario (d.lgs.
                            385/1993) riserva la prestazione di servizi di
                            pagamento alle banche, agli istituti di moneta
                            elettronica, a Poste Italiane Spa e agli Istituti di
                            Pagamento (c.d. “prestatori di servizi di
                            pagamento”, PSP)
                          </p>
                          .
                          <p>
                            I soggetti che offrono alla clientela il servizio
                            “Pagamento bollettini di conto corrente” devono
                            operare o come prestatori di servizi di pagamento
                            oppure sulla base di un contratto con un prestatore
                            di servizi di pagamento autorizzato. Lo stesso vale
                            anche nel caso di soggetti, diversi da Poste
                            Italiane, abilitati all'offerta di servizi postali;
                            la sola autorizzazione e/o la licenza rilasciata dal
                            Ministero dello Sviluppo Economico per i servizi
                            postali non abilita quindi tali soggetti allo
                            svolgimento del servizio 'Pagamento bollettini
                            postali'.
                          </p>
                          <p>
                            1. OGGETTO E DESCRIZIONE I servizi inclusi nella
                            sezione vengono evasi in collaborazione con Mr.Pay
                            Srl. Il cliente affiliato, una volta attivato
                            l'account a lui riservato, per utilizzare il
                            servizio di pagamento utenze dovrà seguire le
                            istruzioni contenute nella pagina dedicata.
                          </p>
                          <p>
                            La funzione “Prodotti Postali” permette ai Clienti
                            Affiliati, di inviare a Mr.Pay Srl la richiesta di
                            effettuare il pagamento di bollettini postali
                            mediante addebito sul Borsellino Elettronico
                            prepagato dell' importo del bollettino da pagare
                            sommato ai relativi diritti postali e commissioni.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-5 rightCol_Module">
                  <div className="row no-gutters">
                    <div className="_modulePopUP__cupon">
                      <div className="_modulePopUP__cupon--header">
                        <img src="img/print.svg" alt="" />
                        <h3>Stampa dello scontrino</h3>
                      </div>
                      <div className="_modulePopUP__cupon--body">
                        <img src="img/logoGray.svg" alt="" />
                        <h6>OTC srl</h6>
                        <span className="__cupon--body__address">
                          Via Risorgimento n.50 - castel san pietro terme
                        </span>
                        <span className="__cupon--body__phone">234234234</span>
                        <h4>SCONTRINO VERIFICA</h4>
                        <h3>Prodotto: Bollettini Bianchi</h3>
                      </div>
                      <div className="_modulePopUP__cupon--table">
                        <table>
                          <tbody>
                            <tr>
                              <td>CC:</td>
                              <td>123123</td>
                            </tr>
                            <tr>
                              <td>INTESTATARIO:</td>
                              <td>mario rossi</td>
                            </tr>
                            <tr>
                              <td>CAUSALE:</td>
                              <td>MULTA COMUNE</td>
                            </tr>
                            <tr>
                              <td>ESEGUITO DA:</td>
                              <td>BPOINT</td>
                            </tr>
                            <tr>
                              <td>INDIRIZZO:</td>
                              <td>VIA RISORGIMENTO</td>
                            </tr>
                            <tr>
                              <td>cap:</td>
                              <td>70026</td>
                            </tr>
                            <tr>
                              <td>localita:</td>
                              <td>san pietro terme</td>
                            </tr>
                            <tr>
                              <td>provincia:</td>
                              <td>rn</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="import-bottom">
                          <tbody>
                            <tr>
                              <td>
                                IMPORTO: <br />
                                <span>€50</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary">
                          <img src="img/check-symbol.svg" alt="" /> <br />
                          Stampa
                        </button>
                        <button type="button" className="btn btn-secondary">
                          <img src="img/close.svg" alt="" /> <br />
                          Anulla
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Service;

import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import "./index-service.style.scss";
import images from "themes/images";
import { withRouter } from "react-router-dom";
class Service extends React.Component {
  state = {
    numero_conto_corrente: "",
    importo: "",
    intestato_a: "",
    causale: "",
    eseguito_da: "",
    via_piazza: "",
    citta: "",
    provincia: "",
  };

  selectService = (id) => {
    this.props.setServiceId(id);
    this.props.togglePopUp(true);
    this.props.setServiceS(
      this.props.servicesItems[this.props.serviceSelected]
    );
  };

  render() {
    const {
      serviceSelected,
      servicesItems,
      toDisplay,
      togglePopUpP,
    } = this.props;
    const arrayServices = servicesItems[serviceSelected];

    let isLoggedin = false;
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);
    if (data) {
      isLoggedin = true;
    }
    return (
      <React.Fragment>
        <div
          className={"col-md-3 tab-content " + (!toDisplay ? "" : "d-block")}
        >
          {/* <!--first ITEMS  Bolletini postali services--> */}

          <div
            className={
              "tab-pane fade in panel-services " +
              (serviceSelected !== "#service1" ? "active show" : "")
            }
          >
            <table
            // className="
            // bolletini bolletini1"
            >
              <tbody>
                <tr>
                  {arrayServices &&
                    (arrayServices.services || []).map((item, index) => {
                      return (
                        <td
                          onClick={() => {
                            if (!isLoggedin) {
                              this.props.history.push("/login");
                            } else {
                              this.selectService(item);
                            }
                          }}
                          key={index}
                        >
                          <img
                            src={
                              images[item.service_id]
                                ? images[item.service_id]
                                : images[serviceSelected]
                                ? images[serviceSelected]
                                : images["BOLL"]
                            }
                            alt={serviceSelected + "||||" + item.service_id}
                          />
                          <p>{item.name}</p>
                        </td>
                      );
                    })}
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className="cancelMobile"
            onClick={() => {
              togglePopUpP(false);
            }}
          >
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
                                <img src={images.billDark} alt="" />
                                <p>
                                  Bollettini <br /> Bianchi
                                </p>
                              </div>
                            </td>
                            <td>
                              <div>
                                Servizio attivo tutti i giorni <br />
                                feriali dalle 8,30 alle 19,30
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
                                pagemento <br /> differito
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
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
});

export default withRouter(
  connect(mapsStateToProps, { ...MainActions, ...AuthActions })(Service)
);

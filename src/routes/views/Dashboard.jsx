import React from "react";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";
import { Header, Footer, Overview, Azioni } from "../../shared-components";
import { Service } from "routes/components";
import { acquista } from "config";
import images from "../../themes/images";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getServices();
  }

  state = {
    serviceSelected: ""
  };
  changeServce = service => {
    this.setState({ serviceSelected: service });
  };
  render() {
    const { serviceSelected } = this.state;
    const { services } = this.props;
    console.log("serviceSelected", serviceSelected);

    console.log("services", services);

    return (
      <div>
        <div className="container-fluid mobileNav-Content">
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
        {/* overview */}
        <div className="container-fluid overview ">
          <Azioni active="dashboard"></Azioni>

          <div className="panels-container">
            <h1 className="max-width heading-tab">Aquista</h1>
            <div className="row no-gutters max-width">
              <div className="col-md-9 ">
                {Object.keys(services).map((item, index) => {
                  const serv = services[item];
                  return (
                    <div key={index}>
                      <div
                        className="panel-tab"
                        data-toggle="collapse"
                        data-target={"#tab" + item}
                      >
                        <i className="fas fa-dot-circle"></i>
                        <h4>{item}</h4>
                        <img src="img/uparrow.svg" alt="" />
                      </div>

                      <div
                        className="nav nav-tabs panel-content collapse "
                        id={"tab" + item}
                      >
                        {Object.keys(serv).map((service, indexx) => {
                          return (
                            <div
                              data-toggle="tab"
                              key={indexx}
                              onClick={() => this.changeServce(subitem)}
                            >
                              <div className="panel-item">
                                <i className="fas fa-dot-circle"></i>
                                <h4>{service}</h4>
                                <img
                                  className="rightTriangle"
                                  src="img/rightTriangle.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Service serviceSelected={serviceSelected}></Service>

              {/* <!--rigth block where is no selection--> */}
              <div className="col-md-3 pl-3">
                <div
                  className={
                    "nothinSelected  " +
                    (serviceSelected === "" ? "" : "d-none")
                  }
                >
                  <img src={images.click} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--Chat icon botm right corner--> */}
        <div className="chatSticky">
          <img src="img/chatSticky.svg" alt="" />
        </div>
        {/* <!--Module for boletini bianchi--> */}
        <div className="modulePopUP modulePopUP1">
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
                          <td className="CancelModule">
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
                      <img src="img/euro.svg" alt="" /> <span>sul C/C n.</span>{" "}
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-5 mt-2 mt-lg-0">
                    <div className="euroboll">
                      <span>di Euro</span> <input type="text" />
                    </div>
                  </div>

                  <div className="col-3 ">
                    <div className="euroboll">
                      <span>INTESTATO A</span>
                    </div>
                  </div>
                  <div className="col-9 ">
                    <div className="euroboll">
                      <input className="py-4 pl-2 mt-2" type="text" />
                    </div>
                  </div>

                  <div className="col-3 ">
                    <div className="euroboll">
                      <span>CAUSALE</span>
                    </div>
                  </div>
                  <div className="col-9 ">
                    <div className="euroboll">
                      <input className="py-4 pl-2 mt-3" type="text" />
                    </div>
                  </div>

                  <div className="col-3 ">
                    <div className="euroboll">
                      <span>ESEGUITO DA</span>
                    </div>
                  </div>
                  <div className="col-9 ">
                    <div className="euroboll">
                      <input className="py-1 pl-2 mt-3" type="text" />
                    </div>
                  </div>

                  <div className="col-3 ">
                    <div className="euroboll">
                      <span>VIA-PIAZZA</span>
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="euroboll">
                      <input className="py-1 pl-2 mt-3 mb-3" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="euroboll">
                      <input className="py-1 pl-2 mt-3 mb-3" type="text" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="euroboll">
                      <input className="py-1 pl-2 mt-3 mb-3" type="text" />
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
                          necessaria un'apposita autorizzazione rilasciata dalla
                          Banca d'Italia. In particolare, l'articolo 114-sexies
                          del Testo unico bancario (d.lgs. 385/1993) riserva la
                          prestazione di servizi di pagamento alle banche, agli
                          istituti di moneta elettronica, a Poste Italiane Spa e
                          agli Istituti di Pagamento (c.d. “prestatori di
                          servizi di pagamento”, PSP)
                        </p>
                        .
                        <p>
                          I soggetti che offrono alla clientela il servizio
                          “Pagamento bollettini di conto corrente” devono
                          operare o come prestatori di servizi di pagamento
                          oppure sulla base di un contratto con un prestatore di
                          servizi di pagamento autorizzato. Lo stesso vale anche
                          nel caso di soggetti, diversi da Poste Italiane,
                          abilitati all'offerta di servizi postali; la sola
                          autorizzazione e/o la licenza rilasciata dal Ministero
                          dello Sviluppo Economico per i servizi postali non
                          abilita quindi tali soggetti allo svolgimento del
                          servizio 'Pagamento bollettini postali'.
                        </p>
                        <p>
                          1. OGGETTO E DESCRIZIONE I servizi inclusi nella
                          sezione vengono evasi in collaborazione con Mr.Pay
                          Srl. Il cliente affiliato, una volta attivato
                          l'account a lui riservato, per utilizzare il servizio
                          di pagamento utenze dovrà seguire le istruzioni
                          contenute nella pagina dedicata.
                        </p>
                        <p>
                          La funzione “Prodotti Postali” permette ai Clienti
                          Affiliati, di inviare a Mr.Pay Srl la richiesta di
                          effettuare il pagamento di bollettini postali mediante
                          addebito sul Borsellino Elettronico prepagato dell'
                          importo del bollettino da pagare sommato ai relativi
                          diritti postali e commissioni.
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
        {/* <!--Module for boletini auto--> */}
        <div className="modulePopUP modulePopUP2">
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
                              <img src="img/Car.svg" alt="" />
                              <p>
                                Bollettini <br /> Auto
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
                          <td className="CancelModule">
                            <h3>anulla</h3>
                            <img src="img/close.svg" alt="" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row no-gutters _modulePopUP__body">
                  <div className="col-12 py-3">
                    <h2>
                      PAGAMENTO ELETTRONICO BOLLO AUTOVEICOLI E MOTOVEICOLI
                    </h2>
                  </div>
                  {/* <!--Module 2 Title ROW--> */}
                  <div className="col-12 titleModul2">
                    <h4>ESTREMI PAGAMENTO</h4>
                  </div>
                  <div className="col-2 d-none d-md-block">
                    <img src="img/verificaEstr.svg" className="pl-3" alt="" />
                  </div>
                  <div className="col-6 col-md-5">
                    <div className="euroboll ">
                      <span>Conto Correte</span>
                    </div>
                    <div className="euroboll mt-2">
                      <span>Intestato A</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-5">
                    <div className="euroboll">
                      <input type="text" />
                    </div>
                    <div className="euroboll mt-2">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--Module 2 Title ROW--> */}
                  <div className="col-12 titleModul2">
                    <h4>DATI VEICOLO E INTESTATARIO</h4>
                  </div>
                  <div className="col-md-4">
                    <div className="euroboll ">
                      <span>TARGA</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-5 pl-2 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>INTESTATARIO</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-3 pl-2">
                    <div className="euroboll ">
                      <span>Tipo</span>
                      <select>
                        <option>F</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                      <div
                        className="helpModul2"
                        data-toggle="tooltip"
                        title="Select Car Type"
                      >
                        ?
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="euroboll ">
                      <span>CATEGORIA</span>
                      <input type="text" />
                      <div
                        className="helpModul2 py-0"
                        data-toggle="tooltip"
                        title="categoria"
                      >
                        ?
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>CODICE FISCALE</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="euroboll ">
                      <span>INDIRIZZO</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>PROVINCIA</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div className="euroboll ">
                      <span>LOCALITA</span>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>CAP</span>
                      <input type="text" className="w-10" />
                    </div>
                  </div>
                  {/* <!--Module 2 Title ROW--> */}
                  <div className="col-12 titleModul2">
                    <h4>DATI VEICOLO E INTESTATARIO</h4>
                  </div>
                  <div className="col-12 pl-4 undertitleMod">
                    <h6>
                      IL VALORE DI IMPORTO VIENE CALCOLATO DALLA SOMMA DI TASSA
                      + SANZIONI + INTERESSI
                    </h6>
                  </div>
                  <div className="spacerMod"></div>
                  <div className="col-md-3">
                    <div className="euroboll ">
                      <span>IMPORTO</span>
                      <input
                        type="text"
                        style={{ width: "30px" }}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>TASSA</span>
                      <input
                        type="text"
                        style={{ width: "30px" }}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>SANZIONI</span>
                      <input
                        type="text"
                        style={{ width: "30px" }}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2 mt-md-0">
                    <div className="euroboll ">
                      <span>INTERESSI</span>
                      <input
                        type="text"
                        style={{ width: "30px" }}
                        placeholder="0,00"
                      />
                    </div>
                  </div>
                  <div className="spacerMod"></div>
                  <div className="col-md-4">
                    <div className="euroboll ">
                      <span>RIDUZIONE</span>
                      <input type="text" style={{ width: "90px" }} />
                      <div
                        className="helpModul2"
                        data-toggle="tooltip"
                        title="RIDUZIONE"
                      >
                        ?
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="euroboll ">
                      <span>RIDUZIONE</span>
                      <input type="text" style={{ width: "40px" }} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="euroboll ">
                      <span>RIDUZIONE</span>
                      <input type="text" style={{ width: "50px" }} />
                    </div>
                  </div>
                  <div className="col-12 mt-4">
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
                          necessaria un'apposita autorizzazione rilasciata dalla
                          Banca d'Italia. In particolare, l'articolo 114-sexies
                          del Testo unico bancario (d.lgs. 385/1993) riserva la
                          prestazione di servizi di pagamento alle banche, agli
                          istituti di moneta elettronica, a Poste Italiane Spa e
                          agli Istituti di Pagamento (c.d. “prestatori di
                          servizi di pagamento”, PSP)
                        </p>
                        .
                        <p>
                          I soggetti che offrono alla clientela il servizio
                          “Pagamento bollettini di conto corrente” devono
                          operare o come prestatori di servizi di pagamento
                          oppure sulla base di un contratto con un prestatore di
                          servizi di pagamento autorizzato. Lo stesso vale anche
                          nel caso di soggetti, diversi da Poste Italiane,
                          abilitati all'offerta di servizi postali; la sola
                          autorizzazione e/o la licenza rilasciata dal Ministero
                          dello Sviluppo Economico per i servizi postali non
                          abilita quindi tali soggetti allo svolgimento del
                          servizio 'Pagamento bollettini postali'.
                        </p>
                        <p>
                          1. OGGETTO E DESCRIZIONE I servizi inclusi nella
                          sezione vengono evasi in collaborazione con Mr.Pay
                          Srl. Il cliente affiliato, una volta attivato
                          l'account a lui riservato, per utilizzare il servizio
                          di pagamento utenze dovrà seguire le istruzioni
                          contenute nella pagina dedicata.
                        </p>
                        <p>
                          La funzione “Prodotti Postali” permette ai Clienti
                          Affiliati, di inviare a Mr.Pay Srl la richiesta di
                          effettuare il pagamento di bollettini postali mediante
                          addebito sul Borsellino Elettronico prepagato dell'
                          importo del bollettino da pagare sommato ai relativi
                          diritti postali e commissioni.
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

                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary">
                          <img src="img/check-symbol.svg" alt="" />
                          <br />
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
        </div>
        {/* <!--Module for postepay--> */}
        <div className="modulePopUP modulePopUP3">
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
                              <img src="img/postpayimg.svg" alt="" />
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
                          <td className="CancelModule">
                            <h3>anulla</h3>
                            <img src="img/close.svg" alt="" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row no-gutters _modulePopUP__body">
                  <div className="col-12 py-3">
                    <h2>RICARICA POSTEPAY</h2>
                  </div>

                  <div className="col-12 payThumb ">
                    <img
                      src="img/postepayBlue.svg"
                      className="img-fluid"
                      alt=""
                    />
                    <p className="text-center">
                      Attenzione: a causa della normativa sull`antiriciclaggio,
                      l`importo massimo ricaricabile e di Euro 200+ commissioni.
                      Non e possibile effettuare, in una giornata, piu di due
                      ricariche verso la stessa carte Postepay.
                    </p>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 ">
                    <div className="euroboll ">
                      <span className="pr-5">TARGA</span>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 pt-2">
                    <div className="euroboll ">
                      <span className="pr-5">IMPORTO</span>
                    </div>
                  </div>
                  <div className="col-7 pt-2">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 pt-2">
                    <div className="euroboll ">
                      <span className="pr-5">INTESTATARIO</span>
                    </div>
                  </div>
                  <div className="col-7 pt-2">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 pt-2">
                    <div className="euroboll ">
                      <span className="pr-5">COD FISC INTESTATARIO</span>
                    </div>
                  </div>
                  <div className="col-7 pt-2">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 pt-2">
                    <div className="euroboll ">
                      <span className="pr-5">ORDINANTE</span>
                    </div>
                  </div>
                  <div className="col-7 pt-2">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}
                  <div className="col-5 pt-2">
                    <div className="euroboll ">
                      <span className="pr-5">COD FISC ORDINANTE</span>
                    </div>
                  </div>
                  <div className="col-7 pt-2">
                    <div className="euroboll ">
                      <input type="text" />
                    </div>
                  </div>
                  {/* <!--module 3 1 row--> */}

                  <div className="col-12 mt-4">
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
                          necessaria un'apposita autorizzazione rilasciata dalla
                          Banca d'Italia. In particolare, l'articolo 114-sexies
                          del Testo unico bancario (d.lgs. 385/1993) riserva la
                          prestazione di servizi di pagamento alle banche, agli
                          istituti di moneta elettronica, a Poste Italiane Spa e
                          agli Istituti di Pagamento (c.d. “prestatori di
                          servizi di pagamento”, PSP)
                        </p>
                        .
                        <p>
                          I soggetti che offrono alla clientela il servizio
                          “Pagamento bollettini di conto corrente” devono
                          operare o come prestatori di servizi di pagamento
                          oppure sulla base di un contratto con un prestatore di
                          servizi di pagamento autorizzato. Lo stesso vale anche
                          nel caso di soggetti, diversi da Poste Italiane,
                          abilitati all'offerta di servizi postali; la sola
                          autorizzazione e/o la licenza rilasciata dal Ministero
                          dello Sviluppo Economico per i servizi postali non
                          abilita quindi tali soggetti allo svolgimento del
                          servizio 'Pagamento bollettini postali'.
                        </p>
                        <p>
                          1. OGGETTO E DESCRIZIONE I servizi inclusi nella
                          sezione vengono evasi in collaborazione con Mr.Pay
                          Srl. Il cliente affiliato, una volta attivato
                          l'account a lui riservato, per utilizzare il servizio
                          di pagamento utenze dovrà seguire le istruzioni
                          contenute nella pagina dedicata.
                        </p>
                        <p>
                          La funzione “Prodotti Postali” permette ai Clienti
                          Affiliati, di inviare a Mr.Pay Srl la richiesta di
                          effettuare il pagamento di bollettini postali mediante
                          addebito sul Borsellino Elettronico prepagato dell'
                          importo del bollettino da pagare sommato ai relativi
                          diritti postali e commissioni.
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

                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary">
                          <img src="img/check-symbol.svg" alt="" />
                          <br />
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
        </div>
        {/* <!--Module for carriers (TIM)--> */}
        <div className="modulePopUP modulePopUP4">
          <div className="module container-fluid max-width_modulePopUP max-width_modulePopUP-carrier">
            <div className="row">
              <div className="col-12 leftCol_Module">
                <div className="row">
                  <div className="col-2 p-0">
                    <table className="LeftSide-BTNs" data-aos="flip-left">
                      <tbody>
                        <tr>
                          <td className="carrierLogo" colSpan="3">
                            <img src="img/TIM_logo_2016.svg" alt="" />
                          </td>
                        </tr>
                        <tr>
                          <td className="CarrierPrice">
                            5 <sup>+1</sup>
                          </td>
                          <td className="CurrencyTD ">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>

                        <tr>
                          <td className="CarrierPrice">
                            9 <sup>+1</sup>
                          </td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="CarrierPrice">15</td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="CarrierPrice">20 </td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                        <tr className="active">
                          <td className="CarrierPrice">30</td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="CarrierPrice">50 </td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                        <tr>
                          <td className="CarrierPrice">100</td>
                          <td className="CurrencyTD">
                            <p className="Currency">Euro</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-10 ">
                    <div className="rightCarrierCOL" data-aos="flip-right">
                      <div className="row no-gutters">
                        <h4>
                          TIM <span className="changePrice">30</span> EURO
                        </h4>
                      </div>
                      <div className="row no-gutters">
                        <h5>INSERIRE IL NUMERO DI TELEFONO DA RICARICARE</h5>
                      </div>
                      <div className="row no-gutters">
                        <input
                          type="text"
                          className="displayedVal text-center"
                          placeholder="_ _ _ _ _ _ _ _ _ "
                          disabled
                        />
                      </div>
                      <div className="row numpadCarrier">
                        <div className="col-8">
                          <table>
                            <tbody>
                              <tr>
                                <td id="num1">1</td>
                                <td id="num2">2</td>
                                <td id="num3">3</td>
                              </tr>
                              <tr>
                                <td id="num4">4</td>
                                <td id="num5">5</td>
                                <td id="num6">6</td>
                              </tr>
                              <tr>
                                <td id="num7">7</td>
                                <td id="num8">8</td>
                                <td id="num9">9</td>
                              </tr>
                              <tr>
                                <td id="num0">0</td>
                                <td id="numC">C</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-4" style={{ paddingRight: "30px" }}>
                          <table className="_modulePopUP__tableCarrier">
                            <tbody>
                              <tr>
                                <td>
                                  <h3>esegui</h3>
                                  <img src="img/check-symbol.svg" alt="" />
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
                                <td className="CancelModule">
                                  <h3>anulla</h3>
                                  <img src="img/close.svg" alt="" />
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
              <div className="col-5 rightCol_Module">
                <div className="row no-gutters">
                  <div className="_modulePopUP__cupon">
                    <div className="_modulePopUP__cupon--header">
                      <img src="img/print.svg" alt="" />
                      <h3>Stampa dello scontrino</h3>
                    </div>
                    <div className="_modulePopUP__cupon--body ">
                      <img src="img/logoGray.svg" alt="" />
                      <h6>OTC srl</h6>
                      <span className="__cupon--body__address">
                        Via Risorgimento n.50 - castel san pietro terme
                      </span>
                      <span className="__cupon--body__phone">234234234</span>
                      <h6>Scontrino Verifica</h6>
                      <h6>
                        Prodotto: TIM <span className="changePrice">30</span>{" "}
                        EURO
                      </h6>
                      <div className="col-12 _modulePopUP__cupon--table">
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
                      </div>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary">
                          <img src="img/check-symbol.svg" alt="" />
                          <br />
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
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  services: state.main.services
});

export default connect(mapsStateToProps, MainActions)(Dashboard);

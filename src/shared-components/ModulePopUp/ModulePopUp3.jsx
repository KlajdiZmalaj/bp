import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import images from "themes/images";

class ModulePopUp3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      importo: "",
      user_id: "",
      intestazione: "",
      codice_fiscale_intestatario: "",
      ordinante: "",
      codice_fiscale_ordinante: "",
      numero_postepay: ""
    };

    this.handleChangeImporto = this.handleChangeImporto.bind(this);
    this.handleChangeUser_id = this.handleChangeUser_id.bind(this);
    this.handleChangeIntestazione = this.handleChangeIntestazione.bind(this);
    this.handleChangeCfIntestazione = this.handleChangeCfIntestazione.bind(
      this
    );
    this.handleChangeOrdinante = this.handleChangeOrdinante.bind(this);
    this.handleChangeCfOrdinante = this.handleChangeCfOrdinante.bind(this);
    this.handleChangeNrPostepay = this.handleChangeNrPostepay.bind(this);
  }

  handleChangeImporto(event) {
    this.setState({ importo: event.target.value });
  }
  handleChangeUser_id(event) {
    this.setState({ user_id: event.target.value });
  }
  handleChangeIntestazione(event) {
    this.setState({ intestazione: event.target.value });
  }
  handleChangeCfIntestazione(event) {
    this.setState({ codice_fiscale_intestatario: event.target.value });
  }
  handleChangeOrdinante(event) {
    this.setState({ ordinante: event.target.value });
  }
  handleChangeCfOrdinante(event) {
    this.setState({ codice_fiscale_ordinante: event.target.value });
  }
  handleChangeNrPostepay(event) {
    this.setState({ numero_postepay: event.target.value });
  }
  handleSubmit = service_id => {
    const {
      importo,
      user_id,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay
    } = this.state;

    console.log(
      " service_id,",
      service_id,
      importo,
      user_id,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay
    );
    // this.props.getPostePay(
    //   service_id,
    //   importo,
    //   user_id,
    //   intestazione,
    //   codice_fiscale_intestatario,
    //   ordinante,
    //   codice_fiscale_ordinante,
    //   numero_postepay
    // );
  };
  render() {
    const { service_id } = this.props;

    const {
      importo,
      user_id,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay
    } = this.state;

    return (
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
                            <img src={images.postpayimg} alt="" />
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
                        <td onClick={() => this.handleSubmit(service_id)}>
                          <h3>esegui</h3>
                          <img src={images.checkSymbol} alt="" />
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
              <div className="row no-gutters _modulePopUP__body">
                <div className="col-12 py-3">
                  <h2>RICARICA POSTEPAY</h2>
                </div>

                <div className="col-12 payThumb ">
                  <img src={images.postepayBlue} className="img-fluid" alt="" />
                  <p className="text-center">
                    Attenzione: a causa della normativa sull`antiriciclaggio,
                    l`importo massimo ricaricabile e di Euro 200+ commissioni.
                    Non e possibile effettuare, in una giornata, piu di due
                    ricariche verso la stessa carte Postepay.
                  </p>
                </div>

                <div className="col-5 ">
                  <div className="euroboll ">
                    <span className="pr-5">User</span>
                  </div>
                </div>
                <div className="col-7">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={user_id}
                      onChange={this.handleChangeUser_id}
                    />
                  </div>
                </div>

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">IMPORTO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={importo}
                      onChange={this.handleChangeImporto}
                    />
                  </div>
                </div>

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">INTESTATARIO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={intestazione}
                      onChange={this.handleChangeIntestazione}
                    />
                  </div>
                </div>

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">COD FISC INTESTATARIO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={codice_fiscale_intestatario}
                      onChange={this.handleChangeCfIntestazione}
                    />
                  </div>
                </div>

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">ORDINANTE</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={ordinante}
                      onChange={this.handleChangeOrdinante}
                    />
                  </div>
                </div>

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">COD FISC ORDINANTE</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={codice_fiscale_ordinante}
                      onChange={this.handleChangeCfOrdinante}
                    />
                  </div>
                </div>
                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">Numero Postepay</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={numero_postepay}
                      onChange={this.handleChangeNrPostepay}
                    />
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
                        CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI
                        POSTALI PROFILI NORMATIVI
                      </p>
                      <p>
                        Il pagamento dei bollettini postali è un servizio di
                        pagamento per il cui esercizio professionale è
                        necessaria un'apposita autorizzazione rilasciata dalla
                        Banca d'Italia. In particolare, l'articolo 114-sexies
                        del Testo unico bancario (d.lgs. 385/1993) riserva la
                        prestazione di servizi di pagamento alle banche, agli
                        istituti di moneta elettronica, a Poste Italiane Spa e
                        agli Istituti di Pagamento (c.d. “prestatori di servizi
                        di pagamento”, PSP)
                      </p>
                      .
                      <p>
                        I soggetti che offrono alla clientela il servizio
                        “Pagamento bollettini di conto corrente” devono operare
                        o come prestatori di servizi di pagamento oppure sulla
                        base di un contratto con un prestatore di servizi di
                        pagamento autorizzato. Lo stesso vale anche nel caso di
                        soggetti, diversi da Poste Italiane, abilitati
                        all'offerta di servizi postali; la sola autorizzazione
                        e/o la licenza rilasciata dal Ministero dello Sviluppo
                        Economico per i servizi postali non abilita quindi tali
                        soggetti allo svolgimento del servizio 'Pagamento
                        bollettini postali'.
                      </p>
                      <p>
                        1. OGGETTO E DESCRIZIONE I servizi inclusi nella sezione
                        vengono evasi in collaborazione con Mr.Pay Srl. Il
                        cliente affiliato, una volta attivato l'account a lui
                        riservato, per utilizzare il servizio di pagamento
                        utenze dovrà seguire le istruzioni contenute nella
                        pagina dedicata.
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
                    <img src={images.print} alt="" />
                    <h3>Stampa dello scontrino</h3>
                  </div>
                  <div className="_modulePopUP__cupon--body">
                    <img src={images.logoGray} alt="" />
                    <h6>OTC srl</h6>
                    <span className="__cupon--body__address">
                      Via Risorgimento n.50 - castel san pietro terme
                    </span>
                    <span className="__cupon--body__phone">234234234</span>

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
  ModulePopUp3
);

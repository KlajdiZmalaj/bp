import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

class Condizioni extends React.Component {
  render() {
    return (
      <div className="col-12">
        <div className="euroboll">
          <div className="contitions-boll">
            <p>
              CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI POSTALI
              PROFILI NORMATIVI
            </p>
            <p>
              Il pagamento dei bollettini postali è un servizio di pagamento per
              il cui esercizio professionale è necessaria un'apposita
              autorizzazione rilasciata dalla Banca d'Italia. In particolare,
              l'articolo 114-sexies del Testo unico bancario (d.lgs. 385/1993)
              riserva la prestazione di servizi di pagamento alle banche, agli
              istituti di moneta elettronica, a Poste Italiane Spa e agli
              Istituti di Pagamento (c.d. “prestatori di servizi di pagamento”,
              PSP)
            </p>
            .
            <p>
              I soggetti che offrono alla clientela il servizio “Pagamento
              bollettini di conto corrente” devono operare o come prestatori di
              servizi di pagamento oppure sulla base di un contratto con un
              prestatore di servizi di pagamento autorizzato. Lo stesso vale
              anche nel caso di soggetti, diversi da Poste Italiane, abilitati
              all'offerta di servizi postali; la sola autorizzazione e/o la
              licenza rilasciata dal Ministero dello Sviluppo Economico per i
              servizi postali non abilita quindi tali soggetti allo svolgimento
              del servizio 'Pagamento bollettini postali'.
            </p>
            <p>
              1. OGGETTO E DESCRIZIONE I servizi inclusi nella sezione vengono
              evasi in collaborazione con Mr.Pay Srl. Il cliente affiliato, una
              volta attivato l'account a lui riservato, per utilizzare il
              servizio di pagamento utenze dovrà seguire le istruzioni contenute
              nella pagina dedicata.
            </p>
            <p>
              La funzione “Prodotti Postali” permette ai Clienti Affiliati, di
              inviare a Mr.Pay Srl la richiesta di effettuare il pagamento di
              bollettini postali mediante addebito sul Borsellino Elettronico
              prepagato dell' importo del bollettino da pagare sommato ai
              relativi diritti postali e commissioni.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  Condizioni
);

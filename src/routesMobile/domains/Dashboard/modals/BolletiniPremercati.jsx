import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";

const Input = ({ label, handler }) => (
  <div className="bolletini--inputs__item">
    <div className="label">{label}</div>
    <input
      type="text"
      onChange={(e) => {
        handler(e.target.value);
      }}
    />
  </div>
);

const BolletiniPremercati = ({
  setService,
  activeService,
  services,
  getBolletiniPremercati,
  bolletiniPremercati,
  setBolletiniLoading,
  bolletiniLoading,
  setBolletiniPremercati,
}) => {
  const [cc, setCC] = useState("");
  const [euro, setEuro] = useState("");
  const [esg, setEsg] = useState("");
  const [via, setVia] = useState("");
  const [tipologia, setTipologia] = useState(896);
  const [cap, setCap] = useState("");
  const [citta, setCitta] = useState("");
  const [prov, setProvi] = useState("");
  const [codice, setCodice] = useState("");

  useEffect(() => {
    if (Object.values(bolletiniPremercati).length > 0)
      notification[bolletiniPremercati.errors ? "error" : "success"]({
        message: bolletiniPremercati.message,
        description: Object.values(bolletiniPremercati.errors || {}),
      });
  }, [bolletiniPremercati]);
  useEffect(() => {
    if (bolletiniLoading) {
      notification["info"]({
        message: "Transazione di caricamento...",
      });
    }
  }, [bolletiniLoading]);
  return (
    <div className="bolletini premercati">
      <div className="bolletini--services">
        {services["PRDPST"] &&
          Object.keys(services["PRDPST"]).map((keyBolletines) => {
            return (
              keyBolletines !== "name" &&
              services["PRDPST"][keyBolletines].services.map((item) => {
                return (
                  <div
                    key={item.service_id}
                    onClick={() => {
                      setService(item?.service_id);
                      setBolletiniPremercati({});
                    }}
                    className={
                      "bolletini--services__item" +
                      (activeService === item?.service_id ? " active" : "")
                    }
                  >
                    <img src={images[keyBolletines]} alt="" />
                    <span>{item.name}</span>
                  </div>
                );
              })
            );
          })}
      </div>
      <div className="bolletini--header">Bolletini Premercati</div>
      <div className="bolletini--subh">
        CONTI CORRENTI POSTALI - Ricevuta di Accredito
      </div>
      <div className="bolletini--inputs">
        <Input label="sul C/C n." handler={setCC} />
        <Input label="di Euro" handler={setEuro} />
        <Input label="Codice identificativo!" handler={setCodice} />
        <div className="bolletini--inputs__item">
          <div className="label">Tipologia</div>
          <select
            onChange={(e) => setTipologia(e.target.value)}
            defaultValue="896"
          >
            <option value="896">896</option>
            <option value="674">674</option>
          </select>
        </div>
        <Input label="ESEGUITO DA" handler={setEsg} />
        <Input label="VIA-PIAZZA" handler={setVia} />
        <Input label="Cap" handler={setCap} />
        <Input label="Citta" handler={setCitta} />
        <Input label="Provincia" handler={setProvi} />
      </div>
      <div className="bolletini--condition">
        <div className="bolletini--condition__header">CONDIZIONI</div>
        <div className="bolletini--condition__area">
          CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI POSTALI
          PROFILI NORMATIVI Il pagamento dei bollettini postali è un servizio di
          pagamento per il cui esercizio professionale è necessaria un'apposita
          autorizzazione rilasciata dalla Banca d'Italia. In particolare,
          l'articolo 114-sexies del Testo unico bancario (d.lgs. 385/1993)
          riserva la prestazione di servizi di pagamento alle banche, agli
          istituti di moneta elettronica, a Poste Italiane Spa e agli Istituti
          di Pagamento (c.d. “prestatori di servizi di pagamento”, PSP). I
          soggetti che offrono alla clientela il servizio “Pagamento bollettini
          di conto corrente” devono operare o come prestatori di servizi di
          pagamento oppure sulla base di un contratto con un prestatore di
          servizi di pagamento autorizzato. Lo stesso vale anche nel caso di
          soggetti, diversi da Poste Italiane, abilitati all'offerta di servizi
          postali; la sola autorizzazione e/o la licenza rilasciata dal
          Ministero dello Sviluppo Economico per i servizi postali non abilita
          quindi tali soggetti allo svolgimento del servizio 'Pagamento
          bollettini postali'. 1. OGGETTO E DESCRIZIONE I servizi inclusi nella
          sezione vengono evasi in collaborazione con Mr.Pay Srl. Il cliente
          affiliato, una volta attivato l'account a lui riservato, per
          utilizzare il servizio di pagamento utenze dovrà seguire le istruzioni
          contenute nella pagina dedicata. La funzione “Prodotti Postali”
          permette ai Clienti Affiliati, di inviare a Mr.Pay Srl la richiesta di
          effettuare il pagamento di bollettini postali mediante addebito sul
          Borsellino Elettronico prepagato dell' importo del bollettino da
          pagare sommato ai relativi diritti postali e commissioni.
        </div>
      </div>
      <div className="bolletini--buttons">
        <button
          className={`${bolletiniLoading ? "disable" : ""}`}
          onClick={() => {
            setBolletiniLoading(true);
            getBolletiniPremercati(
              "BOL002",
              cc,
              euro,
              codice,
              parseInt(tipologia),
              esg,
              via,
              cap,
              citta,
              prov,
              () => {},
              setBolletiniLoading
            );
          }}
        >
          Esegui <i className="fal fa-check" aria-hidden="true"></i>
        </button>
        <button className="disable">
          Stampa <span>Pre Scontrino</span>
        </button>
        <button
          onClick={() => {
            setService(null);
            setBolletiniPremercati({});
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
const mstp = ({
  main: { services },
  auth: { bolletiniLoading, bolletiniPremercati },
}) => {
  return {
    services,
    bolletiniLoading,
    bolletiniPremercati,
  };
};
export default connect(mstp, AuthActions)(BolletiniPremercati);

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
  allFavServices,
  toggleFavorite,
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
      <div className="bolletini--header">
        Bolletini Premercati{" "}
        <i
          onClick={() => {
            if (allFavServices.includes("BOLL")) {
              toggleFavorite("BOLL", "remove");
            } else {
              toggleFavorite("BOLL", "set");
            }
          }}
          className={
            "fas fa-star" + (allFavServices.includes("BOLL") ? " active" : "")
          }
          aria-hidden="true"
        ></i>{" "}
      </div>
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
        <div className="bolletini--condition__check">
          <label htmlFor="bollo">
            La persona che hai di fronte non è il intestatario del pagamento del
            bollo
          </label>

          <input id="bollo" type="checkbox" />
          <div></div>
        </div>
        <div className="bolletini--condition__orario">
          <span>ORARI DI SERVIZIO</span>
          <div>Tutti i giorni dalle ore 6:00 alle ore 00:30</div>
        </div>
        <div className="bolletini--condition__warning">
          <span>
            Attenzione! I Bolli Auto delle regioni Friuli-Venezia Giulia, Veneto
            e Sardegna non sono al momento Pagabili.
          </span>
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

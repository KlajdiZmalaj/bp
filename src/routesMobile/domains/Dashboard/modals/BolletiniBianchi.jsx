import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const Input = ({ label, handler, icon, value, iconHandler }) => (
  <div className={"bolletini--inputs__item" + (icon ? " hasIcon" : "")}>
    <div className="label">{label}</div>
    <input
      type="text"
      onChange={(e) => {
        handler(e.target.value);
      }}
      value={value && value}
    />
    {icon && (
      <i
        onClick={() => {
          if (label.includes("Codice")) {
            //barcode camera to truee
            iconHandler(true);
          }
        }}
        className={icon}
      />
    )}
  </div>
);

const BolletiniBianchi = ({
  setService,
  activeService,
  services,
  getBolletiniBianchi,
  bolletiniBianchi,
  setBolletiniLoading,
  bolletiniLoading,
  setBolletiniBianchi,
  allFavServices,
  toggleFavorite,
}) => {
  const [cc, setCC] = useState("");
  const [euro, setEuro] = useState("");
  const [intestato, setInt] = useState("");
  const [esg, setEsg] = useState("");
  const [via, setVia] = useState("");
  const [cas, setCasuale] = useState("");
  const [cap, setCap] = useState("");
  const [citta, setCitta] = useState("");
  const [prov, setProvi] = useState("");
  const [barcode, setBarcode] = useState("");
  const [camera, setCamera] = useState(false);
  useEffect(() => {
    if (Object.values(bolletiniBianchi).length > 0)
      notification[bolletiniBianchi.errors ? "error" : "success"]({
        message: bolletiniBianchi.message,
        description: Object.values(bolletiniBianchi.errors || {}),
      });
  }, [bolletiniBianchi]);
  useEffect(() => {
    if (bolletiniLoading) {
      notification["info"]({
        message: "Transazione di caricamento...",
      });
    }
  }, [bolletiniLoading]);
  return (
    <div className="bolletini bianchi">
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
                      setBolletiniBianchi({});
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
      {camera && (
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
              setCamera(false);
            } else setBarcode("Scanning...");
          }}
        />
      )}
      <div className="bolletini--header">
        Bolletini Bianchi{" "}
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
        {barcode}
      </div>
      <div className="bolletini--inputs">
        <Input
          icon={"fal fa-question-circle"}
          label="Scansiona qui il Codice a Barre"
          handler={setBarcode}
          value={barcode}
          iconHandler={setCamera}
        />
        <Input label="sul C/C n." handler={setCC} />
        <Input label="di Euro" handler={setEuro} />
        <Input label="INTESTATO A" handler={setInt} />
        <Input label="CAUSALE" handler={setCasuale} />
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
            getBolletiniBianchi(
              "BOL001",
              cc,
              euro,
              intestato,
              cas,
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
            setBolletiniBianchi({});
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
  auth: { bolletiniLoading, bolletiniBianchi },
}) => {
  return {
    services,
    bolletiniLoading,
    bolletiniBianchi,
  };
};
export default connect(mstp, AuthActions)(BolletiniBianchi);

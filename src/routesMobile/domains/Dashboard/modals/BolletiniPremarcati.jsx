import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import images from "themes/images";
import AuthActions from "redux-store/models/auth";
import { notification } from "antd";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { NewBarcodeScanner as Scanner } from "shared-components";
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

const BolletiniPremercati = ({
  setService,
  activeService,
  services,
  getBolletiniPremercati,
  //bolletiniPremercati,
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
  const [barcode, setBarcode] = useState("");
  const [camera, setCamera] = useState(false);

  let bartcode = barcode;

  const counter1 = bartcode.substring(0, 2); //2shifror
  const codiceIdf = bartcode.substring(2, 2 + parseInt(counter1));

  const counter2 = bartcode.substring(20, 22); //2shifror
  const sulCC = bartcode.substring(22, 22 + parseInt(counter2));

  const counter3 = bartcode.substring(34, 36); //2shifror
  const shuma = bartcode.substring(36, 36 + parseInt(counter3));

  const counter4 = bartcode.substring(46, 47); //1shifror
  const tipologiaB = bartcode.substring(47, 47 + parseInt(counter4));
  const barCodeData = {
    codice_identificativo: codiceIdf,
    importo: shuma
      ? (parseFloat(shuma.toString()) / 100).toString().replace(".", ",")
      : "",
    numero_conto_corrente: sulCC,
    tipologia: tipologiaB,
  };

  // useEffect(() => {
  //   if (bolletiniLoading) {
  //     notification["info"]({
  //       message: "Transazione di caricamento...",
  //     });
  //   }
  // }, [bolletiniLoading]);

  return (
    <div className="bolletini premercati">
      <div className="bolletini--services">
        <div className="wrapperTop">
          {services["PRDPST"] &&
            Object.keys(services["PRDPST"]).map((keyBolletines) => {
              return (
                keyBolletines !== "name" &&
                keyBolletines !== "group" &&
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
      </div>

      {camera && (
        // <BarcodeScannerComponent
        //   onUpdate={(err, result) => {
        //     if (result) {
        //       setBarcode(result.text);
        //       setCamera(false);
        //     } else setBarcode("Scanning...");
        //   }}
        // />
        <Scanner
          onDetected={(e) => {
            if (e?.codeResult?.code?.length > 1) {
              setBarcode(e.codeResult.code);
              setCamera(false);
            }
          }}
        />
      )}

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
      <div className="bolletini--subh">PAGAMENTI</div>
      <div className="bolletini--inputs">
        <Input
          icon={"fal fa-barcode-read"}
          label="Scansiona qui il Codice a Barre"
          handler={setBarcode}
          value={barcode}
          iconHandler={setCamera}
        />
        <Input
          value={barCodeData.numero_conto_corrente}
          label="sul C/C n."
          handler={setCC}
        />
        <Input value={barCodeData.importo} label="di Euro" handler={setEuro} />
        <Input
          value={barCodeData.codice_identificativo}
          label="Codice identificativo!"
          handler={setCodice}
        />
        <div className="bolletini--inputs__item">
          <div className="label">Tipologia</div>
          <select
            onChange={(e) => setTipologia(e.target.value)}
            value={barCodeData.tipologia || "674"}
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
        <button className="disable">Prenota</button>
        <button className="disable">Stampa</button>
        <button
          onClick={() => {
            setService(null);
            setBolletiniPremercati({});
          }}
        >
          Annulla <i className="fal fa-times" aria-hidden="true"></i>
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

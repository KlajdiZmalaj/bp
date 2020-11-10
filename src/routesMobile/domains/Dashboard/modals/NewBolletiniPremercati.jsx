import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { NewBarcodeScanner as Scanner } from "shared-components";
import TopWrapper from "./TopWrapper";
import {
  BolletiniLeftForm,
  BolletiniRightForm,
} from "shared-components/ModulePopUp/BolletiniForms";
import { handleSubmit } from "./SubmitFunct";

import { notification, Form } from "antd";

const BolletinoPremarcati = ({
  setService,
  activeService,
  services,
  setMavRav,
  setPagoPa,
  fetchBolletini,
  bolletiniPremercati,
  bolletiniLoading,
  setBolletiniPremercati,
  allFavServices,
  toggleFavorite,
  form,
}) => {
  const [barcode, setBarcode] = useState("");
  const [camera, setCamera] = useState(false);

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
        <TopWrapper
          activeService={activeService}
          setService={setService}
          services={services}
        />{" "}
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
        <Form>
          <div>
            <BolletiniLeftForm
              barcodeData={barcode}
              mobile
              getFieldDecorator={form.getFieldDecorator}
              getFieldValue={form.getFieldValue}
              service_id={activeService}
            />
            <BolletiniRightForm
              barcodeData={barcode}
              getFieldDecorator={form.getFieldDecorator}
            />
          </div>
        </Form>
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
          onClick={(e) => {
            handleSubmit(
              e,
              activeService,
              form,
              setMavRav,
              setPagoPa,
              fetchBolletini,
              form.resetFields
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
const BolletinoPremarcatiForm = Form.create({ name: "BolletinoPremarcati" })(
  BolletinoPremarcati
);

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
export default connect(mstp, AuthActions)(BolletinoPremarcatiForm);

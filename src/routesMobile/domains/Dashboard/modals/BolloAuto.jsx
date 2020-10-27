import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { NewBarcodeScanner as Scanner } from "shared-components";
import {
  BoloAutoLeftForm,
  BoloAutoRightForm,
} from "shared-components/ModulePopUp/BoloAutoForms";

import { notification, Form } from "antd";
import { handleSubmit } from "./SubmitFunct";

import TopWrapper from "./TopWrapper";

const BolloAuto = ({
  setService,
  activeService,
  services,
  setMavRav,
  setPagoPa,
  fetchBolletini,
  bolletiniBianchi,
  bolletiniLoading,
  setBolletiniBianchi,
  allFavServices,
  toggleFavorite,
  form,
}) => {
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
        BOLO AUTO
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
      <Form>
        <div className="bolletini--inputs">
          <BoloAutoLeftForm
            barcodeData={barcode}
            getFieldDecorator={form.getFieldDecorator}
            getFieldValue={form.getFieldValue}
            mobile
          />
          <BoloAutoRightForm
            barcodeData={barcode}
            getFieldDecorator={form.getFieldDecorator}
          />
        </div>
      </Form>
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
          }}
        >
          Anulla <i className="fal fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
const BolloAutoForm = Form.create({ name: "BolloAuto" })(BolloAuto);

export default connect(
  ({ main: { services }, auth: { bolletiniLoading, bolletiniBianchi } }) => {
    return {
      services,
      bolletiniLoading,
      bolletiniBianchi,
    };
  },
  AuthActions
)(BolloAutoForm);

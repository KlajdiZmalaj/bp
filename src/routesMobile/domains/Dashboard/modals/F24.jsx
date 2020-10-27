import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AuthActions from "redux-store/models/auth";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { NewBarcodeScanner as Scanner } from "shared-components";
import moment from "moment";
import {
  F24LeftForm,
  F24RightForm,
  LineTable,
  LastPartForm,
  SeperateInputs,
  returnCodice,
  setValues,
  clearLineTables,
  calculateSaldoVal,
  returnMotivoDelPagamentoList,
} from "shared-components/ModulePopUp/F24Forms";
import images from "themes/images";
import { notification, Form } from "antd";

import TopWrapper from "./TopWrapper";
const handleSubmit = (e, form, setBokingSep, nrOfRows) => {
  e.preventDefault();
  form.validateFieldsAndScroll((err, values) => {
    let coUf = returnCodice(3, "codice_ufficio");
    let coAt = returnCodice(11, "codice_atto");
    if (!err && coUf && coAt && coUf.length >= 3 && coAt >= 11) {
      setBokingSep(
        "PAGF24",
        values?.person_type,
        values?.via_piazza,
        values?.citta,
        values?.provincia,
        values?.gender,
        values?.vat,
        coUf,
        coAt,
        moment(values?.data_pagamento)?.format("YYYY-MM-DD")
          ? moment(values?.data_pagamento).format("YYYY-MM-DD")
          : null,
        document.querySelector("#saldo_finale")?.value
          ? document.querySelector("#saldo_finale")?.value
          : null,
        JSON.stringify(
          returnMotivoDelPagamentoList(form.getFieldValue, nrOfRows)
        ),
        values?.nome,
        values?.cognome,
        values?.codice_fiscale,
        values?.denominazione,
        values?.partita_iva,
        values?.email,
        values?.phone_number,
        values?.codice_fiscale_optional,
        form.resetFields
      );
    } else {
      notification["error"]({
        message: "Ops...",
        description: "Controlla le tue caselle vuote o accetta le condizioni",
      });
    }
  });
};
const F24 = ({
  setService,
  activeService,
  services,
  setBokingSep,
  bolletiniLoading,
  allFavServices,
  toggleFavorite,
  form,
}) => {
  const [barcode, setBarcode] = useState("");
  const [camera, setCamera] = useState(false);
  const [CodiceUfficio, setCodiceUfficio] = useState("");
  const [classNameCodiceUfficio, setClassNameCodiceUfficio] = useState("");
  const [CodiceAtto, setCodiceAtto] = useState("");
  const [classNameCodiceAtto, setClassNameCodiceAtto] = useState("");
  const [coFiAtUfVis, setCoFiAtUfVis] = useState(false);
  const [moDePaVis, setMoDePaVis] = useState(false);
  const [pagamentoRows, setPagamentoRows] = useState(1);
  const [datPagVis, setDatPagVis] = useState("");
  useEffect(() => {
    const element = document.querySelector("#saldo_finale");
    let saldo = calculateSaldoVal(pagamentoRows, form.getFieldValue);
    if (saldo) {
      element.value = saldo;
    }
  });
  //   useEffect(() => {
  //     if (Object.values(bolletiniBianchi).length > 0)
  //       notification[bolletiniBianchi.errors ? "error" : "success"]({
  //         message: bolletiniBianchi.message,
  //         description: Object.values(bolletiniBianchi.errors || {}),
  //       });
  //   }, [bolletiniBianchi]);
  //   useEffect(() => {
  //     if (bolletiniLoading) {
  //       notification["info"]({
  //         message: "Transazione di caricamento...",
  //       });
  //     }
  //   }, [bolletiniLoading]);
  return (
    <div className="bolletini bianchi f24Mob">
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
        <div>
          <i className="fal fa-receipt"></i> <span>F24</span>
        </div>
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
        ></i>
      </div>
      <div className="bolletini-beforeh">
        <div className="abPart">
          <span>Mod.</span>
          <span>F24</span>
        </div>
        <div>
          <img src={images["agenzia_entrata"]} />
        </div>
        <div>
          <span>Modello di pagamento unificato</span>
          <span>Per l’accredito alla tesoreria competente</span>
        </div>
      </div>
      <div
        onClick={() => {
          setDatPagVis(!datPagVis);
        }}
        className="bolletini--subh"
      >
        <span>Dati Pagatore</span>
        <span>
          <i className={`fal fa-chevron-${!datPagVis ? "down" : "up"}`} />
        </span>
      </div>
      <Form>
        <div className="bolletini--inputs">
          <div className={`DatPag ${datPagVis ? "" : "none"}`}>
            <F24LeftForm
              barcodeData={barcode}
              mobile
              getFieldDecorator={form.getFieldDecorator}
              getFieldValue={form.getFieldValue}
            />
            <F24RightForm
              barcodeData={barcode}
              getFieldDecorator={form.getFieldDecorator}
            />
          </div>

          <div className="SezErrar">
            <div
              className="Vis"
              onClick={() => {
                setCoFiAtUfVis(!coFiAtUfVis);
              }}
            >
              <span>Sezione erario ed altro</span>
              <span>
                <i
                  className={`fal fa-chevron-${!coFiAtUfVis ? "down" : "up"}`}
                />
              </span>
            </div>
            <div className={`Inputs ${coFiAtUfVis ? "" : "none"}`}>
              <span>
                <div>Codice ufficio</div>

                <SeperateInputs
                  number={3}
                  word="codice_ufficio"
                  setStateValue={(value) => {
                    setCodiceUfficio(value);
                  }}
                  setValues={setValues}
                  returnCodice={returnCodice}
                  setStateClass={(value) => {
                    setClassNameCodiceUfficio(value);
                  }}
                  classNameVal={classNameCodiceUfficio}
                />
              </span>
              <span>
                <div>Codice atto</div>
                <SeperateInputs
                  number={11}
                  setValues={setValues}
                  word="codice_atto"
                  setStateValue={(value) => {
                    setCodiceAtto({ codice_atto: value });
                  }}
                  returnCodice={returnCodice}
                  setStateClass={(value) => {
                    setClassNameCodiceAtto({ classNameAtto: value });
                  }}
                  classNameVal={classNameCodiceAtto}
                />
              </span>
            </div>
          </div>
          <div
            className="Vis"
            onClick={() => {
              setMoDePaVis(!moDePaVis);
            }}
          >
            <span>Motivo del pagamento</span>
            <span>
              <i className={`fal fa-chevron-${!moDePaVis ? "down" : "up"}`} />
            </span>
          </div>
          <div className={`MotivoPag ${!moDePaVis ? "none" : ""}`}>
            <div className="Table">
              <div className="RowContainer">
                {[...new Array(pagamentoRows)].map((item, index) => (
                  <div className="Table--Row" key={index}>
                    <LineTable
                      id={index}
                      mobile
                      barcodeData={barcode}
                      getFieldDecorator={form.getFieldDecorator}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="TableActions">
              <div
                onClick={() => {
                  clearLineTables(pagamentoRows, form.setFieldsValue);
                }}
              >
                <i className="fal fa-trash-alt" />
                <span>Svuota tutti i campi</span>
              </div>
              <div
                onClick={() => {
                  setPagamentoRows(pagamentoRows + 1);
                }}
              >
                <span>Aggiungi Riga</span>
                <i className="fal fa-plus" />
              </div>
            </div>
          </div>
          <div className="Data">
            <div className="Head">Estremi Del Versamento</div>
            <div className="Form">
              <LastPartForm
                barcodeData={barcode}
                getFieldDecorator={form.getFieldDecorator}
              />
            </div>
          </div>
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
            handleSubmit(e, form, setBokingSep, pagamentoRows);
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
const F24Form = Form.create({ name: "PagoPa" })(F24);

export default connect(
  ({ main: { services }, auth: { bolletiniLoading, bolletiniBianchi } }) => {
    return {
      services,
      bolletiniLoading,
      bolletiniBianchi,
    };
  },
  AuthActions
)(F24Form);

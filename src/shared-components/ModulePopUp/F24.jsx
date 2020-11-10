import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Checkbox, notification } from "antd";
import Condizioni from "./Condizioni";
import moment from "moment";
import images from "themes/images";
import "./newStyl.css";
import {
  F24LeftForm,
  F24RightForm,
  LineTable,
  LastPartForm,
  SeperateInputs,
  clearLineTables,
  calculateSaldoVal,
  setValues,
  returnMotivoDelPagamentoList,
  returnCodice,
} from "./F24Forms";
class F24 extends React.Component {
  state = {
    condizioniAgreement: true,
    condizioniShow: false,
    motivo_del_pagamento: false,
    codice_fiscale_atto: false,
    nrOfRows: 4,
    codFisInps: "asdasdasd",
    codice_atto: "",
    codice_ufficio: "",
    classNameAtto: null,
    classNameUfficio: null,
  };
  setbarcodeInp = (e) => {
    this.setState({ barcodeInput: e });
    document.getElementById("barcodeInp").focus();
  };
  clearFields = () => {
    this.props.form.resetFields();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      let coUf = returnCodice(3, "codice_ufficio");
      let coAt = returnCodice(11, "codice_atto");
      if (
        !err &&
        this.state.condizioniAgreement &&
        coUf &&
        coAt &&
        coUf.length >= 3 &&
        coAt >= 11
      ) {
        this.props.setBokingSep(
          this.props?.service_id,
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
            returnMotivoDelPagamentoList(
              this.props.form.getFieldValue,
              this.state.nrOfRows
            )
          ),
          values?.nome,
          values?.cognome,
          values?.codice_fiscale,
          values?.denominazione,
          values?.partita_iva,
          values?.email,
          values?.phone_number,
          values?.codice_fiscale_optional,
          this.clearFields
        );
      } else {
        notification["error"]({
          message: "Ops...",
          description: "Controlla le tue caselle vuote o accetta le condizioni",
        });
      }
    });
  };

  componentDidUpdate() {
    const element = document.querySelector("#saldo_finale");
    let saldo = calculateSaldoVal(
      this.state.nrOfRows,
      this.props.form.getFieldValue
    );
    if (saldo) {
      element.value = saldo;
    }
  }
  render() {
    const {
      barcodeData,
      service_s,
      form,
      togglePopUp,
      accountInfo,
      setServiceId,
    } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

    const {
      barcodeInput,
      condizioniShow,
      condizioniAgreement,
      motivo_del_pagamento,
      codice_fiscale_atto,
      nrOfRows,
      classNameAtto,
      classNameUfficio,
    } = this.state;
    return (
      <div className="F24">
        <div className="F24-Header">
          <span
            onClick={() => {
              // console.log(
              //   "dataaaa",
              //   returnMotivoDelPagamentoList(
              //     this.props.form.getFieldValue,
              //     this.state.nrOfRows
              //   )
              // );
            }}
          >
            Pagamento deleghe f24
          </span>
          <span>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={images["BOLLETINO"]} />
          </span>
        </div>
        <div className="F24-AfterHeader">
          <span>
            <h4>Modello di pagamento unificato</h4>
            <h5>Per l’accredito alla tesoreria competente</h5>
          </span>
          <span>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={images["agenzia_entrata"]} />
          </span>
          <span>Delega irrevocabile a</span>
        </div>
        <div className="F24-Form">
          <Form>
            <div className={"inpPopUp" + (barcodeInput ? " active" : "")}>
              <input
                onBlur={(e) => {
                  let bartcode = e.target.value;
                  const counter1 = bartcode.substring(0, 2); //2shifror
                  const codiceIdf = bartcode.substring(
                    2,
                    2 + parseInt(counter1)
                  );
                  const counter2 = bartcode.substring(20, 22); //2shifror
                  const sulCC = bartcode.substring(22, 22 + parseInt(counter2));

                  const counter3 = bartcode.substring(34, 36); //2shifror
                  const shuma = bartcode.substring(36, 36 + parseInt(counter3));
                  const counter4 = bartcode.substring(46, 47); //1shifror
                  const tipologia = bartcode.substring(
                    47,
                    47 + parseInt(counter4)
                  );
                  setFieldsValue({
                    codice_identificativo: codiceIdf,
                    importo: (parseFloat(shuma.toString()) / 100)
                      .toString()
                      .replace(".", ","),
                    numero_conto_corrente: sulCC,
                    tipologia: tipologia,
                  });
                }}
                type="text"
                id="barcodeInp"
                placeholder="barcode"
              />
            </div>
            <div className="F24--Top">
              <div className="Left">
                <F24LeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={getFieldValue}
                  setServiceID={setServiceId}
                  service_s={service_s}
                />
              </div>
              <div className="Right">
                <div className="Inputs">
                  <F24RightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={getFieldValue}
                  />
                </div>
                <div className="Condizioni">
                  <div
                    className="Condizioni control"
                    onClick={() => {
                      this.setState((state) => ({
                        condizioniShow: !state.condizioniShow,
                      }));
                    }}
                  >
                    <span>Condizioni d' uso</span>
                    <span>
                      <i
                        className={`fal fa-chevron-${
                          condizioniShow ? "up" : "down"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {condizioniShow && <Condizioni></Condizioni>}
                  <Checkbox
                    onChange={(e) => {
                      this.setState({
                        condizioniAgreement: e.target.checked,
                      });
                    }}
                    checked={condizioniAgreement}
                  >
                    La persona che hai di fronte non è il intestatario del
                    pagamento del bollo
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className={`F24--Middle ${codice_fiscale_atto ? "none" : ""}`}>
              <div
                onClick={() => {
                  this.setState((state) => ({
                    codice_fiscale_atto: !state.codice_fiscale_atto,
                  }));
                }}
              >
                <span>Sezione erario ed altro</span>
                <span>
                  <i
                    className={`fal fa-chevron-${
                      codice_fiscale_atto ? "down" : "up"
                    }`}
                  />
                </span>
              </div>
              <div className="F24--Middle-Inputs">
                <div>
                  {" "}
                  <span>Codice ufficio</span> <span>Codice atto</span>
                </div>
                <div className="Inputs">
                  <span>
                    <SeperateInputs
                      number={3}
                      word="codice_ufficio"
                      setStateValue={(value) => {
                        this.setState({ codice_ufficio: value });
                      }}
                      setValues={setValues}
                      returnCodice={returnCodice}
                      setStateClass={(value) => {
                        this.setState({ classNameUfficio: value });
                      }}
                      classNameVal={classNameUfficio}
                    />
                  </span>
                  <span>
                    <SeperateInputs
                      number={11}
                      word="codice_atto"
                      setStateValue={(value) => {
                        this.setState({ codice_atto: value });
                      }}
                      setValues={setValues}
                      returnCodice={returnCodice}
                      setStateClass={(value) => {
                        this.setState({ classNameAtto: value });
                      }}
                      classNameVal={classNameAtto}
                    />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`F24--Bottom ${motivo_del_pagamento ? "none" : ""}`}
            >
              <div
                className="TableVis"
                onClick={() => {
                  this.setState((state) => ({
                    motivo_del_pagamento: !state.motivo_del_pagamento,
                  }));
                }}
              >
                <span>Motivo del pagamento</span>
                <span>
                  <i
                    className={`fal fa-chevron-${
                      motivo_del_pagamento ? "down" : "up"
                    }`}
                  />
                </span>
              </div>
              <div className="Table">
                <div className="Table--Header">
                  <span>Sezione</span>
                  <span>Cod. Tributo</span>
                  <span>Cod. ente/com</span>
                  <span>Ravv.</span>
                  <span>Imm. variati</span>
                  <span>Acc</span>
                  <span>Saldo</span>
                  <span>Num. Imm</span>
                  <span>Rat/mese</span>
                  <span>Anno di riferimento</span>
                  <span>Detrazione</span>
                  <span>Importo a debito versati</span>
                  <span>Importi a credito compensati</span>
                </div>
                <div className="RowContainer">
                  {[...new Array(nrOfRows)].map((item, index) => (
                    <div className="Table--Row" key={index}>
                      <LineTable
                        id={index}
                        barcodeData={barcodeData}
                        getFieldDecorator={getFieldDecorator}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="TableActions">
                <div
                  onClick={() => {
                    clearLineTables(nrOfRows, form.setFieldsValue);
                  }}
                >
                  <i className="fal fa-trash-alt" />
                  <span>Svuota tutti i campi</span>
                </div>
                <div
                  onClick={() => {
                    this.setState((state) => ({
                      nrOfRows: state.nrOfRows + 1,
                    }));
                  }}
                >
                  <span>Aggiungi Riga</span>
                  <i className="fal fa-plus" />
                </div>
              </div>
            </div>
            <div className="F24--Footer">
              <div className="F24--Footer--Head">Estremi del versamento</div>
              <div className="F24--Footer--Foot">
                <div className="Data">
                  <LastPartForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                  />
                </div>
                <div className="Actions">
                  <div
                    className="Actions--Item"
                    onClick={(e) => {
                      if (accountInfo?.token) {
                        this.handleSubmit(e);
                      } else {
                        window.location.hash = "login";
                        togglePopUp(false);
                      }
                    }}
                    htmltype="submit"
                  >
                    <h3>esegui</h3>
                    <img src={images.checkSymbol} alt="" />
                  </div>
                  <div
                    className="Actions--Item"
                    onClick={() => {
                      if (barcodeInput) {
                        this.setbarcodeInp(false);
                      } else {
                        this.setbarcodeInp(true);
                      }
                    }}
                  >
                    <h3>barcode</h3>
                    <p>
                      pagemento <br /> differito
                    </p>
                  </div>
                  <div className="Actions--Item">
                    <h3>stampa</h3>
                    <p>
                      pre <br /> scontrino
                    </p>
                  </div>
                  <div
                    className="Actions--Item"
                    onClick={() => togglePopUp(false)}
                  >
                    <h3>Annulla</h3>
                    <img src={images.close} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const CenterAccountMenuu = Form.create({ name: "f24" })(F24);

const mapsStateToProps = (state) => ({
  bolletiniBianchi: state.auth.bolletiniBianchi,
  barcodeData: state.auth.barcodeData,
  bolletiniPremercati: state.auth.bolletiniPremercati,
  accountInfo: state.auth.accountInfo,
  service_s: state.auth.service_s,
});

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  CenterAccountMenuu
);

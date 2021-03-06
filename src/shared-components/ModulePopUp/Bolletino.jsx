import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Checkbox, notification, Modal } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";
import "./newStyl.css";
import { BolletiniRightForm, BolletiniLeftForm } from "./BolletiniForms";
import { BoloAutoLeftForm, BoloAutoRightForm } from "./BoloAutoForms";
import { PagoPaLeftForm, PagoPaRightForm } from "./PagoPaForms";
import { MavRavLeftForm, MavRavRightForm } from "./MavRavForm";
import { LeftFreccia, RightFreccia } from "./BoloFrecciaForms";

class Bolletino extends React.Component {
  state = {
    confirmDirty: false,
    barcodeInput: false,
    BinpVal: "",
    codInd: "",
    data: {},
    condizioniAgreement: false,
    condizioniShow: true,
  };
  setbarcodeInp = (e) => {
    this.setState({ barcodeInput: e }, () => {
      setTimeout(() => {
        document.getElementById("barcodeInp").focus();
      }, 500);
    });
  };
  clearFields = () => {
    this.props.form.resetFields();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { service_id } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.condizioniAgreement) {
        if (service_id === "BOL003" || service_id === "BOL004") {
          this.props.setMavRav(
            service_id,
            values.person_type,
            values.via_piazza,
            values.citta,
            values.email,
            values.phone_number,
            values.importo,
            values.codice,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            this.clearFields
          );
        } else if (service_id === "PPA001") {
          this.props.setPagoPa(
            service_id,
            values.person_type,
            values.via_piazza,
            values.citta,
            values.email,
            values.phone_number,
            "pa",
            values.codice_fiscale_bol,
            values.codice_aviso,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            this.clearFields
          );
        } else if (service_id === "BOL006") {
          this.props.setPagoPa(
            service_id,
            values.person_type,
            values.via_piazza,
            values.citta,
            values.email,
            values.phone_number,
            "auto",
            null,
            null,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            this.clearFields,
            values.tipo_veicolo,
            values.targa
          );
        } else if (service_id === "BOL007") {
          this.props.setFreccia(
            service_id,
            values.importo,
            values.causale,
            values.person_type,
            values.via_piazza,
            values.cap,

            values.citta,
            values.provincia,
            values.email,
            values.phone_number,
            values.identificativo_pagamento,
            values.iban,
            values.cin_importo,

            values.cin_intermedio,
            values.cin_complessivo,
            values.codice_esenzione,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            this.clearFields
          );
        } else {
          if (this.props.service_id === "BOL001") {
            if (this.props.isTestAcc) {
              this.props.fetchBolletini(
                service_id,
                values.person_type.toString(),
                values.via_piazza,
                values.cap,
                values.citta,
                values.provincia,
                values.importo.toString(),
                values.tipologia,
                values.numero_conto_corrente,
                values.causale,
                values.nome,
                values.cognome,
                values.codice_fiscale,
                values.denominazione,
                values.partita_iva,
                values.email,
                values.phone_number,
                null,
                this.clearFields
              );
            } else {
              this.props.setBolletiniLoading(true);
              this.props.getBolletiniBianchi(
                service_id,
                values.numero_conto_corrente.toString(),
                values.importo,
                values.intestato_a,
                values.causale,
                values.eseguito_da?.replace(/\//g, "-"),
                values.via_piazza,
                values.cap,
                values.citta,
                values.provincia,
                this.clearFields,
                this.props.setBolletiniLoading
              );
            }
          }
          if (this.props.service_id === "BOL002") {
            if (this.props.isTestAcc) {
              this.props.fetchBolletini(
                service_id,
                values.person_type.toString(),
                values.via_piazza,
                values.cap,
                values.citta,
                values.provincia,
                values.importo.toString(),
                values.tipologia,
                values.numero_conto_corrente,
                values.causale,
                values.nome,
                values.cognome,
                values.codice_fiscale,
                values.denominazione,
                values.partita_iva,
                values.email,
                values.phone_number,
                values.codice_identificativo,
                this.clearFields
              );
            } else {
              this.props.setBolletiniLoading(true);
              this.props.getBolletiniPremercati(
                service_id,
                values.numero_conto_corrente.toString(),
                values.importo,
                values.codice_identificativo.toString(),
                parseInt(values.tipologia),
                values.eseguito_da?.replace(/\//g, "-"),
                values.via_piazza,
                values.cap,
                values.citta,
                values.provincia,
                this.clearFields,
                this.props.setBolletiniLoading
              );
            }
          }
        }
      } else {
        notification["error"]({
          message: "Ops...",
          description: "Controlla le tue caselle vuote / accetta le condizioni",
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      barcodeData,
      service_id,
      service_s,
      isTestAcc,
      bolletiniLoading,
    } = this.props;
    const {
      barcodeInput,
      condizioniShow,
      //condizioniAgreement,
      helper,
    } = this.state;
    // console.log("service_s", service_s);
    let imageLogo =
      service_id === "PPA001"
        ? "PAGO_PA"
        : service_id === "BOL006"
        ? "BOLO_AUTO"
        : "BOLLETINO";
    return (
      <div className="Bolletini">
        <div className="Bolletini-Header">
          <span>
            {service_id === "BOL003" || service_id === "BOL004"
              ? "MAV/RAV"
              : service_id === "PPA001"
              ? "PAGO PA"
              : service_id === "BOL006"
              ? "BOLLETINI AUTO"
              : service_id === "BOL007"
              ? "BOLLETINI FRECCIA"
              : "BOLLETINI"}
          </span>
          <span>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={images[imageLogo]} alt={imageLogo} />
          </span>
        </div>
        <div className="Bolletini-Form">
          <Form>
            <Modal
              title="Scan Barcode"
              visible={barcodeInput}
              onOk={() => {
                this.setState({ barcodeInput: false });
              }}
              onCancel={() => {
                this.setState({ barcodeInput: false });
              }}
            >
              <input
                onChange={(e) => {
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
                  this.props.form.setFieldsValue({
                    codice_identificativo: codiceIdf,
                    importo: (parseFloat(shuma.toString()) / 100)
                      .toString()
                      .replace(".", ","),
                    numero_conto_corrente: sulCC,
                    tipologia: tipologia,
                  });
                  // if (e.target.value.length >= 51) {
                  //   this.setState({ barcodeInput: false });
                  // } else {
                  //   this.setState({ barcodeInput: true });
                  // }
                }}
                type="text"
                id="barcodeInp"
                placeholder="barcode"
              />
            </Modal>

            <div
              className={`Left ${
                service_id === "BOL006"
                  ? "BA"
                  : service_id === "PPA001"
                  ? "PA"
                  : ""
              }`}
            >
              {service_id === "BOL003" || service_id === "BOL004" ? (
                <MavRavLeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                  setServiceID={this.props.setServiceId}
                  service_s={service_s}
                />
              ) : service_id === "BOL006" ? (
                <BoloAutoLeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                />
              ) : service_id === "BOL007" ? (
                <LeftFreccia
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                />
              ) : service_id === "PPA001" ? (
                <PagoPaLeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                />
              ) : (
                <BolletiniLeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                  service_id={service_id}
                  isTestAcc={isTestAcc}
                />
              )}
            </div>
            <div
              className={`Right ${
                service_id === "BOL006"
                  ? "BA"
                  : service_id === "PPA001"
                  ? "PA"
                  : ""
              }`}
            >
              <div className="Inputs">
                {service_id === "BOL003" || service_id === "BOL004" ? (
                  <MavRavRightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
                  />
                ) : service_id === "BOL006" ? (
                  <BoloAutoRightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
                  />
                ) : service_id === "BOL007" ? (
                  <RightFreccia
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
                  />
                ) : service_id === "PPA001" ? (
                  <PagoPaRightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
                  />
                ) : (
                  <BolletiniRightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
                    service_id={service_id}
                    isTestAcc={isTestAcc}
                  />
                )}
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
                    //console.log("ca ka e", e, e.checked, e.target.checked);
                    this.setState({
                      condizioniAgreement: e.target.checked,
                    });
                  }}
                >
                  La persona che hai di fronte non ?? il intestatario del
                  pagamento del bollo
                </Checkbox>
              </div>
              <div className="Actions">
                <div
                  className="Actions--Item"
                  data-disable={bolletiniLoading ? "disable" : "enable"}
                  onClick={(e) => {
                    if (this.props.accountInfo?.token) {
                      this.handleSubmit(e);
                    } else {
                      window.location.hash = "login";
                      this.props.togglePopUp(false);
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
                  <i className="fas fa-barcode"></i>
                </div>
                {helper && <div className="helper" />}
                <div className="Actions--Item" data-disable={"disable"}>
                  <h3>stampa</h3>
                  <p>
                    pre <br /> scontrino
                  </p>
                </div>
                <div
                  className="Actions--Item"
                  onClick={() => this.props.togglePopUp(false)}
                >
                  <h3>Annulla</h3>
                  <img src={images.close} alt="" />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const CenterAccountMenuu = Form.create({ name: "bolletino" })(Bolletino);

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

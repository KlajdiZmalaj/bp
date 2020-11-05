import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Checkbox, notification } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";
import "./newStyl.css";
import { BolletiniRightForm, BolletiniLeftForm } from "./BolletiniForms";
import { BoloAutoLeftForm, BoloAutoRightForm } from "./BoloAutoForms";
import { PagoPaLeftForm, PagoPaRightForm } from "./PagoPaForms";
import { MavRavLeftForm, MavRavRightForm } from "./MavRavForm";

class Bolletino extends React.Component {
  state = {
    confirmDirty: false,
    barcodeInput: false,
    BinpVal: "",
    codInd: "",
    data: {},
    condizioniAgreement: true,
    condizioniShow: false,
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
    const { service_id } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && this.state.condizioniAgreement) {
        if (service_id === "BOL003" || service_id === "BOL004") {
          this.props.setMavRav(
            service_id,
            values?.person_type,
            values?.via_piazza,
            values?.citta,
            values?.email,
            values?.phone_number,
            values?.importo,
            values?.codice,
            values?.nome,
            values?.cognome,
            values?.codice_fiscale,
            values?.denominazione,
            values?.partita_iva,
            this.clearFields
          );
        } else if (service_id === "PPA001") {
          this.props.setPagoPa(
            service_id,
            values?.person_type,
            values?.via_piazza,
            values?.citta,
            values?.email,
            values?.phone_number,
            "pa",
            values?.codice_fiscale_bol,
            values?.codice_aviso,
            values?.nome,
            values?.cognome,
            values?.codice_fiscale,
            values?.denominazione,
            values?.partita_iva,
            this.clearFields
          );
        } else if (service_id === "BOL006") {
          this.props.setPagoPa(
            service_id,
            values?.person_type,
            values?.via_piazza,
            values?.citta,
            values?.email,
            values?.phone_number,
            "auto",
            null,
            null,
            values?.nome,
            values?.cognome,
            values?.codice_fiscale,
            values?.denominazione,
            values?.partita_iva,
            this.clearFields,
            values?.tipo_veicolo,
            values?.targa
          );
        } else {
          if (this.props.service_id === "BOL001") {
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
          }
          if (this.props.service_id === "BOL002") {
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
          }
        }
      } else {
        notification["error"]({
          message: "Ops...",
          description: "Controlla le tue caselle vuote o accetta le condizioni",
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { barcodeData, service_id, service_s } = this.props;
    const { barcodeInput, condizioniShow, condizioniAgreement } = this.state;
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
              ? "BOLO AUTO"
              : "BOLLETINI"}
          </span>
          <span>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={images[imageLogo]} />
          </span>
        </div>
        <div className="Bolletini-Form">
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
                  this.props.form.setFieldsValue({
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
              <div className="Actions">
                <div
                  className="Actions--Item"
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

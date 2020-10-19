import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Checkbox, notification } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";
import "./newStyl.css";
import { F24LeftForm, F24RightForm, LineTable, LastPartForm } from "./F24Forms";
const SeperateInputs = ({
  number,
  word,
  setStateValue,
  setValues,
  returnCodice,
}) => {
  return [...new Array(number)].map((input, key) => {
    return (
      <input
        className="inputSeperate"
        key={`${word}${key}`}
        maxLength="1"
        id={`${word}${key}`}
        type="text"
        onKeyDown={(e) => {
          var keyy = e.keyCode || e.charCode;
          setTimeout(() => {
            const previnp = document.getElementById(`${word}${key - 1}`);
            const inp = document.getElementById(`${word}${key}`);
            const nextinp = document.getElementById(`${word}${key + 1}`);
            if (keyy !== 8 && keyy !== 9) {
              if (nextinp && !nextinp.value) {
                nextinp.focus();
              } else if (previnp && !previnp.value) {
                previnp.focus();
              } else {
                if (inp.value && inp.value.length > 0) {
                  nextinp && nextinp.focus();
                }
              }
            }
            if (keyy === 8) {
              if (previnp) {
                previnp.focus();
              }
            }
          }, 100);
        }}
        onChange={(e) => {
          if (
            e.target.value !== "" &&
            e.target.value &&
            e.target.value.length <= 1
          ) {
            document.getElementById(e.target.id).value = e.target.value;
            setStateValue(returnCodice(number, word));
          } else if (e.target.value === "") {
            document.getElementById(e.target.id).value = e.target.value;
            setStateValue(returnCodice(number, word));
          }
        }}
        onPaste={() => {
          navigator.clipboard
            .readText()
            .then((codFisInps) => {
              setStateValue(codFisInps.substring(0, number));
              setValues(number, word, codFisInps);
            })
            .catch((err) => {
              console.error("Failed to read clipboard contents: ", err);
            });
        }}
      />
    );
  });
};
class F24 extends React.Component {
  state = {
    condizioniAgreement: true,
    condizioniShow: false,
    motivo_del_pagamento: false,
    codice_fiscale_atto: false,
    nrOfRows: 4,
    codFisInps: "asdasdasd",
    codice_atto: "",
    codice_uffico: "",
  };
  setbarcodeInp = (e) => {
    this.setState({ barcodeInput: e });
    document.getElementById("barcodeInp").focus();
  };
  clearFields = () => {
    this.props.form.resetFields();
  };
  clearLineTables = () => {
    [...new Array(this.state.nrOfRows)].forEach((item, id) => {
      let objectFieldValues = [];
      objectFieldValues[`sezione${id}`] = "";
      objectFieldValues[`cod_tributo${id}`] = "";
      objectFieldValues[`cod_ente_com${id}`] = "";
      objectFieldValues[`ravv${id}`] = false;
      objectFieldValues[`im_variati${id}`] = false;
      objectFieldValues[`acc${id}`] = false;
      objectFieldValues[`saldo${id}`] = false;
      objectFieldValues[`num_imm${id}`] = "";
      objectFieldValues[`rat_mese${id}`] = "";
      objectFieldValues[`anno_di_riferimento${id}`] = "";
      objectFieldValues[`detrazione${id}`] = "";
      objectFieldValues[`importo_a_debito_versati${id}`] = "";
      objectFieldValues[`importi_a_credito_compensati${id}`] = "";
      this.props.form.setFieldsValue({
        ...objectFieldValues,
      });
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.clearFields();
      if (!err && this.state.condizioniAgreement) {
        // this.props.fetchBolletini(
        //   service_id,
        //   values.person_type.toString(),
        //   values.via_piazza,
        //   values.cap,
        //   values.citta,
        //   values.provincia,
        //   values.importo.toString(),
        //   values.tipologia,
        //   values.numero_conto_corrente,
        //   values.causale,
        //   values.nome,
        //   values.cognome,
        //   values.codice_fiscale,
        //   values.denominazione,
        //   values.partita_iva,
        //   values.email,
        //   values.phone_number,
        //   values.codice_identificativo,
        //   this.clearFields
        // );
      } else {
        notification["error"]({
          message: "Ops...",
          description: "Controlla le tue caselle vuote o accetta le condizioni",
        });
      }
    });
  };
  returnCodice = (number, word) => {
    var returnCodice = "";
    [...new Array(number)].forEach((input, index) => {
      const inp = document.getElementById(`${word}${index}`);

      returnCodice = returnCodice.concat(inp?.value.toString());
    });
    return returnCodice;
  };
  setValues = (number, word, fullValue) => {
    [...new Array(number)].forEach((input, index) => {
      var inp = document.getElementById(`${word}${index}`);
      inp.value = fullValue.substring(index, index + 1);
    });
  };
  returnMotivoDelPagamentoList = (nrOfRows) => {
    let arrayMPL = [];
    const getVal = this.props.form.getFieldValue;
    [...new Array(this.state.nrOfRows)].forEach((item, index) => {
      let objectRow = {
        sezione: getVal(`sezione${index}`),
        cod_tributo: getVal(`cod_tributo${index}`),
        cod_ente_com: getVal(`cod_ente_com${index}`),
        ravv: getVal(`ravv${index}`),
        im_variati: getVal(`im_variati${index}`),
        acc: getVal(`acc${index}`),
        saldo: getVal(`saldo${index}`),
        num_imm: getVal(`num_imm${index}`),
        rat_mese: getVal(`rat_mese${index}`),
        anno_di_riferimento: getVal(`anno_di_riferimento${index}`),
        detrazione: getVal(`detrazione${index}`),
        importo_a_debito_versati: getVal(`importo_a_debito_versati${index}`),
        importi_a_credito_compensati: getVal(
          `importi_a_credito_compensati${index}`
        ),
      };
      arrayMPL.push(objectRow);
    });
    return arrayMPL;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { barcodeData, service_s } = this.props;
    const {
      barcodeInput,
      condizioniShow,
      condizioniAgreement,
      motivo_del_pagamento,
      codice_fiscale_atto,
      codice_atto,
      codice_uffico,
    } = this.state;
    console.log(codice_uffico, codice_atto);
    return (
      <div className="F24">
        <div className="F24-Header">
          <span>Pagamento deleghe f24</span>
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
            <div className="F24--Top">
              <div className="Left">
                <F24LeftForm
                  barcodeData={barcodeData}
                  getFieldDecorator={getFieldDecorator}
                  getFieldValue={this.props.form.getFieldValue}
                  setServiceID={this.props.setServiceId}
                  service_s={service_s}
                />
              </div>
              <div className="Right">
                <div className="Inputs">
                  <F24RightForm
                    barcodeData={barcodeData}
                    getFieldDecorator={getFieldDecorator}
                    getFieldValue={this.props.form.getFieldValue}
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
                      word="codice_uffico"
                      setStateValue={(value) => {
                        this.setState({ codice_uffico: value });
                      }}
                      setValues={this.setValues}
                      returnCodice={this.returnCodice}
                    />
                  </span>
                  <span>
                    <SeperateInputs
                      setValues={this.setValues}
                      number={11}
                      word="codice_atto"
                      setStateValue={(value) => {
                        this.setState({ codice_atto: value });
                      }}
                      returnCodice={this.returnCodice}
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
                  {[...new Array(this.state.nrOfRows)].map((item, index) => (
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
                <div onClick={this.clearLineTables}>
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
                      // if (this.props.accountInfo?.token) {
                      //   this.handleSubmit(e);
                      // } else {
                      //   window.location.hash = "login";
                      //   this.props.togglePopUp(false);
                      // }
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
                    <h3>anulla</h3>
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

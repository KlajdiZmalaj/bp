import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Input, message } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";
import { Select } from "antd";
import { get } from "lodash";
const { Option } = Select;
class Bolletino extends React.Component {
  state = {
    confirmDirty: false,
    barcodeInput: false,
    BinpVal: "",
    codInd: "",
    data: {},
  };
  setbarcodeInp = (e) => {
    this.setState({ barcodeInput: e });
    document.getElementById("barcodeInp").focus();
  };
  callback = (data) => {
    this.setState({ data });
    console.log("callback", data);
    message.success(data.message);
    setTimeout(() => {
      console.log("timeout called");

      this.props.form.setFieldsValue({
        codice_identificativo: data.data.codice_identificativo,
        importo: data.data.importo,
        numero_conto_corrente: data.data.numero_conto_corrente,
        tipologia: data.data.tipologia,
      });
    }, 10);
  };
  BinputHandler = (e) => {
    this.setState({ BinpVal: e.target.value });
    if (this.state.BinpVal.length >= 40) {
      this.props.getBarcodeData(this.state.BinpVal, this.callback);
      // "18000023200682255466120000420832041000000031603896"
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.service_id === "BOL001") {
          this.props.getBolletiniBianchi(
            this.props.service_id,
            values.numero_conto_corrente.toString(),
            values.importo,
            values.intestato_a,
            values.causale,
            values.eseguito_da,
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia
          );
        }
        if (this.props.service_id === "BOL002") {
          this.props.getBolletiniPremercati(
            this.props.service_id,
            values.numero_conto_corrente.toString(),
            values.importo,
            values.codice_identificativo.toString(),
            parseInt(values.tipologia),
            values.eseguito_da,
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia
          );
        }
      }
      console.log("faturaaaa", this.props.service_id, values);
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  hideAlert = () => {
    this.props.setBolletiniBianchi({});
    this.props.setBolletiniPremercati({});
  };
  componentDidMount() {}
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      bolletiniBianchi,
      bolletiniPremercati,
      service,
      barcodeData,
      data,
    } = this.props;
    const { barcodeInput } = this.state;
    console.log("barcodeData", barcodeData);
    return (
      <div className="bolletino">
        <Form onSubmit={this.handleSubmit}>
          <div className="col-12 leftCol_Module">
            <div className="row no-gutters">
              <div className="col-12 col-lg-6">
                <table className="_modulePopUP__table">
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img src={images.billDark} alt="" />
                          <p>{service.name}</p>
                        </div>
                      </td>
                      <td>
                        <div>
                          Servizio attivo tutti i giorni <br />
                          ferali dalle 8,30 alle 19,30
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 col-lg-6">
                <table className="_modulePopUP__table2">
                  <tbody>
                    <tr>
                      <td onClick={this.handleSubmit} htmltype="submit">
                        <h3>esegui</h3>
                        <img src={images.checkSymbol} alt="" />
                      </td>
                      <td
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
                          pagemento <br /> diferito
                        </p>
                      </td>
                      <td className="stampCup">
                        <h3>stampa</h3>
                        <p>
                          pre <br /> scontrino
                        </p>
                      </td>
                      <td
                        className="CancelModule"
                        onClick={() => this.props.togglePopUp(false)}
                      >
                        <h3>anulla</h3>
                        <img src={images.close} alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row no-gutters _modulePopUP__body">
              <div className={"inpPopUp" + (barcodeInput ? " active" : "")}>
                <input
                  onChange={(e) => {
                    this.BinputHandler(e);
                  }}
                  type="text"
                  id="barcodeInp"
                  placeholder="barcode"
                />
              </div>
              <div className="col-12 col-lg-9 ">
                <h2>CONTI CORRENTI POSTALI - Ricevuta di Accredito</h2>
              </div>
              <div className="col-12 col-lg-3">
                <img className="bacnoPosta" src="img/bancoposta.svg" alt="" />
              </div>
              <div className="col-12 col-lg-7">
                <div className="euroboll">
                  <img src={images.euro} alt="" />
                  <span>sul C/C n.</span>{" "}
                  <Form.Item>
                    {getFieldDecorator("numero_conto_corrente", {
                      initialValue:
                        get(barcodeData, "data.numero_conto_corrente") || "",
                    })(<Input />)}
                  </Form.Item>
                </div>
              </div>
              <div className="col-12 col-lg-5 mt-2 mt-lg-0">
                <div className="euroboll">
                  <span>di Euro</span>{" "}
                  <Form.Item>
                    {getFieldDecorator("importo", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your importo!",
                          whitespace: true,
                        },
                      ],
                      initialValue: get(barcodeData, "data.importo") || "",
                    })(<Input />)}
                  </Form.Item>
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  {this.props.service_id === "BOL001" ? (
                    <span>INTESTATO A</span>
                  ) : (
                    <span>CODICE identificativo!</span>
                  )}
                </div>
              </div>
              <div className="col-9 ">
                <div className="euroboll">
                  {this.props.service_id === "BOL001" ? (
                    <Form.Item>
                      {getFieldDecorator("intestato_a", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your intestato_a!",
                            whitespace: true,
                          },
                        ],
                      })(<Input className="py-4 pl-2 mt-2" />)}
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      {getFieldDecorator("codice_identificativo", {
                        initialValue:
                          get(barcodeData, "data.codice_identificativo") || "",
                      })(<Input className="py-4 pl-2 mt-2" />)}
                    </Form.Item>
                  )}
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  {this.props.service_id === "BOL001" ? (
                    <span>CASUALE</span>
                  ) : (
                    <span>TIPOLOGIA</span>
                  )}
                </div>
              </div>
              <div className="col-9 ">
                <div className="euroboll">
                  {this.props.service_id === "BOL001" ? (
                    <Form.Item>
                      {getFieldDecorator("causale", {
                        rules: [
                          {
                            required: true,
                            message: "Please input  causale!",
                            whitespace: true,
                          },
                        ],
                      })(<Input className="py-4 pl-2 mt-3" />)}
                    </Form.Item>
                  ) : (
                    <Form.Item>
                      {getFieldDecorator("tipologia", {
                        rules: [
                          {
                            required: true,
                            message: "Per favore seleziona tipologia!",
                          },
                        ],
                        initialValue: get(barcodeData, "data.tipologia") || "",
                      })(
                        <Select>
                          <Option value="896">896</Option>
                          <Option value="674">674</Option>
                        </Select>
                      )}
                    </Form.Item>
                  )}
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  <span>ESEGUITO DA</span>
                </div>
              </div>
              <div className="col-9 ">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("eseguito_da", {
                      rules: [
                        {
                          required: true,
                          message: "Please input eseguito_da!",
                          whitespace: true,
                        },
                      ],
                    })(<Input className="py-1 pl-2 mt-3" />)}
                  </Form.Item>
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  <span>VIA-PIAZZA</span>
                </div>
              </div>
              <div className="col-9">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("via_piazza", {
                      rules: [
                        {
                          required: true,
                          message: "Please input via_piazza!",
                          whitespace: true,
                        },
                      ],
                    })(<Input className="py-1 pl-2 mt-3 mb-3" />)}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3 ">
                <div className="euroboll">
                  <span>CAP</span>
                </div>
              </div>
              <div className="col-9">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("cap", {
                      rules: [
                        {
                          required: true,
                          message: "Please input cap!",
                          whitespace: true,
                        },
                      ],
                    })(<Input className="py-1 pl-2 mt-3 mb-3" />)}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3 ">
                <div className="euroboll">
                  <span>CITTA</span>
                </div>
              </div>
              <div className="col-9">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("citta", {
                      rules: [
                        {
                          required: true,
                          message: "Please input citta!",
                          whitespace: true,
                        },
                      ],
                    })(<Input className="py-1 pl-2 mt-3 mb-3" />)}
                  </Form.Item>
                </div>
              </div>
              <div className="col-3 ">
                <div className="euroboll">
                  <span>PROVINCIA</span>
                </div>
              </div>
              <div className="col-9">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("provincia", {
                      rules: [
                        {
                          required: true,
                          message: "Please input provincia!",
                          whitespace: true,
                          maxLength: 2,
                        },
                      ],
                    })(<Input className="py-1 pl-2 mt-3 mb-3" />)}
                  </Form.Item>
                </div>
              </div>
              <div className="col-12">
                <div className="euroboll">
                  <span>CONDIZIONI</span>
                </div>
              </div>
              <Condizioni></Condizioni>
            </div>
            {bolletiniBianchi.errors &&
              Object.keys(bolletiniBianchi.errors).map((item) => {
                return (
                  <div className="error">
                    <span className="closeAlert" onClick={this.hideAlert}>
                      X
                    </span>
                    {bolletiniBianchi.errors[item]}
                  </div>
                );
              })}
            {get(bolletiniBianchi, "message") && (
              <div className="success">
                <span className="closeAlert" onClick={this.hideAlert}>
                  X
                </span>
                {get(bolletiniBianchi, "message")}
              </div>
            )}
            {bolletiniPremercati.errors &&
              Object.keys(bolletiniPremercati.errors).map((item) => {
                return (
                  <div className="error">
                    <span className="closeAlert" onClick={this.hideAlert}>
                      X
                    </span>
                    {bolletiniPremercati.errors[item]}
                  </div>
                );
              })}
            {get(bolletiniPremercati, "message") && (
              <div className="success">
                <span className="closeAlert" onClick={this.hideAlert}>
                  X
                </span>
                {get(bolletiniPremercati, "message")}
              </div>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

const CenterAccountMenuu = Form.create({ name: "bolletino" })(Bolletino);

const mapsStateToProps = (state) => ({
  bolletiniBianchi: state.auth.bolletiniBianchi,
  barcodeData: state.auth.barcodeData,
  bolletiniPremercati: state.auth.bolletiniPremercati,
});

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  CenterAccountMenuu
);

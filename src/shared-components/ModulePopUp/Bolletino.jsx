import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { Form, Input } from "antd";
import Condizioni from "./Condizioni";
import images from "themes/images";

class Bolletino extends React.Component {
  state = {
    confirmDirty: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getBolletiniBianchi(
          this.props.service_id,
          values.numero_conto_corrente,
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
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  hideAlert = () => {
    this.props.setBolletiniBianchi({});
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { bolletiniBianchi } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    console.log("bolletiniBianchi", bolletiniBianchi);
    return (
      <div className="bolletino">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="col-12 leftCol_Module">
            <div className="row no-gutters">
              <div className="col-12 col-lg-6">
                <table className="_modulePopUP__table">
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img src={images.billDark} alt="" />
                          <p>
                            Bollettini <br /> Bianchi
                          </p>
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
                      <td>
                        <h3>esegui</h3>
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
                      rules: [
                        {
                          required: true,
                          message: "Please input your numero_conto_corrente!",
                          whitespace: true
                        }
                      ]
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
                          whitespace: true
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  <span>INTESTATO A</span>
                </div>
              </div>
              <div className="col-9 ">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("intestato_a", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your intestato_a!",
                          whitespace: true
                        }
                      ]
                    })(<Input className="py-4 pl-2 mt-2" />)}
                  </Form.Item>
                </div>
              </div>

              <div className="col-3 ">
                <div className="euroboll">
                  <span>CAUSALE</span>
                </div>
              </div>
              <div className="col-9 ">
                <div className="euroboll">
                  <Form.Item>
                    {getFieldDecorator("causale", {
                      rules: [
                        {
                          required: true,
                          message: "Please input  causale!",
                          whitespace: true
                        }
                      ]
                    })(<Input className="py-4 pl-2 mt-3" />)}
                  </Form.Item>
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
                          whitespace: true
                        }
                      ]
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
                          whitespace: true
                        }
                      ]
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
                          whitespace: true
                        }
                      ]
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
                          whitespace: true
                        }
                      ]
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
                          maxLength: 2
                        }
                      ]
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
              Object.keys(bolletiniBianchi.errors).map(item => {
                return (
                  <div className="error">
                    <span className="closeAlert" onClick={this.hideAlert}>
                      X
                    </span>
                    {bolletiniBianchi.errors[item]}
                  </div>
                );
              })}
          </div>
        </Form>
      </div>
    );
  }
}

const CenterAccountMenuu = Form.create({ name: "bolletino" })(Bolletino);

const mapsStateToProps = state => ({
  bolletiniBianchi: state.auth.bolletiniBianchi
});

export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  CenterAccountMenuu
);

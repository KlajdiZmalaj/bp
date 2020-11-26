import React from "react";
import { docType } from "config";

import { Form, Input, Button, DatePicker, Select, Checkbox } from "antd";
import moment from "moment";

import uniqBy from "lodash/uniqBy";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux-store/models/auth";

// import "../register.css";
// import "../anim.css";
import "../../themes/css-register/register.css";
import countriesArray from "config/countryArr";

// import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import VirtualizedSelect from "react-virtualized-select";

const { Option } = Select;

class Register extends React.Component {
  state = {
    visible: true,

    comuniSelected: {},
    nazione: "",
    province_of_birth: "",
    city_of_birth: "",

    nazioneDiResidenca: "",
    residence_province: "",
    residence_city: "",

    tipoDocumento: "",
    sesso: "",
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  changeNazioneDiResidenca = (nazioneDiResidencaOptions) => {
    this.setState({ nazioneDiResidenca: nazioneDiResidencaOptions.value });
  };

  hideAlert = () => {};

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.getRegister();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getRegister(
          values.first_name,
          values.last_name,
          values.nickname, // for username
          values.email,
          values.password,
          values.sex,
          values.taxcode,
          moment(values.birthday).format("YYYY-MM-DD"),
          this.state.nazione,
          this.state.province_of_birth,
          this.state.city_of_birth,
          this.state.nazioneDiResidenca,
          this.state.residence_province,
          this.state.residence_city,
          values.address,
          values.postcode,
          values.identity_id,
          values.identity_type,
          values.identity_issue_by,
          moment(values.identity_issue_date).format("YYYY-MM-DD"),
          moment(values.identity_expiry).format("YYYY-MM-DD"),
          values.identity_city,
          values.number_prefix,
          values.number,
          values.question,
          values.answer,
          values.self_limit_period,
          values.promo,
          values.parent,
          values.contract,
          values.terms,
          values.privacy,
          values.newsletter
        );

        var that = this;

        setTimeout(function () {
          that.setState({ visible: true });
        }, 1000);
      }
    });
  };

  validateCodiceFiscale = (e) => {
    const str = e.target.value;
    const fiscalCodeKey = str.substring(str.length - 5, str.length - 1);
    const sexKey = str.substring(9, 11);

    if (sexKey > 40) {
      this.setState({ sesso: "F" });
    } else {
      this.setState({ sesso: "M" });
    }
    countriesArray
      .filter(
        (comune) => comune.codeKey.toString() === fiscalCodeKey.toString()
      )
      .map((comune) => {
        this.setState({
          comuniSelected: comune,
          nazione: comune.nazione,
          province_of_birth: comune.sigla,
          city_of_birth: comune.provincia,
        });

        return comune;
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const { register } = this.props;
    // const c = "NDR NNA 93 D 47 Z100 M";
    //NDRNNA93D47Z100M
    const { comuniSelected, nazione, nazioneDiResidenca } = this.state;
    // const {sesso}=this.state
    const allNazione = uniqBy(countriesArray, "nazione");

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const nazioneList = [];
    if (allNazione && allNazione.length > 0) {
      for (let i = 0; i < allNazione.length; i++) {
        nazioneList.push(
          <Option key={allNazione[i].nazione} value={allNazione[i].nazione}>
            {allNazione[i].nazione}
          </Option>
        );
      }
    }

    let city_of_birth = [];
    if (countriesArray) {
      city_of_birth = countriesArray
        .filter((items) => items.nazione === nazione.toUpperCase())
        .map((items) => {
          return {
            label: items.provincia,
            value: items.provincia,
          };
        });
    }

    let province_of_birthOptions = [];
    if (countriesArray) {
      province_of_birthOptions = countriesArray
        .filter((items) => items.nazione === nazione.toUpperCase())
        .map((items) => {
          return {
            label: items.sigla,
            value: items.sigla,
          };
        });
    }

    /************ RESIDENCA **********/

    let nazioneDiResidencaOptions = [];

    if (allNazione && allNazione.length > 0) {
      nazioneDiResidencaOptions = allNazione.map((items) => {
        return {
          label: items.nazione,
          value: items.nazione,
        };
      });
    }

    let residence_cityOptions = [];

    if (countriesArray) {
      residence_cityOptions = countriesArray
        .filter((items) => items.nazione === nazioneDiResidenca.toUpperCase())
        .map((items) => {
          return {
            label: items.provincia,
            value: items.provincia,
          };
        });
    }

    let provincaDiResidencaProvinciaOptions = [];

    if (countriesArray) {
      provincaDiResidencaProvinciaOptions = countriesArray
        .filter((items) => items.nazione === nazioneDiResidenca.toUpperCase())
        .map((items) => {
          return {
            label: items.sigla,
            value: items.sigla,
          };
        });
    }

    // const str = "TSTTTN80B02A154A";
    //const countriesArrayUniq = uniqBy(countriesArray, "nazione");

    const number_prefix = getFieldDecorator("number_prefix", {
      initialValue: "0039",
    })(<Input style={{ width: 70 }}></Input>);

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div className="backTORegister">
          <button>
            Back to Register
            <i className="far fa-chevron-double-right"></i>
          </button>
          <a href="#/prematch">
            Go Home
            <i className="far fa-chevron-double-right"></i>
          </a>
        </div>

        <div className="infoUser generalInfo row no-gutters">
          <div className="hr"></div>

          <div className="col col-md-8 col1Form">
            <div className="rowUp">
              <div className="firstcol">
                <div className="titleReg">Registrazione</div>
                <Form.Item>
                  {getFieldDecorator("taxcode", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your fiscal code!",
                      },
                    ],
                  })(
                    <Input
                      placeholder="codice fiscale*"
                      onBlur={this.validateCodiceFiscale}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("first_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your name!",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Nome*" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("last_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your last name!",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Cognome*" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("sex", {
                    initialValue:
                      this.state.sesso !== "" ? this.state.sesso : "Sesso*",
                    rules: [
                      { required: true, message: "Please select your sex!" },
                    ],
                  })(
                    <Select>
                      <Option value="M">Maschile</Option>
                      <Option value="F">Feminile</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("nickname", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your fiscal code!",
                      },
                    ],
                  })(<Input placeholder="nickname*" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ],
                  })(<Input placeholder="email*" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password placeholder="password*" />)}
                </Form.Item>
                <Form.Item hasFeedback>
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input.Password
                      onBlur={this.handleConfirmBlur}
                      placeholder="conferma password*"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("number", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ],
                  })(
                    <Input
                      addonBefore={number_prefix}
                      placeholder="Numero di telefono*"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="secondcol">
                <div className="titleReg">Data anagrafici</div>
                <Form.Item>
                  {getFieldDecorator("birthday", {
                    rules: [{ required: true }],
                  })(
                    <DatePicker
                      placeholder="Data di nascita*"
                      format={("DD/MM/YYYY", "DD/MM/YYYY")}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {nazione === "" && (
                    <Select placeholder="Nazione di nascita*">
                      {nazioneList}
                    </Select>
                  )}
                  {nazione !== "" && (
                    <Select defaultValue={this.state.nazione}>
                      {nazioneList}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item>
                  <VirtualizedSelect
                    options={province_of_birthOptions}
                    onChange={(province_of_birth) =>
                      this.setState({
                        province_of_birth: province_of_birth.value,
                      })
                    }
                    value={this.state.province_of_birth}
                    maxHeight={100}
                    placeholder={
                      comuniSelected.sigla
                        ? comuniSelected.sigla
                        : "provincia di nascita*"
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <VirtualizedSelect
                    options={city_of_birth}
                    onChange={(city_of_birth) =>
                      this.setState({ city_of_birth: city_of_birth.value })
                    }
                    value={this.state.city_of_birth}
                    maxHeight={100}
                    placeholder={
                      comuniSelected.provincia
                        ? comuniSelected.provincia
                        : "Comune di nascita*"
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <VirtualizedSelect
                    options={nazioneDiResidencaOptions}
                    onChange={(selectValue) =>
                      this.changeNazioneDiResidenca(selectValue)
                    }
                    value={this.state.nazioneDiResidenca}
                    maxHeight={100}
                    placeholder="Nazione di residenza*"
                  />
                </Form.Item>

                <Form.Item>
                  <VirtualizedSelect
                    options={provincaDiResidencaProvinciaOptions}
                    onChange={(provincaDiResidencaProvinciaOptions) =>
                      this.setState({
                        residence_province:
                          provincaDiResidencaProvinciaOptions.value,
                      })
                    }
                    value={this.state.residence_province}
                    maxHeight={100}
                    placeholder="provincia di residenza* "
                  />
                </Form.Item>

                <Form.Item>
                  <VirtualizedSelect
                    options={residence_cityOptions}
                    onChange={(residence_city) =>
                      this.setState({
                        residence_city: residence_city.value,
                      })
                    }
                    value={this.state.residence_city}
                    maxHeight={100}
                    placeholder="comune di residenza*"
                  />
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your name!",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="indirizzo di residenza*" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("postcode", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your name!",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="CAP*" />)}
                </Form.Item>
              </div>
            </div>
            <div className="rowdown">
              <Form.Item>
                {getFieldDecorator("contract", {
                  initialValue: false,
                  rules: [
                    {
                      required: true,
                      transform: (value) => value || undefined,
                      type: "boolean",
                      message: "Please agree with contract!",
                    },
                  ],
                })(
                  <Checkbox>
                    Ho letto ed accetato il Contratto di Gioco
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("terms", {
                  initialValue: false,
                  rules: [
                    {
                      required: true,
                      transform: (value) => value || undefined,
                      type: "boolean",
                      message: "Please agree with terms!",
                    },
                  ],
                })(
                  <Checkbox>
                    Accetto l`informativa sul trattamento dei dati personali e
                    sulla Privacy
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("privacy", {
                  initialValue: false,
                  rules: [
                    {
                      required: true,
                      transform: (value) => value || undefined,
                      type: "boolean",
                      message: "Please agree with privacy!",
                    },
                  ],
                })(
                  <Checkbox>
                    Dichiaro di avere piu` di 18 anni e di accettare I Termini e
                    Condizioni
                  </Checkbox>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("newsletter", {
                  initialValue: false,
                })(
                  <Checkbox>
                    Desidero ricevere email promozionali, si bonus, promozioni e
                    giochi
                  </Checkbox>
                )}
              </Form.Item>
            </div>
          </div>
          <div className="col col-md-4 col2Form">
            <div className="firstcol">
              <div className="titleReg">
                Registrati al consessionario di gioco
              </div>

              <Form.Item>
                {getFieldDecorator("consessionario", {
                  rules: [
                    {
                      message: "Please select consessionario!",
                    },
                  ],
                })(
                  <Select
                    placeholder="consessionario"
                    // onChange={this.onChangeIdentity}
                  >
                    <Option value="1">Bbet</Option>
                    <Option value="2">Bbet</Option>
                    <Option value="3">Bbet</Option>
                  </Select>
                )}
              </Form.Item>

              <div className="titleReg">Documenti e gioco responsabile</div>
              <Form.Item>
                {getFieldDecorator("identity_type", {
                  rules: [
                    {
                      required: true,
                      message: "Please select your document type!",
                    },
                  ],
                })(
                  <Select
                    placeholder="Tipo documento*"
                    onChange={this.onChangeIdentity}
                  >
                    {docType.map((doc) => {
                      return (
                        <Option key={doc.id} value={doc.id}>
                          {doc.name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("identity_id", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your doc!",
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder="Numero documento*" />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("identity_issue_by", {
                  rules: [
                    {
                      required: true,
                      message: "Please select rilasciato!",
                    },
                  ],
                })(
                  (() => {
                    switch (this.state.tipoDocumento.toString()) {
                      case "1":
                        return (
                          <Select placeholder="Rilasciato da*">
                            <Option value="1">Comune</Option>
                            <Option value="19">Altro</Option>
                          </Select>
                        );
                      case "2":
                        return (
                          <Select placeholder="Rilasciato da*">
                            <Option value="10">Motorizzazione</Option>
                            <Option value="19">Altro</Option>
                          </Select>
                        );
                      case "3":
                        return (
                          <Select placeholder="Rilasciato da*">
                            <Option value="13">Questura</Option>
                            <Option value="14">Polizia</Option>
                            <Option value="16">Commissariato</Option>
                            <Option value="19">Altro</Option>
                          </Select>
                        );

                      default:
                        return (
                          <Select placeholder="Rilasciato da*">
                            <Option value="1">Comune</Option>
                            <Option value="10">Motorizzazione</Option>
                            <Option value="13">Questura</Option>
                            <Option value="14">Polizia</Option>
                            <Option value="16">Commissariato</Option>
                            <Option value="19">Altro</Option>
                          </Select>
                        );
                    }
                  })()
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("identity_city", {
                  rules: [
                    {
                      required: true,
                      message: "Please input luogo!",
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder="Luogo di rilascio*" />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("identity_issue_date", {
                  rules: [{ required: true }],
                })(
                  <DatePicker
                    placeholder="Valido dal*"
                    format={("DD/MM/YYYY", "DD/MM/YYYY")}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("identity_expiry", {
                  rules: [{ required: true }],
                })(
                  <DatePicker
                    placeholder="Valido fino al*"
                    format={("DD/MM/YYYY", "DD/MM/YYYY")}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("question", {
                  rules: [
                    {
                      required: true,
                      message: "Please select secret question!",
                    },
                  ],
                })(
                  <Select placeholder="Domanda secreta*">
                    <Option value="Cognome di mia madre">
                      Cognome di mia madre
                    </Option>
                    <Option value="La mia squadra del quore">
                      La mia squadra del quore
                    </Option>
                    <Option value="Il mio film preferito">
                      Il mio film preferito
                    </Option>
                    <Option value="Il mio animale domestico">
                      Il mio animale domestico
                    </Option>
                    <Option value="Il tuo soprannome">Il tuo soprannome</Option>
                    <Option value="Il tuo codice secreto">
                      Il tuo codice secreto
                    </Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator("answer", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your answer!",
                      whitespace: true,
                    },
                  ],
                })(<Input placeholder="Risposta secreta*" />)}
              </Form.Item>

              {/* <Form.Item>
                {getFieldDecorator(
                  "promo",
                  {}
                )(<Input placeholder="Codice promozionale" />)}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator(
                  "parent",
                  {}
                )(<Input placeholder="Codice punto vendita(PVR)" />)}
              </Form.Item> */}

              {/* {Object.keys(register).length > 0 && register.message && (
                <div className="error">
                  <span className="closeAlert" onClick={this.hideAlert}>
                    X
                  </span>
                  {register.message}
                </div>
              )}

              {Object.keys(register).length > 0 && register.accountCode && (
                <div className="confirmedMessage">
                  <span className="closeAlert">X</span>
                  Registrato con successo
                </div>
              )} */}

              <div className="ui-panel-bottomtitlebar ui-widget-footer ui-helper-clearfix ui-corner-all sendBTN">
                <Button type="primary" htmlType="submit">
                  Registrati
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const InfoUser = Form.create({ name: "infoUser" })(Register);

const mapsStateToProps = ({ auth }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register,
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(InfoUser)
);

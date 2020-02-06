import React, { Fragment } from "react";

import { Form, Input, Button, DatePicker, Select, Checkbox } from "antd";
import moment from "moment";
import uniqBy from "lodash/uniqBy";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux-store/models/auth";

import "../../themes/css-register/register.css";
import { countriesArray } from "config";

import VirtualizedSelect from "react-virtualized-select";
import { Header } from "shared-components";

const { Option } = Select;

class RegisterEndUser extends React.Component {
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
    sesso: ""
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  changeNazioneDiResidenca = nazioneDiResidencaOptions => {
    this.setState({ nazioneDiResidenca: nazioneDiResidencaOptions.value });
  };

  hideAlert = () => {
    this.props.setRegister({});
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getRegister(
          values.first_name,
          values.last_name,
          values.nickname, // for username
          values.email,
          values.gender,
          values.personal_number,
          moment(values.birthday).format("YYYY-MM-DD"),
          this.state.nazione,
          this.state.province_of_birth,
          this.state.city_of_birth,
          this.state.nazioneDiResidenca,
          this.state.residence_province,
          this.state.residence_city,
          values.address,
          values.cap,
          values.identity_id,
          values.identity_type,
          values.number_prefix,
          values.number
          //   values.self_limit_period,
          //   values.promo,
          //   values.parent,
          //   values.contract,
          //   values.terms,
          //   values.privacy,
          //   values.newsletter
        );

        var that = this;

        setTimeout(function() {
          that.setState({ visible: true });
        }, 1000);
      }
    });
  };

  validateCodiceFiscale = e => {
    const str = e.target.value;
    const fiscalCodeKey = str.substring(str.length - 5, str.length - 1);
    const sexKey = str.substring(9, 11);

    if (sexKey > 40) {
      this.setState({ sesso: "F" });
    } else {
      this.setState({ sesso: "M" });
    }
    countriesArray
      .filter(comune => comune.codeKey.toString() === fiscalCodeKey.toString())
      .map(comune => {
        this.setState({ comuniSelected: comune });
        this.setState({ nazione: comune.nazione });
        this.setState({ province_of_birth: comune.sigla });
        this.setState({ city_of_birth: comune.provincia });

        return comune;
      });
  };

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  onChange = value => {
    console.log(`selected ${value}`);
  };

  onChangeIdentity = value => {
    console.log(`selected ${value}`);
    this.setState({ tipoDocumento: value });
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { register } = this.props;

    const { comuniSelected, nazione, nazioneDiResidenca } = this.state;

    const allNazione = uniqBy(countriesArray, "nazione");

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
        .filter(items => items.nazione === nazione.toUpperCase())
        .map(items => {
          return {
            label: items.provincia,
            value: items.provincia
          };
        });
    }

    let province_of_birthOptions = [];
    if (countriesArray) {
      province_of_birthOptions = countriesArray
        .filter(items => items.nazione === nazione.toUpperCase())
        .map(items => {
          return {
            label: items.sigla,
            value: items.sigla
          };
        });
    }

    /************ RESIDENCA **********/

    let nazioneDiResidencaOptions = [];

    if (allNazione && allNazione.length > 0) {
      nazioneDiResidencaOptions = allNazione.map(items => {
        return {
          label: items.nazione,
          value: items.nazione
        };
      });
    }

    let residence_cityOptions = [];

    if (countriesArray) {
      residence_cityOptions = countriesArray
        .filter(items => items.nazione === nazioneDiResidenca.toUpperCase())
        .map(items => {
          return {
            label: items.provincia,
            value: items.provincia
          };
        });
    }

    let provincaDiResidencaProvinciaOptions = [];

    if (countriesArray) {
      provincaDiResidencaProvinciaOptions = countriesArray
        .filter(items => items.nazione === nazioneDiResidenca.toUpperCase())
        .map(items => {
          return {
            label: items.sigla,
            value: items.sigla
          };
        });
    }

    const number_prefix = getFieldDecorator("number_prefix", {
      initialValue: "0039"
    })(<Input style={{ width: 70 }}></Input>);

    return (
      <Fragment>
        <Header></Header>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div className="infoUser generalInfo row no-gutters">
            <div className="hr"></div>

            <div className="col col-md-8 col1Form">
              <div className="rowUp">
                <div className="firstcol">
                  <div className="titleReg">Registrazione</div>
                  <Form.Item>
                    {getFieldDecorator("personal_number", {
                      rules: [
                        {
                          required: true,
                          message: "Inserisci il tuo codice fiscale!"
                        }
                      ]
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
                          message: "Per favore inserisci il tuo nome!",
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="Nome*" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("last_name", {
                      rules: [
                        {
                          required: true,
                          message: "Per favore inserisci il tuo cognome!",
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="Cognome*" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("gender", {
                      initialValue:
                        this.state.sesso !== "" ? this.state.sesso : "Sesso*",
                      rules: [
                        {
                          required: true,
                          message: "Seleziona il tuo genere!"
                        }
                      ]
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
                          message: "Inserisci il tuo nickname!"
                        }
                      ]
                    })(<Input placeholder="nickname*" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          type: "email",
                          message: "The input is not valid E-mail!"
                        },
                        {
                          required: true,
                          message: "Inserisci la tua e-mail!"
                        }
                      ]
                    })(<Input placeholder="email*" />)}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("number", {
                      rules: [
                        {
                          required: true,
                          message: "Inserisci il tuo numero di telefono!"
                        }
                      ]
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
                      rules: [{ required: true }]
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
                      onChange={province_of_birth =>
                        this.setState({
                          province_of_birth: province_of_birth.value
                        })
                      }
                      value={this.state.province_of_birth}
                      maxHeight={100}
                      placeholder={
                        comuniSelected.sigla
                          ? comuniSelected.sigla
                          : "Provinica di nascita*"
                      }
                    />
                  </Form.Item>

                  <Form.Item>
                    <VirtualizedSelect
                      options={city_of_birth}
                      onChange={city_of_birth =>
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
                      onChange={selectValue =>
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
                      onChange={provincaDiResidencaProvinciaOptions =>
                        this.setState({
                          residence_province:
                            provincaDiResidencaProvinciaOptions.value
                        })
                      }
                      value={this.state.residence_province}
                      maxHeight={100}
                      placeholder="Provincia di residenza* "
                    />
                  </Form.Item>

                  <Form.Item>
                    <VirtualizedSelect
                      options={residence_cityOptions}
                      onChange={residence_city =>
                        this.setState({
                          residence_city: residence_city.value
                        })
                      }
                      value={this.state.residence_city}
                      maxHeight={100}
                      placeholder="Comuna di residenza*"
                    />
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("address", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your name!",
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="Inserisci il tuo indirizzo*" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("cap", {
                      rules: [
                        {
                          required: true,
                          message: "Inserisci il tuo cap!",
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="CAP*" />)}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col col-md-4 col2Form">
              <div className="firstcol">
                <div className="titleReg">Documenti e gioco responsabile</div>
                <Form.Item>
                  {getFieldDecorator("identity_type", {
                    rules: [
                      {
                        required: true,
                        message: "Please select your document type!"
                      }
                    ]
                  })(
                    <Select
                      placeholder="Tipo documento*"
                      onChange={this.onChangeIdentity}
                    >
                      <Option value="1">Carta di identita</Option>
                      <Option value="2">Patenta di guida</Option>
                      <Option value="3">Passaporto</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("identity_id", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your doc!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Numero documento*" />)}
                </Form.Item>

                {Object.keys(register).length > 0 &&
                  register.user &&
                  register.message && (
                    <div className="confirmedMessage">
                      <span className="closeAlert">X</span>
                      {register.message}
                    </div>
                  )}
                {Object.keys(register).length > 0 &&
                  register.message &&
                  !register.user && (
                    <div className="error">
                      <span className="closeAlert" onClick={this.hideAlert}>
                        X
                      </span>
                      {register.message}
                    </div>
                  )}

                <div className="ui-panel-bottomtitlebar ui-widget-footer ui-helper-clearfix ui-corner-all sendBTN">
                  <Button type="primary" htmlType="submit">
                    Registrati
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Fragment>
    );
  }
}

const InfoUser = Form.create({ name: "infoUser" })(RegisterEndUser);

const mapsStateToProps = ({ auth }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(InfoUser)
);

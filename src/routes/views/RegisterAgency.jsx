import React, { Fragment } from "react";

import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Upload,
  Icon,
  message
} from "antd";
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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
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
    fileType: 0,
    cardView: 0,
    sesso: "",
    nascita: "",
    imageUrl: "",
    imageUrl2: "",
    loading: false,
    step: 1
  };
  nextStep = () => {
    let { step } = this.state;
    step += 1;
    if (step >= 4) {
      this.setState({ step: 4 });
    } else {
      this.setState({ step });
    }
  };
  prevStep = () => {
    let { step } = this.state;
    step -= 1;
    if (step <= 1) {
      this.setState({ step: 1 });
    } else {
      this.setState({ step });
    }
  };
  handleChangeBack = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl2 =>
        this.setState({
          imageUrl2,
          loading: false
        })
      );
    }
  };

  handleChangeFront = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
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
      console.log("values", values);
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
          values.number,
          this.state.imageUrl,
          this.state.imageUrl2,
          this.props.accountInfo.profile.role.id,
          values.aRagSoc,
          values.aInsegna,
          values.aPhone,
          values.aAdress,
          values.aCity,
          values.aComcode,
          values.aCap,
          values.aPiva,
          values.aFcode
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

  inputlength = e => {
    if (e.target.value.length === 16) {
      this.validateCodiceFiscale(e);
    }
  };

  validateCodiceFiscale = e => {
    const str = e.target.value;
    const fiscalCodeKey = str.substring(str.length - 5, str.length - 1);
    const sexKey = str.substring(9, 11);

    const yearBKey = str.substring(6, 8);
    const monthBKey = str.substring(8, 9);

    let month = "";
    let year = 1900 + parseInt(yearBKey);
    let day = sexKey % 40;

    if (monthBKey.toUpperCase() === "A") {
      month = "01";
    } else if (monthBKey.toUpperCase() === "B") {
      month = "02";
    } else if (monthBKey.toUpperCase() === "C") {
      month = 3;
    } else if (monthBKey.toUpperCase() === "D") {
      month = 4;
    } else if (monthBKey.toUpperCase() === "E") {
      month = 5;
    } else if (monthBKey.toUpperCase() === "H") {
      month = 6;
    } else if (monthBKey.toUpperCase() === "L") {
      month = 7;
    } else if (monthBKey.toUpperCase() === "M") {
      month = 8;
    } else if (monthBKey.toUpperCase() === "P") {
      month = 9;
    } else if (monthBKey.toUpperCase() === "R") {
      month = 10;
    } else if (monthBKey.toUpperCase() === "S") {
      month = 11;
    } else if (monthBKey.toUpperCase() === "T") {
      month = 12;
    }

    if (sexKey > 40) {
      this.setState({ sesso: "F" });
    } else {
      this.setState({ sesso: "M" });
    }

    this.setState({ nascita: `${day}-${parseInt(month)}-${year}` });

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
  onChangeFileType = value => {
    this.setState({ fileType: value });
  };
  onChangeCardView = value => {
    console.log(`selected ${value}`);
    this.setState({ cardView: value });
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
    const { imageUrl, cardView, imageUrl2 } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { comuniSelected, nazione, nazioneDiResidenca, sesso } = this.state;

    const allNazione = uniqBy(countriesArray, "nazione");

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
    const dateFormat = "DD/MM/YYYY";
    const number_prefix = getFieldDecorator("number_prefix", {
      initialValue: "0039"
    })(<Input style={{ width: 70 }}></Input>);
    const { step } = this.state;
    return (
      <Fragment>
        <Header></Header>

        <Form className="stepForm" onSubmit={this.handleSubmit}>
          <div className={"step step1" + (step === 1 ? " isActive" : "")}>
            <div className="titleReg">Registrazione</div>
            <span className="inpLabel">codice fiscale</span>
            <Form.Item>
              {getFieldDecorator("personal_number", {
                rules: [
                  {
                    required: true,
                    message: "Please input your fiscal code!"
                  }
                ]
              })(
                <Input
                  // placeholder="codice fiscale*"
                  onBlur={this.validateCodiceFiscale}
                  onInput={e => this.inputlength(e)}
                />
              )}
            </Form.Item>
            <span className="inpLabel">Nome</span>

            <Form.Item>
              {getFieldDecorator("first_name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Cognome</span>

            <Form.Item>
              {getFieldDecorator("last_name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Sesso</span>

            <Form.Item>
              {getFieldDecorator("gender", {
                initialValue: "",
                rules: [
                  {
                    required: true,
                    message: "Please select your gender!"
                  }
                ]
              })(
                <Select>
                  <Option value="M">Maschile</Option>
                  <Option value="F">Feminile</Option>
                </Select>
              )}
            </Form.Item>
            <span className="inpLabel">Nickname</span>

            <Form.Item>
              {getFieldDecorator("nickname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your fiscal code!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">email</span>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Telefono</span>

            <Form.Item>
              {getFieldDecorator("number", {
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  }
                ]
              })(<Input addonBefore={number_prefix} />)}
            </Form.Item>
            <div className="stepBtn" onClick={this.nextStep}>
              Next Step 2/4
            </div>
          </div>

          <div className={"step step2" + (step === 2 ? " isActive" : "")}>
            <div className="titleReg">Data anagrafici</div>
            <span className="inpLabel">Data di nascita</span>

            <Form.Item>
              {getFieldDecorator("birthday", {
                initialValue:
                  this.state.nascita !== "" &&
                  moment(this.state.nascita, dateFormat),
                rules: [{ required: true }]
              })(
                <DatePicker
                  // placeholder="Data di nascita*"
                  format={("DD/MM/YYYY", "DD/MM/YYYY")}
                />
              )}
            </Form.Item>
            <span className="inpLabel">Nazione di nascita</span>
            <Form.Item>
              {nazione === "" && <Select>{nazioneList}</Select>}
              {nazione !== "" && (
                <Select defaultValue={this.state.nazione}>{nazioneList}</Select>
              )}
            </Form.Item>
            <span className="inpLabel">provincia di nascita</span>
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
                // placeholder={
                //   comuniSelected.sigla
                //     ? comuniSelected.sigla
                //     : "provincia di nascita*"
                // }
              />
            </Form.Item>
            <span className="inpLabel">Comune di nascita</span>

            <Form.Item>
              <VirtualizedSelect
                options={city_of_birth}
                onChange={city_of_birth =>
                  this.setState({ city_of_birth: city_of_birth.value })
                }
                value={this.state.city_of_birth}
                maxHeight={100}
              />
            </Form.Item>
            <span className="inpLabel">Nazione di residenza</span>

            <Form.Item>
              <VirtualizedSelect
                options={nazioneDiResidencaOptions}
                onChange={selectValue =>
                  this.changeNazioneDiResidenca(selectValue)
                }
                value={this.state.nazioneDiResidenca}
                maxHeight={100}
              />
            </Form.Item>
            <span className="inpLabel">provincia di residenza</span>
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
              />
            </Form.Item>
            <span className="inpLabel">comune di residenza</span>

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
                // placeholder="comune di residenza*"
              />
            </Form.Item>
            <span className="inpLabel">indirizzo di residenza</span>

            <Form.Item>
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">CAP</span>

            <Form.Item>
              {getFieldDecorator("cap", {
                rules: [
                  {
                    required: true,
                    message: "Please input postcode!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <div className="stepBtn" onClick={this.prevStep}>
              Prev Step 1/4
            </div>
            <div className="stepBtn" onClick={this.nextStep}>
              Next Step 3/4
            </div>
          </div>

          <div className={"step step3" + (step === 3 ? " isActive" : "")}>
            <div className="titleReg">Documenti per servizi aggiuntivi</div>
            <span className="inpLabel">Tipo documento</span>

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
                  // placeholder="Tipo documento*"
                  onChange={this.onChangeIdentity}
                >
                  <Option value="1">Carta di identita</Option>
                  <Option value="2">Patenta di guida</Option>
                  <Option value="3">Passaporto</Option>
                </Select>
              )}
            </Form.Item>
            <span className="inpLabel">Numero documento</span>

            <Form.Item>
              {getFieldDecorator("identity_id", {
                rules: [
                  {
                    required: true,
                    message: "Please input your doc!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <div className="stepBtn" onClick={() => this.prevStep()}>
              Prev Step 2/4
            </div>
            <div className="stepBtn" onClick={() => this.nextStep()}>
              Next Step 4/4
            </div>
          </div>

          <div className={"step step4" + (step === 4 ? " isActive" : "")}>
            <div className="titleReg"> DATI PUNTO VENDITA</div>
            <span className="inpLabel">Ragione Sociale</span>
            <Form.Item>
              {getFieldDecorator("aRagSoc", {
                rules: [
                  {
                    required: true,
                    message: "Please input rag sociale!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Insegna</span>
            <Form.Item>
              {getFieldDecorator("aInsegna", {
                rules: [
                  {
                    required: true,
                    message: "Please input insegna!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Agensy Phone</span>
            <Form.Item>
              {getFieldDecorator("aPhone", {
                rules: [
                  {
                    required: true,
                    message: "Please input phone number",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Adress</span>
            <Form.Item>
              {getFieldDecorator("aAdress", {
                rules: [
                  {
                    required: true,
                    message: "Please input adress",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Agency City</span>
            <Form.Item>
              {getFieldDecorator("aCity", {
                rules: [
                  {
                    required: true,
                    message: "Please input City",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Comune Code</span>
            <Form.Item>
              {getFieldDecorator("aComcode", {
                rules: [
                  {
                    required: true,
                    message: "Please input City",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Agency Cap</span>
            <Form.Item>
              {getFieldDecorator("aCap", {
                rules: [
                  {
                    required: true,
                    message: "Please input cap",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">p.Iva</span>
            <Form.Item>
              {getFieldDecorator("aPiva", {
                rules: [
                  {
                    required: true,
                    message: "Please input p.Iva",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <span className="inpLabel">Agency Codice Fiscale</span>
            <Form.Item>
              {getFieldDecorator("aFcode", {
                rules: [
                  {
                    required: true,
                    message: "Please input codice",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <div className="stepBtn" onClick={this.prevStep}>
              Prev Step 3/4
            </div>
            <Button type="primary" className="stepBtn" htmlType="submit">
              Registrati
            </Button>
          </div>
        </Form>
      </Fragment>
    );
  }
}

const InfoUser = Form.create({ name: "infoUser" })(RegisterEndUser);

const mapsStateToProps = ({ auth }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register,
  accountInfo: auth.accountInfo
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(InfoUser)
);

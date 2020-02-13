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
  console.log("ca ka fron back", file);
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
    imageUrl: "",
    imageUrl2: "",
    loading: false
  };
  handleChangeBack = info => {
    console.log("ca ka back", info);
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
    console.log("ca ka front", info);
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
          values.file_type,
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
    console.log("imageUrl", imageUrl2);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { comuniSelected, nazione, nazioneDiResidenca, sesso } = this.state;

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
                          message: "Please input your fiscal code!"
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
                          message: "Please input your name!",
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
                          message: "Please input your last name!",
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

                  <Form.Item>
                    {getFieldDecorator("nickname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your fiscal code!"
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
                          message: "Please input your E-mail!"
                        }
                      ]
                    })(<Input placeholder="email*" />)}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("number", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phone number!"
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
                          : "provincia di nascita*"
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
                      placeholder="provincia di residenza* "
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
                      placeholder="comune di residenza*"
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
                    })(<Input placeholder="indirizzo di residenza*" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("cap", {
                      rules: [
                        {
                          required: true,
                          message: "Please input postcode!",
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
                <div className="titleReg">Upload Doc</div>
                <Form.Item>
                  {getFieldDecorator("file_type", {
                    rules: [
                      {
                        required: true,
                        message: "Please select your document type!"
                      }
                    ]
                  })(
                    <Select
                      placeholder="Tipo di file"
                      onChange={this.onChangeFileType}
                    >
                      <Option value="0">Carta di identita(image)</Option>
                      <Option value="1">Credit Card (image)</Option>
                      <Option value="2">Patenta (image)</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("cart_view", {
                    rules: [
                      {
                        required: true,
                        message: "Select card view"
                      }
                    ]
                  })(
                    <Select
                      placeholder="Document View*"
                      onChange={this.onChangeCardView}
                    >
                      <Option value="1">Front</Option>
                      <Option value="2">Back</Option>
                    </Select>
                  )}
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
                {parseInt(cardView) === 1 && (
                  <Upload
                    name="front"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChangeFront}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
                {parseInt(cardView) === 2 && (
                  <Upload
                    name="back"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChangeBack}
                  >
                    {imageUrl2 ? (
                      <img
                        src={imageUrl2}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
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

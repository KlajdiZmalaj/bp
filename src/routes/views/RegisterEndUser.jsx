import React, { Fragment } from "react";
import { docType } from "config";
import { getCopy } from "utils";
import { skin } from "config/api";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Upload,
  Icon,
  message,
} from "antd";
import moment from "moment";
import uniqBy from "lodash/uniqBy";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { AuthActions, MainActions } from "redux-store/models";

import "../../themes/css-register/register.css";
import countriesArray from "config/countryArr";

import VirtualizedSelect from "react-virtualized-select";
import { Header } from "shared-components";
import { Modal } from "antd";
const { Option } = Select;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const dateFormat = "DD/MM/YYYY";

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

    // comuniSelected: {},
    nazione: "",
    province_of_birth: "",
    city_of_birth: "",

    nazioneDiResidenca: "",
    residence_province: "",
    residence_city: "",
    shareIcons: false,
    tipoDocumento: "",
    fileType: 0,
    cardView: 0,
    sesso: "",
    nascita: "",
    imageUrl: "",
    imageUrl2: "",
    loading: false,
    privacy_policy: false,
    recieve_emails: false,
    token: {},
    loaded: false,
    codFisInps: "",
    renderHtml: false,
  };
  setToken = (token) => {
    this.setState({ token });
  };
  renderScript = () => {
    var el = document.getElementById("sharescript");
    //let _ = this;
    function write() {
      var script = document.createElement("script");
      script.onload = function () {
        console.log("loaded");
        // _.setState({ renderHtml: true });
      };
      script.id = "sharescript";
      script.async = "async";
      script.src =
        "https://platform-api.sharethis.com/js/sharethis.js#property=6026b8281f03dd0011f25adb&product=inline-share-buttons";
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    if (el) {
      el.remove();
      write();
    } else {
      write();
    }
  };
  componentWillMount() {
    this.renderScript();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.register && prevProps.register !== this.props.register) {
      if (this.props.register?.role) {
        Modal.success({
          content: this.props.register.message,
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.match.params.token) {
      this.setState({ token: this.props.match.params.token });
    } else {
      this.props.getRegisterToken(
        this.props.accountInfo.profile.account_id,
        this.setToken
      );
    }
  }

  handleChangeBack = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl2) =>
        this.setState({
          imageUrl2,
          loading: false,
        })
      );
    }
  };

  handleChangeFront = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  handleClose = () => {
    this.setState({ visible: false });
  };

  changeNazioneDiResidenca = (nazioneDiResidencaOptions) => {
    this.setState({ nazioneDiResidenca: nazioneDiResidencaOptions.value });
  };

  hideAlert = () => {
    this.props.setRegister({});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.getRegister(
          values.first_name,
          values.last_name,
          values.nickname, // for username
          values.email,
          values.gender,
          this.state.codFisInps,
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
          "user",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          values.confirm_password,
          values.password,
          values.rilasciato_da,
          values.luogo_di_rilascio,
          values.data_di_rilascio,
          values.data_di_scadenza,
          "",
          "",
          "",
          this.state.privacy_policy,
          this.state.recieve_emails,
          "", //percentage
          this.props.match.params.token //register_token from url
        );

        var that = this;

        setTimeout(function () {
          that.setState({ visible: true });
        }, 1000);
      }
    });
  };

  inputlength = (e) => {
    if (e.target.value.length === 16) {
      this.validateCodiceFiscale(e);
    }
  };

  validateCodiceFiscale = () => {
    const inpArr = [...new Array(16)].map((inp, k) => {
      return document.getElementById("inp" + k);
    });
    let codFisInps = "";
    inpArr.forEach((inp) => {
      codFisInps += inp.value.toUpperCase() || " ";
    });
    this.setState({
      codFisInps,
    });

    const str = codFisInps.toUpperCase();

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
      // this.setState({ sesso: "F" });
      this.props.form.setFieldsValue({
        gender: "F",
      });
    } else {
      // this.setState({ sesso: "M" });
      this.props.form.setFieldsValue({
        gender: "M",
      });
    }
    this.props.form.setFieldsValue({
      birthday: moment(`${day}-${parseInt(month)}-${year}`, dateFormat),
    });

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

  handleChange = (value) => {};

  render() {
    const { getFieldDecorator } = this.props.form;
    const { imageUrl, cardView, imageUrl2, codFisInps } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { nazione, nazioneDiResidenca } = this.state;
    // const {comuniSelected ,sesso}=this.state
    const allNazione = uniqBy(countriesArray, "nazione");

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };

    const nazioneList = [];
    if (allNazione && allNazione.length > 0) {
      for (let i = 0; i < allNazione.length; i++) {
        nazioneList.push(
          <Option
            key={allNazione[i].nazione}
            value={allNazione[i].nazione}
            onClick={() => this.setState({ nazione: allNazione[i].nazione })}
          >
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
    const number_prefix = getFieldDecorator("number_prefix", {
      initialValue: "0039",
    })(<Input style={{ width: 70 }}></Input>);

    return (
      <Fragment>
        <Header></Header>

        <Form className="newReg maxWidth" onSubmit={this.handleSubmit}>
          <div className="newReg--header">Registra Nuovi Utenti</div>

          <div className="newReg--row">
            <div className="newReg--row__col">
              <div className="itemCol full">
                <div className="inputLabel">
                  Codice Fiscale <span>*</span>
                </div>

                <div className={"inpssWrapper"}>
                  {this.props.screenWidth > 1024 ? (
                    [...new Array(16)].map((input, key) => {
                      return (
                        <input
                          key={key}
                          maxLength="1"
                          id={`inp${key}`}
                          type="text"
                          onKeyDown={(e) => {
                            // console.log("keydown", e.keyCode || e.charCode);
                            const previnp = document.getElementById(
                              `inp${key - 1}`
                            );
                            const inp = document.getElementById(`inp${key}`);
                            const nextinp = document.getElementById(
                              `inp${key + 1}`
                            );
                            var keyy = e.keyCode || e.charCode;
                            if (keyy !== 8 && keyy !== 9) {
                              inp.value = String.fromCharCode(keyy);

                              if (nextinp && !nextinp.value) {
                                nextinp.focus();
                              }
                              if (previnp && !previnp.value) {
                                inp.value = "";
                                previnp.focus();
                              } else {
                                if (inp.value && inp.value.length > 0) {
                                  nextinp && nextinp.focus();
                                }
                              }
                            }
                            if (keyy === 8) {
                              inp.value = "";
                              if (previnp) {
                                previnp.focus();
                              }
                            }
                            this.validateCodiceFiscale();
                          }}
                          className={`inputCodice`}
                          onPaste={() => {
                            navigator.clipboard
                              .readText()
                              .then((codFisInps) => {
                                this.setState({ codFisInps });
                              })
                              .catch((err) => {
                                console.error(
                                  "Failed to read clipboard contents: ",
                                  err
                                );
                              });
                          }}
                          value={this.state.codFisInps.split("")[key]}
                        />
                      );
                    })
                  ) : (
                    <>
                      <input
                        className="inputCodice text-left"
                        style={{ borderRight: 0 }}
                        type="text"
                        value={this.state.codFisInps}
                        onChange={(e) => {
                          this.setState({ codFisInps: e.target.value });
                        }}
                      />
                    </>
                  )}
                  <i
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((codFisInps) => {
                          this.setState({ codFisInps });
                          this.validateCodiceFiscale();
                        })
                        .catch((err) => {
                          console.error(
                            "Failed to read clipboard contents: ",
                            err
                          );
                        });
                    }}
                    className="fal fa-paste"
                  ></i>
                  {codFisInps.length > 0 &&
                    codFisInps.length === 16 &&
                    !codFisInps.includes(" ") && (
                      <i className="fas fa-check-circle"></i>
                    )}
                  {((codFisInps.length > 0 && codFisInps.length < 16) ||
                    codFisInps.includes(" ")) && (
                    <i className="fas fa-times-circle"></i>
                  )}
                </div>

                {/* <Form.Item>
                  {getFieldDecorator("personal_number", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire codice fiscale!",
                      },
                    ],
                  })(
                    <Input
                      // placeholder="codice fiscale*"
                      onBlur={this.validateCodiceFiscale}
                      onInput={(e) => this.inputlength(e)}
                    />
                  )}
                </Form.Item> */}
              </div>
              <div className="itemCol semi">
                <Form.Item>
                  <div className="inputLabel">
                    Nome <span>*</span>
                  </div>
                  {getFieldDecorator("first_name", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire nome!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Cognome <span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("last_name", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire cognome!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <span className="inputLabel">Sesso</span>

                <Form.Item>
                  {getFieldDecorator("gender", {
                    initialValue: "",
                    rules: [
                      {
                        required: true,
                        message: "Inserire sesso!",
                      },
                    ],
                  })(
                    <Select>
                      <Option value="M">Maschile</Option>
                      <Option value="F">Feminile</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <span className="inputLabel">Nickname</span>

                <Form.Item>
                  {getFieldDecorator("nickname", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire fiscal code!",
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Email</span>
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "Non valido E-mail!",
                      },
                      {
                        required: true,
                        message: "Inserire E-mail!",
                      },
                    ],
                  })(
                    <Input
                      onMouseEnter={() => {
                        document
                          .getElementById("infoUser_email")
                          .removeAttribute("readonly");
                      }}
                      readOnly
                    />
                  )}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Password<span>*</span>
                </div>
                <Form.Item hasFeedback>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire password!",
                      },
                    ],
                  })(<Input.Password type="password" />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Conferma Password<span>*</span>
                </div>
                <Form.Item hasFeedback>
                  {getFieldDecorator("confirm_password", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire password!",
                      },
                      {
                        validator: (a, b, c) => {
                          const { form } = this.props;
                          if (
                            form.getFieldValue("password") ===
                            form.getFieldValue("confirm_password")
                          ) {
                            c();
                          } else {
                            c("Conferma password errata!");
                          }
                        },
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Telefono</span>

                <Form.Item>
                  {getFieldDecorator("number", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire numero telefono!",
                      },
                    ],
                  })(<Input addonBefore={number_prefix} />)}
                </Form.Item>
              </div>
            </div>
            <div className="newReg--row__col">
              <div className="itemCol semi">
                <span className="inputLabel">Data di nascita</span>

                <Form.Item>
                  {getFieldDecorator("birthday", {
                    rules: [{ required: true }],
                  })(
                    <DatePicker
                      // placeholder="Data di nascita*"
                      format={("DD/MM/YYYY", "DD/MM/YYYY")}
                    />
                  )}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <span className="inputLabel">Nazione di nascita</span>
                <Form.Item>
                  {nazione === "" && <Select>{nazioneList}</Select>}
                  {nazione !== "" && (
                    <Select defaultValue={this.state.nazione}>
                      {nazioneList}
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Provincia di nascita</span>
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
                  />
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Comune di nascita</span>

                <Form.Item>
                  <VirtualizedSelect
                    options={city_of_birth}
                    onChange={(city_of_birth) =>
                      this.setState({ city_of_birth: city_of_birth.value })
                    }
                    value={this.state.city_of_birth}
                    maxHeight={100}
                  />
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Nazione di residenza</span>

                <Form.Item>
                  <VirtualizedSelect
                    options={nazioneDiResidencaOptions}
                    onChange={(selectValue) =>
                      this.changeNazioneDiResidenca(selectValue)
                    }
                    value={this.state.nazioneDiResidenca}
                    maxHeight={100}
                  />
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Provincia di residenza</span>
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
                  />
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Comune di residenza</span>

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
                    // placeholder="comune di residenza*"
                  />
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Indirizzo di residenza</span>

                <Form.Item>
                  {getFieldDecorator("address", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your name!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">CAP</span>

                <Form.Item>
                  {getFieldDecorator("cap", {
                    rules: [
                      {
                        required: true,
                        message: "Please input postcode!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
            </div>
            <div className="newReg--row__col">
              <div className="itemCol full">
                <span className="inputLabel">Tipo documento</span>

                <Form.Item>
                  {getFieldDecorator("identity_type", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire tipo documenti!",
                      },
                    ],
                  })(
                    <Select
                      // placeholder="Tipo documento*"
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
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Numero documento</span>

                <Form.Item>
                  {getFieldDecorator("identity_id", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire doc!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <span className="inputLabel">Document View</span>

                <Form.Item>
                  {getFieldDecorator(
                    "cart_view",
                    {}
                  )(
                    <Select onChange={this.onChangeCardView}>
                      <Option value="1">Front</Option>
                      <Option value="2">Back</Option>
                    </Select>
                  )}
                </Form.Item>

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
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Rilasciato da<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("rilasciato_da", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                      },
                    ],
                  })(
                    <Select>
                      <Option value="1">Comune</Option>
                      <Option value="10">Motorizzazione</Option>
                      <Option value="13">Questura</Option>
                      <Option value="14">Polizia</Option>
                      <Option value="16">Commissariato</Option>
                      <Option value="19">Altro</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Luogo di rilascio<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("luogo_di_rilascio", {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Data di rilascio<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("data_di_rilascio", {
                    rules: [{ required: true }],
                  })(<DatePicker format={("DD/MM/YYYY", "DD/MM/YYYY")} />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Data di scadenza<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("data_di_scadenza", {
                    rules: [{ required: true }],
                  })(<DatePicker format={("DD/MM/YYYY", "DD/MM/YYYY")} />)}
                </Form.Item>
              </div>

              <div className="itemCol full">
                {/* {(register.message || true) && (
                  <React.Fragment>
                    {register.role ? (
                      <React.Fragment>
                        <div className="Nmessage S">
                          <i
                            className="fas fa-check-circle"
                            aria-hidden="true"
                          ></i>
                          {register.message}
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )} */}
              </div>
            </div>
          </div>
          <div className="newReg--row">
            <div className="newReg--row__col">
              <Checkbox
                onChange={(e) => {
                  this.setState({ privacy_policy: e.target.checked });
                }}
              >
                Accetto l'informativa sul trattamento dei dati personali e sulla
                Privacy Policy
              </Checkbox>
            </div>
            <div className="newReg--row__col">
              <Checkbox
                onChange={(e) => {
                  this.setState({ recieve_emails: e.target.checked });
                }}
              >
                Desidero ricevere e-mail promozionali, e info di servizi o altro
              </Checkbox>
            </div>
            <div className="newReg--row__col submitcol">
              <Button type="primary" className="SubmitButton" htmlType="submit">
                Registrati
              </Button>
              {!this.props.match.params.token && (
                <div className="shareRegister">
                  <div
                    onClick={() => {
                      this.setState({ shareIcons: !this.state.shareIcons });
                    }}
                  >
                    <i className="fal fa-share" aria-hidden="true"></i>
                    Condividere
                  </div>
                  {
                    <div
                      className={
                        "options" + (this.state.shareIcons ? "" : " d-none")
                      }
                    >
                      <i
                        className="fal fa-copy"
                        onClick={() => {
                          getCopy(
                            `${window.location.href}t/${this.state.token.register_token}`
                          );
                        }}
                      ></i>{" "}
                      <div
                        // className="sharethis-sticky-share-buttons"
                        className="sharethis-inline-share-buttons"
                        data-image={`${window.location.origin}/images${skin.skin_id}/icon-512x512.png`}
                        data-title="Condividi il link del registro"
                        data-url={`${window.location.href}t/${this.state.token.register_token}`}
                      ></div>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>
        </Form>
      </Fragment>
    );
  }
}

const InfoUser = Form.create({ name: "infoUser" })(RegisterEndUser);

const mapsStateToProps = ({ auth, main }) => ({
  personalInfo: auth.personalInfo,
  register: auth.register,
  accountInfo: auth.accountInfo,
  screenWidth: main.screenWidth,
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions, ...MainActions })(InfoUser)
);

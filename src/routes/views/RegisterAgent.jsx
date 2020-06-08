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
  message,
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
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

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
    locationData: {},
    comuniSelected: {},
    nazione: "",
    province_of_birth: "",
    city_of_birth: "",

    nazioneDiResidenca: "",
    residence_province: "",
    residence_city: "",
    codFisInps: "",
    tipoDocumento: "",
    fileType: 0,
    cardView: 0,
    sesso: "",
    nascita: "",
    imageUrl: "",
    imageUrl2: "",
    loading: false,
    step: 1,
    pagamensileInp: "",
    costoanualeInp: "",
    recieve_emails: false,
    privacy_policy: false,
  };
  componentDidMount() {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          locationData: data,
          cordinateReq: `${data.latitude},${data.longitude}`,
        });
        this.props.form.setFieldsValue({
          cordinate: `${data.latitude},${data.longitude}`,
        });
      });
  }
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
      console.log("values", values);
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
          "agent",
          values.aRagSoc,
          values.aInsegna,
          values.aPhone,
          values.aAdress,
          values.aCity,
          values.aComcode,
          values.aCap,
          values.aPiva,
          values.aFcode,
          values.confirm_password,
          values.password,
          values.rilasciato_da,
          values.luogo_di_rilascio,
          values.data_di_rilascio,
          values.data_di_scadenza,
          this.state.cordinateReq,
          values.a_contry,
          values.pagmens,
          this.state.privacy_policy,
          this.state.recieve_emails,
          values.percentage
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

  getValues = () => {
    const inpArr = [...new Array(16)].map((inp, k) => {
      return document.getElementById("inp" + k);
    });
    let codFisInps = "";
    inpArr.forEach((inp) => {
      codFisInps += inp.value || " ";
    });
    console.log("inpArr", inpArr);
    this.setState({
      codFisInps,
    });

    const str = codFisInps;
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
      this.props.form.setFieldsValue({
        gender: "F",
      });
    } else {
      this.setState({ sesso: "M" });
      this.props.form.setFieldsValue({
        gender: "M",
      });
    }

    this.setState({ nascita: `${day}-${parseInt(month)}-${year}` });

    countriesArray
      .filter(
        (comune) => comune.codeKey.toString() === fiscalCodeKey.toString()
      )
      .map((comune) => {
        this.setState({ comuniSelected: comune });
        this.setState({ nazione: comune.nazione });
        this.setState({ province_of_birth: comune.sigla });
        this.setState({ city_of_birth: comune.provincia });

        return comune;
      });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
  };
  onChangeIdentity = (value) => {
    console.log(`selected ${value}`);
    this.setState({ tipoDocumento: value });
  };
  onChangeFileType = (value) => {
    this.setState({ fileType: value });
  };
  onChangeCardView = (value) => {
    console.log(`selected ${value}`);
    this.setState({ cardView: value });
  };
  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = (val) => {
    console.log("search:", val);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { register } = this.props;
    const { imageUrl, cardView, imageUrl2, codFisInps } = this.state;

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
    const dateFormat = "DD/MM/YYYY";
    const number_prefix = getFieldDecorator("number_prefix", {
      initialValue: "+39",
    })(<Input style={{ width: 70 }}></Input>);
    const { step } = this.state;
    console.log("ca ka form", this.props.form);
    return (
      <Fragment>
        <Header></Header>

        <Form className="newReg" onSubmit={this.handleSubmit}>
          <div className="newReg--header">Registra Agente</div>
          <div className="newReg--row">
            <div className="newReg--row__col">
              <div className="itemCol full">
                <div className="inputLabel">
                  Codice fiscale <span>*</span>
                </div>
                <div className={"inpssWrapper"}>
                  {[...new Array(16)].map((input, key) => {
                    return (
                      <input
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
                          this.getValues();
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
                  })}
                  <i
                    onClick={() => {
                      navigator.clipboard
                        .readText()
                        .then((text) => {
                          this.setState({ codFisInps: text });
                          this.getValues();
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
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Nome <span>*</span>
                </div>
                <Form.Item hasFeedback>
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
                <Form.Item hasFeedback>
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
                <div className="inputLabel">
                  Sesso <span>*</span>
                </div>
                <Form.Item hasFeedback>
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
                <div className="inputLabel">
                  Email <span>*</span>
                </div>
                <Form.Item hasFeedback>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "L'input non è valido E-mail!",
                      },
                      {
                        required: true,
                        message: "Inserisci la tua e-mail!",
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
                  Data di nascita <span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("birthday", {
                    initialValue:
                      this.state.nascita !== "" &&
                      moment(this.state.nascita, dateFormat),
                    rules: [{ required: true }],
                  })(
                    <DatePicker
                      // disabledDate={(current) => {
                      //   return current && current > moment().add(-18, "years");
                      // }}
                      placeholder=""
                      format={("DD/MM/YYYY", "DD/MM/YYYY")}
                    />
                  )}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Comuna di nascita <span>*</span>
                </div>
                <Form.Item hasFeedback>
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
              <div className="itemCol semi">
                <div className="inputLabel">
                  Provincia <span>*</span>
                </div>
                <Form.Item hasFeedback>
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
              <div className="itemCol semi">
                <div className="inputLabel">
                  Nazione <span>*</span>
                </div>
                <Form.Item hasFeedback>
                  {nazione === "" && <Select>{nazioneList}</Select>}
                  {nazione !== "" && (
                    <Select defaultValue={this.state.nazione}>
                      {nazioneList}
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <div className="inputLabel">
                  Indirizzo <span>*</span>
                </div>
                <Form.Item hasFeedback>
                  {getFieldDecorator("address", {
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
                  Nazione di residenza <span>*</span>
                </div>
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

              <div className="itemCol semi">
                <div className="inputLabel">
                  Cap di residenza{" "}
                  <span
                    onMouseOver={() => {
                      this.setState({ capHelper: true });
                    }}
                    onMouseLeave={() => {
                      this.setState({ capHelper: false });
                    }}
                  >
                    * (?)
                    {this.state.capHelper && (
                      <div className="helper">Il cap deve avere 5 numeri</div>
                    )}
                  </span>
                </div>
                <Form.Item hasFeedback>
                  {getFieldDecorator("cap", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire postcode!",
                        whitespace: true,
                      },
                      {
                        validator: (a, b, c) => {
                          const { form } = this.props;
                          const numbers = /[0-9]/g;
                          if (
                            form.getFieldValue("cap").match(numbers) &&
                            form.getFieldValue("cap").length === 5
                          ) {
                            c();
                          } else {
                            c("Cap sbagliato!");
                          }
                        },
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Provincia di residenza <span>*</span>
                </div>
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
              <div className="itemCol semi">
                <div className="inputLabel">
                  Comune di residenza <span>*</span>
                </div>
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
            </div>
            <div className="newReg--row__col">
              <div className="itemCol full">
                <div className="inputLabel">
                  Ragione sociale <span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("aRagSoc", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire rag sociale!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>

              <div className="itemCol semi">
                <div className="inputLabel">
                  P.Iva<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("aPiva", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire p.Iva",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi piva">
                <div className="inputLabel">
                  Verifica P.iva<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("pivaVerifica", {
                    rules: [
                      {
                        required: false,
                        whitespace: true,
                      },
                    ],
                  })(
                    <div>
                      <Select>
                        <Option value="a">Validato</Option>
                        <Option value="b">Non Validato</Option>
                      </Select>
                    </div>
                  )}
                  <i className="fas fa-file-check"></i>
                  <a
                    target="_blank"
                    href="https://telematici.agenziaentrate.gov.it/VerificaPIVA/Scegli.do?parameter=verificaPiva"
                  >
                    <i className="fas fa-link"></i>
                  </a>
                </Form.Item>
              </div>

              {/* pagamensileInp : '',
              costoanualeInp : '' */}
              <div className="itemCol full">
                <div className="inputLabel">
                  Percentage%<span>*</span>
                </div>

                <Form.Item>
                  {getFieldDecorator("percentage", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire percentage",
                        whitespace: true,
                      },
                    ],
                  })(<Input type="number" />)}
                </Form.Item>
              </div>
            </div>
            <div className="newReg--row__col">
              <div className="itemCol full">
                <div className="inputLabel">
                  Nickname
                  <span
                    onMouseOver={() => {
                      this.setState({ nicknameHelp: true });
                    }}
                    onMouseLeave={() => {
                      this.setState({ nicknameHelp: false });
                    }}
                  >
                    * (?)
                    {this.state.nicknameHelp && (
                      <div className="helper">
                        Il nickname deve contenere più di 7 caratteri
                      </div>
                    )}
                  </span>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("nickname", {
                      rules: [
                        {
                          required: true,
                          message: "Inserire nickname!",
                        },
                        {
                          validator: (a, b, c) => {
                            const { form } = this.props;
                            if (form.getFieldValue("nickname").length >= 8) {
                              c();
                            } else {
                              c("Nickname corto!");
                            }
                          },
                        },
                      ],
                    })(<Input />)}
                  </Form.Item>
                </div>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Password<span>*</span>
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
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Conferma password<span>*</span>
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
                <div className="inputLabel">
                  Cellulare<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("number", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire phone number!",
                      },
                    ],
                  })(<Input addonBefore={number_prefix} />)}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <div className="inputLabel">
                  Tipo Documento<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("identity_type", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire tipo di documenti!",
                      },
                    ],
                  })(
                    <Select onChange={this.onChangeIdentity}>
                      <Option value="1">Carta di identita</Option>
                      <Option value="2">Patenta di guida</Option>
                      <Option value="3">Passaporto</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className="itemCol full">
                <div className="inputLabel">
                  Numero Documento<span>*</span>
                </div>
                <Form.Item>
                  {getFieldDecorator("identity_id", {
                    rules: [
                      {
                        required: true,
                        message: "Inserire document id!",
                        whitespace: true,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Rilasciato da<span>*</span>
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
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Luogo di rilascio<span>*</span>
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
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Data di rilascio<span>*</span>
                  <Form.Item>
                    {getFieldDecorator("data_di_rilascio", {
                      initialValue: moment(this.state.nascita, dateFormat),
                      rules: [{ required: true }],
                    })(<DatePicker format={("DD/MM/YYYY", "DD/MM/YYYY")} />)}
                  </Form.Item>
                </div>
              </div>
              <div className="itemCol semi">
                <div className="inputLabel">
                  Data di scadenza<span>*</span>
                  <Form.Item>
                    {getFieldDecorator("data_di_scadenza", {
                      initialValue: moment(this.state.nascita, dateFormat),
                      rules: [{ required: true }],
                    })(<DatePicker format={("DD/MM/YYYY", "DD/MM/YYYY")} />)}
                  </Form.Item>
                </div>
              </div>

              <div className="itemCol full">
                {register.message && (
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
                        <div className="Nmessage E">
                          <i
                            className="fas fa-times-circle"
                            aria-hidden="true"
                          ></i>
                          {register.message}
                        </div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
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
                Accetto l`informativa sul trattamento dei dati personali e sulla
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
  register: auth.register,
  accountInfo: auth.accountInfo,
});

export default withRouter(
  connect(mapsStateToProps, { ...AuthActions })(InfoUser)
);

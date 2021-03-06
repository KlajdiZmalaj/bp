import React from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import images from "themes/images";
import { Form, Select, Upload, Icon, message } from "antd";
import { docType } from "config";
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  console.log("file.type", file.type);
  const isJpgOrPng =
    file.type === "image/jpg" ||
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "application/pdf";
  if (!isJpgOrPng) {
    message.error("Solo JPG/PNG/PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  // console.log("filee", file, file.size, isLt2M);
  return isJpgOrPng && isLt2M;
}

class ModulePopUp3 extends React.Component {
  state = {
    importo: "",
    user_id: "",
    intestazione: "",
    codice_fiscale_intestatario: "",
    ordinante: "",
    codice_fiscale_ordinante: "",
    numero_postepay: "",
    showUpload: false,
    cardView: 0,
    imageUrl: "",
    imageUrl2: "",
    loading: false,
    document_type: 0,
    checkValidations: false,
    validations: {
      intestazione: false,
      importo: false,
      codice_fiscale_intestatario: false,
      ordinante: false,
      codice_fiscale_ordinante: false,
      numero_postepay: false,
    },
  };
  componentDidMount() {
    document.body.classList.add("overflow-hidden");
  }
  componentWillUnmount() {
    document.body.classList.remove("overflow-hidden");
  }

  onChangeCardView = (value) => {
    this.setState({ cardView: value });
  };

  onChangeTypeView = (value) => {
    this.setState({ document_type: value });
  };

  handleChangeBack = (info) => {
    if (info.file.status) {
      getBase64(info.file.originFileObj, (imageUrl2) =>
        this.setState({
          imageUrl2,
          loading: false,
        })
      );
    }
  };

  handleChangeFront = (info) => {
    // console.log("info", info);
    if (info.file.status) {
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  handleChangeImporto(event) {
    // console.log("evvev", event.target.value);
    this.setState({ importo: event.target.value });
    if (event.target.value && event.target.value.length > 0) {
      this.setState({
        validations: { ...this.state.validations, importo: true },
      });
    } else {
      this.setState({
        validations: { ...this.state.validations, importo: false },
      });
    }
  }

  handleChangeIntestazione(event) {
    this.setState({ intestazione: event.target.value });
  }

  handleChangeCfIntestazione(event) {
    this.setState({ codice_fiscale_intestatario: event.target.value });
    if (event.target.value && event.target.value.length >= 16) {
      this.setState({
        validations: {
          ...this.state.validations,
          codice_fiscale_intestatario: true,
        },
      });
    }
  }

  handleChangeOrdinante(event) {
    this.setState({ ordinante: event.target.value });
    if (event.target.value && event.target.value.length > 0) {
      this.setState({
        validations: { ...this.state.validations, ordinante: true },
      });
    } else {
      this.setState({
        validations: { ...this.state.validations, ordinante: false },
      });
    }
  }

  handleChangeCfOrdinante(event) {
    this.setState({ codice_fiscale_ordinante: event.target.value });
    if (event.target.value && event.target.value.length > 0) {
      this.setState({
        validations: {
          ...this.state.validations,
          codice_fiscale_ordinante: true,
        },
      });
    } else {
      this.setState({
        validations: {
          ...this.state.validations,
          codice_fiscale_ordinante: false,
        },
      });
    }
  }

  handleChangeNrPostepay(event) {
    this.setState({ numero_postepay: event.target.value });
    if (event.target.value && event.target.value.length > 0) {
      this.setState({
        validations: { ...this.state.validations, numero_postepay: true },
      });
    } else {
      this.setState({
        validations: { ...this.state.validations, numero_postepay: false },
      });
    }
  }

  hideAlert = () => {
    this.props.setPostePay({});
  };

  handleSearch = (value) => {
    if (value.length > 2) {
      this.props.getUsersBySearch(value);

      if (
        this.props.userList["photo"] &&
        this.props.userList["photo"].length < 1 &&
        this.props.userList["no_photo"] &&
        this.props.userList["no_photo"].length < 1
      ) {
        this.setState({ showUpload: true });
        this.setState({ intestazione: value });
        this.setState({ user_id: "" });
        this.setState({
          validations: { ...this.state.validations, intestazione: true },
        });
      } else {
        this.setState({ showUpload: false });
        this.setState({
          validations: { ...this.state.validations, intestazione: false },
        });
      }
    }
  };

  handleChangeUser_id(event) {
    const ev = JSON.parse(event);
    const user = Object.values(ev)[0];

    if (Object.keys(ev)[0] === "no_photo") {
      this.setState({ showUpload: true });
    }
    if (Object.keys(ev)[0] === "photo") {
      this.setState({ showUpload: false });
    }

    if (user.first_name && user.last_name) {
      this.setState({ intestazione: `${user.first_name} ${user.last_name}` });
      this.setState({
        codice_fiscale_intestatario: user.codice_fiscale_ordinante,
        validations: {
          ...this.state.validations,
          codice_fiscale_intestatario: true,
          intestazione: true,
        },
        user_id: user.id,
      });
    } else {
      this.setState({
        validations: {
          ...this.state.validations,
          intestazione: false,
          codice_fiscale_intestatario: false,
        },
      });
    }
  }
  clearFields = () => {
    this.setState({
      importo: "",
      user_id: "",
      intestazione: "",
      codice_fiscale_intestatario: "",
      ordinante: "",
      codice_fiscale_ordinante: "",
      numero_postepay: "",
      document_type: "",
      imageUrl: "",
      imageUrl2: "",
      checkValidations: false,
      validations: {
        intestazione: false,
        importo: false,
        codice_fiscale_intestatario: false,
        ordinante: false,
        codice_fiscale_ordinante: false,
        numero_postepay: false,
      },
    });
  };
  handleSubmit = (service_id) => {
    const {
      importo,
      user_id,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay,
      document_type,
      imageUrl,
      imageUrl2,
    } = this.state;

    this.props.getPostePay(
      service_id,
      importo,
      user_id,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay,
      document_type,
      imageUrl,
      imageUrl2,
      this.clearFields
    );
  };

  render() {
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
    const { getFieldDecorator } = this.props.form;
    const { service_id, userList, postePay } = this.props;

    const {
      importo,
      intestazione,
      codice_fiscale_intestatario,
      ordinante,
      codice_fiscale_ordinante,
      numero_postepay,
      showUpload,
      imageUrl,
      cardView,
      imageUrl2,
      validations,
      checkValidations,
    } = this.state;
    //console.log("validations", validations, checkValidations);
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    let options = [];
    let b = [];
    let c = [];
    if (userList && Object.keys(userList).length > 0) {
      c.concat({ photo: userList["photo"] });
      c.concat({ no_photo: userList["no_photo"] });
    }

    if (userList && Object.keys(userList).length > 0) {
      Object.keys(userList).map((item) => {
        if (userList[item] && userList[item].length > 0) {
          b = b.concat(userList[item]);

          options = (b || []).map((i) => {
            return (
              <Option key={JSON.stringify({ [item]: i })}>
                {i.first_name} {i.last_name}
              </Option>
            );
          });
          return options;
        }
        return options;
      });
    }

    return (
      <div className="modulePopUP modulePopUP3">
        <div className="module container-fluid max-width_modulePopUP">
          <div className="row">
            <div className="col-12 leftCol_Module">
              <div className="row no-gutters">
                <div className="col-12 col-lg-6">
                  <table className="_modulePopUP__table">
                    <tbody>
                      <tr>
                        <td>
                          <div>
                            <img src={images.postpayimg} alt="" />
                          </div>
                        </td>
                        <td>
                          <div>
                            Servizio attivo tutti i giorni <br />
                            feriali dalle 8,30 alle 19,30
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
                        <td
                          onClick={async () => {
                            await this.setState({ checkValidations: true });
                            let valid = true;
                            Object.values(validations).forEach((validEl) => {
                              if (!validEl) {
                                valid = false;
                              }
                            });
                            if (valid) {
                              this.handleSubmit(service_id);
                            }
                          }}
                        >
                          <h3>esegui</h3>
                          <img src={images.checkSymbol} alt="" />
                        </td>
                        <td>
                          <h3>esegui</h3>

                          <p>
                            pagemento <br /> differito
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
                          <h3>Annulla</h3>
                          <img src={images.close} alt="" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row no-gutters _modulePopUP__body">
                <div className="col-12 py-3">
                  <h2>RICARICA POSTEPAY</h2>
                </div>

                <div className="col-12 payThumb ">
                  <img src={images.postepayBlue} className="img-fluid" alt="" />
                  <p className="text-center">
                    Attenzione: a causa della normativa sull`antiriciclaggio,
                    l`importo massimo ricaricabile e di Euro 200+ commissioni.
                    Non e possibile effettuare, in una giornata, piu di due
                    ricariche verso la stessa carte Postepay.
                  </p>
                </div>

                <div className="col-5 ">
                  <div className="euroboll ">
                    <span className="pr-5">INTESTATARIO</span>
                  </div>
                </div>
                <div className="col-7">
                  <div className="euroboll ">
                    <Select
                      showSearch
                      value={intestazione}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.handleChangeUser_id.bind(this)}
                      placeholder="select"
                    >
                      {options}
                    </Select>
                  </div>
                </div>
                {!validations.intestazione && checkValidations && (
                  <div className="col-12 errorField">
                    INTESTATARIO ?? obbligatorio
                  </div>
                )}

                {showUpload && (
                  <div className="col-12 document">
                    {
                      <Form {...formItemLayout}>
                        <Form.Item>
                          {getFieldDecorator(
                            "cart_view",
                            {}
                          )(
                            <Select
                              placeholder="Document View"
                              onChange={this.onChangeCardView}
                            >
                              <Option value="1">Front</Option>
                              <Option value="2">Back</Option>
                            </Select>
                          )}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator(
                            "type_view",
                            {}
                          )(
                            <Select
                              placeholder="Document Type"
                              onChange={this.onChangeTypeView.bind(this)}
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
                      </Form>
                    }
                  </div>
                )}

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">IMPORTO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={importo}
                      onChange={this.handleChangeImporto.bind(this)}
                    />
                  </div>
                </div>
                {!validations.importo && checkValidations && (
                  <div className="col-12 errorField">
                    Importo ?? obbligatorio
                  </div>
                )}
                {/* <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">INTESTATARIO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={intestazione}
                      onChange={this.handleChangeIntestazione.bind(this)}
                    />
                  </div>
                </div> */}

                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">COD FISC INTESTATARIO</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={codice_fiscale_intestatario}
                      onChange={this.handleChangeCfIntestazione.bind(this)}
                    />
                  </div>
                </div>
                {!validations.codice_fiscale_intestatario &&
                  checkValidations && (
                    <div className="col-12 errorField">
                      COD FISC INTESTATARIO ?? obbligatorio
                    </div>
                  )}
                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">ORDINANTE</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={ordinante}
                      onChange={this.handleChangeOrdinante.bind(this)}
                    />
                  </div>
                </div>
                {!validations.ordinante && checkValidations && (
                  <div className="col-12 errorField">
                    Ordinante ?? obbligatorio
                  </div>
                )}
                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">COD FISC ORDINANTE</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={codice_fiscale_ordinante}
                      onChange={this.handleChangeCfOrdinante.bind(this)}
                    />
                  </div>
                </div>
                {!validations.codice_fiscale_ordinante && checkValidations && (
                  <div className="col-12 errorField">
                    COD FISC ORDINANTE ?? obbligatorio
                  </div>
                )}
                <div className="col-5 pt-2">
                  <div className="euroboll ">
                    <span className="pr-5">Numero Postepay</span>
                  </div>
                </div>
                <div className="col-7 pt-2">
                  <div className="euroboll ">
                    <input
                      type="text"
                      value={numero_postepay}
                      onChange={this.handleChangeNrPostepay.bind(this)}
                    />
                  </div>
                </div>
                {!validations.numero_postepay && checkValidations && (
                  <div className="col-12 errorField">
                    Numero Postepay ?? obbligatorio
                  </div>
                )}
                <div className="col-12 mt-4">
                  <div className="euroboll">
                    <span>CONDIZIONI</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="euroboll">
                    <div className="contitions-boll">
                      <p>
                        CONDIZIONI SPECIFICHE DI UTILIZZO DELLA FUNZIONE SERVIZI
                        POSTALI PROFILI NORMATIVI
                      </p>
                      <p>
                        Il pagamento dei bollettini postali ?? un servizio di
                        pagamento per il cui esercizio professionale ??
                        necessaria un'apposita autorizzazione rilasciata dalla
                        Banca d'Italia. In particolare, l'articolo 114-sexies
                        del Testo unico bancario (d.lgs. 385/1993) riserva la
                        prestazione di servizi di pagamento alle banche, agli
                        istituti di moneta elettronica, a Poste Italiane Spa e
                        agli Istituti di Pagamento (c.d. ???prestatori di servizi
                        di pagamento???, PSP)
                      </p>
                      .
                      <p>
                        I soggetti che offrono alla clientela il servizio
                        ???Pagamento bollettini di conto corrente??? devono operare
                        o come prestatori di servizi di pagamento oppure sulla
                        base di un contratto con un prestatore di servizi di
                        pagamento autorizzato. Lo stesso vale anche nel caso di
                        soggetti, diversi da Poste Italiane, abilitati
                        all'offerta di servizi postali; la sola autorizzazione
                        e/o la licenza rilasciata dal Ministero dello Sviluppo
                        Economico per i servizi postali non abilita quindi tali
                        soggetti allo svolgimento del servizio 'Pagamento
                        bollettini postali'.
                      </p>
                      <p>
                        1. OGGETTO E DESCRIZIONE I servizi inclusi nella sezione
                        vengono evasi in collaborazione con Mr.Pay Srl. Il
                        cliente affiliato, una volta attivato l'account a lui
                        riservato, per utilizzare il servizio di pagamento
                        utenze dovr?? seguire le istruzioni contenute nella
                        pagina dedicata.
                      </p>
                      <p>
                        La funzione ???Prodotti Postali??? permette ai Clienti
                        Affiliati, di inviare a Mr.Pay Srl la richiesta di
                        effettuare il pagamento di bollettini postali mediante
                        addebito sul Borsellino Elettronico prepagato dell'
                        importo del bollettino da pagare sommato ai relativi
                        diritti postali e commissioni.
                      </p>
                    </div>
                  </div>
                </div>
                {(postePay.errors || postePay.message) && (
                  <div className="messages">
                    <div className="closeM" onClick={this.hideAlert}>
                      chiudi messaggi
                    </div>
                    {postePay.errors &&
                      Object.keys(postePay.errors).map((item, index) => {
                        return (
                          <div className="errorM" key={index}>
                            <i className="fad fa-exclamation text-danger"></i>
                            {postePay.errors[item]}
                          </div>
                        );
                      })}

                    {postePay.message && (
                      <div className="infoM">
                        <i className="fad fa-info text-info"></i>{" "}
                        {postePay.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* <div className="col-5 rightCol_Module">
              <div className="row no-gutters">
                <div className="_modulePopUP__cupon">
                  <div className="_modulePopUP__cupon--header">
                    <img src={images.print} alt="" />
                    <h3>Stampa dello scontrino</h3>
                  </div>
                  <div className="_modulePopUP__cupon--body">
                    <img src={images.logoGray} alt="" />
                    <h6>OTC srl</h6>
                    <span className="__cupon--body__address">
                      Via Risorgimento n.50 - castel san pietro terme
                    </span>
                    <span className="__cupon--body__phone">234234234</span>

                    <div className="btn-group" role="group">
                      <button type="button" className="btn btn-secondary">
                        <img src={images.checkSymbol} alt="" />
                        <br />
                        Stampa
                      </button>
                      <button type="button" className="btn btn-secondary">
                        <img src={images.close} alt="" /> <br />
                        Annulla
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const InfoUser = Form.create({ name: "infoUser" })(ModulePopUp3);

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service_s: state.auth.service_s,
  rechargeMobile: state.auth.rechargeMobile,
  userList: state.main.userListBySearch,
  postePay: state.auth.postePay,
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  InfoUser
);

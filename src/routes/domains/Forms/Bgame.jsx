import React, { Component } from "react";
import { Select, notification, DatePicker } from "antd";
import moment from "moment";
import images from "themes/images";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import VirtualizedSelect from "react-virtualized-select";
import { countriesArray } from "config";
import CodiceFiscale from "codice-fiscale-js";
const { Option } = Select;

class Eventi extends Component {
  state = {
    nome: "",
    cognome: "",
    data_nascita: null,
    sesso: "M",
    nazione_nascita: "",
    comune_nascita: "",
    codice_fiscale: "",
    comune_residenca: "",
    indirizzo: "",
    cap: "",
    telefono: "",
    cellullare: "",
    email: "",
    tipo_documenta: "1",
    documento: "",
    rilasciato_da: "COMUNE",
    data_rilascio: "",
    data_scadenza: "",
    nnome: "",
    pword: "",
    domanda_segreta: "",
    risposta_segreta: "",
    provincia_nascita: "",
    nazione_cittadinanza: "",
    id_nazione_cittadinanza: "",
    comune_residenca_id: "",
  };
  componentDidMount() {
    this.props.getRegistrazioneData();
  }
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        nome: "",
        cognome: "",
        data_nascita: null,
        sesso: "M",
        nazione_nascita: "",
        comune_nascita: "",
        codice_fiscale: "",
        comune_residenca: "",
        indirizzo: "",
        cap: "",
        telefono: "",
        cellullare: "",
        email: "",
        tipo_documenta: "1",
        documento: "",
        rilasciato_da: "COMUNE",
        data_rilascio: "",
        data_scadenza: "",
        nnome: "",
        pword: "",
        domanda_segreta: "",
        risposta_segreta: "",
        provincia_nascita: "",
        nazione_cittadinanza: "",
        id_nazione_cittadinanza: "",
        comune_residenca_id: "",
      });
      notification["success"]({
        message: "Azione completata",
        description: msg.msg,
        placement: "bottomRight",
      });
    } else {
      notification["error"]({
        message: msg.msg[0],
        description: msg.msg[1],
        placement: "bottomRight",
        duration: 5,
      });
    }
  };
  submitData = () => {
    const {
      nome,
      data_nascita,
      nazione_nascita_id,
      codice_fiscale,
      indirizzo,
      cap,
      telefono,
      cellullare,
      email,
      comune_nascita_id,
      documento,
      data_rilascio,
      data_scadenza,
      nnome,
      pword,
      tipo_documenta,
      risposta_segreta,
      domanda_segreta,
      cognome,
      sesso,
      comune_residenca_id,
      rilasciato_da,
      id_nazione_cittadinanza,
    } = this.state;
    this.props.createUserBgame(
      nome,
      cognome,
      data_nascita,
      sesso,
      nazione_nascita_id,
      comune_nascita_id,
      codice_fiscale,
      comune_residenca_id,
      indirizzo,
      cap,
      telefono,
      cellullare,
      email,
      tipo_documenta,
      documento,
      rilasciato_da,
      data_rilascio,
      data_scadenza,
      id_nazione_cittadinanza,
      nnome,
      pword,
      domanda_segreta,
      risposta_segreta
    );
  };
  returnID = (list, name) => {
    let id = 0;
    Object.keys(list).forEach((key) => {
      if (list[key].nome === name) {
        id = list[key].id;
        return id;
      }
    });
    return id;
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      codice_fiscale,
      nome,
      cognome,
      sesso,
      data_nascita,
      comune_nascita,
      provincia_nascita,
      nazione_nascita,
    } = this.state;
    if (codice_fiscale !== prevState.codice_fiscale) {
      if (codice_fiscale.length === 16) {
        try {
          var cf = new CodiceFiscale(codice_fiscale);
          const isValidCf = CodiceFiscale.check(cf?.code);
          let stateOjChange = {};
          if (cf?.birthplace?.prov !== "EE") {
            stateOjChange = {
              sesso: cf.toJSON().gender,
              data_nascita: moment(
                `${cf.toJSON().day}/${cf.toJSON().month}/${cf.toJSON().year}`,
                "DD/MM/YYYY"
              ).format("DD/MM/YYYY"),
              comune_nascita: cf.birthplace.nome,
              comune_nascita_id: this.props.comuni
                ? this.returnID(this.props.comuni, cf.birthplace.nome)
                : null,
              provincia_nascita: cf.birthplace.prov,
            };
          } else {
            stateOjChange = {
              sesso: cf.toJSON().gender,
              data_nascita: moment(
                `${cf.toJSON().day}/${cf.toJSON().month}/${cf.toJSON().year}`,
                "DD/MM/YYYY"
              ),
              nazione_nascita: cf.birthplace.nome,
              nazione_nascita_id: this.props.nazioni
                ? this.returnID(this.props.nazioni, cf.birthplace.nome)
                : null,
            };
          }
          if (isValidCf) {
            this.setState((state) => ({
              ...stateOjChange,
            }));
          }
        } catch (error) {
          notification["error"]({
            message: "Codice fiscale non e valido",
          });
        }
      }
    }
    if (
      nome !== prevState.nome ||
      cognome !== prevState.cognome ||
      sesso !== prevState.sesso ||
      data_nascita !== prevState.data_nascita ||
      nazione_nascita !== prevState.nazione_nascita ||
      (nazione_nascita === "ITALIA" &&
        provincia_nascita !== prevState.provincia_nascita) ||
      (nazione_nascita === "ITALIA" &&
        comune_nascita !== prevState.comune_nascita)
    ) {
      if (
        nome &&
        nome !== "" &&
        sesso &&
        sesso !== "" &&
        data_nascita &&
        data_nascita !== "" &&
        nazione_nascita &&
        nazione_nascita !== "" &&
        cognome &&
        cognome !== "" &&
        (nazione_nascita !== "ITALIA"
          ? true
          : provincia_nascita && provincia_nascita !== "") &&
        (nazione_nascita !== "ITALIA"
          ? true
          : comune_nascita && comune_nascita !== "")
      ) {
        try {
          var mycf = {
            name: nome
              ? nome.toString().charAt(0).toUpperCase() + nome.substring(1)
              : null,
            surname: cognome
              ? cognome.toString().charAt(0).toUpperCase() +
                cognome.substring(1)
              : null,
            gender: sesso,
            day: parseInt(moment(data_nascita, "DD/MM/YYYY").format("DD")),
            month: parseInt(moment(data_nascita, "DD/MM/YYYY").format("MM")),
            year: parseInt(moment(data_nascita, "DD/MM/YYYY").format("YYYY")),
            birthplace: nazione_nascita
              ? nazione_nascita === "ITALIA"
                ? comune_nascita.toString().charAt(0).toUpperCase() +
                  comune_nascita.substring(1)
                : nazione_nascita.toString().charAt(0).toUpperCase() +
                  nazione_nascita.substring(1)
              : null,
            birthplaceProvincia:
              nazione_nascita === "ITALIA"
                ? provincia_nascita
                  ? provincia_nascita
                  : null
                : "EE",
          };
          const cf = new CodiceFiscale({
            ...mycf,
          });
          const isValidCf = CodiceFiscale.check(cf?.code);
          if (isValidCf) {
            this.setState({ codice_fiscale: cf?.code });
          }
        } catch (error) {
          notification["error"]({
            message:
              "Non è possibile generare codice_fiscale, le informazioni sono sbagliate",
          });
        }
      }
    }
  }
  render() {
    const {
      nome_agenzia,
      color,
      goBack,
      isMobile,
      activeService,
      comuni,
      nazioni,
      province,
      tipi_documento,
    } = this.props;
    const {
      nome,
      cognome,
      data_nascita,
      sesso,
      nazione_nascita,
      comune_nascita,
      codice_fiscale,
      comune_residenca,
      indirizzo,
      cap,
      telefono,
      cellullare,
      email,
      tipo_documenta,
      documento,
      rilasciato_da,
      data_rilascio,
      data_scadenza,
      nnome,
      pword,
      domanda_segreta,
      risposta_segreta,
      provincia_nascita,
      nazione_cittadinanza,
      id_nazione_cittadinanza,
      nazione_nascita_id,
      comune_nascita_id,
      comune_residenca_id,
    } = this.state;
    return (
      <div className="formsContainer--body animated fadeIn eventi">
        {!isMobile && (
          <div className="leftForm">
            <img src={images[`${nome_agenzia}-bg`]} alt="" className="imgBg" />
          </div>
        )}
        <form autoComplete="off" autoSave="off" autoCorrect="off">
          <div className="rightForm">
            <div className="rightForm--header">
              {!isMobile && (
                <div className="TitleBack" style={{ color: color }}>
                  <i className="fal fa-chevron-left Arrow" onClick={goBack}></i>
                  Registra USER
                </div>
              )}

              {isMobile && (
                <div className="TitleBack">
                  <i className="fal fa-receipt"></i> {activeService}{" "}
                </div>
              )}
              <img
                className={nome_agenzia}
                src={images[`${nome_agenzia}-logo`]}
                alt=""
              />
            </div>
            <div className="rightForm--left">
              <div className="formsContainer--body__item ">
                <div className="label">
                  Nome <span className="Red">*</span>
                </div>
                <input
                  value={nome}
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => {
                    this.setState({ nome: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Cognome <span className="Red">*</span>
                </div>
                <input
                  value={cognome}
                  placeholder="Cognome"
                  onChange={(e) => {
                    this.setState({ cognome: e.target.value });
                  }}
                  type="text"
                />
              </div>
              <div className="formsContainer--body__item semi">
                <div className="label">
                  Data Nascita <span className="Red">*</span>
                </div>
                <DatePicker
                  showTime
                  value={
                    data_nascita
                      ? moment(data_nascita, "DD/MM/YYYY")
                      : data_nascita
                  }
                  format="DD/MM/YYYY"
                  onChange={(e) => {
                    this.setState({
                      data_nascita: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Sesso <span className="Red">*</span>
                </div>

                <Select
                  onChange={(value) => {
                    this.setState({ sesso: value });
                  }}
                  defaultValue={"M"}
                  value={sesso}
                >
                  <Option value="M">Maschile</Option>
                  <Option value="F">Feminile</Option>
                </Select>
                {/* Comune nascita nazione nascita codice_fiscale fiscale */}
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Nazione Nascita <span className="Red">*</span>
                </div>
                <VirtualizedSelect
                  options={Object.keys(nazioni ? nazioni : []).map(
                    (country) => ({
                      label: nazioni[country].nome,
                      value: nazioni[country].nome,
                      id: nazioni[country].id,
                    })
                  )}
                  onChange={(province_of_birth) =>
                    this.setState({
                      nazione_nascita: province_of_birth
                        ? province_of_birth.value
                        : null,
                      nazione_nascita_id: province_of_birth
                        ? province_of_birth.id
                        : null,
                    })
                  }
                  value={nazione_nascita}
                  maxHeight={100}
                  placeholder={"Select"}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Provincia Nascita <span className="Red">*</span>
                </div>

                <VirtualizedSelect
                  options={Object.keys(province ? province : []).map(
                    (country) => ({
                      label: province[country].sigla,
                      value: province[country].sigla,
                    })
                  )}
                  onChange={(province_of_birth) =>
                    this.setState({
                      provincia_nascita: province_of_birth
                        ? province_of_birth.value
                        : null,
                    })
                  }
                  value={provincia_nascita}
                  maxHeight={100}
                  placeholder={"Select"}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Comune Nascita <span className="Red">*</span>
                </div>

                <VirtualizedSelect
                  options={Object.keys(comuni ? comuni : []).map((country) => ({
                    label: comuni[country].nome,
                    value: comuni[country].nome,
                    id: comuni[country].id,
                  }))}
                  onChange={(province_of_birth) =>
                    this.setState({
                      comune_nascita: province_of_birth
                        ? province_of_birth.value
                        : null,
                      comune_nascita_id: province_of_birth
                        ? province_of_birth.id
                        : null,
                    })
                  }
                  value={comune_nascita}
                  maxHeight={100}
                  placeholder={"Select"}
                />
              </div>
              <div className="formsContainer--body__item datiPass">
                <div className="label">
                  {" "}
                  Codice Fiscale <span className="Red">*</span>
                </div>
                <input
                  value={codice_fiscale}
                  type="text"
                  placeholder="Codice Fiscale"
                  onChange={(e) => {
                    this.setState({ codice_fiscale: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Comune Residenca <span className="Red">*</span>
                </div>

                <VirtualizedSelect
                  options={Object.keys(comuni ? comuni : []).map((country) => ({
                    label: comuni[country].nome,
                    value: comuni[country].nome,
                    id: comuni[country].id,
                  }))}
                  onChange={(province_of_birth) =>
                    this.setState({
                      comune_residenca: province_of_birth
                        ? province_of_birth.value
                        : null,
                      comune_residenca_id: province_of_birth
                        ? province_of_birth.id
                        : null,
                    })
                  }
                  value={comune_residenca}
                  maxHeight={100}
                  placeholder={"Select"}
                />
              </div>
              <div className="formsContainer--body__item datiPass">
                <div className="label">
                  {" "}
                  Indirizzo <span className="Red">*</span>
                </div>
                <input
                  value={indirizzo}
                  placeholder="Indirizzo"
                  type="text"
                  onChange={(e) => {
                    this.setState({ indirizzo: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item datiPass">
                <div className="label">
                  {" "}
                  Cap <span className="Red">*</span>
                </div>
                <input
                  value={cap}
                  type="text"
                  placeholder="Cap"
                  onChange={(e) => {
                    this.setState({ cap: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item datiPass">
                <div className="label">
                  {" "}
                  Telefono <span className="Red">*</span>
                </div>
                <input
                  value={telefono}
                  placeholder="Telefono"
                  type="text"
                  onChange={(e) => {
                    this.setState({ telefono: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="rightForm--right">
              <div className="formsContainer--body__item ">
                <div className="label">
                  Cellullare <span className="Red">*</span>
                </div>
                <input
                  value={cellullare}
                  placeholder="Cellullare"
                  type="text"
                  onChange={(e) => {
                    this.setState({ cellullare: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Email <span className="Red">*</span>
                </div>
                <input
                  value={email}
                  placeholder="Email"
                  type="text"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
                <i className="fal fa-envelope inputI" />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Tipo Documento <span className="Red">*</span>
                </div>
                <Select
                  onChange={(value) => {
                    this.setState({ tipo_documenta: value });
                  }}
                  value={tipo_documenta}
                  defaultValue={"1"}
                >
                  {tipi_documento &&
                    Object.keys(tipi_documento).map((key) => (
                      <Option
                        value={tipi_documento[key].id}
                        key={tipi_documento[key].id}
                      >
                        {tipi_documento[key].descrizione}
                      </Option>
                    ))}
                </Select>
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Documento <span className="Red">*</span>
                </div>
                <input
                  type="text"
                  value={documento}
                  placeholder="Documento"
                  onChange={(e) => {
                    this.setState({ documento: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">Rilasciato Da</div>
                <Select
                  onChange={(value) => {
                    this.setState({ rilasciato_da: value });
                  }}
                  value={rilasciato_da}
                  defaultValue={"COMUNE"}
                >
                  <Option value={"COMUNE"}>COMUNE</Option>
                  <Option value={"MOTORIZZAZIONE"}>MOTORIZZAZIONE</Option>
                  <Option value={"QUESTURA"}>QUESTURA</Option>
                  <Option value={"POLIZIA"}>POLIZIA</Option>
                  <Option value={"COMMISSARIATO"}>COMMISSARIATO</Option>
                  <Option value={"ALTRO"}>ALTRO</Option>
                </Select>
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Nazione Cittadinanza <span className="Red">*</span>
                </div>
                <VirtualizedSelect
                  options={Object.keys(nazioni ? nazioni : []).map(
                    (country) => ({
                      label: nazioni[country].nome,
                      value: nazioni[country].nome,
                      id: nazioni[country].id,
                    })
                  )}
                  onChange={(province_of_birth) =>
                    this.setState({
                      nazione_cittadinanza: province_of_birth
                        ? province_of_birth.value
                        : null,
                      id_nazione_cittadinanza: province_of_birth
                        ? province_of_birth.id
                        : null,
                    })
                  }
                  value={nazione_cittadinanza}
                  maxHeight={100}
                  placeholder={"Select"}
                />
              </div>
              <div className="formsContainer--body__item semi">
                <div className="label">
                  Data Rilascio <span className="Red">*</span>
                </div>
                <DatePicker
                  showTime
                  format="DD/MM/YYYY"
                  onChange={(e) => {
                    this.setState({
                      data_rilascio: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              </div>
              <div className="formsContainer--body__item semi">
                <div className="label">
                  Data Scadenza <span className="Red">*</span>
                </div>
                <DatePicker
                  format="DD/MM/YYYY"
                  showTime
                  onChange={(e) => {
                    this.setState({
                      data_scadenza: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  NickName <span className="Red">*</span>
                </div>
                <input
                  value={nnome}
                  placeholder="NickName"
                  type="text"
                  onChange={(e) => {
                    this.setState({ nnome: e.target.value });
                  }}
                />
              </div>

              <div className="formsContainer--body__item">
                <div className="label">
                  Password <span className="Red">*</span>
                </div>
                <input
                  value={pword}
                  placeholder="Password"
                  autoComplete="new-password"
                  type="password"
                  onChange={(e) => {
                    this.setState({ pword: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Domanda Segreta <span className="Red">*</span>
                </div>
                <input
                  value={domanda_segreta}
                  placeholder="Domanda Segreta"
                  type="text"
                  onChange={(e) => {
                    this.setState({ domanda_segreta: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item">
                <div className="label">
                  Risposta Segreta <span className="Red">*</span>
                </div>
                <input
                  value={risposta_segreta}
                  placeholder="Risposta Segreta"
                  type="text"
                  onChange={(e) => {
                    this.setState({ risposta_segreta: e.target.value });
                  }}
                />
              </div>
              <div className="formsContainer--body__item submit">
                <button
                  style={{ backgroundColor: color }}
                  onClick={this.submitData}
                >
                  Invia
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mstp = (state) => ({
  tipi_documento: state.auth.SelectData?.tipi_documento,
  nazioni: state.auth.SelectData?.nazioni,
  province: state.auth.SelectData?.province,
  comuni: state.auth.SelectData?.comuni,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(Eventi);

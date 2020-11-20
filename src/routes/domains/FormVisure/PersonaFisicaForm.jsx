import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { notification, Select } from "antd";
import countriesArray from "config/countryArr";
import VirtualizedSelect from "react-virtualized-select";

import FormContainerBody from "./FormContainerBody";
import DatePicker from "shared-components/DatePicker/DatePicker";
import moment from "moment";
import "./VisureStyles.css";
var CodiceFiscale = require("codice-fiscale-js");
const { Option } = Select;

export const InputForForm = ({
  readOnly,
  labelName,
  value,
  handleChange,
  type,
  info,
  onBlur,
  className,
}) => {
  return (
    <div
      className={
        "formsContainer--body__item" +
        (info ? ` hasInfo ${info}` : "") +
        ` ${className ? className : ""}`
      }
    >
      <div className="label">{labelName}</div>
      <input
        readOnly={readOnly}
        value={value || ""}
        onBlur={onBlur}
        onChange={handleChange}
        type={type}
      />
    </div>
  );
};
class PersonaFisicaForm extends Component {
  state = {
    nome: "",
    cognome: "",
    codice_fiscale: "",
    data_di_nascita: "",
    luogo_di_nascita: "",
    provincia: "",
    address: "",
    telefono: "",
    email: "",
    gender: "M",
    province_of_birth: null,
    butonVisibility: true,
  };
  componentDidUpdate(prevProps, prevState) {
    const {
      nome,
      cognome,
      codice_fiscale,
      data_di_nascita,
      luogo_di_nascita,
      province_of_birth,
      gender,
    } = this.state;
    if (codice_fiscale !== prevState.codice_fiscale) {
      if (codice_fiscale.length === 16) {
        try {
          var cf = new CodiceFiscale(codice_fiscale);
          const isValidCf = CodiceFiscale.check(cf?.code);
          if (isValidCf) {
            this.setState((state) => ({
              gender: state.gender ? state.gender : cf.toJSON().gender,
              data_di_nascita: state.data_di_nascita
                ? state.data_di_nascita
                : moment(
                    `${cf.toJSON().day}/${cf.toJSON().month}/${
                      cf.toJSON().year
                    }`,
                    "DD/MM/YYYY"
                  ),
              luogo_di_nascita: state.luogo_di_nascita
                ? state.luogo_di_nascita
                : cf.birthplace.nome,
              province_of_birth: state.province_of_birth
                ? state.province_of_birth
                : cf.birthplace.prov,
            }));
          }
        } catch (error) {
          notification["error"]({
            message: "Codice fiscale non e valido",
          });
        }
        try {
          var mycf = {
            name: nome
              ? nome.toString().charAt(0).toUpperCase() + nome.substring(1)
              : null,
            surname: cognome
              ? cognome.toString().charAt(0).toUpperCase() +
                cognome.substring(1)
              : null,
            gender: gender,

            day: parseInt(moment(data_di_nascita, "DD/MM/YYYY").format("DD")),
            month: parseInt(moment(data_di_nascita, "DD/MM/YYYY").format("MM")),
            year: parseInt(
              moment(data_di_nascita, "DD/MM/YYYY").format("YYYY")
            ),
            birthplace: luogo_di_nascita
              ? luogo_di_nascita.toString().charAt(0).toUpperCase() +
                luogo_di_nascita.substring(1)
              : null,
            birthplaceProvincia: province_of_birth
              ? province_of_birth.toUpperCase()
              : null,
          };
          const cf = new CodiceFiscale({
            ...mycf,
          });
          const isValidCf = CodiceFiscale.check(cf?.code);
          if (cf?.code && codice_fiscale) {
            if (
              isValidCf &&
              cf.code.toString().trim().toUpperCase() ===
                codice_fiscale.toString().trim().toUpperCase()
            ) {
              this.setState({ butonVisibility: false });
            }
          }
        } catch (error) {}
      }
    }
  }

  generateCodiceFiscale = () => {
    const {
      nome,
      cognome,
      data_di_nascita,
      luogo_di_nascita,
      province_of_birth,
      gender,
    } = this.state;
    try {
      var mycf = {
        name: nome
          ? nome.toString().charAt(0).toUpperCase() + nome.substring(1)
          : null,
        surname: cognome
          ? cognome.toString().charAt(0).toUpperCase() + cognome.substring(1)
          : null,
        gender: gender,

        day: parseInt(moment(data_di_nascita, "DD/MM/YYYY").format("DD")),
        month: parseInt(moment(data_di_nascita, "DD/MM/YYYY").format("MM")),
        year: parseInt(moment(data_di_nascita, "DD/MM/YYYY").format("YYYY")),
        birthplace: luogo_di_nascita
          ? luogo_di_nascita.toString().charAt(0).toUpperCase() +
            luogo_di_nascita.substring(1)
          : null,
        birthplaceProvincia: province_of_birth
          ? province_of_birth.toUpperCase()
          : null,
      };
      const cf = new CodiceFiscale({
        ...mycf,
      });
      const isValidCf = CodiceFiscale.check(cf?.code);
      if (isValidCf) {
        this.setState({ codice_fiscale: cf.code });
      }
    } catch (error) {
      notification["error"]({
        message: "I dati non sono validi per generare il codice fiscale",
        description:
          " Nome/Cognome/Luogo di Nascita/Provincia del luogo di nascita/Gender/Data di nascita sono obbligatori e dovrebbero essere corretti",
      });
    }
  };
  resetState = (msg) => {
    if (!msg.error) {
      this.setState({
        nome: "",
        cognome: "",
        codice_fiscale: "",
        data_di_nascita: "",
        luogo_di_nascita: "",
        provincia: "",
        address: "",
        telefono: "",
        email: "",
        gender: "M",
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
  render() {
    const { activeService } = this.props;
    const {
      nome,
      cognome,
      codice_fiscale,
      data_di_nascita,
      luogo_di_nascita,
      provincia,
      address,
      telefono,
      email,
      gender,
      province_of_birth,
      butonVisibility,
    } = this.state;
    return (
      <FormContainerBody
        goBack={this.props.goBack}
        resetOfState={this.resetState}
        data={{
          ...this.state,
          servizi: activeService.name,
          price: activeService.price,
          sc: activeService.sco,
        }}
        visButton={butonVisibility}
        type={1}
        headerTitle={"INDICA I DATI DELLA PERSONA"}
        leftForm={
          <div>
            <InputForForm
              labelName="Nome"
              value={nome}
              handleChange={(e) => {
                this.setState({ nome: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Cognome"
              value={cognome}
              handleChange={(e) => {
                this.setState({ cognome: e.target.value });
              }}
              type={"text"}
            />
            <div className="formsContainer--body__item">
              <div className="label">Provincia del luogo di nascita</div>

              <VirtualizedSelect
                options={countriesArray.map((country) => ({
                  label: country.sigla,
                  value: country.sigla,
                }))}
                onChange={(province_of_birth) =>
                  this.setState({
                    province_of_birth: province_of_birth
                      ? province_of_birth.value
                      : null,
                  })
                }
                value={province_of_birth}
                maxHeight={100}
                placeholder={"Select"}
              />
            </div>
            <div className="formsContainer--body__item">
              <div className="label">Luogo di nascita </div>

              <VirtualizedSelect
                options={countriesArray.map((country) => ({
                  label: country.provincia,
                  value: country.provincia,
                }))}
                onChange={(province_of_birth) =>
                  this.setState({
                    luogo_di_nascita: province_of_birth
                      ? province_of_birth.value
                      : null,
                  })
                }
                value={luogo_di_nascita}
                maxHeight={100}
                placeholder={"Select"}
              />
            </div>

            <div className="formsContainer--body__item">
              <div className="label">Gender</div>

              <Select
                defaultValue="M"
                value={gender}
                onChange={(value) => {
                  this.setState({ gender: value });
                }}
              >
                <Option value="M">Maschile</Option>
                <Option value="F">Femminile</Option>
              </Select>
            </div>

            <div className="formsContainer--body__item">
              <div className="label">Data di nascita</div>
              {data_di_nascita === "" ? (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  onChange={(e) => {
                    this.setState({
                      data_di_nascita: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              ) : (
                <DatePicker
                  format={"DD/MM/YYYY"}
                  value={moment(data_di_nascita, "DD/MM/YYYY")}
                  onChange={(e) => {
                    this.setState({
                      data_di_nascita: moment(e).format("DD/MM/YYYY"),
                    });
                  }}
                />
              )}
            </div>
            <div className="formsContainer--body__item">
              <InputForForm
                labelName="Codice Fiscale"
                value={codice_fiscale}
                className="codiceFiscale"
                handleChange={(e) => {
                  this.setState({ codice_fiscale: e.target.value });
                }}
                type={"text"}
              />
              <button onClick={this.generateCodiceFiscale} className="Genere">
                Genera
              </button>
            </div>
          </div>
        }
        rightForm={
          <div>
            <InputForForm
              labelName="Servizi"
              value={activeService.name || "Seleziona servizo"}
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />

            <InputForForm
              labelName="Indirizo di residenza "
              value={address}
              handleChange={(e) => {
                this.setState({ address: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Provincia di residenza"
              value={provincia}
              handleChange={(e) => {
                this.setState({ provincia: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Telefono"
              value={telefono}
              handleChange={(e) => {
                this.setState({ telefono: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              labelName="Email"
              value={email}
              handleChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              type={"text"}
            />
            <InputForForm
              info="costo"
              labelName="Costo del servizio"
              value={
                activeService.price
                  ? `da €${activeService.price} + iva`
                  : "Seleziona servizo"
              }
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />
            <InputForForm
              info="time"
              labelName="Tempi di consegna"
              value={
                activeService.price
                  ? `${activeService.time}`
                  : "Seleziona servizo"
              }
              handleChange={() => {}}
              type={"text"}
              readOnly={true}
            />
          </div>
        }
      />
    );
  }
}
const mstp = (state) => {
  return {};
};
export default connect(mstp, AuthActions)(PersonaFisicaForm);

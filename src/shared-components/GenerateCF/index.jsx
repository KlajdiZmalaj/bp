import React from "react";
import { createPortal } from "react-dom";
import VirtualizedSelect from "react-virtualized-select";
import countriesArray from "config/countryArr";
import { notification, DatePicker } from "antd";
import moment from "moment";
import "./style.css";
var CodiceFiscale = require("codice-fiscale-js");

const INITIAL_VAL = {
  name: "",
  lastname: "",
  date: "",
  gender: "M",
  country: "",
  province: "",
  sigla: "",
};

const generateCodiceFiscale = (
  {
    nome,
    cognome,
    data_di_nascita,
    luogo_di_nascita,
    province_of_birth,
    gender,
  },
  callBack
) => {
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
    // console.log("cf", cf, isValidCf, cf.code);
    if (isValidCf) {
      callBack("set");
      return cf.code;
    } else {
      return;
    }
  } catch (err) {
    notification["error"]({
      message: err.message,
    });

    return;
  }
};
export const Portal = ({ children }) => {
  const mount = document.getElementById("cf-root");
  const el = document.createElement("div");

  React.useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};

const Generate = ({ setCF, closeBox, color1, color2 }) => {
  const [form, setForm] = React.useState(INITIAL_VAL);
  const [codeFound, setStatus] = React.useState(false);
  return (
    <div
      className="generateCodiceFiscale"
      style={{ boxShadow: `3px 2px 14px 0px ${color1}`, borderColor: color1 }}
    >
      <div
        className="generateCodiceFiscale--header"
        style={{ background: `${color1}`, color: `${color2}` }}
      >
        CALCOLO DEL CODICE FISCALE
      </div>
      {codeFound ? (
        <div className="generateCodiceFiscale--body animated fadeIn">
          <i
            className="fa fa-check-circle text-success animated headShake"
            aria-hidden="true"
          ></i>
        </div>
      ) : (
        <div className="generateCodiceFiscale--body  animated fadeIn">
          <div className="generateCodiceFiscale--body__item">
            <span>Cognome*</span>
            <input
              placeholder={"Cognome"}
              type="text"
              value={form.cognome}
              onChange={(e) => {
                setForm({ ...form, cognome: e.target.value });
              }}
            />
          </div>
          <div className="generateCodiceFiscale--body__item">
            <span>Nome*</span>
            <input
              placeholder={"Nome"}
              type="text"
              value={form.nome}
              onChange={(e) => {
                setForm({ ...form, nome: e.target.value });
              }}
            />
          </div>
          <div className="generateCodiceFiscale--body__item">
            <span>Data di nascita*</span>
            <DatePicker
              placeholder={"Data di nascita"}
              onChange={(e) => {
                setForm({
                  ...form,
                  data_di_nascita: moment(e).format("DD/MM/YYYY"),
                });
              }}
            />
          </div>
          <div className="generateCodiceFiscale--body__item">
            <span>Sesso*</span>
            <select
              name="sesso"
              id=""
              value={form.gender}
              onChange={(e) => {
                setForm({ ...form, gender: e.target.value });
              }}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="generateCodiceFiscale--body__item">
            <span>LUOGO DI NASCITA*</span>
            <VirtualizedSelect
              options={countriesArray.map((country) => ({
                label: `${country.provincia} (${country.sigla}) (${country.nazione})`,
                value: country.provincia,
                sigla: country.sigla,
              }))}
              onChange={(e) => {
                // console.log("ca ka e", e);
                setForm({
                  ...form,
                  luogo_di_nascita: e?.value,
                  sigla: e?.sigla,
                });
              }}
              value={form.luogo_di_nascita}
              maxHeight={100}
              placeholder={"Luogo di nascita"}
            />
          </div>
          <div className="generateCodiceFiscale--body__item">
            <span>Provincia*</span>
            <VirtualizedSelect
              options={countriesArray
                .filter((e) => form.sigla === e.sigla)
                .map((country) => ({
                  label: `${country.provincia} (${country.sigla})`,
                  value: country.sigla,
                }))}
              onChange={(e) => {
                setForm({
                  ...form,
                  province_of_birth: e?.value,
                });
              }}
              value={form.province_of_birth}
              maxHeight={100}
              placeholder={"Provincia"}
            />
          </div>
        </div>
      )}

      <div className="generateCodiceFiscale--footer">
        <button
          style={{ background: `${color1}`, color: `${color2}` }}
          onClick={() => {
            if (generateCodiceFiscale(form, () => {})) {
              const code = generateCodiceFiscale(form, async (e) => {
                if (e === "set") {
                  setStatus(true);
                  await setTimeout(() => {
                    closeBox();
                    setCF(code);
                  }, 1000);
                }
              });
            }
          }}
        >
          Get Codice Fiscale
        </button>
        <button
          style={{ background: `${color1}`, color: `${color2}` }}
          onClick={() => {
            closeBox();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Generate;

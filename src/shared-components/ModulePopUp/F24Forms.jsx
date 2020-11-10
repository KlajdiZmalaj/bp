import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio, Checkbox, DatePicker } from "antd";

export const F24RightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Email"
      name="email"
      message="Please input your Email!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Telefono"
      name="phone_number"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Provincia"
      name="provincia"
      message="Please input your Provincia!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const F24LeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Indirizzo"
      name="via_piazza"
      message="Please input your  indirizzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Citta"
      name="citta"
      message="Please input your Citta!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Vat"
      name="vat"
      message="Please input your Vat!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Codice Fiscale Del Coobbligato"
      name="codice_fiscale_optional"
      message="Please input your Codice Fiscale!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Persona"
      name="person_type"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue="F"
      NotInput={
        <Radio.Group>
          <Radio value="F">Fisica</Radio>
          <Radio value="G">Giuridica</Radio>
        </Radio.Group>
      }
    />
    <ReturnFormItem
      descName="Genere"
      name="gender"
      message="Please input your Genere!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"M"}
      NotInput={
        <Select placeholder="Tipo bollettino">
          <Select.Option value={"M"}>Maschile</Select.Option>
          <Select.Option value={"F"}>Feminile</Select.Option>
        </Select>
      }
    />
    {getFieldValue("person_type") === "F" ||
    typeof getFieldValue("person_type") === "undefined" ? (
      <Fragment>
        <ReturnFormItem
          descName="Nome"
          name="nome"
          message="Please input your Nome!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Cognome"
          name="cognome"
          message="Please input your Cognome!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Codice Fiscale"
          name="codice_fiscale"
          message="Please input your Codice Fiscale!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </Fragment>
    ) : (
      <Fragment>
        <ReturnFormItem
          descName="Denominazione"
          name="denominazione"
          message="Please input your Denominazione!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Partiva IVA"
          name="part_iva"
          message="Please input your Partiva IVA!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </Fragment>
    )}
  </Fragment>
);
export const LineTable = ({ id, barcodeData, getFieldDecorator, mobile }) => {
  return (
    <Fragment>
      <ReturnFormItem
        descName={mobile ? "SEZIONE" : null}
        name={`sezione${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "COD TRIBUTO" : null}
        name={`cod_tributo${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "COD ENTE/COM" : null}
        name={`codice_ente${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      {/* //Check box */}
      <ReturnFormItem
        descName={mobile ? "RAV" : null}
        name={`ravv${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        descName={mobile ? "IMM VARIATI" : null}
        name={`imm_varianti${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        descName={mobile ? "ACC" : null}
        name={`acc${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        descName={mobile ? "SALDO" : null}
        name={`saldo${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />

      <ReturnFormItem
        descName={mobile ? "NUM IMM" : null}
        name={`num_imm${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "RAT MESE" : null}
        name={`rat_mese${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "ANNO RIFERIMENTO" : null}
        name={`anno_rif${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "DESTRAZIONE" : null}
        name={`detrazione${id}`}
        className="last"
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />

      <ReturnFormItem
        descName={mobile ? "IMPORTO A DEBITO VERSATI" : null}
        name={`importo_vers${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        className="last"
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName={mobile ? "IMPORTO A CREDITO COMPENSATI" : null}
        name={`importo_com${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        className="last"
        getFieldDecorator={getFieldDecorator}
      />
    </Fragment>
  );
};
export const LastPartForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Data"
      name="data_pagamento"
      message="Please input your  Data!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      datepicker
      NotInput={<DatePicker showTime format="DD/MM/YYYY" />}
    />
    <div className="InputItem">
      <span>
        Saldo Finale <span className="Red">*</span>
      </span>
      <input id="saldo_finale" readOnly defaultValue={0}></input>
    </div>
  </Fragment>
);
export const SeperateInputs = ({
  number,
  word,
  setStateValue,
  setValues,
  returnCodice,
  setStateClass,
  classNameVal,
}) => {
  return [...new Array(number)].map((input, key) => {
    return (
      <input
        className={`inputSeperate ${classNameVal ? classNameVal : ""}`}
        key={`${word}${key}`}
        maxLength="1"
        required
        id={`${word}${key}`}
        type="text"
        onKeyDown={(e) => {
          var keyy = e.keyCode || e.charCode;
          setTimeout(() => {
            const previnp = document.getElementById(`${word}${key - 1}`);
            const inp = document.getElementById(`${word}${key}`);
            const nextinp = document.getElementById(`${word}${key + 1}`);
            if (keyy !== 8 && keyy !== 9) {
              if (nextinp && !nextinp.value) {
                nextinp.focus();
              } else if (previnp && !previnp.value) {
                previnp.focus();
              } else {
                if (inp.value && inp.value.length > 0) {
                  nextinp && nextinp.focus();
                }
              }
            }
            if (keyy === 8) {
              if (previnp) {
                previnp.focus();
              }
            }
          }, 100);
        }}
        onChange={(e) => {
          if (!classNameVal) {
            setStateClass(word.substring(0, 6));
          }
          if (
            e.target.value !== "" &&
            e.target.value &&
            e.target.value.length <= 1
          ) {
            document.getElementById(e.target.id).value = e.target.value;
            setStateValue(returnCodice(number, word));
          } else if (e.target.value === "") {
            document.getElementById(e.target.id).value = e.target.value;
            setStateValue(returnCodice(number, word));
          }
        }}
        onPaste={() => {
          navigator.clipboard
            .readText()
            .then((codFisInps) => {
              setStateValue(codFisInps.substring(0, number));
              setValues(number, word, codFisInps);
            })
            .catch((err) => {
              console.error("Failed to read clipboard contents: ", err);
            });
        }}
      />
    );
  });
};

export const clearLineTables = (nrOfRows, setFieldsValue) => {
  [...new Array(nrOfRows)].forEach((item, id) => {
    let objectFieldValues = [];
    objectFieldValues[`sezione${id}`] = "";
    objectFieldValues[`cod_tributo${id}`] = "";
    objectFieldValues[`codice_ente${id}`] = "";
    objectFieldValues[`ravv${id}`] = false;
    objectFieldValues[`imm_varianti${id}`] = false;
    objectFieldValues[`acc${id}`] = false;
    objectFieldValues[`saldo${id}`] = false;
    objectFieldValues[`num_imm${id}`] = "";
    objectFieldValues[`rat_mese${id}`] = "";
    objectFieldValues[`anno_rif${id}`] = "";
    objectFieldValues[`detrazione${id}`] = "";
    objectFieldValues[`importo_vers${id}`] = "";
    objectFieldValues[`importo_com${id}`] = "";
    setFieldsValue({
      ...objectFieldValues,
    });
  });
};
export const returnCodice = (number, word) => {
  var returnCodice = "";
  [...new Array(number)].forEach((input, index) => {
    const inp = document.getElementById(`${word}${index}`);

    returnCodice = returnCodice.concat(inp?.value.toString());
  });
  return returnCodice;
};
export const setValues = (number, word, fullValue) => {
  [...new Array(number)].forEach((input, index) => {
    var inp = document.getElementById(`${word}${index}`);
    inp.value = fullValue.substring(index, index + 1);
  });
};
export const calculateSaldoVal = (nrOfRows, getVal) => {
  let Saldo = 0;
  [...new Array(nrOfRows)].forEach((item, index) => {
    if (
      getVal(`detrazione${index}`) &&
      getVal(`importo_vers${index}`) &&
      getVal(`importo_com${index}`) &&
      Number.isInteger(parseFloat(getVal(`detrazione${index}`))) &&
      Number.isInteger(parseFloat(getVal(`importo_vers${index}`))) &&
      Number.isInteger(parseFloat(getVal(`importo_com${index}`)))
    ) {
      Saldo =
        Saldo +
        parseFloat(getVal(`importo_vers${index}`)) -
        parseFloat(getVal(`detrazione${index}`)) -
        parseFloat(getVal(`importo_com${index}`));
    }
  });
  return Saldo;
};
export const returnMotivoDelPagamentoList = (getVal, nrOfRows) => {
  let arrayMPL = [];

  [...new Array(nrOfRows)].forEach((item, index) => {
    let objectRow = {
      sezione: getVal(`sezione${index}`),
      cod_tributo: getVal(`cod_tributo${index}`),
      codice_ente: getVal(`codice_ente${index}`),
      ravv: getVal(`ravv${index}`),
      imm_varianti: getVal(`imm_varianti${index}`),
      acc: getVal(`acc${index}`),
      saldo: getVal(`saldo${index}`),
      num_imm: getVal(`num_imm${index}`),
      rat_mese: getVal(`rat_mese${index}`),
      anno_rif: getVal(`anno_rif${index}`),
      detrazione: getVal(`detrazione${index}`),
      importo_vers: getVal(`importo_vers${index}`),
      importo_com: getVal(`importo_com${index}`),
    };
    if (isEmptyObject(objectRow)) {
      arrayMPL.push(objectRow);
    }
  });
  console.log("nrOfRows", nrOfRows, getVal(`sezione${0}`), arrayMPL);
  return arrayMPL;
};
export function isEmptyObject(o) {
  let find = true;
  Object.keys(o).forEach(function (x) {
    if (typeof o[`${x}`] === "undefined" || !o[`${x}`] || o[`${x}`] === "") {
      find = false;
    }
  });
  return find;
}

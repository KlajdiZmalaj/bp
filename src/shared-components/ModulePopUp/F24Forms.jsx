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
      descName="Codice Fiscale Del Coobbligato, Erede, Genitore O Curatore Fallimentare"
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
export const LineTable = ({ id, barcodeData, getFieldDecorator }) => {
  return (
    <Fragment>
      <ReturnFormItem
        name={`sezione${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`cod_tributo${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`codice_ente${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      {/* //Check box */}
      <ReturnFormItem
        name={`ravv${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        name={`imm_varianti${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        name={`acc${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />
      <ReturnFormItem
        name={`saldo${id}`}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={true}
        valuePropName="checked"
        NotInput={<Checkbox></Checkbox>}
      />

      <ReturnFormItem
        name={`num_imm${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`rat_mese${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`anno_rif${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`detrazione${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />

      <ReturnFormItem
        name={`importo_vers${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        name={`importo_com${id}`}
        message={id === 0 ? "id" : null}
        barcodeData={barcodeData}
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

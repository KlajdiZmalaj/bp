import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Radio, Checkbox, DatePicker } from "antd";

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
      name="telefono"
      message="Please input your telefono!"
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
      descName="Persona"
      name="persona"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue="1"
      NotInput={
        <Radio.Group>
          <Radio value="1">Fisica</Radio>
          <Radio value="2">Giuridica</Radio>
        </Radio.Group>
      }
    />

    <ReturnFormItem
      descName="Indirizzo"
      name="indirizzo"
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
      descName="Codice Fiscale Del Coobbligato, Erede, Genitore O Curatore Fallimentare"
      name="codice_fiscale"
      message="Please input your Codice Fiscale!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    {getFieldValue("persona") === "1" ||
    typeof getFieldValue("persona") === "undefined" ? (
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
export const LineTable = ({ id, barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      name={`sezione${id}`}
      message={`Please input your Sezione field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`cod_tributo${id}`}
      message={`Please input your Cod. Tributo field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`cod_ente_com${id}`}
      message={`Please input your Cod. ente/com field!`}
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
      name={`im_variati${id}`}
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
      message={`Please input your Num. Imm field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`rat_mese${id}`}
      message={`Please input your Rat/mese field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`anno_di_riferimento${id}`}
      message={`Please input your Anno di riferimento field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`detrazione${id}`}
      message={`Please input your Detrazione field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />

    <ReturnFormItem
      name={`importo_a_debito_versati${id}`}
      message={`Please input your Importo a debito versati field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      name={`importi_a_credito_compensati${id}`}
      message={`Please input your Importi a credito compensati field!`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const LastPartForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Data"
      name="date"
      message="Please input your  Data!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      datepicker
      NotInput={<DatePicker showTime format="DD/MM/YYYY" />}
    />
    <ReturnFormItem
      descName="Saldo Finale"
      name={`saldo_finale`}
      message={`Please input Saldo Finale`}
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);

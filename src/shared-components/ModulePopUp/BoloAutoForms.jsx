import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";

export const BoloAutoRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Telefono"
      name="phone_number"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Email"
      name="email"
      message="Please input your Email!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const BoloAutoLeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
  mobile,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Tipo Veicolo"
      name="tipo_veicolo"
      message="Please input your tipo veicolo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"1"}
      NotInput={
        <Select placeholder="Tipo bollettino">
          <Select.Option value={"1"}>Auto</Select.Option>
          <Select.Option value={"4"}>Motociclo</Select.Option>
        </Select>
      }
    />
    <ReturnFormItem
      descName="Targa"
      name="targa"
      message="Please input your Targa!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    {mobile && <div className="DatiPagatori">DATI PAGATORE</div>}
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
    />{" "}
    {getFieldValue("persona") === "F" ||
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
          icon={<i className="fal fa-search" />}
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
  </Fragment>
);

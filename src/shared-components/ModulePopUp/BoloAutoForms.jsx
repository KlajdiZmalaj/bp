import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";

export const BoloAutoRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Telefono"
      name="telefono"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const BoloAutoLeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Tipo Veicolo"
      name="tipo_veicolo"
      message="Please input your tipo veicolo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      NotInput={
        <Select placeholder="Tipo bollettino">
          <Select.Option value="Tipo bollettino">Tipo veicolo</Select.Option>
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
        <ReturnFormItem
          descName="Indirizzo"
          name="indirizzo"
          message="Please input your Indirizzo!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Città"
          name="citta"
          message="Please input your  Città!"
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
    )}
  </Fragment>
);

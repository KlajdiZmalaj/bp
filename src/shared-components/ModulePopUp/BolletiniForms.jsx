import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";
export const BolletiniRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Provincia"
      name="provincia"
      message="Please input your Provincia!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Città"
      name="citta"
      message="Please input your citta!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Email"
      name="email"
      message="Please input your email!"
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
  </Fragment>
);
export const BolletiniLeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
  service_id,
}) => {
  return (
    <Fragment>
      <ReturnFormItem
        descName="Tipologia"
        name="tipologia"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        defaultValue={service_id === "BOL002" ? "896" : "123"}
        NotInput={
          service_id === "BOL002" ? (
            <Select>
              <Select.Option value={"896"}>896</Select.Option>
              <Select.Option value={"674"}>674</Select.Option>
            </Select>
          ) : (
            <Select>
              <Select.Option value={"123"}>123</Select.Option>
              <Select.Option value={"451"}>451</Select.Option>
            </Select>
          )
        }
      />
      <ReturnFormItem
        descName="Numero Conto Corrente"
        name="numero_conto_corrente"
        message="Please input your Numero Conto!"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        icon={<i className="fal fa-search" />}
      />
      {service_id === "BOL002" && (
        <ReturnFormItem
          descName="Codice Identificativo"
          name="codice_identificativo"
          message="Please input your Codice Identificativo!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      )}
      <ReturnFormItem
        descName="Importo"
        name="importo"
        message="Please input your Importo!"
        placeholder="00,00"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName="Causale"
        name="causale"
        message="Please input your Causale!"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName="Indirizzo"
        name="via_piazza"
        placeholder="Indirizzo"
        message="Please input your indirizzo!"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />{" "}
      <ReturnFormItem
        descName="Cap"
        name="cap"
        message="Please input your Cap!"
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
      {getFieldValue("person_type") === "F" ||
      typeof getFieldValue("person_type") === "undefined" ? (
        <Fragment>
          <ReturnFormItem
            descName="Nome "
            name="nome"
            message="Please input your Nome!"
            barcodeData={barcodeData}
            getFieldDecorator={getFieldDecorator}
          />
          <ReturnFormItem
            descName="Cognome "
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
            icon={<i className="fal fa-question-circle" />}
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
            descName="Partita Iva"
            name="partita_iva"
            message="Please input your Partita Iva!"
            barcodeData={barcodeData}
            getFieldDecorator={getFieldDecorator}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
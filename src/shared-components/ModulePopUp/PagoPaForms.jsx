import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Radio } from "antd";

export const PagoPaRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
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
export const PagoPaLeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
  mobile,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Codice Avviso"
      name="codice_aviso"
      message="Please input your Codice Avviso!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="CF/P.IVA Ente Creditore"
      name="codice_fiscale_bol"
      message="Please input your Creditore!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />{" "}
    {mobile && <div className="DatiPagatori">DATI PAGATORE</div>}
    <ReturnFormItem
      descName="Persona"
      name="person_type"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"F"}
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
      descName="Città"
      name="citta"
      message="Please input your  Città!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />{" "}
    <ReturnFormItem
      descName="Indirizzo"
      name="via_piazza"
      message="Please input your Indirizzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);

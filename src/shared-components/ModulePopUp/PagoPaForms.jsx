import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";

export const PagoPaRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
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
      name="telefono"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const PagoPaLeftForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Scansiona Qui Il QR Code Dell’avviso"
      name="scansiona"
      message="Please input your Scansiona!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      placeholder="Scansiona qui il QR code dell’avviso"
      icon={<i className="fal fa-question-circle" />}
    />

    <ReturnFormItem
      descName="Token"
      name="token"
      message="Please input your token!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Codice Avviso"
      name="codice_avviso"
      message="Please input your Codice Avviso!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="CF/P.IVA Ente Creditore"
      name="creditore"
      message="Please input your Creditore!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />

    <ReturnFormItem
      descName="Persona"
      name="persona"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      NotInput={
        <Radio.Group>
          <Radio value="1">Fisica</Radio>
          <Radio value="2">Giuridica</Radio>
        </Radio.Group>
      }
    />
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
      descName="Codice Fiscale "
      name="codice_fiscale"
      message="Please input your Codice Fiscale!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      icon={<i className="fal fa-question-circle" />}
    />
    <ReturnFormItem
      descName="Indirizzo"
      name="indirizzo"
      message="Please input your Indirizzo"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);

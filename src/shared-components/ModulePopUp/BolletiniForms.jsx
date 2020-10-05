import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";
export const BolletiniRightForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Indirizzo"
      name="indirizzo"
      message="Please input your indirizzo!"
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
      name="telefono"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const BolletiniLeftForm = ({ barcodeData, getFieldDecorator }) => (
  <Fragment>
    <ReturnFormItem
      descName="Scansiona Qui Il Codice A Barre "
      name="scansiona"
      message="Please input your Scansiona!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      placeholder="(per bollettini di tipo 896)"
      icon={<i className="fal fa-question-circle" />}
    />
    <ReturnFormItem
      descName="Tipo Veicolo"
      name="tipo_veicolo"
      message="Please input your tipo veicolo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      NotInput={
        <Select defaultValue="Tipo bollettino">
          <Select.Option value="Tipo bollettino">Tipo bollettino</Select.Option>
        </Select>
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
    <ReturnFormItem
      descName="Text"
      name="text"
      message="Please input your text!"
      placeholder="00,00"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Causale"
      name="casuale"
      message="Please input your casuale!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Codice Bollettino"
      name="codice_bolletino"
      placeholder="Codice bollettino (per tipi 674 e 896)"
      message="Please input your Codice Bolletino!"
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
  </Fragment>
);

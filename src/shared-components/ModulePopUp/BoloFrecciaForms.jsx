import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Radio } from "antd";

export const LeftFreccia = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Tipologia"
      name="person_type"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"F"}
      NotInput={
        <Radio.Group>
          <Radio value="F">Persona</Radio>
          <Radio value="G">Business</Radio>
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
          message="Please input your cogNome!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Codice Fiscale"
          name="codice_fiscale"
          message="Please input your CF!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </Fragment>
    ) : (
      <Fragment>
        <ReturnFormItem
          descName="Denominazione"
          name="denominazione"
          message="Please input your denominazione!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="P.IVA"
          name="partita_iva"
          message="Please input your p.iva!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </Fragment>
    )}
    <ReturnFormItem
      descName="Via piazza"
      name="via_piazza"
      message="Please input your via piazza!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />

    <ReturnFormItem
      descName="Cap"
      name="cap"
      message="Please input your cap!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Citta"
      name="citta"
      message="Please input your citta!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Provincia"
      name="provincia"
      message="Please input your provincia!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Email"
      name="email"
      message="Please input your email!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      icon={<i className="fal fa-envelope" />}
    />

    <ReturnFormItem
      descName="Telefono"
      name="phone_number"
      message="Please input your telefono!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      icon={<i className="fal fa-phone" />}
    />

    <ReturnFormItem
      descName="Codice Esenzione"
      name="codice_esenzione"
      message="Please input your codice_esenzione!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"1"}
      NotInput={
        <Radio.Group>
          <Radio value="1">1</Radio>
          <Radio value="3">3</Radio>
        </Radio.Group>
      }
    />
  </Fragment>
);
export const RightFreccia = ({
  barcodeData,
  getFieldDecorator,
  //   getFieldValue,
  //   mobile,
}) => (
  <Fragment>
    {/* {mobile && <div className="DatiPagatori">DATI PAGATORE</div>} */}
    <ReturnFormItem
      descName="Casuale"
      name="causale"
      message="Please input your causale!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Identificativo Pagamento(21/21)"
      name="identificativo_pagamento"
      message="Please input your identificativo_pagamento!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="IBAN Creditore(27/27)"
      name="iban"
      message="Please input your iban!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Importo(Max 2497.99)"
      name="importo"
      message="Please input your Indirizzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      icon={<i className="fal fa-euro-sign" />}
    />
    <ReturnFormItem
      descName="Cin importo"
      name="cin_importo"
      message="Please input your cin_importo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Cin intermedio"
      name="cin_intermedio"
      message="Please input your cin_intermedio!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />

    <ReturnFormItem
      descName="Cin complessivo"
      name="cin_complessivo"
      message="Please input your cin_complessivo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);

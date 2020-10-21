import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Radio } from "antd";

export const MavRavRightForm = ({ barcodeData, getFieldDecorator }) => (
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
    <ReturnFormItem
      descName="Città"
      name="citta"
      message="Please input your  Città!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
  </Fragment>
);
export const MavRavLeftForm = ({
  barcodeData,
  getFieldDecorator,
  getFieldValue,
  setServiceID,
  service_s,
  mobile,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Mav/Rav"
      name="mav_rav"
      message="Please input your persona tipo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
      defaultValue={"1"}
      NotInput={
        <Radio.Group
          onChange={(e) => {
            setServiceID(
              e.target.value === "1"
                ? mobile
                  ? service_s.services[0].service_id
                  : service_s.services[0]
                : mobile
                ? service_s.services[1].service_id
                : service_s.services[1]
            );
          }}
        >
          <Radio value="1">MAV</Radio>
          <Radio value="2">RAV</Radio>
        </Radio.Group>
      }
    />

    <ReturnFormItem
      descName="Prezzo"
      name="importo"
      message="Please input your Prezzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName={`Codice ${getFieldValue("mav_rav") === "1" ? "Mav" : "Rav"}`}
      name="codice"
      message="Please input your Prezzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Indirizzo"
      name="via_piazza"
      message="Please input your Indirizzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />

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
          name="partita_iva"
          message="Please input your Partiva IVA!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </Fragment>
    )}
  </Fragment>
);

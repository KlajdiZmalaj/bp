import React, { Fragment } from "react";
import ReturnFormItem from "./FormHelperComp";
import { Select, Radio } from "antd";
export const BolletiniRightForm = ({
  barcodeData,
  getFieldDecorator,
  isTestAcc,
}) => (
  <Fragment>
    <ReturnFormItem
      descName="Provincia"
      name="provincia"
      message="Per favore inserisci il tuo Provincia!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Città"
      name="citta"
      message="Per favore inserisci il tuo citta!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    {isTestAcc && (
      <>
        <ReturnFormItem
          descName="Email"
          name="email"
          message="Per favore inserisci il tuo email!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
        <ReturnFormItem
          descName="Telefono"
          name="phone_number"
          message="Per favore inserisci il tuo telefono!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      </>
    )}
    <ReturnFormItem
      descName="Indirizzo"
      name="via_piazza"
      placeholder="Indirizzo"
      message="Per favore inserisci il tuo indirizzo!"
      barcodeData={barcodeData}
      getFieldDecorator={getFieldDecorator}
    />
    <ReturnFormItem
      descName="Cap"
      name="cap"
      message="Per favore inserisci il tuo Cap!"
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
  mobile,
  isTestAcc,
}) => {
  return (
    <Fragment>
      {(isTestAcc || service_id === "BOL002") && (
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
      )}
      <ReturnFormItem
        descName="Numero Conto Corrente"
        name="numero_conto_corrente"
        message="Per favore inserisci il tuo Numero Conto!"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
        icon={<i className="fal fa-search" />}
      />
      {service_id === "BOL002" && (
        <ReturnFormItem
          descName="Codice Identificativo"
          name="codice_identificativo"
          message="Per favore inserisci il tuo Codice Identificativo!"
          barcodeData={barcodeData}
          getFieldDecorator={getFieldDecorator}
        />
      )}
      <ReturnFormItem
        descName="Importo"
        name="importo"
        message="Per favore inserisci il tuo Importo!"
        placeholder="00,00"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      <ReturnFormItem
        descName="Causale"
        name="causale"
        message="Per favore inserisci il tuo Causale!"
        barcodeData={barcodeData}
        getFieldDecorator={getFieldDecorator}
      />
      {mobile && <div className="DatiPagatori">DATI PAGATORE</div>}

      {isTestAcc && (
        <ReturnFormItem
          descName="Persona"
          name="person_type"
          message="Per favore inserisci il tuo persona tipo!"
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
      )}

      {getFieldValue("person_type") === "F" ||
      typeof getFieldValue("person_type") === "undefined" ? (
        <Fragment>
          {isTestAcc && (
            <>
              <ReturnFormItem
                descName="Nome "
                name="nome"
                message="Per favore inserisci il tuo Nome!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Cognome "
                name="cognome"
                message="Per favore inserisci il tuo Cognome!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
              />
              <ReturnFormItem
                descName="Codice Fiscale"
                name="codice_fiscale"
                message="Per favore inserisci il tuo Codice Fiscale!"
                barcodeData={barcodeData}
                getFieldDecorator={getFieldDecorator}
                icon={<i className="fal fa-question-circle" />}
              />
            </>
          )}
        </Fragment>
      ) : (
        <Fragment>
          {isTestAcc && (
            <ReturnFormItem
              descName="Denominazione"
              name="denominazione"
              message="Per favore inserisci il tuo Denominazione!"
              barcodeData={barcodeData}
              getFieldDecorator={getFieldDecorator}
            />
          )}
          {isTestAcc && (
            <ReturnFormItem
              descName="Partita Iva"
              name="partita_iva"
              message="Per favore inserisci il tuo Partita Iva!"
              barcodeData={barcodeData}
              getFieldDecorator={getFieldDecorator}
            />
          )}
        </Fragment>
      )}

      {!isTestAcc && (
        <>
          <ReturnFormItem
            descName="Intestato a"
            name="intestato_a"
            message="Per favore inserisci il tuo intestato a!"
            barcodeData={barcodeData}
            getFieldDecorator={getFieldDecorator}
          />
          <ReturnFormItem
            descName="Eseguito Da"
            name="eseguito_da"
            message="Per favore inserisci il tuo Eseguito da!"
            barcodeData={barcodeData}
            getFieldDecorator={getFieldDecorator}
          />
        </>
      )}
    </Fragment>
  );
};

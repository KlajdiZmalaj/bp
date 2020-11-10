import { notification } from "antd";
export const handleSubmit = (
  e,
  service_id,
  form,
  setMavRav,
  setPagoPa,
  fetchBolletini,
  clearFields,
  setFreccia
) => {
  e.preventDefault();
  form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      if (service_id === "BOL003" || service_id === "BOL004") {
        setMavRav(
          service_id,
          values?.person_type,
          values?.via_piazza,
          values?.citta,
          values?.email,
          values?.phone_number,
          values?.importo,
          values?.codice,
          values?.nome,
          values?.cognome,
          values?.codice_fiscale,
          values?.denominazione,
          values?.partita_iva,
          clearFields
        );
      } else if (service_id === "PPA001") {
        setPagoPa(
          service_id,
          values?.person_type,
          values?.via_piazza,
          values?.citta,
          values?.email,
          values?.phone_number,
          "pa",
          values?.codice_fiscale_bol,
          values?.codice_aviso,
          values?.nome,
          values?.cognome,
          values?.codice_fiscale,
          values?.denominazione,
          values?.partita_iva,
          clearFields
        );
      } else if (service_id === "BOL006") {
        setPagoPa(
          service_id,
          values?.person_type,
          values?.via_piazza,
          values?.citta,
          values?.email,
          values?.phone_number,
          "auto",
          null,
          null,
          values?.nome,
          values?.cognome,
          values?.codice_fiscale,
          values?.denominazione,
          values?.partita_iva,
          clearFields,
          values?.tipo_veicolo,
          values?.targa
        );
      } else if (service_id === "BOL007") {
        setFreccia(
          service_id,
          values.importo,
          values.causale,
          values.person_type,
          values.via_piazza,
          values.cap,

          values.citta,
          values.provincia,
          values.email,
          values.phone_number,
          values.identificativo_pagamento,
          values.iban,
          values.cin_importo,

          values.cin_intermedio,
          values.cin_complessivo,
          values.codice_esenzione,
          values.nome,
          values.cognome,
          values.codice_fiscale,
          values.denominazione,
          values.partita_iva,
          clearFields
        );
      } else {
        if (service_id === "BOL001") {
          fetchBolletini(
            service_id,
            values.person_type.toString(),
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia,
            values.importo.toString(),
            values.tipologia,
            values.numero_conto_corrente,
            values.causale,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            values.email,
            values.phone_number,
            null,
            clearFields
          );
        }
        if (service_id === "BOL002") {
          fetchBolletini(
            service_id,
            values.person_type.toString(),
            values.via_piazza,
            values.cap,
            values.citta,
            values.provincia,
            values.importo.toString(),
            values.tipologia,
            values.numero_conto_corrente,
            values.causale,
            values.nome,
            values.cognome,
            values.codice_fiscale,
            values.denominazione,
            values.partita_iva,
            values.email,
            values.phone_number,
            values.codice_identificativo,
            clearFields
          );
        }
      }
    } else {
      notification["error"]({
        message: "Ops...",
        description: "Controlla le tue caselle vuote o accetta le condizioni",
      });
    }
  });
};

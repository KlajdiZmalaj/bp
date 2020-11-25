import axios from "axios";
import { skin, getToken, endpoint } from "config/api";

export const createPrenotazione = ({
  type,
  // ========== luce / gas -> start ==========
  tipologia_persona,
  tipologia_contratto,
  nome_cognome_consulento,
  codice_consulento,
  telefono,
  email,
  conferma_email,
  //tipologia_persona === 1
  nome,
  cognome,
  luogo_nascita,
  data_nascita,
  codice_fiscale,
  //tipologia_persona else
  ragione_sociale,
  p_iva,
  nome_cognome_rappresentante,
  codice_rappresentante,
  //
  residenza_comune,
  residenza_indirizzo,
  residenza_civico,
  residenza_cap,
  corrispondenza,
  //corrispondenza  === 2
  corrispondenza_comune,
  corrispondenza_indirizzo,
  corrispondenza_civico,
  corrispondenza_cap,
  //
  fornitura,
  //fornitura ===2
  fornitura_comune,
  fornitura_indirizzo,
  fornitura_civico,
  fornitura_cap,
  //
  confermo_fornitura,
  confermo_econimoche,
  confermo_informativa,
  confermo_presa_visione,
  marketing,
  dati_personali,
}) => {
  return axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
        Accept: "application/json",
      },
    })
    .post(`/prenotazione/create`, {
      ...skin,
      type,
      // ========== luce / gas -> start ==========
      tipologia_persona,
      tipologia_contratto,
      nome_cognome_consulento,
      codice_consulento,
      telefono,
      email,
      conferma_email,
      //tipologia_persona === 1
      nome,
      cognome,
      luogo_nascita,
      data_nascita,
      codice_fiscale,
      //tipologia_persona else
      ragione_sociale,
      p_iva,
      nome_cognome_rappresentante,
      codice_rappresentante,
      //
      residenza_comune,
      residenza_indirizzo,
      residenza_civico,
      residenza_cap,
      corrispondenza,
      //corrispondenza  === 2
      corrispondenza_comune,
      corrispondenza_indirizzo,
      corrispondenza_civico,
      corrispondenza_cap,
      //
      fornitura,
      //fornitura ===2
      fornitura_comune,
      fornitura_indirizzo,
      fornitura_civico,
      fornitura_cap,
      //
      confermo_fornitura,
      confermo_econimoche,
      confermo_informativa,
      confermo_presa_visione,
      marketing,
      dati_personali,
    })
    .catch((error) => ({ error }));
};
export const fetchServices = () =>
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .get(`/services`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchFavorites = () =>
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/favorites`, {
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchUsers = (
  search_user,
  skin_id,
  backoffice,
  limit,
  page_number
) => {
  const skin_id_to_use = skin_id ? skin_id : { ...skin };
  return axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/list`, {
      ...(search_user ? { search_user } : {}),
      ...(limit ? { limit } : {}),
      ...(page_number ? { page_number } : {}),
      ...skin_id_to_use,
      ...(backoffice ? backoffice : {}),
    })
    .catch((error) => ({ error }));
};
export const fetchUsersSimple = () =>
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .get(`/simpleUsers`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchUsersBySearch = (search_user) =>
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/findUser`, {
      ...(search_user ? { search_user: search_user } : {}),
      ...skin,
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const fetchSearchedUsers = (search_user) =>
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/search`, {
      search_user,
      ...skin,
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const postImages = (user_id, imgFront, imgBack, callback) => {
  axios
    .create({
      baseURL: endpoint,
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/updateDocument`, {
      ...{ user_id: user_id },
      ...{ document_front: imgFront },
      ...{ document_back: imgBack },
      ...skin,
    })
    .then((response) => {
      // console.log("response", response);
      if (response.status === 200) {
        callback();
      }
    })
    .catch((error) => ({ error }));
};

export const deleteImages = (user_id, callback) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/deleteDocument`, {
      ...{ user_id: user_id },
      ...skin,
    })
    .then((response) => {
      // console.log("response", response);
      if (response && response && response.status === 200) {
        callback();
      }
    });
};

export const updatateOverviewWidget = (period) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/balance`, {
      ...{ period: period },
      ...skin,
    })
    .catch((error) => ({ error }));

export const setOnFav = (id, type) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: getToken(),
      },
    })
    .post(`/users/${type === "set" ? "addFavorite" : "removeFavorite"}`, {
      ...{ company_id: id },
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchphotos = (id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: getToken(),
      },
    })
    .get(`user/${id}/photos`, {
      params: {
        ...skin,
      },
    });
};

export const downloadFile = (document_name) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: getToken(),
      },
    })
    .get(`ticketDocument`, {
      params: {
        ...skin,
        document_name,
      },
    })
    .then((data) => {
      // console.log("ca ka download", data);
      const docBack = data?.data?.files?.document_back;
      const docFront = data?.data?.files?.document_front;
      if (docBack) {
        const downloadLink = document.createElement("a");
        const fileName = "Document.pdf";

        downloadLink.href = docBack;
        downloadLink.download = fileName;
        downloadLink.click();
      }
      if (docFront) {
        const downloadLink = document.createElement("a");
        const fileName = "Document.pdf";

        downloadLink.href = docFront;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    });
};

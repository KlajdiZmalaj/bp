import request from "utils/request";
import axios from "axios";
import { skin } from "config/api";
import { notification } from "antd";
import { message } from "antd";

import {
  unSubscribeSocketSupport,
  unSubscribeSocketUser,
} from "config/socket.js";

//import api from "config/api";

// const accountData = localStorage.getItem("accountDataB");
// const data = JSON.parse(accountData);
// let req;
// if (data) {
//   req = axios.create({
//     baseURL: "https://services-api.bpoint.store/api",
//     headers: {
//       Authorization: `Bearer ${data.token}`
//     }
//   });
// }

export const fetchLogin = (email, password) =>
  request
    .post(`/users/login`, {
      ...{ username: email },
      ...{ password: password },
      ...skin,
    })
    .catch((error) => ({ error }));

export const logoutApi = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")) &&
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/users/logout`, {
      ...skin,
    })
    .then((res) => {
      if (res.status === 200) {
        unSubscribeSocketUser(
          JSON.parse(localStorage.getItem("accountDataB")) &&
            JSON.parse(localStorage.getItem("accountDataB")).profile.id
        );
        if (
          JSON.parse(localStorage.getItem("accountDataB")) &&
          JSON.parse(localStorage.getItem("accountDataB")).profile.role.name ===
            "support"
        ) {
          unSubscribeSocketSupport();
        }
        localStorage.removeItem("accountDataB");
      }
    })
    .catch((error) => ({ error }));

export const fetchBolletiniPremercati = (
  service_id,
  numero_conto_corrente,
  importo,
  codice_identificativo,
  tipologia,
  eseguito_da,
  via_piazza,
  cap,
  citta,
  provincia
) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/test/rechargeBOL`, {
      ...{ service_id: service_id },
      ...{ numero_conto_corrente: numero_conto_corrente },
      ...{ importo: importo.toString() },
      ...{ codice_identificativo: codice_identificativo },
      ...{ tipologia: tipologia },
      ...{ eseguito_da: eseguito_da },
      ...{ via_piazza: via_piazza },
      ...{ cap: cap },
      ...{ citta: citta },
      ...{ provincia: provincia },
      ...skin,
    })
    .catch((error) => ({ error }));
export const fetchBolletiniBianchi = (
  service_id,
  numero_conto_corrente,
  importo,
  intestato_a,
  causale,
  eseguito_da,
  via_piazza,
  cap,
  citta,
  provincia
) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/test/rechargeBOL`, {
      ...{ service_id: service_id },
      ...{ numero_conto_corrente: numero_conto_corrente },
      ...{ importo: importo.toString() },
      ...{ intestato_a: intestato_a },
      ...{ causale: causale },
      ...{ eseguito_da: eseguito_da },
      ...{ via_piazza: via_piazza },
      ...{ cap: cap },
      ...{ citta: citta },
      ...{ provincia: provincia },
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchPayments = (
  username,
  from,
  to,
  page_number,
  limit,
  skin_id,
  excel
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/users/payments`, {
      ...(username ? { username: username } : {}),
      ...(from ? { from } : null),
      ...(to ? { to } : null),
      ...(page_number ? { page_number } : {}),
      ...(limit ? { limit } : {}),
      ...(skin_id ? { skin_id } : { ...skin }),
      ...(excel === "special" ? { excel } : {}),
    })
    .catch((error) => ({ error }));
};
export const fetchRechargeMobile = (service_id, tel_no) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/test/recharge`, {
      ...{ service_id: service_id },
      ...(tel_no ? { tel_no: tel_no } : {}),
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchPostePay = (
  service_id,
  importo,
  user_id,
  intestazione,
  codice_fiscale_intestatario,
  ordinante,
  codice_fiscale_ordinante,
  numero_postepay,
  document_type,
  imageUrl,
  imageUrl2
) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/test/rechargeBOL`, {
      ...{ service_id: service_id },
      ...{ importo: importo.toString() },
      ...(user_id ? { user_id: user_id } : {}),
      ...{ intestazione: intestazione },
      ...{ codice_fiscale_intestatario: codice_fiscale_intestatario },
      ...{ ordinante: ordinante },
      ...{ codice_fiscale_ordinante: codice_fiscale_ordinante },
      ...{ numero_postepay: numero_postepay },

      ...(document_type ? { document_type: document_type } : {}),
      ...(imageUrl ? { document_front: imageUrl } : {}),
      ...(imageUrl2 ? { document_back: imageUrl2 } : {}),
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchAds = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")) &&
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/messages", {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const sendCreatedAds = (importance, title, text) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/messages`, {
      ...{ importance: importance },
      ...{ title: title },
      ...{ text: text },
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchRegisterAllInfo = (
  first_name,
  last_name,
  nickname,
  email,
  gender,
  personal_number,
  birthday,
  nazione,
  province_of_birth,
  city_of_birth,
  nazioneDiResidenca,
  residence_province,
  residence_city,
  address,
  cap,
  identity_id,
  identity_type,
  number_prefix,
  number,
  frontImg,
  backImg,
  role,
  aRagSoc,
  aInsegna,
  aPhone,
  aAdress,
  aCity,
  aComcode,
  aCap,
  aPiva,
  aFcode,
  confirm_password,
  password,
  rilasciato_da,
  luogo_di_rilascio,
  data_di_rilascio,
  data_di_scadenza,
  a_cordinate,
  a_contry,
  rent,
  privacy_policy,
  recieve_emails,
  percentage
) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/users/create`, {
      ...{ first_name: first_name },
      ...{ last_name: last_name },
      ...{ username: nickname },
      ...{ email: email },
      ...{ gender: gender },
      ...{ personal_number: personal_number },
      ...{ birthday: birthday },
      ...{ birth_country: nazione },
      ...{ birth_comune_code: province_of_birth },
      ...{ birth_place: city_of_birth },
      ...{ country: nazioneDiResidenca },
      ...{ comune_code: residence_province },
      ...{ city: residence_city },
      ...{ address: address },
      ...{ cap: cap },
      ...{ document_number: identity_id },
      ...{ document_type: identity_type },
      ...{ phone: number_prefix + number },
      ...{ document_front: frontImg },
      ...{ document_back: backImg },
      ...{ role: role },
      ...{ a_ragione_sociale: aRagSoc },
      ...{ a_insegna: aInsegna },
      ...{ a_phone: aPhone },
      ...{ a_address: aAdress },
      ...{ a_city: aCity },
      ...{ a_comune_code: aComcode },
      ...{ a_cap: aCap },
      ...{ a_p_iva: aPiva },
      ...{ a_codice_fiscale: aFcode },
      ...{ password: password },
      ...{ confirm_password: confirm_password },
      ...{ rilasciato_da: rilasciato_da },
      ...{ luogo_di_rilascio: luogo_di_rilascio },
      ...{ data_di_rilascio: data_di_rilascio },
      ...{ data_di_scadenza: data_di_scadenza },
      ...{ a_cordinate },
      ...{ a_contry },
      ...{ rent },
      ...{ privacy_policy },
      ...{ recieve_emails },
      ...{ percentage },
      ...skin,
    })
    .catch((error) => ({ data: error.response.data }));

export const sendChangedPassword = (oldPassword, newPassword) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/users/changePassword`, {
      ...{ old_password: oldPassword },
      ...{ password: newPassword },
      ...{ confirm_password: newPassword },
      ...skin,
    })
    .catch((error) => ({ error }));
export const fetchConfigura = (id) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/users/${id}`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchBarcodeData = (barcode) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/bollettino", {
      params: {
        barcode,
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const changeAgentReq = (aaa, agent_id, skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/agency/${agent_id}/changeAgent`, {
      agent_id: aaa,
      ...(skin_id && skin_id != -1 ? { skin_id } : skin),
    })
    .catch((error) => ({ error }));
};
export const fetchCodice = (barcode, service) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/payment", {
      params: {
        barcode: barcode,
        type: service,
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchAgents = (skin_id) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/agents", {
      params: {
        ...(skin_id ? { skin_id } : skin),
      },
    })
    .catch((error) => ({ error }));

export const switchUserStatus = (id, status, c, role, backOffice) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      (role === "main_admin" && !backOffice) || backOffice === -1
        ? `/skins/${id}/changeStatus`
        : `/users/${id}/changeStatus`,
      {
        ...{ status },
        ...(backOffice ? (backOffice != -1 ? skin : backOffice) : skin),
      }
    )
    .then(
      (data) => {
        if (data && data.status === 200) {
          c();
        } else {
          message.error("è successo qualcosa di sbagliato");
        }
      },
      (data) => {}
    )
    .catch((err) => {
      message.error("è successo qualcosa di sbagliato");
    });
};
export const transferMoney = (id, amount, type, c, role, backOffice) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      (role === "main_admin" && !backOffice) || backOffice === -1
        ? `/skin/transferMoney/${id}`
        : `/users/${id}/transfer`,
      {
        ...{ amount },
        ...{ type },
        ...(backOffice
          ? backOffice != -1
            ? { skin_id: backOffice }
            : skin
          : skin),
      }
    )
    .then((data) => {
      if (data && data.status === 200) {
        c();
        notification["success"]({
          message: "Azione completata",
          description: data?.data?.message,
          placement: "bottomRight",
        });
        // /skin/transferMoney/{skin_id}
        // this.setState({ isPopUpActive: false });
        // this.props.getUsers();
      }
    })
    .catch((err) => {
      notification["error"]({
        message: err.response.data.message,
        description:
          err.response.data.errors && Object.values(err.response.data.errors),
        placement: "bottomRight",
        duration: "5",
      });
    });
};
export const fetchUserDetails = (user_id, skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`agency/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id != -1 ? { skin_id } : skin) : skin),
      },
    })
    .catch((error) => ({ error }));
};
export const updateUsers = (
  user_id,
  phone,
  document_type,
  document_number,
  rilasciato_da,
  luogo_di_rilascio,
  data_di_rilascio,
  data_di_scadenza,
  a_insegna,
  a_cordinate,
  a_phone,
  a_address,
  a_city,
  a_comune_code,
  a_cap,
  a_country,
  a_rent,
  password,
  confirm_password,
  skin_id
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/users/update`, {
      user_id,
      phone,
      document_type,
      document_number,
      rilasciato_da,
      luogo_di_rilascio,
      data_di_rilascio,
      data_di_scadenza,
      a_insegna,
      a_cordinate,
      a_phone,
      a_address,
      a_city,
      a_comune_code,
      a_cap,
      a_country,
      a_rent,
      password,
      confirm_password,
      ...(skin_id && skin_id != -1 ? { skin_id } : skin),
    })
    .catch((error) => ({ error }));
};
export const fetchSkinExtras = () => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
    })
    .get(`/skin/extra`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const fetchErrors = (limit, page_number) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/errors`, {
      params: {
        ...skin,
        ...(limit ? { limit } : {}),
        ...(page_number ? { page_number } : {}),
      },
    })
    .catch((error) => ({ error }));
};

export const deleteErrorReq = (id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/error/${id}/delete`, {
      ...skin,
    })
    .catch((error) => ({ error }));
};
export const sendDataFormReq = (
  typee,
  link,
  nome_agenzia,
  extra_data,
  bagaglio,
  bagaglio_stiva,
  partenza,
  partenza_stazione,
  andata_time,
  destinazione,
  destinazione_stazione,
  compagnie,
  adulti,
  ragazzi,
  tipologia_biglietto,
  ritorno_date,
  categoria,
  descrizione_categoria,
  quantity,
  name,
  email,
  telefono
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      `/buy/ticket`,
      typee === 1
        ? {
            ...skin,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            bagaglio,
            bagaglio_stiva,
          }
        : typee === 2
        ? {
            ...skin,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            partenza,
            partenza_stazione,
            andata_time,
            destinazione,
            destinazione_stazione,
            tipologia_biglietto,
            compagnie,
            adulti,
            ragazzi,
            ritorno_date,
          }
        : {
            ...skin,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            categoria,
            descrizione_categoria,
            quantity,
            name,
            email,
            telefono,
          }
    )
    .catch((error) => ({ error }));
};
export const getDataFormDetailReq = () => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/tickets`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const getDataFormDetailActivesReq = (isVisure) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/${isVisure ? "visure" : "tickets"}/completed`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const getTicketByTicketIdReq = (ticket_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/ticket/${ticket_id}`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const updateDataFormReq = (
  typee,
  link,
  nome_agenzia,
  extra_data,
  bagaglio,
  bagaglio_stiva,
  partenza,
  partenza_stazione,
  andata_time,
  destinazione,
  destinazione_stazione,
  compagnie,
  adulti,
  ragazzi,
  tipologia_biglietto,
  ritorno_date,
  categoria,
  descrizione_categoria,
  quantity,
  name,
  email,
  telefono,
  price,
  ticket_id
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      `/ticket/${ticket_id}/update`,
      typee === 1
        ? {
            ...skin,
            price,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            bagaglio,
            bagaglio_stiva,
          }
        : typee === 2
        ? {
            ...skin,
            price,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            partenza,
            partenza_stazione,
            andata_time,
            destinazione,
            destinazione_stazione,
            tipologia_biglietto,
            compagnie,
            adulti,
            ragazzi,
            ritorno_date,
          }
        : {
            ...skin,
            price,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            categoria,
            descrizione_categoria,
            quantity,
            name,
            email,
            telefono,
          }
    )
    .catch((error) => ({ error }));
};
export const sendVisureDetailsReq = (
  type,
  codice_fiscale,
  provincia,
  address,
  telefono,
  email,
  nome,
  cognome,
  data_di_nascita,
  luogo_di_nascita,
  ragione_sociale,
  p_iva,
  comune,
  servizi,
  price,
  sc
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      "/buy/visure",
      type === 1
        ? {
            ...skin,
            type,
            codice_fiscale,
            provincia,
            address,
            telefono,
            email,
            nome,
            cognome,
            data_di_nascita,
            luogo_di_nascita,
            servizi,
            price,
            sc: parseInt(sc),
          }
        : {
            ...skin,
            type,
            ragione_sociale,
            p_iva,
            codice_fiscale,
            provincia,
            comune,
            address,
            email,
            telefono,
            luogo_di_nascita,
            servizi,
            price,
            sc: parseInt(sc),
          }
    )
    .catch((error) => ({ error }));
};

export const userConfirmation = (
  setButtonsSupport,
  ticket_id,
  status,
  c,
  recall,
  document,
  isVisure
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/${isVisure ? "visura" : "ticket"}/${ticket_id}/changeStatus`, {
      ...skin,
      status,
      document,
    })
    .then((res) => {
      if (res.status === 200 && c) {
        setButtonsSupport(false);
        c(false);
        notification.open({
          message: "Hai ricevuto una notifica",
          description: res.data.message,
        });
        recall();
      }
    });
};
export const getVisureReq = () => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/visure`, {
      params: {
        ...skin,
      },
    })

    .catch((error) => ({ error }));
};
export const uploadPdf = (id, document, isVisura) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })

    .post(`/${isVisura ? "visura" : "ticket"}/${id}/addDocument`, {
      ...skin,
      document,
    })
    .then((res) => {
      if (res.status === 200) {
        notification.open({
          message: "Upload Notifica!",
          description: res.data.message,
        });
      }
    })
    .catch(function (error) {
      notification.open({
        message: "Failed while uploading!",
        description: "",
      });
    });
};
export const getVisureByVisureIdReq = ({ visura_id }) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/visura/${visura_id}`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};

export const updateVisuraReq = (
  visura_id,
  type,
  codice_fiscale,
  provincia,
  address,
  telefono,
  email,
  price,

  ragione_sociale,
  p_iva,
  comune,

  nome,
  cognome,
  data_di_nascita,
  luogo_di_nascita,
  servizi
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(
      `/visura/${visura_id}/update`,
      type === 1
        ? {
            ...skin,
            type,
            codice_fiscale,
            provincia,
            address,
            telefono,
            email,
            nome,
            cognome,
            data_di_nascita,
            luogo_di_nascita,
            price,
            servizi,
          }
        : {
            ...skin,
            type,
            codice_fiscale,
            provincia,
            address,
            telefono,
            email,
            ragione_sociale,
            p_iva,
            comune,
            price,
            servizi,
          }
    )
    .catch((error) => ({ error }));
};
export const getAgentByUserIdReq = (user_id, skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/agent/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id != -1 ? skin : skin_id) : skin),
      },
    })
    .catch((error) => ({ error }));
};
export const getUserByUserIdReq = (user_id, skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/user/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id != -1 ? skin : skin_id) : skin),
      },
    })
    .catch((error) => ({ error }));
};
export const getSkinsReq = () => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/skins", {
      ...skin,
    })
    .catch((error) => ({ error }));
};
export const getFaturaDetailsReq = (user_id, year, month) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post("/users/report", {
      ...skin,
      user_id,
      year,
      month,
    })
    .catch((error) => ({ error }));
};
export const getAllFaturaBySearchReq = (
  username,
  year,
  month,
  perPage,
  page_number
) => {
  const paramsToSend = {};
  if (username) {
    paramsToSend["username"] = username;
  }
  if (year) {
    paramsToSend["year"] = year;
  }
  if (month) {
    paramsToSend["month"] = month;
  }
  if (perPage) {
    paramsToSend["limit"] = perPage;
  }
  if (page_number) {
    paramsToSend["page_number"] = page_number;
  }
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/fatture", {
      params: {
        ...skin,
        ...paramsToSend,
      },
    })
    .catch((error) => ({ error }));
};
export const getAllServicesReq = (skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/allServices", {
      params: {
        skin_id,
      },
    })
    .catch((error) => ({ error }));
};
export const sendMailFatturaReq = (file_name) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post("/mailFattura", {
      ...skin,
      file_name,
    })
    .catch((error) => ({ error }));
};
export const printFatturaReq = (file_name) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post("/printFattura", {
      ...skin,
      file_name,
    })
    .catch((error) => ({ error }));
};
export const addLogo = (logo, skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/skins/${skin_id}/addLogo`, {
      logo,
    })
    .catch((error) => ({ error }));
};
export const AddSkinReq = (name, url, email, agency_rent) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/skins`, {
      name,
      url,
      email,
      agency_rent,
    })
    .catch((error) => {
      if (error?.response?.data?.errors) {
        Object.keys(error?.response?.data?.errors).forEach((key) => {
          return notification["error"]({
            message: error.response.data.message,
            description: error.response.data.errors[key][0],
          });
        });
      }
    });
};
export const AddExtraDataReq = (
  cel,
  mail,
  address,
  link1,
  link2,
  link3,
  link4,
  link5,
  ig,
  pin,
  yt,
  fb,
  bank_name,
  account_name,
  iban,
  main_color,
  skin_id,
  area_download
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/skins/${skin_id}/updateExtra`, {
      cel,
      mail,
      address,
      link1,
      link2,
      link3,
      link4,
      link5,
      ig,
      pin,
      yt,
      fb,
      bank_name,
      account_name,
      iban,
      main_color,
      link6: area_download,
    })
    .catch((error) => {
      if (error?.response?.data?.errors) {
        Object.keys(error?.response?.data?.errors).forEach((key) => {
          return notification["error"]({
            message: error.response.data.message,
            description: error.response.data.errors[key][0],
          });
        });
      }
    });
};
export const AddSuperAdminReq = (
  first_name,
  last_name,
  gender,
  username,
  email,
  phone,
  personal_number,
  password,
  confirm_password,
  address,
  city,
  comune_code,
  cap,
  country,
  birth_place,
  birth_country,
  birthday,
  a_ragione_sociale,
  a_p_iva,
  a_codice_fiscale,
  skin_id
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/skins/${skin_id}/addSuperAdmin`, {
      first_name,
      last_name,
      gender,
      username,
      email,
      phone,
      personal_number,
      password,
      confirm_password,
      address,
      city,
      comune_code,
      cap,
      country,
      birth_place,
      birth_country,
      birthday,
      a_ragione_sociale,
      a_p_iva,
      a_codice_fiscale,
    })

    .catch((error) => {
      if (error?.response?.data?.errors) {
        Object.keys(error?.response?.data?.errors).forEach((key) => {
          return notification["error"]({
            message: error.response.data.message,
            description: error.response.data.errors[key][0],
          });
        });
      }
    });
};
export const widgetPaymentsReq = (skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/widgetPayments", {
      params: {
        ...(skin_id && skin_id != -1 ? { skin_id } : {}),
      },
    })
    .catch((error) => ({ error }));
};
export const getStatisticheReq = (skin_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get("/statistiche", {
      params: {
        ...(skin_id && skin_id != -1 ? { skin_id } : {}),
      },
    })
    .catch((error) => ({ error }));
};
export const ServiceChangeStatusReq = (
  name,
  full_name,
  company_id,
  active,
  skin_id
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/companies/${company_id}/update`, {
      name,
      full_name,
      active,
      ...(skin_id && skin_id != -1 ? { skin_id } : skin),
    })
    .catch((error) => {});
};

export const bGameVoucher = (service_id, importo) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/buy/bgameVoucher`, {
      ...{ service_id: service_id },
      ...(importo ? { importo: importo } : {}),
      ...skin,
    })
    .catch((error) => ({ error }));
export const StatisticheMainReq = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .get(`/statisticheMain`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchBolletiniRequest = (
  service_id,
  person_type,
  via_piazza,
  cap,
  citta,
  provincia,
  importo,
  tipologia,
  numero_conto_corrente,
  causale,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  email,
  phone_number,
  codice_identificativo
) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB"))?.token
        }`,
      },
    })
    .post(`/sepafin/bollettini`, {
      service_id,
      person_type,
      via_piazza,
      cap,
      citta,
      provincia,
      importo: importo.toString(),
      tipologia: parseInt(tipologia),
      numero_conto_corrente,
      causale,
      email,
      phone_number,
      ...(codice_identificativo ? { codice_identificativo } : {}),
      ...(person_type === "F"
        ? { nome, cognome, codice_fiscale }
        : { denominazione, partita_iva }),
      ...skin,
    })
    .catch((error) => ({ error }));

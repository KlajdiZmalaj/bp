import request from "utils/request";
import axios from "axios";
import { skin } from "config/api";
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
  // req.post(`/users/logout`).catch(err => {
  //   console.log("err", err);
  // });

  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")) &&
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/logout`, {
      ...skin,
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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

export const fetchPayments = (username, from, to, page_number, limit) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/payments`, {
      ...(username ? { username: username } : {}),
      ...(from ? { from } : null),
      ...(to ? { to } : null),
      page_number,
      limit,
      ...skin,
    })
    .catch((error) => ({ error }));

export const fetchRechargeMobile = (service_id, tel_no) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
export const changeAgentReq = (aaa, agent_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/agency/${agent_id}/changeAgent`, {
      agent_id: aaa,
      ...skin,
    })
    .catch((error) => ({ error }));
};
export const fetchCodice = (barcode, service) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
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
export const fetchAgents = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .get("/agents", {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const switchUserStatus = (id, status, c, role) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(
      role === "main_admin"
        ? `/skins/${id}/changeStatus`
        : `/users/${id}/changeStatus`,
      {
        ...{ status },
        ...skin,
      }
    )
    .then(
      (data) => {
        if (data && data.status === 200) {
          c();
        }
      },
      (data) => {}
    );
};
export const transferMoney = (id, amount, type, c, role) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(
      role === "main_admin"
        ? `/skin/transferMoney/${id}`
        : `/users/${id}/transfer`,
      {
        ...{ amount },
        ...{ type },
        ...skin,
      }
    )
    .then(
      (data) => {
        if (data && data.status === 200) {
          c();
          // /skin/transferMoney/{skin_id}
          // this.setState({ isPopUpActive: false });
          // this.props.getUsers();
        }
        console.log("succData", data);
      },
      (data) => {
        console.log("err data", data);
      }
    );
};
export const fetchUserDetails = (user_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .get(`agency/${user_id}`, {
      params: {
        ...skin,
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
  confirm_password
) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
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
      ...skin,
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
export const fetchErrors = () => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .get(`/errors`, {
      params: {
        ...skin,
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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
export const getTicketByTicketIdReq = (ticket_id) => {
  return axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
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
          JSON.parse(localStorage.getItem("accountDataB")).token
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

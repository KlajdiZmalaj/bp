import request from "utils/request";
import axios from "axios";
import { skin, getToken, endpoint } from "config/api";
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
//     baseURL: endpoint,
//     headers: {
//       Authorization: `Bearer ${data.token}`
//     }
//   });
// }
//
//
const instanceAxios = axios.create({
  baseURL: endpoint,
});
const handleError = (error) => {
  // console.log(
  //   "error handler",
  //   error,
  //   error.response.status,
  //   error.error?.response?.status
  // );
  if (
    error.error?.response?.status === 401 ||
    error?.response?.status === 401
  ) {
    //logout
  } else if (
    error.error?.response?.status === 444 ||
    error.error?.response?.status === 445 ||
    error?.response?.status === 445
  ) {
    //skin id wrong
  } else {
    notification["error"]({
      message: error?.response?.data?.message,
      description:
        error?.response?.data?.errors &&
        Object.values(error.response.data.errors),
      placement: "bottomRight",
      duration: 4,
    });
  }
  return Promise.reject(error);
};
instanceAxios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: getToken(),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);
export const fetchLogin = (email, password) =>
  request
    .post(`/users/login`, {
      ...{ username: email },
      ...{ password: password },
      ...skin,
    })
    .catch((error) => ({ error }));

export const logoutApi = () =>
  instanceAxios
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
//
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
  instanceAxios
    .post(`/test/rechargeBOL`, {
      service_id: service_id,
      numero_conto_corrente: numero_conto_corrente,
      importo: importo.toString(),
      codice_identificativo: codice_identificativo,
      tipologia: tipologia,
      eseguito_da: eseguito_da,
      via_piazza: via_piazza,
      cap: cap,
      citta: citta,
      provincia: provincia,
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
  instanceAxios
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
  return instanceAxios
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
  instanceAxios
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
  instanceAxios
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
  instanceAxios
    .get("/messages", {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const sendCreatedAds = (importance, title, text) =>
  instanceAxios
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
  instanceAxios
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
  instanceAxios
    .post(`/users/changePassword`, {
      ...{ old_password: oldPassword },
      ...{ password: newPassword },
      ...{ confirm_password: newPassword },
      ...skin,
    })
    .catch((error) => ({ error }));
export const fetchConfigura = (id) =>
  instanceAxios
    .get(`/users/${id}`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchBarcodeData = (barcode) => {
  return instanceAxios
    .get("/bollettino", {
      params: {
        barcode,
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const changeAgentReq = (aaa, agent_id, skin_id) => {
  return instanceAxios
    .post(`/agency/${agent_id}/changeAgent`, {
      agent_id: aaa,
      ...(skin_id && skin_id !== -1 ? { skin_id } : skin),
    })
    .catch((error) => ({ error }));
};
export const fetchCodice = (barcode, service) =>
  instanceAxios
    .get("/payment", {
      params: {
        barcode: barcode,
        type: service,
        ...skin,
      },
    })
    .catch((error) => ({ error }));
export const fetchAgents = (skin_id) =>
  instanceAxios
    .get("/agents", {
      params: {
        ...(skin_id ? { skin_id } : skin),
      },
    })
    .catch((error) => ({ error }));

export const switchUserStatus = (id, status, c, role, backOffice) => {
  instanceAxios
    .post(
      (role === "main_admin" && !backOffice) || backOffice === -1
        ? `/skins/${id}/changeStatus`
        : `/users/${id}/changeStatus`,
      {
        ...{ status },
        ...(backOffice ? (backOffice !== -1 ? skin : backOffice) : skin),
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
  return instanceAxios
    .post(
      (role === "main_admin" && !backOffice) || backOffice === -1
        ? `/skin/transferMoney/${id}`
        : `/users/${id}/transfer`,
      {
        ...{ amount },
        ...{ type },
        ...(backOffice
          ? backOffice !== -1
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
    .catch((error) => ({ error }));
};
export const fetchUserDetails = (user_id, skin_id) => {
  return instanceAxios
    .get(`agency/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id !== -1 ? { skin_id } : skin) : skin),
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
  skin_id,
  mainAdminObj
) => {
  return instanceAxios
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

      username: mainAdminObj.username,
      email: mainAdminObj.email,
      a_ragione_sociale: mainAdminObj.a_ragione_sociale,
      a_iva: mainAdminObj.a_iva,
      first_name: mainAdminObj.first_name,
      last_name: mainAdminObj.last_name,
      birth_comune_code: mainAdminObj.birth_comune_code,
      birth_country: mainAdminObj.birth_country,
      country: mainAdminObj.country,
      birth_place: mainAdminObj.birth_place,
      birthday: mainAdminObj.birthday,
      city: mainAdminObj.city,
      comune_code: mainAdminObj.comune_code,
      gender: mainAdminObj.gender,
      personal_number: mainAdminObj.personal_number,
      ragione_sociale: mainAdminObj.ragione_sociale,
      p_iva: mainAdminObj.p_iva,
      address: mainAdminObj.address,
      cap: mainAdminObj.cap,
      ...(skin_id && skin_id !== -1 ? { skin_id } : skin),
    })
    .catch((error) => ({ error }));
};
export const fetchSkinExtras = () => {
  return axios
    .create({
      baseURL: endpoint,
    })
    .get(`/skin/extra`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const fetchErrors = (limit, page_number) => {
  return instanceAxios
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
  return instanceAxios
    .post(`/error/${id}/changeStatus`, {
      ...skin,
      status: 4,
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
  telefono,
  prezzo
) => {
  return instanceAxios
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
            price: parseFloat(prezzo),
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
            price: parseFloat(prezzo),
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
            price: parseFloat(prezzo),
          }
    )
    .catch((error) => ({ error }));
};
export const getDataFormDetailReq = () => {
  return instanceAxios
    .get(`/tickets`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const getDataFormDetailActivesReq = (isVisure) => {
  return instanceAxios
    .get(`/${isVisure ? "visure" : "tickets"}/completed`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));
};
export const getTicketByTicketIdReq = (ticket_id) => {
  return instanceAxios
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
  ticket_id,
  consegna,
  cognome,
  phone,
  stato,
  citta,
  address1,
  address2,
  provincia,
  cap,
  note_address,
  company_name
) => {
  return instanceAxios
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
        : typee === 3
        ? {
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
        : {
            ...skin,
            type: typee,
            link,
            nome_agenzia,
            extra_data,
            price: parseFloat(price),
            consegna,
            nome: name,
            cognome,
            email,
            phone,
            stato,
            citta,
            address1,
            address2,
            provincia,
            cap,
            note_address,
            company_name,
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
  return instanceAxios
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
  return instanceAxios
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
  return instanceAxios
    .get(`/visure`, {
      params: {
        ...skin,
      },
    })

    .catch((error) => ({ error }));
};
export const uploadPdf = (id, document, isVisura) => {
  return instanceAxios

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
    });
};
export const getVisureByVisureIdReq = ({ visura_id }) => {
  return instanceAxios
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
  return instanceAxios
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
  return instanceAxios
    .get(`/agent/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id !== -1 ? skin : skin_id) : skin),
      },
    })
    .catch((error) => ({ error }));
};
export const getUserByUserIdReq = (user_id, skin_id) => {
  return instanceAxios
    .get(`/user/${user_id}`, {
      params: {
        ...(skin_id ? (skin_id !== -1 ? skin : skin_id) : skin),
      },
    })
    .catch((error) => ({ error }));
};
export const getSkinsReq = () => {
  return instanceAxios
    .get("/skins", {
      ...skin,
    })
    .catch((error) => ({ error }));
};
export const getFaturaDetailsReq = (user_id, year, month) => {
  return instanceAxios
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
  return instanceAxios
    .get("/fatture", {
      params: {
        ...skin,
        ...paramsToSend,
      },
    })
    .catch((error) => ({ error }));
};
export const getAllServicesReq = (skin_id) => {
  return instanceAxios
    .get("/allServices", {
      params: {
        skin_id,
      },
    })
    .catch((error) => ({ error }));
};
export const sendMailFatturaReq = (file_name) => {
  return instanceAxios
    .post("/mailFattura", {
      ...skin,
      file_name,
    })
    .catch((error) => ({ error }));
};
export const printFatturaReq = (file_name) => {
  return instanceAxios
    .post("/printFattura", {
      ...skin,
      file_name,
    })
    .catch((error) => ({ error }));
};
export const addLogo = (logo, skin_id) => {
  return instanceAxios
    .post(`/skins/${skin_id}/addLogo`, {
      logo,
    })
    .catch((error) => ({ error }));
};
export const AddSkinReq = (name, url, email, agency_rent) => {
  return instanceAxios
    .post(`/skins`, {
      name,
      url,
      email,
      agency_rent,
    })
    .catch((error) => ({ error }));
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
  return instanceAxios
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
    .catch((error) => ({ error }));
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
  return instanceAxios
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

    .catch((error) => ({ error }));
};
export const widgetPaymentsReq = (skin_id) => {
  return instanceAxios
    .get("/widgetPayments", {
      params: {
        ...(skin_id && skin_id !== -1 ? { skin_id } : {}),
      },
    })
    .catch((error) => ({ error }));
};
export const getStatisticheReq = (skin_id) => {
  return instanceAxios
    .get("/statistiche", {
      params: {
        ...(skin_id && skin_id !== -1 ? { skin_id } : {}),
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
  return instanceAxios
    .post(`/companies/${company_id}/update`, {
      name,
      full_name,
      active,
      ...(skin_id && skin_id !== -1 ? { skin_id } : skin),
    })
    .catch((error) => {});
};

export const customVoucher = (service_id, importo) =>
  instanceAxios
    .post(`/buy/${service_id === "BBT001" ? "bbetVoucher" : "bgameVoucher"}`, {
      ...{ service_id: service_id },
      ...(importo ? { importo: importo } : {}),
      ...skin,
    })
    .catch((error) => ({ error }));
export const StatisticheMainReq = () =>
  instanceAxios
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
  instanceAxios
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

export const buyTicketOnlineReq = (
  typee,
  link,
  nome_agenzia,
  extra_data,
  price,
  consegna,
  nome,
  cognome,
  email,
  phone,
  stato,
  citta,
  address1,
  address2,
  provincia,
  cap,
  note_address,
  company_name
) =>
  instanceAxios
    .post(`/buy/ticket`, {
      ...skin,
      type: typee,
      link,
      nome_agenzia,
      extra_data,
      price: parseFloat(price),
      consegna,
      ...(consegna === 2
        ? {
            nome,
            cognome,
            email,
            phone,
            stato,
            citta,
            address1,
            address2,
            provincia,
            cap,
            note_address,
            ...(company_name ? { company_name } : {}),
          }
        : {}),
    })
    .catch((error) => ({ error }));
export const pagoPaRequest = (
  service_id,
  person_type,
  via_piazza,
  citta,
  email,
  phone_number,
  tipologia,
  codice_fiscale_bol,
  codice_aviso,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  tipo_veicolo,
  targa
) =>
  instanceAxios
    .post(`/sepafin/book${service_id === "PPA001" ? "PagoPA" : "Auto"}`, {
      ...skin,
      service_id,
      person_type,
      via_piazza,
      citta,
      email,
      phone_number,
      tipologia,
      ...(service_id === "PPA001"
        ? { codice_fiscale_bol, codice_aviso }
        : { tipo_veicolo: parseInt(tipo_veicolo), targa }),
      ...(person_type === "F"
        ? { nome, cognome, codice_fiscale }
        : { denominazione, partita_iva }),
    })
    .catch((error) => ({ error }));
export const pagoTicketReq = (barcode) =>
  instanceAxios
    .post(`/sepafin/payBollettini`, {
      ...skin,
      barcode,
    })
    .catch((error) => ({ error }));

export const frecciaRequest = (
  service_id,
  importo,
  causale,
  person_type,
  via_piazza,
  cap,

  citta,
  provincia,
  email,
  phone_number,
  identificativo_pagamento,
  iban,
  cin_importo,

  cin_intermedio,
  cin_complessivo,
  codice_esenzione,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva
) =>
  instanceAxios
    .post(`/sepafin/payFreccia`, {
      ...skin,
      service_id,
      importo,
      causale,
      person_type,
      via_piazza,
      cap,

      citta,
      provincia,
      email,
      phone_number,
      identificativo_pagamento,
      iban,
      cin_importo,

      cin_intermedio,
      cin_complessivo,
      codice_esenzione,
      nome,
      cognome,
      codice_fiscale,
      denominazione,
      partita_iva,
    })
    .catch((error) => ({ error }));
export const mavRavRequest = (
  service_id,
  person_type,
  via_piazza,
  citta,
  email,
  phone_number,
  importo,
  codice,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva
) =>
  instanceAxios
    .post(`/sepafin/mavrav`, {
      ...skin,
      service_id,
      person_type,
      via_piazza,
      citta,
      email,
      phone_number,
      importo,
      codice,
      ...(service_id === "BOL003"
        ? { tipologia: "rav" }
        : { tipologia: "mav" }),
      ...(person_type === "F"
        ? { nome, cognome, codice_fiscale }
        : { denominazione, partita_iva }),
    })
    .catch((error) => ({ error }));

export const payPagoPaReq = (
  service_id,
  total_amount,
  fee_amount,
  pagamento_id
) =>
  instanceAxios
    .post(`/sepafin/pay${service_id === "PPA001" ? "PagoPA" : "Auto"}`, {
      ...skin,
      service_id,
      total_amount,
      fee_amount,
      pagamento_id,
    })
    .catch((error) => ({ error }));

export const bokkingF24Req = (
  service_id,
  person_type,
  via_piazza,
  citta,
  provincia,
  gender,
  vat,
  codice_ufficio,
  codice_atto,
  data_pagamento,
  importo,
  taxes_array,
  nome,
  cognome,
  codice_fiscale,
  denominazione,
  partita_iva,
  email,
  phone_number,
  codice_fiscale_optional
) =>
  instanceAxios
    .post(`/sepafin/bookF24`, {
      ...skin,
      service_id,
      person_type,
      via_piazza,
      citta,
      provincia,
      gender,
      vat,
      codice_ufficio,
      codice_atto,
      data_pagamento,
      importo,
      taxes_array,
      ...(person_type === "F"
        ? { nome, cognome, codice_fiscale }
        : { denominazione, partita_iva }),
      email,
      phone_number,
      codice_fiscale_optional,
    })
    .catch((error) => ({ error }));

export const payFReq = (service_id, importo, fee, pagamento_id) =>
  instanceAxios
    .post(`/sepafin/payF24`, {
      ...skin,
      service_id,
      importo,
      fee,
      pagamento_id,
    })
    .catch((error) => ({ error }));
export const createUserBgameReq = (
  nome,
  cognome,
  data_nascita,
  sesso,
  id_nazione_nascita,
  id_comune_nascita,
  codice_fiscale,
  id_comune_residenza,
  indirizzo,
  cap,
  telefono,
  cellulare,
  email,
  id_tipo_documento,
  documento,
  rilasciato_da,
  data_rilascio,
  data_scadenza,
  id_nazione_cittadinanza,
  nick,
  password,
  question,
  answer
) =>
  instanceAxios
    .post(`/bgame/createUser`, {
      ...skin,
      nome,
      cognome,
      data_nascita,
      sesso,
      id_nazione_nascita: parseInt(id_nazione_nascita),
      id_comune_nascita: parseInt(id_comune_nascita),
      codice_fiscale,
      id_comune_residenza: parseInt(id_comune_residenza),
      indirizzo,
      cap,
      telefono,
      cellulare,
      email,
      id_tipo_documento: parseInt(id_tipo_documento),
      documento,
      rialsciato_da: rilasciato_da,
      data_rilascio,
      data_scadenza,
      id_nazione_cittadinanza: parseInt(id_nazione_cittadinanza),
      nick,
      password,
      question,
      answer,
    })
    .catch((error) => ({ error }));

export const getRegistrazioneDataReq = () =>
  instanceAxios
    .get(`/bgame/registrazioneData`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

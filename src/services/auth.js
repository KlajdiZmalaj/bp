import request from "utils/request";
import axios from "axios";
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
      ...{ password: password }
    })
    .catch(error => ({ error }));

export const logoutApi = () =>
  // req.post(`/users/logout`).catch(err => {
  //   console.log("err", err);
  // });

  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .post(`/users/logout`)
    .catch(error => ({ error }));

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
  // req
  //   .post(`/test/rechargeBOL`, {
  //     ...{ service_id: service_id },
  //     ...{ numero_conto_corrente: numero_conto_corrente },
  //     ...{ importo: parseFloat(importo) },
  //     ...{ intestato_a: intestato_a },
  //     ...{ causale: causale },
  //     ...{ eseguito_da: eseguito_da },
  //     ...{ via_piazza: via_piazza },
  //     ...{ cap: parseInt(cap) },
  //     ...{ citta: citta },
  //     ...{ provincia: provincia }
  //   })
  //   .catch(error => ({ error }));
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .post(`/test/rechargeBOL`, {
      ...{ service_id: service_id },
      ...{ numero_conto_corrente: numero_conto_corrente },
      ...{ importo: parseFloat(importo) },
      ...{ intestato_a: intestato_a },
      ...{ causale: causale },
      ...{ eseguito_da: eseguito_da },
      ...{ via_piazza: via_piazza },
      ...{ cap: parseInt(cap) },
      ...{ citta: citta },
      ...{ provincia: provincia }
    })
    .catch(error => ({ error }));

export let fetchPayments;

if (JSON.parse(localStorage.getItem("accountDataB"))) {
  fetchPayments = (username, from, to) =>
    axios
      .create({
        baseURL: "https://services-api.bpoint.store/api",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("accountDataB")).token
          }`
        }
      })
      .post(`/users/payments`, {
        ...(username ? { username: username } : {}),
        ...{ from: from },
        ...{ to: to }
      })
      .catch(error => ({ error }));
}

export const fetchRechargeMobile = (service_id, tel_no) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .post(`/test/recharge`, {
      ...{ service_id: service_id },
      ...{ tel_no: tel_no }
    })
    .catch(error => ({ error }));


  export const fetchAds = () => axios.create({
    baseURL: "https://services-api.bpoint.store/api",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("accountDataB")).token
      }`
    }
  }).get('/messages')
  .catch(error => ({error}))

  export const sendCreatedAds = (importance, title, text) => axios.create({
    baseURL: "https://services-api.bpoint.store/api",
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("accountDataB")).token
      }`
    }
  }).post(`/messages`, {
    ...{ importance: importance },
    ...{ title: title },
    ...{ text: text }
  }).catch(error => ({error}))
import { put, call } from "redux-saga/effects";
import AuthActions from "../models/auth";
import {
  fetchLogin,
  logoutApi,
  fetchAccountInfo,
  fetchBolletiniBianchi
} from "services/auth";

export function* signInByEmail(credencials) {
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  if (response) {
    if (response.data) {
      localStorage.setItem("accountData", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  // console.log("logoutttttttt");

  const response = yield call(logoutApi);
  console.log("response", response, response.data);
  if (response) {
    localStorage.setItem("accountData", null);
    yield put(AuthActions.setAccountInfo({}));
  }
  // localStorage.setItem("accountData", null);
  // yield put(AuthActions.setAccountInfo({}));
}

export function* getBolletiniBianchi(params) {
  console.log("params", params);
  const response = yield call(
    fetchBolletiniBianchi,
    params.service_id,
    params.numero_conto_corrente,
    params.importo,
    params.intestato_a,
    params.causale,
    params.eseguito_da,
    params.via_piazza,
    params.cap,
    params.citta,
    params.provincia
  );
  if (response) {
    if (response.data) {
      yield put(AuthActions.setBolletiniBianchi(response.data));
    }
  }
}

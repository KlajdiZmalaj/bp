import { put, call } from "redux-saga/effects";
import AuthActions from "../models/auth";
import {
  fetchLogin,
  logoutApi,
  fetchAccountInfo,
  fetchBolletiniBianchi,
  fetchPayments
} from "services/auth";

export function* signInByEmail(credencials) {
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  if (response) {
    if (response.data) {
      localStorage.setItem("accountDataB", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  const response = yield call(logoutApi);

  if (response) {
    localStorage.setItem("accountDataB", null);
    yield put(AuthActions.setAccountInfo({}));
  }
  // localStorage.setItem("accountDataB", null);
  // yield put(AuthActions.setAccountInfo({}));
}

export function* getBolletiniBianchi(params) {
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
    console.log("response", response);
    if (response.data) {
      yield put(AuthActions.setBolletiniBianchi(response.data));
    } else if (response.error) {
      console.log("errorrrrrrrrrr", response.error.response.data);
      if (response.error.response.status === 444) {
        const error = { errors: { notCorrect: ["data are not corrected."] } };
        yield put(AuthActions.setBolletiniBianchi(error));
      } else {
        yield put(
          AuthActions.setBolletiniBianchi(response.error.response.data)
        );
      }

      // yield delay(3000);
      // yield put(AuthActions.setBolletiniBianchi({}));
    }
  }
}

export function* getPayments(params) {
  const response = yield call(
    fetchPayments,
    params.username,
    params.from,
    params.to
  );

  if (response) {
    if (response.data) {
      yield put(AuthActions.setPayments(response.data.transactions));
    }
    //  else if (response.error) {
    //   console.log("errorrrrrrrrrr", response.error.response.data);
    //   if (response.error.response.status === 444) {
    //     const error = { errors: { notCorrect: ["data are not corrected."] } };
    //     yield put(AuthActions.setBolletiniBianchi(error));
    //   } else {
    //     yield put(
    //       AuthActions.setBolletiniBianchi(response.error.response.data)
    //     );
    //   }
    // }
  }
}

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AuthTypes } from "../models/auth";
import { MainTypes } from "../models/main";
/* ------------- Sagas ------------- */
import {
  signInByEmail,
  getAccountInfo,
  logOut,
  getBolletiniBianchi,
  getPayments
} from "./AuthSagas";
import { getServices } from "./MainSagas";

export default function* root() {
  yield all([
    // AUTH
    takeLatest(AuthTypes.SIGN_IN_BY_EMAIL, signInByEmail),
    takeLatest(AuthTypes.GET_ACCOUNT_INFO, getAccountInfo),
    takeLatest(AuthTypes.LOG_OUT, logOut),
    takeLatest(AuthTypes.GET_BOLLETINI_BIANCHI, getBolletiniBianchi),
    takeLatest(AuthTypes.GET_PAYMENTS, getPayments),

    // MAIN
    takeLatest(MainTypes.GET_SERVICES, getServices)
  ]);
}

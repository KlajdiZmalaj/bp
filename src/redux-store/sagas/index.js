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
  getPayments,
  getRechargeMobile,
  getAds,
  isUnauthorized
} from "./AuthSagas";
import { getServices } from "./MainSagas";

export default function* root() {
  yield all([
    // AUTH h
    takeLatest(AuthTypes.SIGN_IN_BY_EMAIL, signInByEmail),
    takeLatest(AuthTypes.GET_ACCOUNT_INFO, getAccountInfo),
    takeLatest(AuthTypes.LOG_OUT, logOut),
    takeLatest(AuthTypes.GET_BOLLETINI_BIANCHI, getBolletiniBianchi),
    takeLatest(AuthTypes.GET_PAYMENTS, getPayments),
    takeLatest(AuthTypes.GET_RECHARGE_MOBILE, getRechargeMobile),
    takeLatest(AuthTypes.GET_ADS, getAds),

    // MAIN
    takeLatest(MainTypes.GET_SERVICES, getServices)
  ]);
}

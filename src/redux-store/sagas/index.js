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
  getBolletiniPremercati,
  getPayments,
  getRechargeMobile,
  getPostePay,
  getAds,
  createAds,
  getRegister,
  getChangedPassword,
  getConfigura,
  getCodiceTicket,
} from "./AuthSagas";

import {
  getServices,
  getUsers,
  getUsersSimple,
  getUsersBySearch,
  getOverviewDashboard,
  toggleFavorite,
  getFavorites,
} from "./MainSagas";

export default function* root() {
  yield all([
    // AUTH h
    takeLatest(AuthTypes.SIGN_IN_BY_EMAIL, signInByEmail),
    takeLatest(AuthTypes.GET_ACCOUNT_INFO, getAccountInfo),
    takeLatest(AuthTypes.LOG_OUT, logOut),
    takeLatest(AuthTypes.GET_BOLLETINI_BIANCHI, getBolletiniBianchi),
    takeLatest(AuthTypes.GET_BOLLETINI_PREMERCATI, getBolletiniPremercati),

    takeLatest(AuthTypes.GET_PAYMENTS, getPayments),
    takeLatest(AuthTypes.GET_RECHARGE_MOBILE, getRechargeMobile),
    takeLatest(AuthTypes.GET_POSTE_PAY, getPostePay),
    takeLatest(AuthTypes.GET_ADS, getAds),
    takeLatest(AuthTypes.CREATE_ADS, createAds),
    takeLatest(AuthTypes.GET_REGISTER, getRegister),
    takeLatest(AuthTypes.GET_CHANGED_PASSWORD, getChangedPassword),
    takeLatest(AuthTypes.GET_CONFIGURA, getConfigura),
    takeLatest(AuthTypes.GET_CODICE_TICKET, getCodiceTicket),

    // MAIN
    takeLatest(MainTypes.GET_SERVICES, getServices),
    takeLatest(MainTypes.GET_USERS, getUsers),
    takeLatest(MainTypes.GET_USERS_SIMPLE, getUsersSimple),

    takeLatest(MainTypes.GET_USERS_BY_SEARCH, getUsersBySearch),
    takeLatest(MainTypes.GET_OVERVIEW_DASHBOARD, getOverviewDashboard),
    takeLatest(MainTypes.TOGGLE_FAVORITE, toggleFavorite),
    takeLatest(MainTypes.GET_FAVORITES, getFavorites),
  ]);
}

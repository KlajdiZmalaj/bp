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
  getBarcodeData,
  getUserDetail,
  updateUserDetail,
  changeAgent,
  getAgents,
  getSkinExtras,
  getErrors,
  deleteError,
  sendDataForm,
  getDataFormDetails,
  getTicketByTicketId,
  updateDataForm,
  sendVisureDetails,
  addPrivateMsg,
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
    takeLatest(AuthTypes.ADD_PRIVATE_MSG, addPrivateMsg),
    takeLatest(AuthTypes.SEND_VISURE_DETAILS, sendVisureDetails),
    takeLatest(AuthTypes.UPDATE_DATA_FORM, updateDataForm),
    takeLatest(AuthTypes.GET_TICKET_BY_TICKET_ID, getTicketByTicketId),
    takeLatest(AuthTypes.GET_DATA_FORM_DETAILS, getDataFormDetails),
    takeLatest(AuthTypes.SEND_DATA_FORM, sendDataForm),
    takeLatest(AuthTypes.SIGN_IN_BY_EMAIL, signInByEmail),
    takeLatest(AuthTypes.GET_ACCOUNT_INFO, getAccountInfo),
    takeLatest(AuthTypes.LOG_OUT, logOut),
    takeLatest(AuthTypes.GET_BOLLETINI_BIANCHI, getBolletiniBianchi),
    takeLatest(AuthTypes.GET_BOLLETINI_PREMERCATI, getBolletiniPremercati),
    takeLatest(AuthTypes.GET_BARCODE_DATA, getBarcodeData),
    takeLatest(AuthTypes.GET_PAYMENTS, getPayments),
    takeLatest(AuthTypes.GET_RECHARGE_MOBILE, getRechargeMobile),
    takeLatest(AuthTypes.GET_POSTE_PAY, getPostePay),
    takeLatest(AuthTypes.GET_ADS, getAds),
    takeLatest(AuthTypes.CREATE_ADS, createAds),
    takeLatest(AuthTypes.GET_REGISTER, getRegister),
    takeLatest(AuthTypes.GET_CHANGED_PASSWORD, getChangedPassword),
    takeLatest(AuthTypes.GET_CONFIGURA, getConfigura),
    takeLatest(AuthTypes.GET_CODICE_TICKET, getCodiceTicket),
    takeLatest(AuthTypes.GET_USER_DETAIL, getUserDetail),
    takeLatest(AuthTypes.UPDATE_USER_DETAIL, updateUserDetail),
    takeLatest(AuthTypes.CHANGE_AGENT, changeAgent),
    takeLatest(AuthTypes.GET_AGENTS, getAgents),
    takeLatest(AuthTypes.GET_SKIN_EXTRAS, getSkinExtras),
    takeLatest(AuthTypes.GET_ERRORS, getErrors),
    takeLatest(AuthTypes.DELETE_ERROR, deleteError),
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

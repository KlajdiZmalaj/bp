import { takeLatest, all } from "redux-saga/effects";
/* ------------- SAGA GENERATORS ------------- */
import * as AuthGenerators from "./AuthSagas";
import * as MainGenerators from "./MainSagas";
import * as ShopGenerators from "./ShopSagas";

export default function* root() {
  yield all([
    //AUTH Generators
    ...[
      takeLatest("GET_REFILLS", AuthGenerators.getRefills),
      takeLatest("CHANGE_AGENT_SKIN", AuthGenerators.changeAgentSkin),
      takeLatest("PAGO_TICKET", AuthGenerators.pagoTicket),
      takeLatest("CREATE_USER_BGAME", AuthGenerators.createUserBgame),
      takeLatest("GET_REGISTRAZIONE_DATA", AuthGenerators.getRegistrazioneData),
      takeLatest("SET_PAY_F_SAGA", AuthGenerators.setPayFSaga),
      takeLatest("SET_BOKING_SEP", AuthGenerators.setBokingSep),
      takeLatest("PAY_PAGO_PA", AuthGenerators.payPagoPa),
      takeLatest("SET_MAV_RAV", AuthGenerators.setMavRav),
      takeLatest("SET_PAGO_PA", AuthGenerators.setPagoPa),
      takeLatest("SET_FRECCIA", AuthGenerators.setFreccia),
      takeLatest("BUY_TICKET_ONLINE", AuthGenerators.buyTicketOnline),
      takeLatest("FETCH_BOLLETINI", AuthGenerators.fetchBolletini),
      takeLatest("GET_STATISTICHE_MAIN", AuthGenerators.getStatisticheMain),
      takeLatest("GET_CUSTOM_VOUCHER_REQ", AuthGenerators.getCustomVoucherReq),
      takeLatest(
        "UPDATE_SERVICES_CHANGE_STATUS",
        AuthGenerators.UpdateServiceChangeStatus
      ),
      takeLatest("GET_STATISTICHE", AuthGenerators.getStatistiche),
      takeLatest("ADD_EXTRA_DATA", AuthGenerators.AddExtraData),
      takeLatest("ADD_SUPER_ADMIN", AuthGenerators.AddSuperAdmin),
      takeLatest("GET_PAYMENTS_FOR_EXCEL", AuthGenerators.getPaymentsForExcel),
      takeLatest("ADD_SKIN_NEW", AuthGenerators.AddSkinNew),
      takeLatest("SEND_MAIL_FATTURA", AuthGenerators.sendMailFattura),
      takeLatest(
        "GET_ALL_FATURA_BY_SEARCH",
        AuthGenerators.getAllFaturaBySearch
      ),
      takeLatest("GET_ALL_SERVICES", AuthGenerators.getAllServices),
      takeLatest("GET_FATURA_DETAILS", AuthGenerators.getFaturaDetails),
      takeLatest("GET_WIDGET_PAYMENTS", AuthGenerators.getWidgetPayments),

      takeLatest("GET_SKINS", AuthGenerators.getSkins),
      takeLatest("UPDATE_VISURA", AuthGenerators.updateVisura),
      takeLatest("ADD_VISURE", AuthGenerators.addVisure),
      // AUTH h
      takeLatest("GET_AGENT_BY_USER_ID", AuthGenerators.getAgentByUserId),
      takeLatest("GET_USER_BY_USER_ID", AuthGenerators.getUserByUserId),
      takeLatest("GET_VISURE_BY_VISURE_ID", AuthGenerators.getVisureByVisureId),
      takeLatest("GET_VISURE", AuthGenerators.getVisure),
      takeLatest(
        "GET_DATA_FORM_DETAILS_ACTIVES",
        AuthGenerators.getDataFormDetailsActives
      ),
      takeLatest("ADD_TICKET", AuthGenerators.addTicket),
      takeLatest("ADD_PRIVATE_MSG", AuthGenerators.addPrivateMsg),
      takeLatest("SEND_VISURE_DETAILS", AuthGenerators.sendVisureDetails),
      takeLatest("UPDATE_DATA_FORM", AuthGenerators.updateDataForm),
      takeLatest("GET_TICKET_BY_TICKET_ID", AuthGenerators.getTicketByTicketId),
      takeLatest("GET_DATA_FORM_DETAILS", AuthGenerators.getDataFormDetails),
      takeLatest("SEND_DATA_FORM", AuthGenerators.sendDataForm),
      takeLatest("SIGN_IN_BY_EMAIL", AuthGenerators.signInByEmail),
      takeLatest("GET_ACCOUNT_INFO", AuthGenerators.getAccountInfo),
      takeLatest("LOG_OUT", AuthGenerators.logOut),
      takeLatest("GET_BOLLETINI_BIANCHI", AuthGenerators.getBolletiniBianchi),
      takeLatest(
        "GET_BOLLETINI_PREMERCATI",
        AuthGenerators.getBolletiniPremercati
      ),
      takeLatest("GET_BARCODE_DATA", AuthGenerators.getBarcodeData),
      takeLatest("GET_PAYMENTS", AuthGenerators.getPayments),
      takeLatest("GET_RECHARGE_MOBILE", AuthGenerators.getRechargeMobile),
      takeLatest("GET_POSTE_PAY", AuthGenerators.getPostePay),
      takeLatest("GET_ADS", AuthGenerators.getAds),
      takeLatest("CREATE_ADS", AuthGenerators.createAds),
      takeLatest("GET_REGISTER", AuthGenerators.getRegister),
      takeLatest("GET_CHANGED_PASSWORD", AuthGenerators.getChangedPassword),
      takeLatest("GET_CONFIGURA", AuthGenerators.getConfigura),
      takeLatest("GET_CODICE_TICKET", AuthGenerators.getCodiceTicket),
      takeLatest("GET_USER_DETAIL", AuthGenerators.getUserDetail),
      takeLatest("UPDATE_USER_DETAIL", AuthGenerators.updateUserDetail),
      takeLatest("CHANGE_AGENT", AuthGenerators.changeAgent),
      takeLatest("GET_AGENTS", AuthGenerators.getAgents),
      takeLatest("GET_SKIN_EXTRAS", AuthGenerators.getSkinExtras),
      takeLatest("GET_ERRORS", AuthGenerators.getErrors),
      takeLatest("DELETE_ERROR", AuthGenerators.deleteError),
    ],
    //MAIN Generators
    ...[
      takeLatest("FORGOT_PASSWORD", MainGenerators.forgotPassword),
      takeLatest("GET_SEARCHED_USERS", MainGenerators.getSearchedUsers),
      takeLatest("GET_USER_PHOTOS", MainGenerators.getUserPhotos),
      takeLatest("GET_SERVICES", MainGenerators.getServices),
      takeLatest("GET_USERS", MainGenerators.getUsers),
      takeLatest("GET_USERS_SIMPLE", MainGenerators.getUsersSimple),

      takeLatest("GET_USERS_BY_SEARCH", MainGenerators.getUsersBySearch),
      takeLatest("GET_OVERVIEW_DASHBOARD", MainGenerators.getOverviewDashboard),
      takeLatest("TOGGLE_FAVORITE", MainGenerators.toggleFavorite),
      takeLatest("GET_FAVORITES", MainGenerators.getFavorites),
      takeLatest("SEND_PRENOTAZIONE", MainGenerators.sendPrenotazione),
    ],
    //SHOP
    ...[
      takeLatest("GET_PRODUCTS_LIST", ShopGenerators.getProductsList),
      takeLatest("GET_PRODUCT_DETAILS", ShopGenerators.getProductDetails),
      takeLatest("GET_BRANDS", ShopGenerators.getBrands),
      takeLatest("GET_DEFAULT_PRODUCTS", ShopGenerators.getDefaultProducts),
      takeLatest("GET_CATEGORIES", ShopGenerators.getCategories),
      takeLatest("CHECK_OUT", ShopGenerators.checkOut),
      takeLatest("GET_TO_CART", ShopGenerators.getToCart),
      takeLatest("GET_ITEMS_CART", ShopGenerators.getItemsCart),
      takeLatest("GET_ORDER", ShopGenerators.getOrder),
      takeLatest("GET_REMOVE_TO_CART", ShopGenerators.getRemoveToCart),
      takeLatest("GET_CARRIES", ShopGenerators.getCarries),
      takeLatest("GET_PROD_CAT", ShopGenerators.getProdCat),
    ],
  ]);
}

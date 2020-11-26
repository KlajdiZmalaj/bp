import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  changeAgent: ["id", "id2", "skin_id"],
  signInByEmail: ["email", "password", "c"],
  authSuccess: ["user"],
  authFailure: ["error"],
  logOut: [],
  getAccountInfo: [],
  setAccountInfo: ["accountInfo"],
  getAgents: ["skin_id"],
  setAgents: ["agents"],
  setUnauthorization: [],
  getBolletiniBianchi: [
    "service_id",
    "numero_conto_corrente",
    "importo",
    "intestato_a",
    "causale",
    "eseguito_da",
    "via_piazza",
    "cap",
    "citta",
    "provincia",
    "clearFields",
    "callBack",
  ],
  getBolletiniPremercati: [
    "service_id",
    "numero_conto_corrente",
    "importo",
    "codice_identificativo",
    "tipologia",
    "eseguito_da",
    "via_piazza",
    "cap",
    "citta",
    "provincia",
    "clearFields",
    "callBack",
  ],
  setBolletiniBianchi: ["bolletiniBianchi"],
  setBolletiniPremercati: ["bolletiniPremercati"],
  setServiceId: ["service_id"],
  setServiceS: ["service_s"],

  getPayments: [
    "username",
    "from",
    "to",
    "page_number",
    "limit",
    "skin_id",
    "excel",
  ],
  getPaymentsForExcel: [
    "username",
    "from",
    "to",
    "page_number",
    "limit",
    "skin_id",
    "excel",
    "callback",
  ],
  setPayments: ["payments"],
  setPaymentsForExcel: ["paymentsForExcel"],
  setUsernames: ["usernames"],
  getRechargeMobile: ["service_id", "tel_no", "callBack"],
  getCustomVoucherReq: ["service_id", "tel_no", "callBack"],
  setRechargeMobile: ["rechargeMobile"],
  getStatisticheMain: [""],
  setStatisticheMain: ["StatisticheMain"],
  getPostePay: [
    "service_id",
    "importo",
    "user_id",
    "intestazione",
    "codice_fiscale_intestatario",
    "ordinante",
    "codice_fiscale_ordinante",
    "numero_postepay",
    "document_type",
    "imageUrl",
    "imageUrl2",
    "clearFields",
    "setPostePayLoading",
  ],
  setPostePay: ["postePay"],
  setPostePayLoading: ["postePayLoading"],
  setServiceType: ["serviceType"],

  getAds: [],

  getRegister: [
    "first_name",
    "last_name",
    "nickname", // for username
    "email",
    "gender",
    "personal_number",
    "birthday",
    "nazione",
    "province_of_birth",
    "city_of_birth",
    "nazioneDiResidenca",
    "residence_province",
    "residence_city",
    "address",
    "cap",
    "identity_id",
    "identity_type",
    "number_prefix",
    "number",
    "frontImg",
    "backImg",
    "role",
    "aRagSoc",
    "aInsegna",
    "aPhone",
    "aAdress",
    "aCity",
    "aComcode",
    "aCap",
    "aPiva",
    "aFcode",
    "confirm_password",
    "password",
    "rilasciato_da",
    "luogo_di_rilascio",
    "data_di_rilascio",
    "data_di_scadenza",
    "a_cordinate",
    "a_contry",
    "rent",
    "privacy_policy",
    "recieve_emails",
    "percentage",
  ],
  setRegister: ["register"],
  setAds: ["ads"],
  createAds: ["data"],
  createAdsResponse: ["adsCreationgLoading", "adsCreationgMess"],
  getChangedPassword: ["oldPassword", "newPassword"],
  setChangePasswordError: ["pwError"],
  getConfigura: ["id"],
  getCodiceTicket: ["barcode", "service"],
  setPaymentsFromCode: ["paymentsFromCode"],
  setConfiguraData: ["usersConfigura"],
  getBarcodeData: ["barcode", "callback"],
  setBarcodeData: ["barcodeData"],
  setLoginMsg: ["loginMsg"],
  getUserDetail: ["id", "skin_id"],
  setUserDetail: ["userDetail"],
  updateUserDetail: [
    "user_id",
    "phone",
    "document_type",
    "document_number",
    "rilasciato_da",
    "luogo_di_rilascio",
    "data_di_rilascio",
    "data_di_scadenza",
    "a_insegna",
    "a_cordinate",
    "a_phone",
    "a_address",
    "a_city",
    "a_comune_code",
    "a_cap",
    "a_country",
    "a_rent",
    "password",
    "confirm_password",
    "skin_id",
    "resetState",
    "mainAdminObj",
  ],
  updateUserDetailMsg: ["updateMsg"],
  setPrivateMsg: ["privMsg"],
  addPrivateMsg: ["privMsg"],
  getSkinExtras: [""],
  setSkinExtras: ["skinExtras"],
  getErrors: ["limit", "page_number", "DONT_LOAD"],
  setErrorsLoading: ["ErrLoading"],
  setErrors: ["errors"],
  deleteError: ["id", "c"],
  sendDataForm: [
    "prezzo",
    "typee",
    "link",
    "nome_agenzia",
    "extra_data",
    "bagaglio",
    "bagaglio_stiva",
    "callBack",
    "partenza",
    "partenza_stazione",
    "andata_time",
    "destinazione",
    "destinazione_stazione",
    "compagnie",
    "adulti",
    "ragazzi",
    "tipologia_biglietto",
    "ritorno_date",
    "categoria",
    "descrizione_categoria",
    "quantity",
    "name",
    "email",
    "telefono",
  ],
  getDataFormDetails: ["limit", "page_number"],
  getDataFormDetailsActives: ["isVisure", "limit", "page_number"],
  setDataFormDetailsActives: ["formDetailsActives"],
  setDataFormDetails: ["formDetails"],
  getTicketByTicketId: ["ticket_id"],
  setTicketByTicketId: ["TicketByTcketId"],
  setPaymentsLoading: ["loadingPayments"],
  updateDataForm: [
    "typee",
    "link",
    "nome_agenzia",
    "extra_data",
    "bagaglio",
    "bagaglio_stiva",
    "callBack",
    "partenza",
    "partenza_stazione",
    "andata_time",
    "destinazione",
    "destinazione_stazione",
    "compagnie",
    "adulti",
    "ragazzi",
    "tipologia_biglietto",
    "ritorno_date",
    "categoria",
    "descrizione_categoria",
    "quantity",
    "name",
    "email",
    "telefono",
    "price",
    "ticket_id",
    "consegna",
    "cognome",
    "phone",
    "stato",
    "citta",
    "address1",
    "address2",
    "provincia",
    "cap",
    "note_address",
    "company_name",
  ],
  updateVisura: [
    "visura_id",
    "typee",
    "codice_fiscale",
    "provincia",
    "address",
    "telefono",
    "email",
    "price",

    "ragione_sociale",
    "p_iva",
    "comune",

    "nome",
    "cognome",
    "data_di_nascita",
    "luogo_di_nascita",
    "callBack",
    "servizi",
  ],
  setPaymentsPages: ["paymentsPages"],
  sendVisureDetails: [
    "typee",
    "codice_fiscale",
    "provincia",
    "address",
    "telefono",
    "email",
    "nome",
    "cognome",
    "data_di_nascita",
    "luogo_di_nascita",
    "ragione_sociale",
    "p_iva",
    "comune",
    "callBack",
    "servizi",
    "price",
    "sc",
  ],
  bigliettoPopUp: ["popUpData"],
  bigliettoPopUpVisure: ["popUpDataVisure"],
  setButtonsSupport: ["enableButtons"],
  addTicket: ["ticket"],
  getVisure: [""],
  setVisure: ["Visure"],
  addVisure: ["singleVisure"],
  getVisureByVisureId: ["visura_id"],
  setVisureByVisureId: ["VisureByVisureId"],
  getUserByUserId: ["user_id", "skin_id"],
  getAgentByUserId: ["user_id", "skin_id"],
  openModalForAdmin: ["openAdminModal"],
  editModalDetails: ["ModalDetails"],
  editStatModal: ["statModal"],
  editUltModal: ["ultModal"],
  editDepModal: ["depModal"],
  editUtentiRespModal: ["utentiResModal"],
  getSkins: [],
  setSkins: ["skinList"],
  getFaturaDetails: ["user_id", "year", "month"],
  setFaturaDetails: ["faturaDetails"],
  getAllServices: ["skin_id"],
  setAllServices: ["allServices"],
  setServicesLoading: ["servicesLoader"],
  setDepositoPopup: ["DepositoPopup"],
  getAllFaturaBySearch: ["username", "month", "year", "perPage", "page_number"],
  setFatturaLoading: ["fattura_loading"],
  setAllFaturaBySearch: ["Fatture"],
  sendMailFattura: ["file_name"],
  setDepositoModalAdmin: ["adminDepModal"],
  setPaymentsExcelLoading: ["paymentExcelLoading"],
  addEditSkinDetails: ["addEditSkin"],
  AddSkinNew: ["name", "url", "email", "agency_rent"],
  setSkinId: ["newSkinId"],
  getWidgetPayments: ["skin_id"],
  setWidgetPayments: ["leUltimeTransazioniDet"],
  AddSuperAdmin: [
    "first_name",
    "last_name",
    "gender",
    "username",
    "email",
    "phone",
    "personal_number",
    "password",
    "confirm_password",
    "address",
    "city",
    "comune_code",
    "cap",
    "country",
    "birth_place",
    "birth_country",
    "birthday",
    "a_ragione_sociale",
    "a_p_iva",
    "a_codice_fiscale",
    "skin_id",
  ],
  AddExtraData: [
    "cel",
    "mail",
    "address",
    "link1",
    "link2",
    "link3",
    "link4",
    "link5",
    "ig",
    "pin",
    "yt",
    "fb",
    "bank_name",
    "account_name",
    "iban",
    "main_color",
    "skin_id",
    "area_download",
  ],
  registerSkinSucc: ["registerSkinS"],
  getStatistiche: ["skin_id"],
  setStatistiche: ["Statistiche"],
  setFromDateToDate: ["fromDate"],
  setAdminPanelClass: ["CenterCls"],
  setLoadingRecharge: ["loadingRechargeMobile"],
  setBolletiniLoading: ["bolletiniLoading"],
  UpdateServicesChangeStatus: [
    "name",
    "full_name",
    "company_id",
    "active",
    "skin_id",
    "c",
  ],
  editReportistica: ["ReportisticaDet"],
  fetchBolletini: [
    "service_id",
    "person_type",
    "via_piazza",
    "cap",
    "citta",
    "provincia",
    "importo",
    "tipologia",
    "numero_conto_corrente",
    "causale",
    "nome",
    "cognome",
    "codice_fiscale",
    "denominazione",
    "partita_iva",
    "email",
    "phone_number",
    "codice_identificativo",
    "clearFields",
  ],
  buyTicketOnline: [
    "typee",
    "link",
    "nome_agenzia",
    "extra_data",
    "price",
    "consegna",
    "nome",
    "cognome",
    "email",
    "phone",
    "stato",
    "citta",
    "address1",
    "address2",
    "provincia",
    "cap",
    "note_address",
    "company_name",
    "callBack",
  ],
  setPagoPa: [
    "service_id",
    "person_type",
    "via_piazza",
    "citta",
    "email",
    "phone_number",
    "tipologia",
    "codice_fiscale_bol",
    "codice_aviso",
    "nome",
    "cognome",
    "codice_fiscale",
    "denominazione",
    "partita_iva",
    "clearFields",
    "tipo_veicolo",
    "targa",
  ],
  setFreccia: [
    "service_id",
    "importo",
    "causale",
    "person_type",
    "via_piazza",
    "cap",

    "citta",
    "provincia",
    "email",
    "phone_number",
    "identificativo_pagamento",
    "iban",
    "cin_importo",

    "cin_intermedio",
    "cin_complessivo",
    "codice_esenzione",
    "nome",
    "cognome",
    "codice_fiscale",
    "denominazione",
    "partita_iva",
    "callBack",
  ],
  setMavRav: [
    "service_id",
    "person_type",
    "via_piazza",
    "citta",
    "email",
    "phone_number",
    "importo",
    "codice",
    "nome",
    "cognome",
    "codice_fiscale",
    "denominazione",
    "partita_iva",
    "clearFields",
  ],
  payPagoPa: ["service_id", "total_amount", "fee_amount", "pagamento_id"],
  setBokingSep: [
    "service_id",
    "person_type",
    "via_piazza",
    "citta",
    "provincia",
    "gender",
    "vat",
    "codice_ufficio",
    "codice_atto",
    "data_pagamento",
    "importo",
    "taxes_array",
    "nome",
    "cognome",
    "codice_fiscale",
    "denominazione",
    "partita_iva",
    "email",
    "phone_number",
    "codice_fiscale_optional",
    "ClearFields",
  ],
  setPayFSaga: ["service_id", "importo", "fee", "pagamento_id"],
  getRegistrazioneData: [],
  setRegistrazioneData: ["SelectData"],
  createUserBgame: [
    "nome",
    "cognome",
    "data_nascita",
    "sesso",
    "id_nazione_nascita",
    "id_comune_nascita",
    "codice_fiscale",
    "id_comune_residenza",
    "indirizzo",
    "cap",
    "telefono",
    "cellulare",
    "email",
    "id_tipo_documento",
    "documento",
    "rilasciato_da",
    "data_rilascio",
    "data_scadenza",
    "id_nazione_cittadinanza",
    "nick",
    "password",
    "question",
    "answer",
  ],
  pagoTicket: ["barcode"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  SelectData: null,
  ErrLoading: false,
  fattura_loading: false,
  ModalDetails: {},
  bolletiniLoading: false,
  fatturaPdf: "",
  enableButtons: { status: false, instance: null },
  popUpData: {},
  paymentsPages: 0,
  loadingPayments: true,
  privMsg: [],
  agents: [],
  pwError: "",
  loginMsg: "",
  user: null,
  loading: false,
  error: null,
  accountInfo: JSON.parse(localStorage.getItem("accountDataB") || "{}") || {},
  bolletiniBianchi: {},
  bolletiniPremercati: {},
  unauthorizated: true,
  service_id: null,
  payments: [],
  usernames: [],
  service_s: [],
  rechargeMobile: {},
  postePay: {},
  postePayLoading: false,
  ads: [],
  register: {},
  paymentsFromCode: {},
  usersConfigura: {},
  barcodeData: {},
  userDetail: {},
  updateMsg: "",
  skinExtras: {},
  errors: [],
  formDetails: [],
  TicketByTcketId: {},
  Visure: {},
  formDetailsActives: { rowsVisure: [], rowsTickets: [] },
  VisureByVisureId: {},
  popUpDataVisure: {},
  openAdminModal: false,
  statModal: { visibility: false, data: "" },
  ultModal: { visibility: false, data: "" },
  depModal: { visibility: false, data: "" },
  utentiResModal: { visibility: false, data: "" },
  skinList: [],
  faturaDetails: {},
  allServices: [],
  servicesLoader: false,
  DepositoPopup: {},
  Fatture: {},
  adminDepModal: null,
  paymentsForExcel: [],
  paymentExcelLoading: false,
  addEditSkin: { skinPannel: false },
  newSkinId: -1,
  leUltimeTransazioniDet: [],
  registerSkin: {
    addSkinSucc: false,
    addExtraDataSucc: false,
  },
  Statistiche: null,
  fromDate: null,
  CenterCls: "Center",
  loadingRechargeMobile: false,
  StatisticheMain: null,
  ReportisticaDet: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_REGISTRAZIONE_DATA: (state, { SelectData }) => ({
    ...state,
    SelectData,
  }),
  SET_ERRORS_LOADING: (state, { ErrLoading }) => ({
    ...state,
    ErrLoading,
  }),
  SET_FATTURA_LOADING: (state, { fattura_loading }) => ({
    ...state,
    fattura_loading,
  }),
  EDIT_REPORTISTICA: (state, { ReportisticaDet }) => ({
    ...state,
    ReportisticaDet,
  }),
  SET_STATISTICHE_MAIN: (state, { StatisticheMain }) => ({
    ...state,
    StatisticheMain,
  }),
  SET_POSTE_PAY_LOADING: (state, { postePayLoading }) => ({
    ...state,
    postePayLoading,
  }),
  SET_BOLLETINI_LOADING: (state, { bolletiniLoading }) => ({
    ...state,
    bolletiniLoading,
  }),
  SET_WIDGET_PAYMENTS: (state, { leUltimeTransazioniDet }) => ({
    ...state,
    leUltimeTransazioniDet,
  }),
  SET_LOADING_RECHARGE: (state, { loadingRechargeMobile }) => ({
    ...state,
    loadingRechargeMobile,
  }),
  SET_DATA_FORM_DETAILS_ACTIVES: (state, { formDetailsActives }) => ({
    ...state,
    formDetailsActives,
  }),
  SET_BUTTONS_SUPPORT: (state, { enableButtons }) => ({
    ...state,
    enableButtons,
  }),
  BIGLIETTO_POP_UP: (state, { popUpData }) => ({
    ...state,
    popUpData,
  }),
  BIGLIETTO_POP_UP_VISURE: (state, { popUpDataVisure }) => ({
    ...state,
    popUpDataVisure,
  }),
  SET_PAYMENTS_PAGES: (state, { paymentsPages }) => ({
    ...state,
    paymentsPages,
  }),
  SET_PAYMENTS_LOADING: (state, { loadingPayments }) => ({
    ...state,
    loadingPayments,
  }),
  SET_ERRORS: (state, { errors }) => ({
    ...state,
    errors,
  }),
  SET_SKIN_EXTRAS: (state, { skinExtras }) => ({
    ...state,
    skinExtras,
  }),
  SET_AGENTS: (state, { agents }) => ({
    ...state,
    agents,
  }),
  SET_PRIVATE_MSG: (state, { privMsg }) => ({
    ...state,
    privMsg,
  }),
  UPDATE_USER_DETAIL_MSG: (state, { updateMsg }) => ({
    ...state,
    updateMsg,
  }),
  SET_USER_DETAIL: (state, { userDetail }) => ({
    ...state,
    userDetail,
  }),
  SET_LOGIN_MSG: (state, { loginMsg }) => ({
    ...state,
    loginMsg,
  }),
  SIGN_IN_BY_EMAIL: (state) => ({
    ...state,
    loading: true,
    unauthorizated: false,
  }),
  SET_BARCODE_DATA: (state, { barcodeData }) => ({
    ...state,
    barcodeData,
  }),
  SET_PAYMENTS_FROM_CODE: (state, { paymentsFromCode }) => ({
    ...state,
    paymentsFromCode,
  }),
  SET_CHANGE_PASSWORD_ERROR: (state, { pwError }) => ({
    ...state,
    pwError,
  }),
  SET_CONFIGURA_DATA: (state, { usersConfigura }) => ({
    ...state,
    usersConfigura,
  }),
  SET_ACCOUNT_INFO: (state, { accountInfo }) => ({
    ...state,
    accountInfo,
  }),
  AUTH_SUCCESS: (state, { user }) => ({
    ...state,
    user,
    loading: false,
  }),
  AUTH_FAILURE: (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }),
  SET_UNAUTHORIZATION: ({ skinExtras }) => ({
    ...INITIAL_STATE,
    skinExtras,
  }),
  LOG_OUT: ({ skinExtras }) => ({
    ...INITIAL_STATE,
    accountInfo: {},
    skinExtras,
  }),
  SET_BOLLETINI_BIANCHI: (state, { bolletiniBianchi }) => ({
    ...state,
    bolletiniBianchi,
  }),
  SET_BOLLETINI_PREMERCATI: (state, { bolletiniPremercati }) => ({
    ...state,
    bolletiniPremercati,
  }),
  SET_SERVICE_ID: (state, { service_id }) => ({
    ...state,
    service_id,
  }),
  SET_SERVICE_S: (state, { service_s }) => ({
    ...state,
    service_s,
  }),
  SET_PAYMENTS: (state, { payments }) => ({
    ...state,
    payments,
  }),
  SET_USERNAMES: (state, { usernames }) => ({
    ...state,
    usernames,
  }),
  SET_RECHARGE_MOBILE: (state, { rechargeMobile }) => ({
    ...state,
    rechargeMobile,
  }),
  SET_POSTE_PAY: (state, { postePay }) => ({
    ...state,
    postePay,
  }),
  SET_SERVICE_TYPE: (state, { serviceType }) => ({
    ...state,
    serviceType,
  }),
  SET_ADS: (state, { ads }) => ({
    ...state,
    ads,
  }),

  SET_REGISTER: (state, { register }) => ({
    ...state,
    register,
  }),
  CREATE_ADS_RESPONSE: (state, { adsCreationgLoading, adsCreationgMess }) => ({
    ...state,
    adsCreationgLoading,
    adsCreationgMess,
  }),
  SET_DATA_FORM_DETAILS: (state, { formDetails }) => ({
    ...state,
    formDetails,
  }),
  SET_TICKET_BY_TICKET_ID: (state, { TicketByTcketId }) => ({
    ...state,
    TicketByTcketId,
  }),
  SET_VISURE: (state, { Visure }) => ({
    ...state,
    Visure,
  }),
  SET_VISURE_BY_VISURE_ID: (state, { VisureByVisureId }) => ({
    ...state,
    VisureByVisureId,
  }),
  OPEN_MODAL_FOR_ADMIN: (state, { openAdminModal }) => ({
    ...state,
    openAdminModal,
  }),
  EDIT_MODAL_DETAILS: (state, { ModalDetails }) => ({
    ...state,
    ModalDetails,
  }),
  EDIT_STAT_MODAL: (state, { statModal }) => ({
    ...state,
    statModal,
  }),
  EDIT_ULT_MODAL: (state, { ultModal }) => ({
    ...state,
    ultModal,
  }),
  EDIT_DEP_MODAL: (state, { depModal }) => ({
    ...state,
    depModal,
  }),
  EDIT_UTENTI_RESP_MODAL: (state, { utentiResModal }) => ({
    ...state,
    utentiResModal,
  }),
  SET_SKINS: (state, { skinList }) => ({
    ...state,
    skinList,
  }),
  SET_FATURA_DETAILS: (state, { faturaDetails }) => ({
    ...state,
    faturaDetails,
  }),
  SET_ALL_SERVICES: (state, { allServices }) => ({
    ...state,
    allServices,
  }),
  SET_SERVICES_LOADING: (state, { servicesLoader }) => ({
    ...state,
    servicesLoader,
  }),
  SET_DEPOSITO_POPUP: (state, { DepositoPopup }) => ({
    ...state,
    DepositoPopup,
  }),
  SET_ALL_FATURA_BY_SEARCH: (state, { Fatture }) => ({
    ...state,
    Fatture,
  }),
  SET_DEPOSITO_MODAL_ADMIN: (state, { adminDepModal }) => ({
    ...state,
    adminDepModal,
  }),
  SET_PAYMENTS_FOR_EXCEL: (state, { paymentsForExcel }) => ({
    ...state,
    paymentsForExcel,
  }),
  SET_PAYMENTS_EXCEL_LOADING: (state, { paymentExcelLoading }) => ({
    ...state,
    paymentExcelLoading,
  }),

  ADD_EDIT_SKIN_DETAILS: (state, { addEditSkin }) => ({
    ...state,
    addEditSkin,
  }),
  SET_SKIN_ID: (state, { newSkinId }) => ({
    ...state,
    newSkinId,
  }),
  REGISTER_SKIN_SUCC: (state, { registerSkinS }) => ({
    ...state,
    registerSkin: { ...state.registerSkin, ...registerSkinS },
  }),
  SET_STATISTICHE: (state, { Statistiche }) => ({
    ...state,
    Statistiche,
  }),
  SET_FROM_DATE_TO_DATE: (state, { fromDate }) => ({
    ...state,
    fromDate,
  }),
  SET_ADMIN_PANEL_CLASS: (state, { CenterCls }) => ({
    ...state,
    CenterCls,
  }),
});

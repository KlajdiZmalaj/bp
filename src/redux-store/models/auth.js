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
  getBgameVoucherReq: ["service_id", "tel_no", "callBack"],
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
  ],
  updateUserDetailMsg: ["updateMsg"],
  setPrivateMsg: ["privMsg"],
  addPrivateMsg: ["privMsg"],
  getSkinExtras: [""],
  setSkinExtras: ["skinExtras"],
  getErrors: [""],
  setErrors: ["errors"],
  deleteError: ["id", "c"],
  sendDataForm: [
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
  getDataFormDetails: [""],
  getDataFormDetailsActives: ["isVisure"],
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
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  fattura_loading: false,
  ModalDetails: {},
  bolletiniLoading: false,
  fatturaPdf: "",
  enableButtons: false,
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
  [Types.SET_FATTURA_LOADING]: (state, { fattura_loading }) => ({
    ...state,
    fattura_loading,
  }),
  [Types.EDIT_REPORTISTICA]: (state, { ReportisticaDet }) => ({
    ...state,
    ReportisticaDet,
  }),
  [Types.SET_STATISTICHE_MAIN]: (state, { StatisticheMain }) => ({
    ...state,
    StatisticheMain,
  }),
  [Types.SET_POSTE_PAY_LOADING]: (state, { postePayLoading }) => ({
    ...state,
    postePayLoading,
  }),
  [Types.SET_BOLLETINI_LOADING]: (state, { bolletiniLoading }) => ({
    ...state,
    bolletiniLoading,
  }),
  [Types.SET_WIDGET_PAYMENTS]: (state, { leUltimeTransazioniDet }) => ({
    ...state,
    leUltimeTransazioniDet,
  }),
  [Types.SET_LOADING_RECHARGE]: (state, { loadingRechargeMobile }) => ({
    ...state,
    loadingRechargeMobile,
  }),
  [Types.SET_DATA_FORM_DETAILS_ACTIVES]: (state, { formDetailsActives }) => ({
    ...state,
    formDetailsActives,
  }),
  [Types.SET_BUTTONS_SUPPORT]: (state, { enableButtons }) => ({
    ...state,
    enableButtons,
  }),
  [Types.BIGLIETTO_POP_UP]: (state, { popUpData }) => ({
    ...state,
    popUpData,
  }),
  [Types.BIGLIETTO_POP_UP_VISURE]: (state, { popUpDataVisure }) => ({
    ...state,
    popUpDataVisure,
  }),
  [Types.SET_PAYMENTS_PAGES]: (state, { paymentsPages }) => ({
    ...state,
    paymentsPages,
  }),
  [Types.SET_PAYMENTS_LOADING]: (state, { loadingPayments }) => ({
    ...state,
    loadingPayments,
  }),
  [Types.SET_ERRORS]: (state, { errors }) => ({
    ...state,
    errors,
  }),
  [Types.SET_SKIN_EXTRAS]: (state, { skinExtras }) => ({
    ...state,
    skinExtras,
  }),
  [Types.SET_AGENTS]: (state, { agents }) => ({
    ...state,
    agents,
  }),
  [Types.SET_PRIVATE_MSG]: (state, { privMsg }) => ({
    ...state,
    privMsg,
  }),
  [Types.UPDATE_USER_DETAIL_MSG]: (state, { updateMsg }) => ({
    ...state,
    updateMsg,
  }),
  [Types.SET_USER_DETAIL]: (state, { userDetail }) => ({
    ...state,
    userDetail,
  }),
  [Types.SET_LOGIN_MSG]: (state, { loginMsg }) => ({
    ...state,
    loginMsg,
  }),
  [Types.SIGN_IN_BY_EMAIL]: (state) => ({
    ...state,
    loading: true,
    unauthorizated: false,
  }),
  [Types.SET_BARCODE_DATA]: (state, { barcodeData }) => ({
    ...state,
    barcodeData,
  }),
  [Types.SET_PAYMENTS_FROM_CODE]: (state, { paymentsFromCode }) => ({
    ...state,
    paymentsFromCode,
  }),
  [Types.SET_CHANGE_PASSWORD_ERROR]: (state, { pwError }) => ({
    ...state,
    pwError,
  }),
  [Types.SET_CONFIGURA_DATA]: (state, { usersConfigura }) => ({
    ...state,
    usersConfigura,
  }),
  [Types.SET_ACCOUNT_INFO]: (state, { accountInfo }) => ({
    ...state,
    accountInfo,
  }),
  [Types.AUTH_SUCCESS]: (state, { user }) => ({
    ...state,
    user,
    loading: false,
  }),
  [Types.AUTH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }),
  [Types.SET_UNAUTHORIZATION]: ({ skinExtras }) => ({
    ...INITIAL_STATE,
    skinExtras,
  }),
  [Types.LOG_OUT]: ({ skinExtras }) => ({
    ...INITIAL_STATE,
    accountInfo: {},
    skinExtras,
  }),
  [Types.SET_BOLLETINI_BIANCHI]: (state, { bolletiniBianchi }) => ({
    ...state,
    bolletiniBianchi,
  }),
  [Types.SET_BOLLETINI_PREMERCATI]: (state, { bolletiniPremercati }) => ({
    ...state,
    bolletiniPremercati,
  }),
  [Types.SET_SERVICE_ID]: (state, { service_id }) => ({
    ...state,
    service_id,
  }),
  [Types.SET_SERVICE_S]: (state, { service_s }) => ({
    ...state,
    service_s,
  }),
  [Types.SET_PAYMENTS]: (state, { payments }) => ({
    ...state,
    payments,
  }),
  [Types.SET_USERNAMES]: (state, { usernames }) => ({
    ...state,
    usernames,
  }),
  [Types.SET_RECHARGE_MOBILE]: (state, { rechargeMobile }) => ({
    ...state,
    rechargeMobile,
  }),
  [Types.SET_POSTE_PAY]: (state, { postePay }) => ({
    ...state,
    postePay,
  }),
  [Types.SET_SERVICE_TYPE]: (state, { serviceType }) => ({
    ...state,
    serviceType,
  }),
  [Types.SET_ADS]: (state, { ads }) => ({
    ...state,
    ads,
  }),
  [Types.SET_UNAUTHORIZATION]: () => ({ ...INITIAL_STATE }),

  [Types.SET_REGISTER]: (state, { register }) => ({
    ...state,
    register,
  }),
  [Types.CREATE_ADS_RESPONSE]: (
    state,
    { adsCreationgLoading, adsCreationgMess }
  ) => ({
    ...state,
    adsCreationgLoading,
    adsCreationgMess,
  }),
  [Types.SET_DATA_FORM_DETAILS]: (state, { formDetails }) => ({
    ...state,
    formDetails,
  }),
  [Types.SET_TICKET_BY_TICKET_ID]: (state, { TicketByTcketId }) => ({
    ...state,
    TicketByTcketId,
  }),
  [Types.SET_VISURE]: (state, { Visure }) => ({
    ...state,
    Visure,
  }),
  [Types.SET_VISURE_BY_VISURE_ID]: (state, { VisureByVisureId }) => ({
    ...state,
    VisureByVisureId,
  }),
  [Types.OPEN_MODAL_FOR_ADMIN]: (state, { openAdminModal }) => ({
    ...state,
    openAdminModal,
  }),
  [Types.EDIT_MODAL_DETAILS]: (state, { ModalDetails }) => ({
    ...state,
    ModalDetails,
  }),
  [Types.EDIT_STAT_MODAL]: (state, { statModal }) => ({
    ...state,
    statModal,
  }),
  [Types.EDIT_ULT_MODAL]: (state, { ultModal }) => ({
    ...state,
    ultModal,
  }),
  [Types.EDIT_DEP_MODAL]: (state, { depModal }) => ({
    ...state,
    depModal,
  }),
  [Types.EDIT_UTENTI_RESP_MODAL]: (state, { utentiResModal }) => ({
    ...state,
    utentiResModal,
  }),
  [Types.SET_SKINS]: (state, { skinList }) => ({
    ...state,
    skinList,
  }),
  [Types.SET_FATURA_DETAILS]: (state, { faturaDetails }) => ({
    ...state,
    faturaDetails,
  }),
  [Types.SET_ALL_SERVICES]: (state, { allServices }) => ({
    ...state,
    allServices,
  }),
  [Types.SET_SERVICES_LOADING]: (state, { servicesLoader }) => ({
    ...state,
    servicesLoader,
  }),
  [Types.SET_DEPOSITO_POPUP]: (state, { DepositoPopup }) => ({
    ...state,
    DepositoPopup,
  }),
  [Types.SET_ALL_FATURA_BY_SEARCH]: (state, { Fatture }) => ({
    ...state,
    Fatture,
  }),
  [Types.SET_DEPOSITO_MODAL_ADMIN]: (state, { adminDepModal }) => ({
    ...state,
    adminDepModal,
  }),
  [Types.SET_PAYMENTS_FOR_EXCEL]: (state, { paymentsForExcel }) => ({
    ...state,
    paymentsForExcel,
  }),
  [Types.SET_PAYMENTS_EXCEL_LOADING]: (state, { paymentExcelLoading }) => ({
    ...state,
    paymentExcelLoading,
  }),

  [Types.ADD_EDIT_SKIN_DETAILS]: (state, { addEditSkin }) => ({
    ...state,
    addEditSkin,
  }),
  [Types.SET_SKIN_ID]: (state, { newSkinId }) => ({
    ...state,
    newSkinId,
  }),
  [Types.REGISTER_SKIN_SUCC]: (state, { registerSkinS }) => ({
    ...state,
    registerSkin: { ...state.registerSkin, ...registerSkinS },
  }),
  [Types.SET_STATISTICHE]: (state, { Statistiche }) => ({
    ...state,
    Statistiche,
  }),
  [Types.SET_FROM_DATE_TO_DATE]: (state, { fromDate }) => ({
    ...state,
    fromDate,
  }),
  [Types.SET_ADMIN_PANEL_CLASS]: (state, { CenterCls }) => ({
    ...state,
    CenterCls,
  }),
});

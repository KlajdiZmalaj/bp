import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  changeAgent: ["id", "id2"],
  signInByEmail: ["email", "password", "c"],
  authSuccess: ["user"],
  authFailure: ["error"],
  logOut: [],
  getAccountInfo: [],
  setAccountInfo: ["accountInfo"],
  getAgents: [""],
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
  ],
  setBolletiniBianchi: ["bolletiniBianchi"],
  setBolletiniPremercati: ["bolletiniPremercati"],
  setServiceId: ["service_id"],
  setServiceS: ["service_s"],

  getPayments: ["username", "from", "to", "page_number", "limit"],
  setPayments: ["payments"],
  setUsernames: ["usernames"],
  getRechargeMobile: ["service_id", "tel_no"],
  setRechargeMobile: ["rechargeMobile"],

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
  ],
  setPostePay: ["postePay"],

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
  getUserDetail: ["id"],
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
  getDataFormDetailsActives: [""],
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
  ],
  bigliettoPopUp: ["popUpData"],
  setButtonsSupport: ["enableButtons"],
  addTicket: ["ticket"],
  getVisure: [""],
  setVisure: ["Visure"],
  getVisureByVisureId: ["visura_id"],
  setVisureByVisureId: ["VisureByVisureId"],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
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
  accountInfo: {},
  bolletiniBianchi: {},
  bolletiniPremercati: {},
  unauthorizated: true,
  service_id: null,
  payments: [],
  usernames: [],
  service_s: [],
  rechargeMobile: {},
  postePay: {},
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
  formDetailsActives: [],
  VisureByVisureId: {},
};

export const reducer = createReducer(INITIAL_STATE, {
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
  [Types.LOG_OUT]: ({ skinExtras }) => ({ ...INITIAL_STATE, skinExtras }),
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
});

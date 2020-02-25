import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  signInByEmail: ["email", "password"],
  authSuccess: ["user"],
  authFailure: ["error"],
  logOut: [],
  getAccountInfo: [],
  setAccountInfo: ["accountInfo"],

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
    "provincia"
  ],
  setBolletiniBianchi: ["bolletiniBianchi"],
  setServiceId: ["service_id"],
  setServiceS: ["service_s"],

  getPayments: ["username", "from", "to"],
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
    "imageUrl2"
  ],
  setPostePay: ["postePay"],

  setServiceType: ["serviceType"],

  getAds: [],
  setAds: ["ads"],
  createAds: ["data"],

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
    "backImg"
  ],
  setRegister: ["register"],
  setAds: ["ads"],
  createAds: ["data"],
  createAdsResponse: ["adsCreationgLoading", "adsCreationgMess"],
  getChangedPassword: ["oldPassword", "newPassword"],
  setChangePasswordError: ["pwError"],
  getConfigura: ["id"],
  getCodiceTicket: ["barcode"],
  setPaymentsFromCode: ["paymentsFromCode"],
  setConfiguraData: ["usersConfigura"]
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  pwError: "",
  user: null,
  loading: false,
  error: null,
  accountInfo: {},
  bolletiniBianchi: {},
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
  usersConfigura: {}
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_BY_EMAIL]: state => ({
    ...state,
    loading: true,
    unauthorizated: false
  }),
  [Types.SET_PAYMENTS_FROM_CODE]: (state, { paymentsFromCode }) => ({
    ...state,
    paymentsFromCode
  }),
  [Types.SET_CHANGE_PASSWORD_ERROR]: (state, { pwError }) => ({
    ...state,
    pwError
  }),
  [Types.SET_CONFIGURA_DATA]: (state, { usersConfigura }) => ({
    ...state,
    usersConfigura
  }),
  [Types.SET_ACCOUNT_INFO]: (state, { accountInfo }) => ({
    ...state,
    accountInfo
  }),
  [Types.AUTH_SUCCESS]: (state, { user }) => ({
    ...state,
    user,
    loading: false
  }),
  [Types.AUTH_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    loading: false
  }),
  [Types.SET_UNAUTHORIZATION]: () => ({ ...INITIAL_STATE }),
  [Types.LOG_OUT]: () => ({ ...INITIAL_STATE }),
  [Types.SET_BOLLETINI_BIANCHI]: (state, { bolletiniBianchi }) => ({
    ...state,
    bolletiniBianchi
  }),
  [Types.SET_SERVICE_ID]: (state, { service_id }) => ({
    ...state,
    service_id
  }),
  [Types.SET_SERVICE_S]: (state, { service_s }) => ({
    ...state,
    service_s
  }),
  [Types.SET_PAYMENTS]: (state, { payments }) => ({
    ...state,
    payments
  }),
  [Types.SET_USERNAMES]: (state, { usernames }) => ({
    ...state,
    usernames
  }),
  [Types.SET_RECHARGE_MOBILE]: (state, { rechargeMobile }) => ({
    ...state,
    rechargeMobile
  }),
  [Types.SET_POSTE_PAY]: (state, { postePay }) => ({
    ...state,
    postePay
  }),
  [Types.SET_SERVICE_TYPE]: (state, { serviceType }) => ({
    ...state,
    serviceType
  }),
  [Types.SET_ADS]: (state, { ads }) => ({
    ...state,
    ads
  }),
  [Types.SET_UNAUTHORIZATION]: () => ({ ...INITIAL_STATE }),

  [Types.SET_REGISTER]: (state, { register }) => ({
    ...state,
    register
  }),
  [Types.CREATE_ADS_RESPONSE]: (
    state,
    { adsCreationgLoading, adsCreationgMess }
  ) => ({
    ...state,
    adsCreationgLoading,
    adsCreationgMess
  })
});

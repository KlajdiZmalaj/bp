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
  setServiceType: ["serviceType"],

  getAds: [],
  setAds: ['ads'],
  createAds: ['data'],
  
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
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
  ads: []
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_BY_EMAIL]: state => ({ ...state, loading: true }),
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
  [Types.SET_SERVICE_TYPE]: (state, { serviceType }) => ({
    ...state,
    serviceType
  }),
  [Types.SET_ADS]: (state, {ads})=> ({
    ...state,
    ads
  }),
  [Types.SET_UNAUTHORIZATION]: () => ({ ...INITIAL_STATE }),
});

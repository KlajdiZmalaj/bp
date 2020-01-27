import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  signInByEmail: ["email", "password"],
  authSuccess: ["user"],
  authFailure: ["error"],
  logOut: [],
  getAccountInfo: [],
  setAccountInfo: ["accountInfo"],
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
  getRechargeMobile: ["service_id", "tel_no"],
  setRechargeMobile: ["rechargeMobile"],
  setServiceType: ["serviceType"]
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
  accountInfo: {},
  bolletiniBianchi: {},
  service_id: null,
  payments: [],
  service_s: [],
  rechargeMobile: {}
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
  [Types.SET_RECHARGE_MOBILE]: (state, { rechargeMobile }) => ({
    ...state,
    rechargeMobile
  }),
  [Types.SET_SERVICE_TYPE]: (state, { serviceType }) => ({
    ...state,
    serviceType
  })
});

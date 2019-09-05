import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  signInByEmail: ["email", "password"],
  authSuccess: ["user"],
  authFailure: ["error"]
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_BY_EMAIL]: state => ({ ...state, loading: true })
});

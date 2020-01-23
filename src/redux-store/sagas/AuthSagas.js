import { put, call } from "redux-saga/effects";
import AuthActions from "../models/auth";
import { fetchLogin, logoutApi, fetchAccountInfo } from "services/auth";

export function* signInByEmail(credencials) {
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  if (response) {
    if (response.data) {
      localStorage.setItem("accountData", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
  }
}

export function* getAccountInfo() {}

export function* logOut() {
  // console.log("logoutttttttt");
  const response = yield call(logoutApi);
  console.log("response", response);
  // localStorage.setItem("accountData", null);
  // yield put(AuthActions.setAccountInfo({}));
}

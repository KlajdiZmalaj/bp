import { put, call } from "redux-saga/effects";

import AuthActions from "../models/auth";

import { fetchLogin,fetchAccountInfo } from "services/auth";



export function* signInByEmail(credencials) {
  // yield put(AuthActions.authSuccess({ name: "Hello" }));
  const response = yield call(
    fetchLogin,
    credencials.email,
    credencials.password
  );
  if (response) {
    console.log("response", response);
    if (response.data) {
      localStorage.setItem("accountData", JSON.stringify(response.data));
      yield put(AuthActions.setAccountInfo(response.data));
    }
  }
}


export function* getAccountInfo() {

}

export function* logOut() {
  // const response = yield call(logoutApi);
  // console.log("response", response);
  // localStorage.setItem("accountData", null);
  // yield put(AuthActions.setAccountInfo({}));
}
import { put, call } from "redux-saga/effects";

import AuthActions from "../models/auth";

import { fetchLogin } from "services/auth";

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
      yield put(AuthActions.AccountInfo(response.data));
    }
  }
}

export function* AccountInfo() {
  const response = yield call(fetchAccountInfo);

  const accountData = localStorage.getItem("accountData");
  const data = JSON.parse(accountData);
  const updatedData = {
    ...data,
    account: response.data.account,
    customer: response.data.customer
  };

  localStorage.setItem("accountData", JSON.stringify(updatedData));
  yield put(AuthActions.AccountInfo(updatedData));
}

import { put } from "redux-saga/effects";

import AuthActions from "../models/auth";

export function* signInByEmail(credencials) {
  yield put(AuthActions.authSuccess({ name: "Hello" }));
}

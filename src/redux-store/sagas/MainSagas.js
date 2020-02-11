import { put, call } from "redux-saga/effects";
import MainActions from "../models/main";
import AuthActions from "../models/auth";

import { fetchServices } from "services/main";

import { logoutApi } from "services/auth";

export function* getServices() {
  const response = yield call(fetchServices);
  if (response.data) {
    yield put(MainActions.setServices(response.data.all_services));
  } else if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}

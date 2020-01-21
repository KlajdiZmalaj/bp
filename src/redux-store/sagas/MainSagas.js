import { put, call } from "redux-saga/effects";
import MainActions from "../models/main";

import { fetchServices } from "services/main";

export function* getServices() {
  const response = yield call(fetchServices);
  yield put(MainActions.setServices(response.data));
}

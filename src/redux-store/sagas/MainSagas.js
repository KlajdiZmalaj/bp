import { put, call } from "redux-saga/effects";
import MainActions from "../models/main";
import AuthActions from "../models/auth";

import { fetchServices } from "services/main";

export function* getServices() {
  const response = yield call(fetchServices);
  if (response.status === 200) {
    yield put(MainActions.setServices(response.data.all_services));
  }else if(response.error){
    if(response.error.response.status === 401){
      yield put(AuthActions.setUnauthorization())
    }else{
      yield put(AuthActions.setServices(response.error.response.data));
    }
  }
}

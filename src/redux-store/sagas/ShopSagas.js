import { put, call } from "redux-saga/effects";
import ShopActions from "../models/shop";
import * as ShopRequest from "services/shop";

export function* getProductsList() {
  const response = yield call(ShopRequest.fetchProducts);
  if (response.data) {
    yield put(ShopActions.setProductsList(response.data));
  }
}

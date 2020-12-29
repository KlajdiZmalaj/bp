import { put, call } from "redux-saga/effects";
import ShopActions from "../models/shop";
import * as ShopRequest from "services/shop";

export function* checkOut({ formData, resetFields }) {
  console.log("formData", formData);
  //const response = yield call(req , formData);
  // if(response) {
  //   resetFields?.()
  // }
}

export function* getProductsList(params) {
  const response = yield call(
    ShopRequest.fetchProducts,
    params.page,
    params.brand,
    params.category,
    params.subCategory,
    params.order,
    params.slider,
    params.search,
    params.subCategoryI
  );
  if (response.data) {
    yield put(ShopActions.setProductsList(response.data));
  }
}

export function* getProductDetails(params) {
  if (params.Product_id && params.prd_supp) {
    const response = yield call(
      ShopRequest.fetchProductD,
      params.Product_id,
      params.prd_supp
    );
    if (response.data) {
      yield put(ShopActions.setProductDetails(response.data.data));
    }
  }
}

export function* getBrands() {
  const response = yield call(ShopRequest.fetchBrands);
  if (response.data) {
    yield put(ShopActions.setBrands(response.data.data));
  }
}

export function* getCategories() {
  const response = yield call(ShopRequest.fetchCategories);
  if (response.data) {
    yield put(ShopActions.setCategories(response.data.data));
  }
}

import { put, call, delay } from "redux-saga/effects";
import ShopActions from "../models/shop";
import * as ShopRequest from "services/shop";
import { get } from "lodash";
import { notification } from "antd";

export function* checkOut({ formData, resetFields }) {
  console.log("formData", formData);
  // yield setTimeout(() => {}, 1000);

  const response = yield call(
    ShopRequest.fetchOrder,
    formData.cap,
    formData.citty,
    formData.email,
    formData.fiscal_code,
    formData.indirizzo_diff,
    formData.last_name,
    formData.name,
    formData.nome_societa,
    formData.paese,
    formData.payment,
    formData.paymentBtnLabel,
    formData.province,
    formData.punto_vendia,
    formData.tel,
    formData.terms,
    formData.via_nr
  );
  if (response.data) {
    // yield put(ShopActions.setProductsList(response.data));
  }

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

export function* getToCart(params) {
  const response = yield call(
    ShopRequest.fetchToCart,
    params.prd_supp,
    params.Product_id,
    params.list,
    params.quantity
  );
  if (response.data) {
    yield put(ShopActions.setToCart("aggiunto"));
    yield call(getItemsCart, false);
    notification["success"]({
      message: response?.data?.message,
    });
    yield delay(4000);
    yield put(ShopActions.setToCart(""));
  }
}

export function* getItemsCart(params) {
  const response = yield call(ShopRequest.fetchItemsCart, params.checkout);
  if (response.data) {
    yield put(ShopActions.setItemsCart(response.data.data));
    let carriers = get(response.data.data, "carriers", []);
    yield put(ShopActions.setItemsCart(response.data.data));
    yield put(ShopActions.setCarries(carriers));
  }
}

export function* getOrder(params) {
  const response = yield call(
    ShopRequest.fetchOrder,
    params.products_array,
    params.iso_code,
    params.postcode,
    params.carrier,
    params.first_name,
    params.last_name,
    params.city,
    params.address,
    params.phone,
    params.email
  );
  if (response.data) {
    yield put(ShopActions.setOrder(response.data.data));
  }
}

export function* getRemoveToCart(params) {
  const response = yield call(
    ShopRequest.fetchRemoveToCart,
    params.prd_supp,
    params.Product_id,
    params.quantity,
    params.list
  );
  if (response.data) {
    yield put(ShopActions.setRemoveToCart(response.data.data));
    yield call(getItemsCart, false);
    notification["success"]({
      message: response?.data?.message,
    });
  }
}

export function* getCarries(params) {
  const response = yield call(
    ShopRequest.fetchCarries,
    params.iso_code,
    params.postcode
  );
  if (response.data) {
    yield put(ShopActions.setCarries(response.data.data));
    notification["success"]({
      message: response?.data?.message,
    });
  }
}

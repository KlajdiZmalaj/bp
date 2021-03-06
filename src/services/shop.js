import { skin, endpoint, handleError } from "config/api";
import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: endpoint,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    var Auth = true;
    const value = await localStorage.getItem("accountDataB");
    const keys = JSON.parse(value);
    config.headers = {
      ...(Auth ? { Authorization: `Bearer ${keys?.token}` } : {}),
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => handleError(error)
);

export const fetchProductsByTag = (tag) => {
  return instanceAxios
    .get(`/shop/productsByTag`, {
      params: {
        ...skin,
        ...(tag ? { tag } : {}),
        // page_number: 3,
      },
    })
    .catch((error) => ({ error }));
};

export const fetchProducts = (
  page_number,
  brand,
  category,
  subCategory,
  order,
  slider,
  search,
  subCategoryI,
  tag
) =>
  instanceAxios
    .get(`/shop/products`, {
      params: {
        ...skin,
        ...(page_number ? { page_number } : {}),
        ...(brand ? { Product_Manufacturer: brand.toString() } : {}),
        ...(category ? { Product_MainCategory: category } : {}),
        ...(subCategory ? { Product_Category: subCategory } : {}),
        ...(order ? { sort_price: order } : {}),
        ...(slider ? { min_price: slider[0] } : {}),
        ...(slider ? { max_price: slider[1] } : {}),
        ...(search ? { Product_Name: search } : {}),
        ...(subCategoryI ? { Product_SubCategory: subCategoryI } : {}),
        ...(tag ? { tag: tag } : {}),

        // page_number: 3,
      },
    })
    .catch((error) => ({ error }));
//
export const fetchProductD = (Product_id, prd_supp) =>
  instanceAxios
    .post(`/shop/getProduct`, {
      ...skin,
      ...(Product_id ? { Product_id } : {}),
      ...(prd_supp ? { prd_supp } : {}),
    })
    .catch((error) => ({ error }));

export const fetchBrands = () =>
  instanceAxios
    .get(`/shop/brands`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchDefaultProducts = () =>
  instanceAxios
    .get(`/shop/homeProducts`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchCategories = () =>
  instanceAxios
    .get(`/shop/categories`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchToCart = (prd_supp, Product_id, list, quantity) =>
  instanceAxios
    .post(`/shop/addToList`, {
      ...skin,
      ...(prd_supp ? { prd_supp } : {}),
      ...(Product_id ? { Product_id } : {}),
      ...(list ? { list } : {}),
      ...(quantity ? { quantity } : {}),
    })
    .catch((error) => ({ error }));

export const fetchItemsCart = (checkout) =>
  instanceAxios
    .get(`/shop/lists`, {
      params: {
        ...skin,
        ...(checkout ? { checkout } : {}),
      },
    })
    .catch((error) => ({ error }));

export const fetchOrder = (
  cap,
  carrier,
  name,
  last_name,
  citty,
  via_nr,
  tel,
  email,
  comment,
  carrier_cost
) =>
  instanceAxios
    .post("/shop/submitOrder", {
      ...skin,
      iso_code: "it",
      postcode: cap,
      first_name: name,
      last_name: last_name,
      city: citty,
      address: via_nr,
      phone: tel,
      email: email,
      carrier: carrier,
      comment: comment,
      carrier_cost: carrier_cost,
    })
    .catch((error) => ({ error }));

export const fetchRemoveToCart = (prd_supp, Product_id, quantity, list) =>
  instanceAxios
    .post(`/shop/removeFromList`, {
      ...skin,
      ...(prd_supp ? { prd_supp } : {}),
      ...(Product_id ? { Product_id } : {}),
      ...(quantity ? { quantity } : {}),
      ...(list ? { list } : {}),
    })
    .catch((error) => ({ error }));

export const fetchCarries = (iso_code, postcode) =>
  instanceAxios
    .post(`/shop/getCarriers`, {
      ...skin,
      ...(iso_code ? { iso_code } : {}),
      ...(postcode ? { postcode } : {}),
    })
    .catch((error) => ({ error }));

export const fetchProdCat = (category, subCategory) =>
  instanceAxios
    .get(`/shop/products`, {
      params: {
        ...skin,
        ...(category ? { Product_MainCategory: category } : {}),
        ...(subCategory ? { Product_Category: subCategory } : {}),
      },
    })
    .catch((error) => ({ error }));

export const fetchOrders = (skinId) =>
  instanceAxios
    .get(`/shop/orders`, {
      params: {
        ...(skinId ? { skin_id: skinId } : skin),
      },
    })
    .catch((error) => ({ error }));

export const fetchOrderData = (order_id) =>
  instanceAxios
    .get(`/shop/orderData`, {
      params: {
        ...skin,
        ...(order_id ? { order_id: order_id } : {}),
      },
    })
    .catch((error) => ({ error }));

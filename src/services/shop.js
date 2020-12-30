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

export const fetchProducts = (
  page_number,
  brand,
  category,
  subCategory,
  order,
  slider,
  search,
  subCategoryI
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

export const fetchItemsCart = () =>
  instanceAxios
    .get(`/shop/lists`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

export const fetchOrder = (
  products_array,
  iso_code,
  postcode,
  carrier,
  first_name,
  last_name,
  city,
  address,
  phone,
  email
) =>
  instanceAxios
    .post(`/shop/submitOrder`, {
      ...skin,
      ...(products_array ? { products_array } : {}),
      ...(iso_code ? { iso_code } : {}),
      ...(postcode ? { postcode } : {}),
      ...(carrier ? { carrier } : {}),
      ...(first_name ? { first_name } : {}),
      ...(last_name ? { last_name } : {}),
      ...(city ? { city } : {}),
      ...(address ? { address } : {}),
      ...(phone ? { phone } : {}),
      ...(email ? { email } : {}),
    })
    .catch((error) => ({ error }));

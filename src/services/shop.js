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

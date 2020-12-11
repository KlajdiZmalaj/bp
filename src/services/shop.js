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

export const fetchProducts = (page_number, brand) =>
  instanceAxios
    .get(`/shop/products`, {
      params: {
        ...skin,
        ...(page_number ? { page_number } : {}),
        ...(brand ? { Product_Manufacturer: brand.toString() } : {}),
        // page_number: 3,
      },
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

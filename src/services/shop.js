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

export const fetchProducts = () =>
  instanceAxios
    .get(`/shop/products`, {
      params: {
        ...skin,
      },
    })
    .catch((error) => ({ error }));

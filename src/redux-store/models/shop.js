import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getProductsList: ["page", "brand"],
  setProductsList: ["productsList"],
  getBrands: [],
  setBrands: ["brands"],
});

export const ShopTypes = Types;
export default Creators;

const INITIAL_STATE = {
  productsList: {},
  brands: {},
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_PRODUCTS_LIST: (state, { productsList }) => ({
    ...state,
    productsList,
  }),
  SET_BRANDS: (state, { brands }) => ({
    ...state,
    brands,
  }),
});

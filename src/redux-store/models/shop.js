import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getProductsList: ["page", "brand"],
  setProductsList: ["productsList"],
  getBrands: [],
  setBrands: ["brands"],
  setManufacturer: ["isSelectedManufacturer"],
});

export const ShopTypes = Types;
export default Creators;

const INITIAL_STATE = {
  productsList: {},
  brands: {},
  isSelectedManufacturer: null,
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
  SET_MANUFACTURER: (state, { isSelectedManufacturer }) => ({
    ...state,
    isSelectedManufacturer,
  }),
});

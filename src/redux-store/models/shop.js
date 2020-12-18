import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getProductsList: ["page", "brand", "category"],
  setProductsList: ["productsList"],
  getProductDetails: ["Product_id", "prd_supp"],
  setProductDetails: ["productD"],
  getBrands: [],
  setBrands: ["brands"],
  getCategories: [],
  setCategories: ["categories"],
  setManufacturer: ["isSelectedManufacturer"],
  setCategory: ["isSelectedCategory"],
});

export const ShopTypes = Types;
export default Creators;

const INITIAL_STATE = {
  productsList: {},
  productD: {},
  brands: {},
  categories: {},
  isSelectedManufacturer: null,
  isSelectedCategory: null,
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_PRODUCTS_LIST: (state, { productsList }) => ({
    ...state,
    productsList,
  }),
  SET_PRODUCT_DETAILS: (state, { productD }) => ({
    ...state,
    productD,
  }),
  SET_BRANDS: (state, { brands }) => ({
    ...state,
    brands,
  }),
  SET_CATEGORIES: (state, { categories }) => ({
    ...state,
    categories,
  }),
  SET_MANUFACTURER: (state, { isSelectedManufacturer }) => ({
    ...state,
    isSelectedManufacturer,
  }),
  SET_CATEGORY: (state, { isSelectedCategory }) => ({
    ...state,
    isSelectedCategory,
  }),
});

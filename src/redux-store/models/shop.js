import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getProductsList: [
    "page",
    "brand",
    "category",
    "subCategory",
    "order",
    "slider",
    "search",
    "subCategoryI",
  ],
  setProductsList: ["productsList"],
  getProductDetails: ["Product_id", "prd_supp"],
  setProductDetails: ["productD"],
  getBrands: [],
  setBrands: ["brands"],
  getCategories: [],
  setCategories: ["categories"],
  setManufacturer: ["isSelectedManufacturer"],
  setCategory: ["isSelectedCategory"],
  setSubCategory: ["isSelectedSubCategory"],
  setOrderVal: ["orderVal"],
  setSliderVal: ["sliderVal"],
  setCart: ["cartItems"],
  checkOut: ["formData", "resetFields"],

  getToCart: ["prd_supp", "Product_id", "list", "quantity"],
  setToCart: ["productCart"],
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
  isSelectedSubCategory: null,
  orderVal: "",
  sliderVal: [],
  cartItems:
    JSON.parse(localStorage.getItem("shopProducts")) !== null
      ? JSON.parse(localStorage.getItem("shopProducts"))
      : [],
  productCart: {},
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
  SET_SUB_CATEGORY: (state, { isSelectedSubCategory }) => ({
    ...state,
    isSelectedSubCategory,
  }),
  SET_ORDER_VAL: (state, { orderVal }) => ({
    ...state,
    orderVal,
  }),
  SET_SLIDER_VAL: (state, { sliderVal }) => ({
    ...state,
    sliderVal,
  }),
  SET_CART: (state, { cartItems }) => ({
    ...state,
    cartItems,
  }),

  SET_TO_CART: (state, { productCart }) => ({
    ...state,
    productCart,
  }),
});

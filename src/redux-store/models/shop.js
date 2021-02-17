import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  setShopTags: ["shopTags"],
  getProductsByTag: ["tag"],
  getProductsList: [
    "page",
    "brand",
    "category",
    "subCategory",
    "order",
    "slider",
    "search",
    "subCategoryI",
    "tag",
  ],
  setProductsList: ["productsList"],
  getProductDetails: ["Product_id", "prd_supp"],
  setProductDetails: ["productD"],
  getBrands: [],
  setBrands: ["brands"],
  getDefaultProducts: [],
  setDefaultProducts: ["defaultProducts"],
  getCategories: [],
  setCategories: ["categories"],
  setManufacturer: ["isSelectedManufacturer"],
  setCategory: ["isSelectedCategory"],
  setSubCategory: ["isSelectedSubCategory"],
  setSubSubCategory: ["isSelectedSubSubCategory"],
  setOrderVal: ["orderVal"],
  setSliderVal: ["sliderVal"],
  checkOut: ["formData", "resetFields"],
  setOrderDetails: ["orderD"],

  getToCart: ["prd_supp", "Product_id", "list", "quantity", "from"],
  setToCart: ["productCart"],

  getItemsCart: ["checkout"],
  setItemsCart: ["itemsCart"],

  getOrder: [
    "products_array",
    "iso_code",
    "postcode",
    "carrier",
    "first_name",
    "last_name",
    "city",
    "address",
    "phone",
    "email",
  ],
  setOrder: ["orders"],

  getRemoveToCart: ["prd_supp", "Product_id", "quantity", "list"],
  setRemoveToCart: ["productRemovedCart"],

  getCarries: ["iso_code", "postcode"],
  setCarries: ["carries"],
  getProdCat: ["category", "subCategory"],
  setProdCat: ["prodCat"],
  openProducts: ["areOpenProducts"],
  setShopLeftMenuMob: ["shopLeftMenuMob"],
  showLoader: ["hasLoader"],
});

export const ShopTypes = Types;
export default Creators;

const INITIAL_STATE = {
  shopTags: {},
  productsList: {},
  productD: {},
  brands: {},
  defaultProducts: {},
  categories: {},
  isSelectedManufacturer: null,
  isSelectedCategory: null,
  isSelectedSubCategory: null,
  isSelectedSubSubCategory: null,
  orderVal: "",
  sliderVal: [],
  productCart: "",
  itemsCart: {},
  orders: {},
  productRemovedCart: {},
  carries: [],
  prodCat: {},
  areOpenProducts: false,
  shopLeftMenuMob: false,
  hasLoader: false,
  orderD: {},
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_SHOP_TAGS: (state, { shopTags }) => ({
    ...state,
    shopTags,
  }),
  SET_SHOP_LEFT_MENU_MOB: (state, { shopLeftMenuMob }) => ({
    ...state,
    shopLeftMenuMob,
  }),
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
  SET_DEFAULT_PRODUCTS: (state, { defaultProducts }) => ({
    ...state,
    defaultProducts,
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
    sliderVal: [],
  }),
  SET_SUB_CATEGORY: (state, { isSelectedSubCategory }) => ({
    ...state,
    isSelectedSubCategory,
    sliderVal: [],
  }),
  SET_SUB_SUB_CATEGORY: (state, { isSelectedSubSubCategory }) => ({
    ...state,
    isSelectedSubSubCategory,
    sliderVal: [],
  }),
  SET_ORDER_VAL: (state, { orderVal }) => ({
    ...state,
    orderVal,
  }),
  SET_SLIDER_VAL: (state, { sliderVal }) => ({
    ...state,
    sliderVal,
  }),

  SET_TO_CART: (state, { productCart }) => ({
    ...state,
    productCart,
  }),
  SET_ITEMS_CART: (state, { itemsCart }) => ({
    ...state,
    itemsCart,
  }),
  SET_ORDER: (state, { orders }) => ({
    ...state,
    orders,
  }),
  SET_REMOVE_TO_CART: (state, { productRemovedCart }) => ({
    ...state,
    productRemovedCart,
  }),
  SET_CARRIES: (state, { carries }) => ({
    ...state,
    carries,
  }),
  SET_PROD_CAT: (state, { prodCat }) => ({
    ...state,
    prodCat,
  }),
  OPEN_PRODUCTS: (state, { areOpenProducts }) => ({
    ...state,
    areOpenProducts,
  }),
  SHOW_LOADER: (state, { hasLoader }) => ({
    ...state,
    hasLoader,
  }),
  SET_ORDER_DETAILS: (state, { orderD }) => ({
    ...state,
    orderD,
  }),
});

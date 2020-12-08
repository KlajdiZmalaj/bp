import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getProductsList: [],
  setProductsList: ["productsList"],
});

export const ShopTypes = Types;
export default Creators;

const INITIAL_STATE = {
  productsList: {},
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_PRODUCTS_LIST: (state, { productsList }) => ({
    ...state,
    productsList,
  }),
});

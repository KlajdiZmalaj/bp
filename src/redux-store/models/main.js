import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"]
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
  showOverview: true,
  isShowing: false,
  activeAccount: "Profile"
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_OVERVIEW]: (state, { showOverview }) => ({
    ...state,
    showOverview
  }),
  [Types.SET_ACCOUNT]: (state, { activeAccount }) => ({
    ...state,
    activeAccount
  }),
  [Types.TOGGLE_POP_UP]: (state, { isShowing }) => ({
    ...state,
    isShowing
  })
});

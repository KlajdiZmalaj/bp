import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  setAccount: ["activeAccount"]
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
  showOverview: true,
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
  [Types.SET_SERVICES]: (state, { services }) => ({
    ...state,
    services
  })
});

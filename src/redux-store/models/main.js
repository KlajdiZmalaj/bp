import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"],
  setUsers: ["userList"],
  getUsers: []
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
  showOverview: true,
  isShowing: false,
  activeAccount: 1,
  userList: []
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
  }),
  [Types.SET_USERS]: (state, { userList }) => ({
    ...state,
    userList
  }),
  [Types.TOGGLE_POP_UP]: (state, { isShowing }) => ({
    ...state,
    isShowing
  })
});

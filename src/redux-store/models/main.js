import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"],
  setUsers: ["userList"],
  getUsers: [],
  getOverviewDashboard: ["period"],
  setOverviewDashboard: ["dashboardData"],
  setNavbarSearch: ["navbarSearch"]
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  services: {},
  showOverview: true,
  isShowing: false,
  activeAccount: 2,
  userList: [],
  dashboardData: {},
  navbarSearch: ""
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NAVBAR_SEARCH]: (state, { navbarSearch }) => ({
    ...state,
    navbarSearch
  }),
  [Types.SET_OVERVIEW_DASHBOARD]: (state, { dashboardData }) => ({
    ...state,
    dashboardData
  }),
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

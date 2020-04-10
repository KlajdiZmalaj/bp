import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"],
  setUsers: ["userList"],
  setUsersSimple: ["userListSimple"],
  getUsers: ["search_user"],
  getUsersSimple: [],
  getUsersBySearch: ["search_user"],
  setUsersBySearch: ["userListBySearch"],
  getOverviewDashboard: ["period"],
  setOverviewDashboard: ["dashboardData"],
  setNavbarSearch: ["navbarSearch"],
  setScreenW: ["screenWidth"],
  setFavorites: ["favorites"],
  getFavorites: [],
  toggleFavorite: ["id", "sType"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  favorites: [],
  services: {},
  showOverview: true,
  isShowing: false,
  activeAccount: 2,
  userList: [],
  userListSimple: [],
  userListBySearch: [],
  dashboardData: {},
  navbarSearch: "",
  screenWidth: window.innerWidth,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FAVORITES]: (state, { favorites }) => ({
    ...state,
    favorites,
  }),
  [Types.SET_NAVBAR_SEARCH]: (state, { navbarSearch }) => ({
    ...state,
    navbarSearch,
  }),
  [Types.SET_SCREEN_W]: (state, { screenWidth }) => ({
    ...state,
    screenWidth,
  }),
  [Types.SET_OVERVIEW_DASHBOARD]: (state, { dashboardData }) => ({
    ...state,
    dashboardData,
  }),
  [Types.TOGGLE_OVERVIEW]: (state, { showOverview }) => ({
    ...state,
    showOverview,
  }),
  [Types.SET_ACCOUNT]: (state, { activeAccount }) => ({
    ...state,
    activeAccount,
  }),
  [Types.SET_SERVICES]: (state, { services }) => ({
    ...state,
    services,
  }),
  [Types.SET_USERS]: (state, { userList }) => ({
    ...state,
    userList,
  }),
  [Types.SET_USERS_SIMPLE]: (state, { userListSimple }) => ({
    ...state,
    userListSimple,
  }),
  [Types.SET_USERS_BY_SEARCH]: (state, { userListBySearch }) => ({
    ...state,
    userListBySearch,
  }),
  [Types.TOGGLE_POP_UP]: (state, { isShowing }) => ({
    ...state,
    isShowing,
  }),
});

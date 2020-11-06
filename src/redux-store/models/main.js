import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"],
  setUsers: ["userList"],
  setUsersSimple: ["userListSimple"],
  getUsers: ["search_user", "skin_id", "limit", "page_number"],
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
  setActiveSkinId: ["activeSkinId"],
  setLoaderForAdminUtenti: ["LoaderAU"],
  getUserPhotos: ["id"],
  setUserPhotos: ["userPhotos"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  userPhotos: {},
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
  activeSkinId: -1,
  screenWidth: window.innerWidth,
  LoaderAU: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_PHOTOS]: (state, { userPhotos }) => ({
    ...state,
    userPhotos,
  }),
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
  [Types.SET_ACTIVE_SKIN_ID]: (state, { activeSkinId }) => ({
    ...state,
    activeSkinId,
  }),
  [Types.SET_LOADER_FOR_ADMIN_UTENTI]: (state, { LoaderAU }) => ({
    ...state,
    LoaderAU,
  }),
});

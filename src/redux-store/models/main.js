import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  getServices: [],
  setServices: ["services"],
  toggleOverview: ["showOverview"],
  togglePopUp: ["isShowing"],
  setAccount: ["activeAccount"],
  setUsers: ["userList"],
  setUsersSimple: ["userListSimple"],
  getUsers: ["search_user", "skin_id", "limit", "page_number", "LOAD_FALSE"],
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
  setPhotoLoading: ["photoLoading"],
  setUserPhotos: ["userPhotos"],
  getSearchedUsers: ["search_user"],
  sendPrenotazione: ["objectData", "resetState"],
  forgotPassword: ["email"],
  setAdminMessagesModal: ["adminMessagesModal"],
  getRegisterToken: ["agency_id", "callBack"],
});

export const MainTypes = Types;
export default Creators;

const INITIAL_STATE = {
  photoLoading: false,
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
  adminMessagesModal: false,
};

export const reducer = createReducer(INITIAL_STATE, {
  SET_ADMIN_MESSAGES_MODAL: (state) => ({
    ...state,
    adminMessagesModal: !state.adminMessagesModal,
  }),
  SET_PHOTO_LOADING: (state, payload) => {
    return {
      ...state,
      photoLoading: payload.photoLoading,
    };
  },
  SET_USER_PHOTOS: (state, { userPhotos }) => ({
    ...state,
    userPhotos,
  }),
  SET_FAVORITES: (state, { favorites }) => ({
    ...state,
    favorites,
  }),
  SET_NAVBAR_SEARCH: (state, { navbarSearch }) => ({
    ...state,
    navbarSearch,
  }),
  SET_SCREEN_W: (state, { screenWidth }) => ({
    ...state,
    screenWidth,
  }),
  SET_OVERVIEW_DASHBOARD: (state, { dashboardData }) => ({
    ...state,
    dashboardData,
  }),
  TOGGLE_OVERVIEW: (state, { showOverview }) => ({
    ...state,
    showOverview,
  }),
  SET_ACCOUNT: (state, { activeAccount }) => ({
    ...state,
    activeAccount,
  }),
  SET_SERVICES: (state, { services }) => ({
    ...state,
    services,
  }),
  SET_USERS: (state, { userList }) => ({
    ...state,
    userList,
  }),
  SET_USERS_SIMPLE: (state, { userListSimple }) => ({
    ...state,
    userListSimple,
  }),
  SET_USERS_BY_SEARCH: (state, { userListBySearch }) => ({
    ...state,
    userListBySearch,
  }),
  TOGGLE_POP_UP: (state, { isShowing }) => ({
    ...state,
    isShowing,
  }),
  SET_ACTIVE_SKIN_ID: (state, { activeSkinId }) => ({
    ...state,
    activeSkinId,
  }),
  SET_LOADER_FOR_ADMIN_UTENTI: (state, { LoaderAU }) => ({
    ...state,
    LoaderAU,
  }),
});

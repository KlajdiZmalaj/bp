import { put, call } from "redux-saga/effects";
import MainActions from "../models/main";
import AuthActions from "../models/auth";

import {
  fetchUsers,
  fetchUsersSimple,
  fetchUsersBySearch,
  updatateOverviewWidget,
  setOnFav,
  fetchFavorites,
  fetchServices,
  fetchphotos,
} from "services/main";

import { logoutApi } from "services/auth";

export function* getServices() {
  // console.log("funx callllled");
  const response = yield call(fetchServices);

  if (response.data) {
    yield put(MainActions.setServices(response.data.all_services));
  } else if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* getFavorites() {
  const response = yield call(fetchFavorites);
  if (response.data) {
    yield put(MainActions.setFavorites(response.data.favorites));
  } else if (response.error) {
    if (response.error.response.status === 401) {
      const response = yield call(logoutApi);
      if (response) {
        localStorage.setItem("accountDataB", null);
        yield put(AuthActions.setAccountInfo({}));
      }
    }
  }
}
export function* toggleFavorite(params) {
  const response = yield call(setOnFav, params.id, params.sType);
  // console.log("responseeee", response);
  if (response.status === 200) {
    const response = yield call(fetchFavorites);
    if (response.data) {
      yield put(MainActions.setFavorites(response.data.favorites));
    }
  }
}
export function* getUsers(params) {
  yield put(MainActions.setLoaderForAdminUtenti(true));
  const response = yield call(
    fetchUsers,
    params.search_user,
    params.skin_id,
    params.backoffice,
    params.limit,
    params.page_number
  );
  if (response && response.data) {
    yield put(
      MainActions.setUsers({
        users: response.data.users,
        total_pages: response.data.total_pages,
      })
    );
    yield put(MainActions.setLoaderForAdminUtenti(false));
  } else {
    yield put(MainActions.setLoaderForAdminUtenti(false));
  }
}
export function* getUsersSimple() {
  const response = yield call(fetchUsersSimple);
  // console.log("getUsers called", response);
  if (response.data) {
    yield put(MainActions.setUsersSimple(response.data.users));
  }
}
export function* getUsersBySearch(params) {
  const response = yield call(fetchUsersBySearch, params.search_user);
  if (response.data) {
    yield put(MainActions.setUsersBySearch(response.data.users));
  }
}

export function* getOverviewDashboard(data) {
  const response = yield call(updatateOverviewWidget, data.period);
  if (response.data) {
    yield put(MainActions.setOverviewDashboard(response.data.balance));
  }
}

export function* getUserPhotos({ id }) {
  const response = yield call(fetchphotos, id);
  if (response.data) {
    yield put(MainActions.setUserPhotos(response.data));
  }
}

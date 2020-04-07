import axios from "axios";
export const fetchServices = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
    })
    .get(`/services`)
    .catch((error) => ({ error }));
export const fetchFavorites = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")) &&
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/favorites`)
    .catch((error) => ({ error }));

export const fetchUsers = (search_user) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/list`, {
      ...(search_user ? { search_user: search_user } : {}),
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const fetchUsersBySearch = (search_user) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/findUser`, {
      ...(search_user ? { search_user: search_user } : {}),
    })
    // .then(data => {
    //   console.log("fetch users called", data,);
    // })
    .catch((error) => ({ error }));

export const postImages = (user_id, imgFront, imgBack, callback) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/updateDocument`, {
      ...{ user_id: user_id },
      ...{ document_front: imgFront },
      ...{ document_back: imgBack },
    })
    .then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        callback();
      }
    })
    .catch((error) => ({ error }));
};

export const deleteImages = (user_id, callback) => {
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/deleteDocument`, {
      ...{ user_id: user_id },
    })
    .then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        callback();
      }
    });
};

export const updatateOverviewWidget = (period) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/balance`, {
      ...{ period: period },
    })
    .catch((error) => ({ error }));

export const setOnFav = (id, type) =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api/",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`,
      },
    })
    .post(`/users/${type === "set" ? "addFavorite" : "removeFavorite"}`, {
      ...{ company_id: id },
    })
    .catch((error) => ({ error }));

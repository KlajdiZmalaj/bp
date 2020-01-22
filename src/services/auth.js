import request from "utils/request";

export const fetchLogin = (email, password) =>
  request
    .post(`/users/login`, {
      ...{ username: email },
      ...{ password: password }
    })
    .catch(error => ({ error }));

export const logoutApi = () =>
  request.post(`/backend/api/user/logout`).catch(err => {
    console.log("err", err);
  });

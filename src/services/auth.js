import request from "utils/request";
import axios from "axios";

const accountData = localStorage.getItem("accountData");
const data = JSON.parse(accountData);
let req;
if (data) {
  req = axios.create({
    baseURL: "https://services-api.bpoint.store/api",
    headers: {
      // Authorization: "Bearer " + data.token
      Authorization: `Bearer ${data.token}`
    }
  });
}

export const fetchLogin = (email, password) =>
  request
    .post(`/users/login`, {
      ...{ username: email },
      ...{ password: password }
    })
    .catch(error => ({ error }));

export const logoutApi = () =>
  req.post(`/users/logout`).catch(err => {
    console.log("err", err);
  });

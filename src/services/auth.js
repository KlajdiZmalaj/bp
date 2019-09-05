import request from "utils/request";

export const fetchLogin = (email, password) =>
  request
    .post(`user/login?username=${email}&password=${password}`)
    .catch(error => {
      console.log("error", error);
    });

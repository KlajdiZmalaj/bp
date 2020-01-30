// import request from "utils/request";
import axios from "axios";
// export const fetchServices = () =>
// request.get("/services").catch(err => {
//   console.log("err", err);
// });

export const fetchServices = () =>
  axios
    .create({
      baseURL: "https://services-api.bpoint.store/api",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("accountDataB")).token
        }`
      }
    })
    .get(`/services`)
    .catch(error => ({ error }));

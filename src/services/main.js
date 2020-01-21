import request from "utils/request";

  export const fetchServices = () =>
  request.get("/services").catch(err => {
    console.log("err", err);
  });
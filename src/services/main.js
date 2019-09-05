import request from "utils/request";

export const fetchLastMinuteOdds = () =>
  request.get("todos").catch(err => {
    console.log("err", err);
  });

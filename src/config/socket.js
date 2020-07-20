import Echo from "laravel-echo";

export const socket = () => {
  window.io = require("socket.io-client");
  window["echo"] = new Echo({
    broadcaster: "socket.io",
    host: "wss://services-api.bpoint.store",
    path: "/websocket/socket.io",
    transports: ["websocket", "polling", "flashsocket"],
  });
};
const messageHandler = (msg, props) => {
  console.log("socket messageHandler", msg, props);
  switch (msg.type) {
    case "payment":
      //
      break;
    default:
  }
};

export const subscribeSocketUser = (userID, props) => {
  window["echo"].channel(`bpoint_cache_${userID}`).listen("user", (msg) => {
    console.log("ca ka socket msg", msg);
  });
};

export const unSubscribeSocketUser = (userID) => {
  window["echo"].leaveChannel(`bpoint_cache_${userID}`);
};

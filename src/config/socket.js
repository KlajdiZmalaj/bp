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

export const subscribeSocketUser = (userID, addPrivateMsg) => {
  console.log("subscribed listening...", userID, addPrivateMsg);
  window["echo"].channel(`bpoint_cache_${userID}`).listen(".user", (e) => {
    addPrivateMsg(e.data);
  });
};

export const unSubscribeSocketUser = (userID) => {
  window["echo"].leaveChannel(`bpoint_cache_${userID}`);
};

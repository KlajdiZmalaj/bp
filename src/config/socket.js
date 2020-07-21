import Echo from "laravel-echo";
import { notification } from "antd";
import React from "react";
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
  window["echo"].channel(`bpoint_cache_${userID}`).listen(".user", (e) => {
    console.log("subscribed listening...", userID, addPrivateMsg, e);
    if (e.type === "payment") {
      addPrivateMsg(e.data);
    }
    if (e.type === "notification") {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: <i className="fal fa-smile-beam"></i>,
      });

      var audio = new Audio("notification_sound.mp3");
      audio.play();
    }
    if (e.type === "popup") {
      window.bigliettoPopUp({
        id: e.instance_id,
        data: e.data,
      });
    }
  });
};

export const unSubscribeSocketUser = (userID) => {
  window["echo"].leaveChannel(`bpoint_cache_${userID}`);
};

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

export const subscribeSocketUser = (userID, props) => {
  window["echo"].channel(`bpoint_cache_${userID}`).listen(".user", (e) => {
    // console.log("subscribed listening...", userID, props, e);
    if (e.type === "payment") {
      props.addPrivateMsg(e.data);
    }
    if (e.type === "notification" || e.type === "notification_visure") {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: <i className="fal fa-smile-beam"></i>,
      });

      var audio = new Audio("notification_sound.mp3");
      audio.play();
    }
    if (e.type === "popup") {
      props.bigliettoPopUp({
        id: e.instance_id,
        data: e.data,
      });
    }
    if (e.type === "popup_visure") {
      props.bigliettoPopUpVisure({
        id: e.instance_id,
        data: e.data,
      });
    }
    if (
      e.type === "notification" &&
      (e.data.title === "Il biglietto è stato accettato" ||
        e.data.title === "La prenotazione è stata accettata")
    ) {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: <i className="fal fa-smile-beam"></i>,
      });
      props.setButtonsSupport({ status: true, instance: e.instance_id });
    }
    if (
      e.type === "token_expired" &&
      e.instance ===
        JSON.parse(localStorage.getItem("accountDataB")?.token_id || "{}")
    ) {
      unSubscribeSocketUser(
        JSON.parse(localStorage.getItem("accountDataB")).profile.id
      );
      if (
        JSON.parse(localStorage.getItem("accountDataB")).profile.role.name ===
        "support"
      ) {
        unSubscribeSocketSupport();
      }
      localStorage.setItem("accountDataB", null);
      window.setUnauthorization();
    }
  });
};

export const subscribeSocketSupport = (props) => {
  window["echo"].channel(`bpoint_cache_support`).listen(".support", (e) => {
    if (e.type === "notification") {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: <i className="fal fa-smile-beam"></i>,
      });

      var audio = new Audio("notification_sound.mp3");
      audio.play();
      props.addTicket(e.instance);
    }
    if (e.type === "notification_visure") {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: <i className="fal fa-smile-beam"></i>,
      });

      audio = new Audio("notification_sound.mp3");
      audio.play();
      props.addTicket(e.instance);
    }
  });
};

export const unSubscribeSocketUser = (userID) => {
  window["echo"].leaveChannel(`bpoint_cache_${userID}`);
};
export const unSubscribeSocketSupport = () => {
  window["echo"].leaveChannel(`bpoint_cache_support`);
};

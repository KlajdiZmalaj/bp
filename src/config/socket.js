import Echo from "laravel-echo";
import { notification } from "antd";
import React from "react";
var audio = new Audio("notification_sound.mp3");
audio.loop = true;

const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};
window.stopAudio = stopAudio;
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
  const USER_NAME =
    props?.accountInfo?.profile?.name?.toUpperCase?.() ||
    JSON.parse(
      localStorage.getItem("accountDataB")
    )?.profile?.name?.toUpperCase?.();
  var docTitle = document.title;
  document.title = `👋 Benvenuto ${USER_NAME}`;

  setTimeout(() => {
    document.title = docTitle;
  }, 3000);

  //console.log("props", props.accountInfo);
  window["echo"].channel(`bpoint_cache_${userID}`).listen(".user", (e) => {
    // console.log("subscribed listening...", userID, props, e);
    if (e.type === "payment") {
      props.addPrivateMsg(e.data);
    }
    if (e.type === "notification" || e.type === "notification_visure") {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: e.data.title,
        icon: (
          <i
            className={`fal ${
              e.resul === "FAILED" ? "fa-sad-tear" : "fa-smile-beam"
            } `}
          ></i>
        ),
        duration: 0,
        onClose: () => {
          stopAudio();
        },
      });
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
      e.instance_id ===
        JSON.parse(localStorage.getItem("accountDataB"))?.token_id
    ) {
      notification.open({
        message: "Hai ricevuto una notifica",
        description: "Perfavore re loggati",
        icon: <i className="fal fa-smile-beam"></i>,
        onClose: () => {
          if (window.location.hash.includes("login")) {
          } else {
            window.location.hash = "login";
          }
        },
      });
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
      props.setUnauthorization();
    }
    if (e.type === "money") {
      const accountInfo = window.store.getState().auth["accountInfo"];
      let profile = accountInfo["profile"];
      const newProfile = {
        ...profile,
        wallet: e.data.wallet,
      };

      window.store.dispatch({
        type: "SET_ACCOUNT_INFO",
        accountInfo: { ...accountInfo, profile: newProfile },
      });
    }
  });
};
export const subscribeSocketSupport = (props) => {
  window["echo"].channel(`bpoint_cache_support`).listen(".support", (e) => {
    if (e.type === "notification" || e.type === "notification_visure") {
      if (
        e.instance.nome_agenzia === "luce-gas" &&
        window.store.getState().auth.accountInfo.profile.username ===
          "support_prenotazioni"
      ) {
        notification.open({
          message: "Hai ricevuto una notifica",
          description: e.data.title,
          icon: <i className="fal fa-smile-beam"></i>,
          duration: 0,
          onClose: () => {
            stopAudio();
          },
        });

        audio.play();
        props.addTicket(e.instance);
      } else if (
        e.instance.nome_agenzia !== "luce-gas" &&
        window.store.getState().auth.accountInfo.profile.username !==
          "support_prenotazioni"
      ) {
        notification.open({
          message: "Hai ricevuto una notifica",
          description: e.data.title,
          icon: <i className="fal fa-smile-beam"></i>,
          duration: 0,
          onClose: () => {
            stopAudio();
          },
        });

        audio.play();
        props.addTicket(e.instance);
      }
    }
  });
};
export const unSubscribeSocketUser = (userID) => {
  window["echo"].leaveChannel(`bpoint_cache_${userID}`);
};
export const unSubscribeSocketSupport = () => {
  window["echo"].leaveChannel(`bpoint_cache_support`);
};

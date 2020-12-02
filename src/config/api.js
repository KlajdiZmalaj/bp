import $ from "jquery";
import { notification } from "antd";
import { unSubscribeSocketUser, unSubscribeSocketSupport } from "config/socket";
export const endpoint = "https://services-api.bpoint.store/api";
const apiUrl = `${endpoint}`;
export const getToken = () => {
  const value = localStorage.getItem("accountDataB");
  const keys = JSON.parse(value);
  return `Bearer ${keys?.token}`;
};

const hasCode = (error, status) => {
  if (
    error?.response?.status === parseInt(status) ||
    error.error?.response?.status === parseInt(status) ||
    error?.response?.status === parseInt(status)
  ) {
    return true;
  } else {
    return false;
  }
};
export const handleError = (error) => {
  console.log("error handler", error, error.response, error.error);
  if (hasCode(error, 401)) {
    //loged out
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
    window.store.dispatch({ type: "SET_UNAUTHORIZATION" });
  } else if (hasCode(error, 445)) {
    //skin id wrong
  } else if (hasCode(error, 440)) {
    localStorage.setItem("accountDataB", null);
    window.store.dispatch({ type: "SET_UNAUTHORIZATION" });
  } else if (hasCode(error, 429)) {
    console.log("to many request");
  } else if (hasCode(error, 403)) {
    //forbiden , kryesisht > prenotazione
    notification["warning"]({
      message: `Azione completata una volta`,
    });
  } else {
    notification["error"]({
      message: error?.response?.data?.message,
      description:
        error?.response?.data?.errors &&
        Object.values(error.response.data.errors),
      placement: "bottomRight",
      duration: 4,
    });
  }
  return Promise.reject(error);
};

export let skin = {
  skin_id: 0,
};
window.apiUrl = apiUrl;
if (
  window.location.href.includes("bpoint") ||
  window.location.href.includes("localhost") ||
  window.location.href.includes("192.168")
) {
  skin = {
    ...skin,
    skin_id: 1,
  };
  //google analytics to header
  if (window.location.href.includes("bpoint")) {
    $("head").append(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172416989-1"></script>`
    );
    $("head").append(
      `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172416989-1');</script>`
    );
  }
} else if (window.location.href.includes("derby")) {
  skin = {
    ...skin,
    skin_id: 3,
  };
  //google analytics to header
  $("head").append(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172416989-6"></script>`
  );
  $("head").append(
    `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172416989-6');</script>`
  );
} else if (window.location.href.includes("planet")) {
  skin = {
    ...skin,
    skin_id: 4,
  };
  //google analytics to header
  $("head").append(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172416989-2"></script>`
  );
  $("head").append(
    `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172416989-2');</script>`
  );
} else if (window.location.href.includes("gfb")) {
  skin = {
    ...skin,
    skin_id: 5,
  };
  //google analytics to header
  $("head").append(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172416989-5"></script>`
  );
  $("head").append(
    `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172416989-5');</script>`
  );
} else if (window.location.href.includes("sirpay")) {
  skin = {
    ...skin,
    skin_id: 8,
  };
} else if (window.location.href.includes("imperial")) {
  skin = {
    ...skin,
    skin_id: 51,
  };
}
export default {
  endpoint,
  baseUrl: apiUrl,
  headers: {
    //  "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
};

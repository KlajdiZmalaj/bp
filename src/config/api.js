import $ from "jquery";

export const endpoint = "https://services-api.bpoint.store/api";
const apiUrl = `${endpoint}`;
export const getToken = () => {
  const value = localStorage.getItem("accountDataB");
  const keys = JSON.parse(value);
  return `Bearer ${keys?.token}`;
};
//
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
  $("head").append(
    `<script async src="https://www.googletagmanager.com/gtag/js?id=UA-172416989-1"></script>`
  );
  $("head").append(
    `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-172416989-1');</script>`
  );
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

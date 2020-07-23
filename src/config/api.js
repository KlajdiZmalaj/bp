const endpoint = "https://services-api.bpoint.store/api";
const apiUrl = `${endpoint}`;
export let skin = {
  skin_id: 0,
};
window.apiUrl = apiUrl;
if (
  window.location.href.includes("bpoint") ||
  window.location.href.includes("localhost")
) {
  skin = {
    ...skin,
    skin_id: 1,
  };
} else if (window.location.href.includes("derby")) {
  skin = {
    ...skin,
    skin_id: 3,
  };
} else if (window.location.href.includes("planet")) {
  skin = {
    ...skin,
    skin_id: 4,
  };
} else if (window.location.href.includes("gfb")) {
  skin = {
    ...skin,
    skin_id: 5,
  };
} else if (window.location.href.includes("sirpay")) {
  skin = {
    ...skin,
    skin_id: 8,
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

const endpoint = "https://services-api.bpoint.store/api";
const apiUrl = `${endpoint}`;

window.apiUrl = apiUrl;

export default {
  endpoint,
  baseUrl: apiUrl,
  headers: {
    //  "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*"
  }
};

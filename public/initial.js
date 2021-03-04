const isLocalHost = window.location.href.match(/192|localhost|127/g);

var _window$localStorage$;

window.log1 = "color: lime;font-size: 20px;background: #222";
window.log2 = "color: red;font-size: 20px;background: #222";
window.log3 = "color: lightblue;font-size: 20px;background: #222";

if (
  (_window$localStorage$ = window.localStorage.getItem("accountDataB")) !==
    null &&
  _window$localStorage$ !== void 0 &&
  _window$localStorage$.includes("object")
) {
  window.localStorage.setItem("accountDataB", null);
}

var LOCATION_URL = window.location.href;
var SITE_STYLES = document.getElementById("lnk");
var root = document.getElementsByTagName("html")[0];
var mainifest = document.getElementById("manifest");
var iosIcon = document.getElementById("iosIcon");
root.setAttribute("class", `${window.location.host.split(".")[0]}`);

if (window.LOCATION_URL.match(/oint\.st/g) || isLocalHost) {
  SITE_STYLES.setAttribute("href", `var1.css`);
  mainifest.href = "./manifest1.json";
} else if (window.LOCATION_URL.includes("es.gf")) {
  document.querySelector("#tabTheme").setAttribute("content", "#fdaf18");
  document.querySelector("#tabTheme2").setAttribute("content", "#fdaf18");
  SITE_STYLES.setAttribute("href", "./var5.css");
  mainifest.href = "./manifest5.json";
} else if (window.LOCATION_URL.includes("planet")) {
  document.querySelector("#tabTheme").setAttribute("content", "#fdaf18");
  document.querySelector("#tabTheme2").setAttribute("content", "#fdaf18");
  SITE_STYLES.setAttribute("href", "./var4.css");
  mainifest.href = "./manifest4.json";
} else if (window.LOCATION_URL.match(/mperia|irpa/g)) {
  document.querySelector("#tabTheme").setAttribute("content", "#222");
  document.querySelector("#tabTheme2").setAttribute("content", "#222");
  SITE_STYLES.setAttribute("href", "./var6.css");
  mainifest.href = "./manifest6.json";
} else if (window.LOCATION_URL.match(/derby/g)) {
  document.querySelector("#tabTheme").setAttribute("content", "#0da90f");
  document.querySelector("#tabTheme2").setAttribute("content", "#0da90f");
  SITE_STYLES.setAttribute("href", "./var3.css");
  mainifest.href = "./manifest3.json";
  iosIcon.href = "images3/apple-icon-180x180.png";
} else if (window.LOCATION_URL.match(/bullpay/g)) {
  document.querySelector("#tabTheme").setAttribute("content", "#f00");
  document.querySelector("#tabTheme2").setAttribute("content", "#f00");
  SITE_STYLES.setAttribute("href", "./var52.css");
  mainifest.href = "./manifest52.json";
}

if (window.location.host.split(".")[1]) {
  document.title =
    window.location.host.split(".")[1].toUpperCase() + " - Tutto con un click!";
} else {
  document.title = window.location.host + " - Tutto con un click!";
}

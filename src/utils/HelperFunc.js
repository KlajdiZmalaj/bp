import moment from "moment";
import { debounce } from "lodash";
import $ from "jquery";
export function numberWithCommas(text) {
  if (text !== undefined && text !== "0") {
    return text.toLocaleString("it-IT", { minimumFractionDigits: 2 });
  }
  return text;
}
export function randomString(number) {
  let string = [...Array(number)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");
  return string;
}
export function Encrypt() {
  // ("000y00000y0y00m000000m0yM0000M000000h00000000d00h0000dss00000");
  let year = moment().format("YYYY");
  let month = moment().format("MM");
  let day = moment().format("dd");
  let minutes = moment().format("mm");
  let hour = moment().format("HH");
  let seconds = moment().format("ss");
  return btoa(
    btoa(
      randomString(3) +
        year.charAt(0) +
        randomString(5) +
        year.charAt(1) +
        randomString(1) +
        year.charAt(2) +
        randomString(2) +
        minutes.charAt(0) +
        randomString(6) +
        minutes.charAt(1) +
        randomString(1) +
        year.charAt(3) +
        month.charAt(0) +
        randomString(4) +
        month.charAt(1) +
        randomString(6) +
        hour.charAt(0) +
        randomString(8) +
        day.charAt(0) +
        randomString(2) +
        hour.charAt(1) +
        randomString(4) +
        day.charAt(1) +
        seconds.charAt(0) +
        seconds.charAt(1) +
        randomString(5)
    )
  );
}

var pageWidth, pageHeight;
var basePage = {
  width: 470,
  height: 490,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};
export function getScale(page, container) {
  // ".casinoIframe--game"
  var $page = $(`${page}`);

  getPageSize();
  scalePages($page, pageWidth, pageHeight);

  $(window).resize(
    debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 150)
  );

  function getPageSize() {
    pageHeight = $(`${container}`).height();
    pageWidth = $(`${container}`).width();
    console.log("sizes", pageWidth, pageHeight);
  }

  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;

    var newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    var newTopPos = Math.abs(
      Math.floor((basePage.height * basePage.scale - maxHeight) / 2)
    );

    page.attr(
      "style",
      "-webkit-transform:scale(" +
        (basePage.scale >= 1 ? 1 : basePage.scale) +
        ");left:" +
        newLeftPos +
        "px;top:" +
        newTopPos +
        "px;"
    );
  }
}

import moment from "moment";
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

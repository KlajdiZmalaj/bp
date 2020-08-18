export function numberWithCommas(text) {
  if (text !== undefined && text !== "0") {
    var t = text / 100;
    // t = t.toFixed(2);
    // return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return t.toLocaleString("it-IT", { minimumFractionDigits: 2 });
  }
  return text;
}

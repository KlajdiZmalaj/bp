export function numberWithCommas(text) {
  if (text !== undefined && text !== "0") {
    return text.toLocaleString("it-IT", { minimumFractionDigits: 2 });
  }
  return text;
}

// here would add most used functions
export const slicedAmount = text => {
  if (text !== undefined && text !== "0") {
    // var t = text / 100;
    var t = text;
    // t = t.toFixed(2);
    // return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return t.toLocaleString("it-IT", { minimumFractionDigits: 2 });
  }
  return text;
};


export const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object
// here would add most used functions
import { message } from "antd";
export const slicedAmount = (text) => {
  if (text !== undefined && text !== "0") {
    // var t = text / 100;
    var t = text;
    // t = t.toFixed(2);
    // return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return t.toLocaleString("it-IT", { minimumFractionDigits: 2 });
  }
  return text;
};

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log("img loaded ", reader, reader.result);
    callback(reader.result);
  });
  reader.readAsDataURL(img);
}
export function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpg" ||
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "aplication/pdf";
  if (!isJpgOrPng) {
    message.error("Solo JPG/PNG/PDF file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("Image must smaller than 10MB!");
  }
  // console.log("filee", file, file.size, isLt2M);
  return isJpgOrPng && isLt2M;
}
export const getCopy = (a) => {
  let textDiv = document.querySelector("#write");
  textDiv.value = a;
  textDiv.select();
  document.execCommand("copy");
  message.success(`Copiato "${a}" su ClipBoard`);
};

export function readFile(e, callBack) {
  const file = e?.target?.files[0];
  if (file) {
    var FR = new FileReader();

    FR.addEventListener("load", function (e) {
      callBack(e.target.result);
    });
    FR.readAsDataURL(file);
  }
}

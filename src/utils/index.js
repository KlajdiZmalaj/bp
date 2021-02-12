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

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {
    type: contentType,
  });
  return blob;
};

export const NameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `${fieldName} is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} needs to be at least three characters`;
  }
  return null;
};

export const EmailValidation = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  }
  if (email.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
};

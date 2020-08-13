import React from "react";
import { Tooltip } from "antd";
function longer(champ, contender) {
  return contender.length > champ.length ? contender : champ;
}
function longestWord(str) {
  var words = str.split(" ");
  return words.reduce(longer);
}
const SpanFormater = ({ Word, size, myClassName, nrOfRows, formatWord }) => {
  let props = {};
  let updatedWord = Word;
  let mySize = size;
  if (myClassName) {
    props.className = `${myClassName}`;
  }
  if (formatWord === true) {
    updatedWord = Word.charAt(0).toUpperCase() + Word.slice(1).toLowerCase();
    mySize = mySize + mySize / 7;
  }
  return size === 0 ? (
    <span {...props}>{updatedWord}</span>
  ) : longestWord(Word).length <= mySize && Word.length <= mySize * nrOfRows ? (
    <span {...props}>{updatedWord}</span>
  ) : (
    <Tooltip title={updatedWord}>
      <span {...props}>{updatedWord.substring(0, mySize - 2) + "..."}</span>
    </Tooltip>
  );
};
export default SpanFormater;

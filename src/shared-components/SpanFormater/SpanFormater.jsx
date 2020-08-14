import React from "react";
import { Tooltip } from "antd";
import { longestWord, returnNumberThatPasses } from "./HelperFunct";

const SpanFormater = ({ Word, size, myClassName, nrOfRows, formatWord }) => {
  let props = {};
  let updatedWord, mySize, nrOfSpaces, theLongestWord, WordsLength;
  if (Word) {
    updatedWord = Word;
    mySize = size;
    nrOfSpaces = Word.split(" ").length - 1;
    theLongestWord = longestWord(Word).length;
    WordsLength = [
      ...Word.split(" ").filter(function () {
        return true;
      }),
    ];
    if (myClassName) {
      props.className = `${myClassName}`;
    }
    if (formatWord === true) {
      updatedWord = Word.charAt(0).toUpperCase() + Word.slice(1).toLowerCase();
      mySize = mySize + parseInt(mySize / nrOfRows / 7);
    }
  }
  return (
    Word &&
    typeof Word === "string" &&
    (size === 0 ? (
      <span {...props}>{updatedWord}</span>
    ) : nrOfSpaces >= nrOfRows &&
      returnNumberThatPasses(WordsLength, mySize / 2) >= nrOfRows ? (
      <Tooltip title={updatedWord}>
        <span {...props}>{updatedWord.substring(0, mySize - 2) + "..."}</span>
      </Tooltip>
    ) : theLongestWord <= mySize &&
      (Word.length <= mySize ||
        (Word.length > mySize && Word.length < mySize * nrOfRows)) ? (
      <span {...props}>{updatedWord}</span>
    ) : (
      <Tooltip title={updatedWord}>
        <span {...props}>{updatedWord.substring(0, mySize - 2) + "..."}</span>
      </Tooltip>
    ))
  );
};
export default SpanFormater;

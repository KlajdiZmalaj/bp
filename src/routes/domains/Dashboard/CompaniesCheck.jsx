import React from "react";
import images from "themes/images";
import { message } from "antd";
// import { keys } from "lodash";

const CompaniesCheck = ({
  Key,
  changeServce,
  role,
  togglePopUp,
  setState,
  Companie,
  toggleFavorite,
  getServices,
  favourite,
}) => {
  // console.log(Key);
  return (
    <div
      onClick={() => {
        if (!role) {
          message.info("Per favore fai prima il log in.");
        } else {
          changeServce();
          togglePopUp(true);
          setState();
        }
      }}
    >
      <img src={images[Key]} alt="" />
      <span> {Companie.name}</span>
      <i
        onMouseEnter={() => {
          // console.log(document.querySelectorAll(`.${Key}comp`));

          document
            .querySelectorAll(`.${Key}comp`)
            .forEach((ClassN) => ClassN.classList.add("hover"));
        }}
        onMouseLeave={() => {
          // console.log(document.querySelectorAll(`.${Key}comp`));
          document
            .querySelectorAll(`.${Key}comp`)
            .forEach((ClassN) => ClassN?.classList?.remove("hover"));
        }}
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          await (favourite
            ? toggleFavorite(Key, "remove")
            : toggleFavorite(Key, "set"));
          await setTimeout(() => {
            getServices();
          }, 100);
        }}
        className={`${Key}comp fal fa-star ${favourite ? "favourite" : ""}`}
      ></i>
    </div>
  );
};
export default CompaniesCheck;

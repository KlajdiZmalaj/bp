import React from "react";
import images from "themes/images";
import { message } from "antd";
import { keys } from "lodash";

const CompaniesCheck = ({
  Key,
  changeServce,
  role,
  togglePopUp,
  setState,
  Companie,
  toggleFavorite,
  getServices,
}) => {
  console.log(Key);
  return (
    <div
      onClick={(e) => {
        if (e.target.tagName != "I") {
          if (!role) {
            message.info("Per favore fai prima il log in.");
          } else {
            changeServce();
            togglePopUp(true);
            setState();
          }
        }
      }}
    >
      <img src={images[Key]} alt="" />
      <span> {Companie.name}</span>
      <i
        id={`${Key}comp`}
        onMouseEnter={() => {
          document.querySelector(`#${Key}comp`).classList.add("hover");
        }}
        onMouseLeave={() => {
          document.querySelector(`#${Key}comp`).classList.remove("hover");
        }}
        onClick={async () => {
          await (Companie.favourite
            ? toggleFavorite(Key, "remove")
            : toggleFavorite(Key, "set"));
          await setTimeout(() => {
            getServices();
          }, 100);
        }}
        className={`fal fa-star ${Companie.favourite ? "favourite" : ""}`}
      ></i>
    </div>
  );
};
export default CompaniesCheck;

import React from "react";
import { DatePicker, Radio } from "antd";

export const SubTitle = ({ title, color, right, down }) => {
  return (
    <div
      className="rightForm--subtitle"
      style={{ borderBottom: `1px solid ${color}`, color }}
    >
      <div>
        {title} {down && <span>{down}</span>}{" "}
      </div>
      <span className="right">{right}</span>
    </div>
  );
};
export const Item = ({
  label,
  value,
  handleChange,
  Icon,
  type,
  JSX,
  isCF,
  openCF,
  CFPopUp,
  extraClass,
}) => {
  return type === "date" ? (
    <div className={`formsContainer--body__item ${extraClass}`}>
      <div className="label">
        {label} <span className="Red">*</span>
      </div>
      <DatePicker
        format="DD/MM/YYYY"
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  ) : type === "radio" ? (
    <div className={`formsContainer--body__item ${extraClass}`}>
      <div className="label">
        {label} <span className="Red">*</span>
      </div>
      <Radio.Group
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={value}
      >
        {<JSX />}
      </Radio.Group>
    </div>
  ) : (
    <div className={`formsContainer--body__item ${extraClass}`}>
      <div className="label">
        {label} <span className="Red">*</span>
      </div>
      {type === "notes" ? (
        <textarea
          type="textarea"
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      )}
      {Icon && <Icon />}
      {isCF && (
        <button
          className="genCF"
          onClick={() => {
            if (CFPopUp) {
              openCF(false);
            } else {
              openCF(true);
            }
          }}
        >
          Genera
        </button>
      )}
    </div>
  );
};
export const TrueFalse = ({ item, handleChange }) => (
  <div className="formsContainer--body__checks">
    <span>{item.title}</span>
    <div className="btns">
      <div
        className={item.status ? "active" : ""}
        onClick={() => handleChange(true)}
      >
        <i
          className={`far fa-${item.status ? "dot-circle" : "circle"}`}
          aria-hidden="true"
        ></i>
        Si
      </div>
      <div
        className={!item.status ? "active" : ""}
        onClick={() => handleChange(false)}
      >
        <i
          className={`far fa-${!item.status ? "dot-circle" : "circle"}`}
          aria-hidden="true"
        ></i>
        No
      </div>
    </div>
  </div>
);
export const TrueFalse2 = ({ item, handleChange }) => (
  <div
    className="formsContainer--body__checks2"
    onClick={() => handleChange(!item.status)}
  >
    <span>{item.title}</span>
    {item.status ? (
      <i className="far fa-check-square"></i>
    ) : (
      <i className="far fa-square"></i>
    )}
  </div>
);
export const Download = ({ title, link }) => (
  <a href={link} download className="download-bar">
    <i className="fas fa-file-pdf" aria-hidden="true"></i>
    <span> {title}</span>
    <i className="fal fa-download" aria-hidden="true"></i>
  </a>
);
export const Category = ({
  handleChange,
  offerta,
  category,
  svg,
  desc,
  name,
}) => (
  <div
    onClick={handleChange}
    className={
      "rightForm--categories__item" + (offerta === category ? " active" : "")
    }
  >
    <svg className={`svgFont ${svg}`}>
      <use xlinkHref={`#${svg}`}></use>
    </svg>
    <span>{desc}</span>
    <div>{name}</div>
  </div>
);

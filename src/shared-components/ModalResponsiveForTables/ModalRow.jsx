import React from "react";
const ModalRow = ({ title, data, handleClick }) =>
  title === "Barcode" ? (
    <div
      className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}`}
      onClick={handleClick}
      style={{
        background: "#ebeced",
        boxShadow: "0 0px 3px 2px #ebeced",
        marginBottom: "1%",
      }}
    >
      <span
        className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}--Header`}
      >
        {title}
      </span>
      <span className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}--Info`}>
        {data}
      </span>
    </div>
  ) : (
    <div className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}`}>
      <span
        className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}--Header`}
      >
        {title}
      </span>
      <span className={`TrMoRes--Data--Row--${title.replace(/\s/g, "")}--Info`}>
        {data}
      </span>
    </div>
  );
export default ModalRow;

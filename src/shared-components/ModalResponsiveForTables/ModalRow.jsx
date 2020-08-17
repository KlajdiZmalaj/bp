import React from "react";
const ModalRow = ({ title, data }) => (
  <div
    className={`TranzacioniModalResponsive--Data--Row--${title.replace(
      /\s/g,
      ""
    )}`}
  >
    <span
      className={`TranzacioniModalResponsive--Data--Row--${title.replace(
        /\s/g,
        ""
      )}--Header`}
    >
      {title}
    </span>
    <span
      className={`TranzacioniModalResponsive--Data--Row--${title.replace(
        /\s/g,
        ""
      )}--Info`}
    >
      {data}
    </span>
  </div>
);
export default ModalRow;

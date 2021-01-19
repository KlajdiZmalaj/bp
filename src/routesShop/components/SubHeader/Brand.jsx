import React, { useState } from "react";
import ShopActions from "redux-store/models/shop";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Brand = ({
  getProductsList,
  history,
  brand,
  cat,
  itemS,
  setIsShown,
  setManufacturer,
  setCategory,
}) => {
  const [isImage, setIsImage] = useState(false);

  return (
    <div
      className="brands__item"
      onClick={() => {
        getProductsList(null, brand.name, cat[itemS].name);
        setManufacturer(brand.name);
        setCategory(cat[itemS].name);
        setIsShown(false);
        history.push(
          `/product-filtered/${cat[itemS].name.split(" | ")[0]}__${
            cat[itemS].name.split(" | ")[1]
              ? cat[itemS].name.split(" | ")[1]
              : ""
          }`
        );
      }}
    >
      <img
        src={brand?.url}
        alt=""
        className={isImage ? "hidden" : ""}
        onError={(e) => {
          e.target.onerror = null;
          setIsImage(true);
        }}
      />
      {isImage && brand?.name}
    </div>
  );
};

const mstp = (state) => ({});

export default withRouter(connect(mstp, { ...ShopActions })(Brand));

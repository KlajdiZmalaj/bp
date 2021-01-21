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
  openProducts,
}) => {
  const [isImage, setIsImage] = useState(false);
  let url =
    cat[itemS]?.name.split(" | ")[0] +
    (cat[itemS]?.name.split(" | ")[1]
      ? "__" + cat[itemS]?.name.split(" | ")[1]
      : "");
  return (
    <div
      className="brands__item"
      onClick={() => {
        getProductsList(null, brand.name, cat[itemS].name);
        setManufacturer(brand.name);
        setCategory(cat[itemS].name);
        setIsShown(false);
        openProducts(true);
        history.push(`/product-filtered/${url}`);
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

const mstp = () => ({});

export default withRouter(connect(mstp, { ...ShopActions })(Brand));

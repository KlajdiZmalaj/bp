import React, { useState } from "react";
import ShopActions from "redux-store/models/shop";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Brand = ({ getProductsList, history, brand, cat, itemS }) => {
  const [isImage, setIsImage] = useState(false);

  return (
    <div
      className="brands__item"
      onClick={() => {
        getProductsList(null, brand.name, cat[itemS].name);
        this.setIsShown(false);
        history.push(
          `/product-filtered/${cat[itemS].name.split(" | ")[0]}__${
            cat[itemS].name.split(" | ")[1]
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

const mstp = (state) => ({
  carriers: state.shop.carries,
  accountInfo: state.auth.accountInfo,
});

export default withRouter(connect(mstp, { ...ShopActions })(Brand));

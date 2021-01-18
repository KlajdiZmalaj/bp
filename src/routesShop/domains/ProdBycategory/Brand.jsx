import React, { useState } from "react";
import ShopActions from "redux-store/models/shop";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Brand = ({
  getProductsList,
  setManufacturer,
  brands,
  item,
  isSelected,
  isSelectedC,
  isSelectedSC,
  isSelectedSSC,
  orderVal,
  sliderVal,
}) => {
  const [isImage, setIsImage] = useState(false);

  return (
    <div
      className={
        "brands__item" + (isSelected === brands[item].name ? " active" : "")
      }
      onClick={() => {
        getProductsList(
          null,
          brands[item].name,
          isSelectedC,
          isSelectedSSC,
          orderVal,
          sliderVal,
          null,
          isSelectedSC
        );
        setManufacturer(brands[item].name);
      }}
    >
      <img
        src={brands[item]?.url}
        alt=""
        className={isImage ? "hidden" : ""}
        onError={(e) => {
          e.target.onerror = null;
          setIsImage(true);
        }}
      />
      {isImage && brands[item]?.name}
    </div>
  );
};

const mstp = (state) => ({
  isSelected: state.shop.isSelectedManufacturer,
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  isSelectedSSC: state.shop.isSelectedSubSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});

export default withRouter(connect(mstp, { ...ShopActions })(Brand));

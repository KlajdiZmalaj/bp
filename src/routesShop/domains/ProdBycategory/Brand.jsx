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
  isSelectedC,
  isSelectedSC,
  orderVal,
  sliderVal,
}) => {
  const [isImage, setIsImage] = useState(false);
  const [brandSelected, setbrandSelected] = useState(null);
  return (
    <div
      className={"brands__item" + (brandSelected === item ? " active" : "")}
      onClick={() => {
        getProductsList(
          null,
          brands[item].name,
          isSelectedC,
          isSelectedSC,
          orderVal,
          sliderVal
        );
        setManufacturer(brands[item].name);
        setbrandSelected(item);
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
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});

export default withRouter(connect(mstp, { ...ShopActions })(Brand));

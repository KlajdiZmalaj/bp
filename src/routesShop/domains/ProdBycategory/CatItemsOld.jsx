import React, { useState } from "react";
import ShopActions from "redux-store/models/shop";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CatItems = ({
  subcategories,
  setSubCategory,
  setSubSubCategory,
  getProductsList,
  isSelectedC,
  orderVal,
}) => {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 7,
  };
  return (
    <div className="catgItems">
      {subcategories && (
        <Slider2 {...settings} className="maxWidth">
          {Object.keys(subcategories).map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSubCategory(subcategories[item].name);
                  setSubSubCategory(null);
                  getProductsList(
                    null,
                    null,
                    isSelectedC,
                    null,
                    orderVal,
                    null,
                    null,
                    subcategories[item].name
                  );
                }}
              >
                <span>{subcategories[item].name}</span>
                <img src={subcategories[item].url} alt=""></img>
              </div>
            );
          })}
        </Slider2>
      )}
    </div>
  );
};

const mstp = (state) => ({
  isSelectedC: state.shop.isSelectedCategory,
  orderVal: state.shop.orderVal,
});

export default withRouter(connect(mstp, { ...ShopActions })(CatItems));

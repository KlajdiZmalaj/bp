import React, { useState } from "react";
import ShopActions from "redux-store/models/shop";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CatItems = ({
  total_records,
  subcategories,
  setSubCategory,
  setSubSubCategory,
  getProductsList,
  setManufacturer,
  isSelectedC,
  orderVal,
  openProducts,
}) => {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 5,
  };

  return (
    <div className="catgItems">
      <div className="catgItems__title">
        Trovati {total_records} prodotti
        {/* {total_records} prodotti in
        <b className="text-uppercase"> {isSelectedC}</b> */}
      </div>

      <Slider2 {...settings} className="catgItems__items">
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
                openProducts(true);
              }}
            >
              <div className="descr">
                <span>{subcategories[item].name}</span>
                <div>View tutti</div>
              </div>

              <img src={subcategories[item].url} alt=""></img>
            </div>
          );
        })}
      </Slider2>

      {Object.keys(subcategories)
        .filter((item) => subcategories[item].subcategories.length !== 0)
        .map((item, index) => {
          const sub = subcategories[item];

          return (
            <div key={index} className="catgGroup">
              <div className="catgGroup__title">{sub.name}</div>
              <div className="catgGroup__items">
                {Object.keys(sub.subcategories).map((subitem, i) => {
                  return (
                    <div
                      key={i}
                      className="subCatgGroup"
                      onClick={() => {
                        getProductsList(
                          null,
                          null,
                          isSelectedC,
                          sub.subcategories[subitem].name,
                          null,
                          null,
                          null,
                          sub.name
                        );
                        setSubCategory(sub.name);
                        setSubSubCategory(sub.subcategories[subitem].name);
                        setManufacturer(null);
                        openProducts(true);
                      }}
                    >
                      <div className="subCatgGroup__title">
                        {sub.subcategories[subitem].name}
                      </div>
                      <img src={sub.subcategories[subitem].url} alt=""></img>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mstp = (state) => ({
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  orderVal: state.shop.orderVal,
});

export default withRouter(connect(mstp, { ...ShopActions })(CatItems));
import React from "react";
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
  isMobile,
  openProducts,
}) => {
  const settings = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: isMobile ? 2 : 1,
    slidesToShow: isMobile ? 2 : 5,
  };

  return (
    <div className="catgItems">
      <div className="catgItems__title">
        Trovati {total_records ? `${total_records} prodotti` : "..."}
      </div>

      <Slider2 {...settings} className="catgItems__items">
        {subcategories &&
          Object.keys(subcategories).map((item, index) => {
            return (
              <div
                key={index}
                className="testt"
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

      {subcategories &&
        Object.keys(subcategories)
          .filter((item) => subcategories[item]?.subcategories?.length !== 0)
          .map((item, index) => {
            const sub = subcategories[item];

            return (
              <div key={index} className="catgGroup">
                <div className="catgGroup__title">{sub.name}</div>
                <div className="catgGroup__items">
                  {sub.subcategories &&
                    Object.keys(sub.subcategories).map((subitem, i) => {
                      return (
                        <div
                          key={i}
                          className="subCatgGroup"
                          onClick={() => {
                            getProductsList(
                              null,
                              null,
                              isSelectedC,
                              sub.subcategories[subitem]?.name,
                              null,
                              null,
                              null,
                              sub.name
                            );
                            setSubCategory(sub.name);
                            setSubSubCategory(sub.subcategories[subitem]?.name);
                            setManufacturer(null);
                            openProducts(true);
                          }}
                        >
                          <div className="subCatgGroup__title">
                            {sub.subcategories[subitem]?.name}
                          </div>
                          <img
                            src={sub.subcategories[subitem]?.url}
                            alt=""
                          ></img>
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

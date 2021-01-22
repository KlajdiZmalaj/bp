import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./style.css";
const Menu = ({
  active,
  setShopLeftMenuMob,
  match,
  setCategory,
  getItemsCart,
}) => {
  const [activeMenu, setActive] = useState(active);
  useEffect(() => {
    const catProduct = match.params.cat;
    if (catProduct) {
      setCategory(catProduct.replace("__", " | "));
    }
    getItemsCart();
  }, []);

  return (
    <div className="shopBottomMenu">
      <div
        onClick={() => {
          if (activeMenu === "bars") {
            setActive("");
            setShopLeftMenuMob(false);
          } else {
            setActive("bars");
            setShopLeftMenuMob(true);
          }
        }}
        className={
          "shopBottomMenu--item" + (activeMenu === "bars" ? " active" : "")
        }
      >
        <i className="fal fa-bars" aria-hidden="true"></i>
      </div>

      <div
        onClick={() => {
          setActive("heart");
          setShopLeftMenuMob(false);
          window.location.hash = "shop-fav";
        }}
        className={
          "shopBottomMenu--item" + (activeMenu === "heart" ? " active" : "")
        }
      >
        <i className="fal fa-heart"></i>
      </div>
      <div
        onClick={() => {
          setActive("cart");
          setShopLeftMenuMob(false);
          window.location.hash = "shop-cart";
        }}
        className={
          "shopBottomMenu--item" + (activeMenu === "cart" ? " active" : "")
        }
      >
        <i className="fal fa-shopping-cart"></i>
      </div>

      <div
        onClick={() => {
          setActive("bell");
          setShopLeftMenuMob(false);
        }}
        className={
          "shopBottomMenu--item" + (activeMenu === "bell" ? " active" : "")
        }
      >
        <i className="fal fa-bell" aria-hidden="true"></i>
      </div>

      <div
        onClick={() => {
          setActive("home");
          setShopLeftMenuMob(false);
          window.location.hash = "products";
        }}
        className={
          "shopBottomMenu--item" + (activeMenu === "home" ? " active" : "")
        }
      >
        <i className="fal fa-home" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default withRouter(
  connect(
    ({ shop: { shopLeftMenuMob } }) => ({
      shopLeftMenuMob,
    }),
    ShopActions
  )(Menu)
);

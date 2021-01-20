import React, { useEffect } from "react";
import { Header } from "shared-components";
import SubHeader from "routesShop/components/SubHeader/index.js";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import ShopFavDom from "../domains/ShopFavDom";
import DomTitle from "../domains/DomTitle";

const ShopFav = ({ getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <div className="products shopCart">
      <Header />
      <SubHeader cat={categories} />
      <DomTitle
        title={"VISUALIZZA PREFERITI"}
        icon={<i className="fal fa-heart" aria-hidden="true"></i>}
      />

      <ShopFavDom />
    </div>
  );
};

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(ShopFav);

import React, { useEffect } from "react";
import { Header } from "shared-components";
import SubHeader from "routesShop/components/SubHeader/index.js";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import ShopCartDom from "../domains/ShopCartDom";
import DomTitle from "../domains/DomTitle";

const ShopCart = ({ getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="products shopCart">
      <Header />
      <SubHeader cat={categories} />
      <DomTitle
        title={"VISUALIZZA CARRELLO"}
        icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
      />

      <ShopCartDom />
    </div>
  );
};

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(ShopCart);

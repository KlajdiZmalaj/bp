import React, { useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { Header } from "shared-components";
import SubHeader from "routesShop/components/SubHeader/index.js";
import CheckOutDom from "../domains/CheckOutDom";
import DomTitle from "../domains/DomTitle";

const CheckOut = ({ getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="products checkout">
      <Header />
      <SubHeader cat={categories} />
      <DomTitle
        title={"Checkout"}
        icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
      />
      <CheckOutDom />
    </div>
  );
};

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(CheckOut);

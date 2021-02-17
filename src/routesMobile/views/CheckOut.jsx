import React, { useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { ShopMenuLeft, Header } from "shared-componentsMobile";
import CheckOutDom from "routesShop/domains/CheckOutDom";
import DomTitle from "routesShop/domains/DomTitle";
import { AnimatedMenu } from "shared-components";
const CheckOut = ({ getCategories, categories, getItemsCart, itemsCart }) => {
  useEffect(() => {
    getItemsCart(true);
    getCategories();
  }, [getCategories, getItemsCart]);
  return (
    <div className="shopMobile">
      <AnimatedMenu activeM={3} />
      <ShopMenuLeft />
      <DomTitle
        title={"Checkout"}
        icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
      />
      {itemsCart && Object.keys(itemsCart.length > 0) && itemsCart.user_data && (
        // itemsCart.user_data.postcode
        <CheckOutDom itemsCart={itemsCart} />
      )}
      <Header />
    </div>
  );
};

const mpStP = (state) => ({
  categories: state.shop.categories,
  itemsCart: state.shop.itemsCart,
});
export default connect(mpStP, ShopActions)(CheckOut);

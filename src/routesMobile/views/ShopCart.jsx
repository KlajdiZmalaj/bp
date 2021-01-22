import React from "react";
import {
  Header,
  // , Footer
  ShopBottomMenu,
  ShopMenuLeft,
} from "shared-componentsMobile";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import ShopCartDom from "routesShop/domains/ShopCartDom";
import DomTitle from "routesShop/domains/DomTitle";
class ShopCart extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="shopMobile">
        <ShopBottomMenu active="cart" />
        <ShopMenuLeft />

        <DomTitle
          title={"VISUALIZZA CARRELLO"}
          icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
        />

        <ShopCartDom />
        <Header />
      </div>
    );
  }
}
const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(ShopCart);

import React from "react";
import {
  Header,
  // , Footer
  // ShopBottomMenu,
  ShopMenuLeft,
} from "shared-componentsMobile";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { AnimatedMenu } from "shared-components";

import Product from "routesShop/domains/SingleProduct/index.js";

class SingleProduct extends React.Component {
  componentDidMount() {
    if (this.props.categories && Object.keys(this.props.categories).length < 1)
      this.props.getCategories();
  }

  render() {
    return (
      <div className="shopMobile">
        <AnimatedMenu activeM={5} />
        <ShopMenuLeft />

        <Product className="openedProduct"></Product>
        {/* <Footer /> */}
        <Header />
      </div>
    );
  }
}

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(SingleProduct);

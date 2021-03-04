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

import ShopFavDom from "routesShop/domains/ShopFavDom";
import DomTitle from "routesShop/domains/DomTitle";
class ShopFav extends React.Component {
  componentDidMount() {
    if (this.props.categories && Object.keys(this.props.categories).length < 1)
      this.props.getCategories();
  }

  render() {
    return (
      <div className="shopMobile">
        <AnimatedMenu activeM={2} />
        <ShopMenuLeft />

        <DomTitle
          title={"VISUALIZZA PREFERITI"}
          icon={<i className="fal fa-heart" aria-hidden="true"></i>}
        />

        <ShopFavDom />
        <Header />
      </div>
    );
  }
}

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(ShopFav);

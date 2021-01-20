import React, { Component } from "react";
import { Header } from "shared-components";
import ShopActions from "../domains/ShopFavDom/node_modules/redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";

import Product from "routesShop/domains/SingleProduct/index.js";
import SubHeader from "routesShop/components/SubHeader/index.js";

class SingleProduct extends Component {
  componentDidMount() {
    if (this.props.categories && Object.keys(this.props.categories).length < 1)
      this.props.getCategories();
  }

  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader cat={this.props.categories}></SubHeader>
        <Product className="openedProduct"></Product>
      </div>
    );
  }
}

const mpStP = (state) => ({
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(SingleProduct);

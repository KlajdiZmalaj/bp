import React, { Component } from "react";
import { Header } from "shared-components";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";

import Product from "routesShop/domains/SingleProduct/index.js";
import SubHeader from "routesShop/components/SubHeader/index.js";

class SingleProduct extends Component {
  componentDidMount() {
    if (
      this.props.productsList &&
      Object.keys(this.props.productsList).length < 1
    ) {
      this.props.getProductsList();
    }
  }

  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader></SubHeader>
        <Product
          prodList={this.props.productsList}
          className="openedProduct"
        ></Product>
      </div>
    );
  }
}

const mpStP = (state) => ({
  productsList: state.shop.productsList,
});
export default connect(mpStP, ShopActions)(SingleProduct);

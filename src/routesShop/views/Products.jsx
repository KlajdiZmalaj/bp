import React, { Component } from "react";
import { Header } from "shared-components";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";

import AllProducts from "routesShop/domains/Products/index.js";
import SubHeader from "routesShop/components/SubHeader/index.js";

class Products extends Component {
  componentDidMount() {
    this.props.getProductsList();
  }
  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader></SubHeader>
        <AllProducts prodList={this.props.productsList}></AllProducts>
      </div>
    );
  }
}
const mpStP = (state) => ({
  productsList: state.shop.productsList,
});
export default connect(mpStP, ShopActions)(Products);

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
    this.props.getBrands();
  }

  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader></SubHeader>
        <AllProducts
          prodList={this.props.productsList}
          brands={this.props.brands}
        ></AllProducts>
      </div>
    );
  }
}
const mpStP = (state) => ({
  productsList: state.shop.productsList,
  brands: state.shop.brands,
});
export default connect(mpStP, ShopActions)(Products);

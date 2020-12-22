import React, { Component } from "react";
import { Header } from "shared-components";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";

import AllProducts from "routesShop/domains/ProdBycategory/index.js";
import SubHeader from "routesShop/components/SubHeader/index.js";

class ProdBycategory extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader cat={this.props.categories}></SubHeader>

        <AllProducts
          prodList={this.props.productsList}
          brands={this.props.brands}
          categories={this.props.categories}
        ></AllProducts>
      </div>
    );
  }
}
const mpStP = (state) => ({
  productsList: state.shop.productsList,
  brands: state.shop.brands,
  categories: state.shop.categories,
});
export default connect(mpStP, ShopActions)(ProdBycategory);

import React, { Component } from "react";
import { Header } from "shared-components";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";

import AllProducts from "routesShop/domains/Products/index.js";
import SubHeader from "routesShop/components/SubHeader/index.js";

class Products extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.setCategory(null);
    this.props.setManufacturer(null);
    this.props.getDefaultProducts();
    this.props.openProducts(false);
  }

  render() {
    return (
      <div className="products">
        <Header></Header>
        <SubHeader cat={this.props.categories}></SubHeader>
        <AllProducts
          brands={this.props.brands}
          defaultProducts={this.props.defaultProducts}
          categories={this.props.categories}
          getProductsList={this.props.getProductsList}
          setCategory={this.props.setCategory}
        ></AllProducts>
      </div>
    );
  }
}
const mpStP = (state) => ({
  productsList: state.shop.productsList,
  brands: state.shop.brands,
  categories: state.shop.categories,
  defaultProducts: state.shop.defaultProducts,
});
export default connect(mpStP, ShopActions)(Products);

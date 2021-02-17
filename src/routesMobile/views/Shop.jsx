import React from "react";
import {
  Header,
  // , Footer
  ShopBottomMenu,
  ShopMenuLeft,
} from "shared-componentsMobile";
import AllProducts from "routesShop/domains/Products/index.js";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { AnimatedMenu } from "shared-components";
class Shop extends React.Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.setCategory(null);
    this.props.setManufacturer(null);
    this.props.getDefaultProducts();
    this.props.openProducts(false);
  }
  render() {
    return (
      <div className="shopMobile">
        <AnimatedMenu activeM={5} />
        {/* <ShopBottomMenu active="" /> */}
        <ShopMenuLeft />
        <AllProducts
          isMobile={true}
          brands={this.props.brands}
          defaultProducts={this.props.defaultProducts}
          categories={this.props.categories}
          getProductsList={this.props.getProductsList}
          setCategory={this.props.setCategory}
        />
        {/* <Footer /> */}
        <Header />
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
export default connect(mpStP, ShopActions)(Shop);

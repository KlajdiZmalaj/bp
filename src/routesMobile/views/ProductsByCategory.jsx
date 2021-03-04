import React from "react";
import {
  Header,
  // , Footer
  // ShopBottomMenu,
  ShopMenuLeft,
} from "shared-componentsMobile";
import AllProducts from "routesShop/domains/ProdBycategory/index.js";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { AnimatedMenu } from "shared-components";

class ProdBycategory extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <div className="shopMobile">
        <AnimatedMenu activeM={5} />
        <ShopMenuLeft />
        <AllProducts
          prodList={this.props.productsList}
          brands={this.props.brands}
          categories={this.props.categories}
          isMobile={true}
        ></AllProducts>
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
});
export default connect(mpStP, ShopActions)(ProdBycategory);

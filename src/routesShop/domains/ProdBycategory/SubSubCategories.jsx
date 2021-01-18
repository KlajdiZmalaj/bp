import React, { Component } from "react";

import ShopActions from "redux-store/models/shop";

import { connect } from "react-redux";

class SubCategories extends Component {
  render() {
    const { item, catg, subcatg, isSelectedSSC } = this.props;

    return (
      <div
        className={
          "subCategories" + (isSelectedSSC === item.name ? " active" : "")
        }
        onClick={() => {
          this.props.getProductsList(
            null,
            null,
            catg,
            item.name,
            this.props.orderVal,
            this.props.sliderVal,
            null,
            subcatg
          );
          this.props.setSubSubCategory(item.name);
          this.props.setManufacturer(null);
        }}
      >
        {item.name}
      </div>
    );
  }
}
const mpStP = (state) => ({
  productsList: state.shop.productsList,
  product: state.shop.productD,
  isSelected: state.shop.isSelectedManufacturer,
  isSelectedSSC: state.shop.isSelectedSubSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});
export default connect(mpStP, ShopActions)(SubCategories);

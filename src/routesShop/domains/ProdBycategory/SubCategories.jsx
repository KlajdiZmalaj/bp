import React, { Component } from "react";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

class SubCategories extends Component {
  render() {
    const { item, isSelectedSC } = this.props;
    return (
      <div
        className={
          "subCategories" + (isSelectedSC === item.name ? " active" : "")
        }
        onClick={() => {
          this.props.getProductsList(
            null,
            null,
            this.props.isSelectedC,
            item.name,
            this.props.orderVal,
            null
          );
          this.props.setSubCategory(item.name);
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
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});
export default connect(mpStP, ShopActions)(SubCategories);

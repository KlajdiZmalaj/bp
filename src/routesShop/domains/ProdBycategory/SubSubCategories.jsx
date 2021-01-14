import React, { Component } from "react";

import ShopActions from "redux-store/models/shop";

import { connect } from "react-redux";

class SubCategories extends Component {
  state = {
    isSelected: null,
  };

  selSubSub = (val) => {
    this.setState({ isSelected: val });
  };

  render() {
    const { item, catg, subcatg } = this.props;
    const { isSelected } = this.state;

    return (
      <div
        className={
          "subCategories" + (isSelected === item.name ? " active" : "")
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
          this.selSubSub(item.name);
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
  isSelectedSC: state.shop.isSelectedSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});
export default connect(mpStP, ShopActions)(SubCategories);

import React, { Component } from "react";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import SubSubCategories from "./SubSubCategories";

class SubCategories extends Component {
  state = {
    isOpen: true,
  };

  render() {
    const { item, isSelectedSC, catg } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        className={
          "subCategories" + (isSelectedSC === item.name ? " active" : "")
        }
      >
        {isOpen ? (
          <i
            className="fas fa-caret-down"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          ></i>
        ) : (
          <i
            className="fas fa-caret-right"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          ></i>
        )}
        <span
          onClick={() => {
            this.props.getProductsList(
              null,
              null,
              this.props.isSelectedC,
              null,
              this.props.orderVal,
              null,
              null,
              item.name
            );
            this.props.setSubCategory(item.name);
          }}
        >
          {item.name}
        </span>

        {isOpen &&
          item.subcategories &&
          Object.keys(item.subcategories).map((subitem, index) => {
            return (
              <SubSubCategories
                key={index}
                item={item.subcategories[subitem]}
                catg={catg}
                subcatg={item.name}
              ></SubSubCategories>
            );
          })}
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

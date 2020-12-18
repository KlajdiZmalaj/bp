import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

class SubHeader extends Component {
  render() {
    const { cat, isSelected } = this.props;

    return (
      <div className="subheader maxWidth">
        <div className="categories">
          <div
            className={
              "categories__category" + (isSelected === null ? " active" : "")
            }
            onClick={() => {
              this.props.getProductsList();
              this.props.setCategory(null);
            }}
          >
            Tutti
          </div>
          {cat &&
            Object.keys(cat).map((item, index) => {
              return (
                <div
                  className={
                    "categories__category" +
                    (isSelected === cat[item] ? " active" : "")
                  }
                  key={index}
                  onClick={() => {
                    this.props.getProductsList(null, null, cat[item]);
                    this.props.setCategory(cat[item]);
                  }}
                >
                  <span className={cat[item].toLowerCase()}></span> {cat[item]}
                </div>
              );
            })}
        </div>
        <div className="cart"></div>
      </div>
    );
  }
}
const mpStP = (state) => ({
  isSelected: state.shop.isSelectedCategory,
});
export default connect(mpStP, ShopActions)(SubHeader);

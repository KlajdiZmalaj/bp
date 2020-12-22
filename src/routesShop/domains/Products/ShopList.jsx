import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
class ShopList extends Component {
  render() {
    const { brands, isSelected, orderVal } = this.props;

    return (
      <div className="shopList maxWidth">
        <div
          className={"shopList__item" + (isSelected === null ? " active" : "")}
          onClick={() => {
            this.props.getProductsList();
            this.props.setManufacturer(null);
          }}
        >
          Tutti
        </div>
        {brands &&
          Object.keys(brands).map((item, index) => {
            return (
              <div
                key={index}
                className={
                  "shopList__item" +
                  (isSelected === brands[item].name ? " active" : "")
                }
                onClick={() => {
                  this.props.getProductsList(
                    null,
                    brands[item].name,
                    null,
                    null,
                    orderVal
                  );
                  this.props.setManufacturer(brands[item].name);
                }}
              >
                <img
                  src={brands[item].image}
                  alt={brands[item].name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                ></img>
                {/* {brands[item].name} */}
              </div>
            );
          })}
        {/* {shop.map((item, index) => {
          return (
            <div key={index} className="shopList__item">
              <img src={item} alt=""></img>
            </div>
          );
        })} */}
      </div>
    );
  }
}

const mpStP = (state) => ({
  productsList: state.shop.productsList,
  isSelected: state.shop.isSelectedManufacturer,
  orderVal: state.shop.orderVal,
});

export default connect(mpStP, ShopActions)(ShopList);

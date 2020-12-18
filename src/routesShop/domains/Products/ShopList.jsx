import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
class ShopList extends Component {
  render() {
    const { brands, isSelected } = this.props;
    console.log("brands", brands);
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
                  this.props.getProductsList(null, brands[item].name);
                  this.props.setManufacturer(brands[item].name);
                }}
              >
                <img
                  src={brands[item].image}
                  alt={brands[item].name}
                  // onError="this.onerror=null; this.src=''"
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
});

export default connect(mpStP, ShopActions)(ShopList);

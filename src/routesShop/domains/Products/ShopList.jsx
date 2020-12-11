import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
class ShopList extends Component {
  state = {
    isSelected: 999,
  };
  selectBrand = (id) => {
    this.setState({ isSelected: id });
  };
  render() {
    // const shop = [
    //   images.adidas,
    //   images.zara,
    //   images.nike,
    //   images.lacoste,
    //   images.calvinClein,
    //   images.philipPlein,
    // ];
    const { isSelected } = this.state;
    const { brands } = this.props;

    return (
      <div className="shopList maxWidth">
        <div
          className={"shopList__item" + (isSelected === 999 ? " active" : "")}
          onClick={() => {
            this.props.getProductsList();
            this.selectBrand(999);
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
                  "shopList__item" + (isSelected === index ? " active" : "")
                }
                onClick={() => {
                  this.props.getProductsList(null, brands[item]);
                  this.selectBrand(index);
                }}
              >
                {brands[item]}
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
});

export default connect(mpStP, ShopActions)(ShopList);

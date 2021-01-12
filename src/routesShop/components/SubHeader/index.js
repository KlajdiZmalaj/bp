import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

class SubHeader extends Component {
  componentDidMount() {
    const catProduct = this.props.match.params.cat;
    if (catProduct) {
      this.props.setCategory(catProduct.replace("__", " | "));
    }
    this.props.getItemsCart();
  }

  render() {
    const { cat, isSelected, itemsCart } = this.props;
    let cartItems = 0;
    let cart = get(itemsCart, "cart", {});
    cartItems = Object.keys(cart).length;

    return (
      <div className="subheader">
        <div className="maxWidth">
          <div className="categories">
            <div
              className={
                "categories__category tutti" +
                (isSelected === null ? " active" : "")
              }
              onClick={() => {
                this.props.history.push("/products");
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
                      this.props.history.push(
                        `/product-filtered/${cat[item].split(" | ")[0]}__${
                          cat[item].split(" | ")[1]
                        }`
                      );
                    }}
                  >
                    <div className={cat[item].toLowerCase()}></div>
                    {cat[item].split("|")[0]}
                    <p> {cat[item].split("|")[1]}</p>
                  </div>
                );
              })}
          </div>
          <div
            className="cart"
            onClick={() => this.props.history.push("/shop-cart")}
          >
            Cart: <span className="cart__nr">{cartItems}</span>
            <i className="fal fa-shopping-cart"></i>
          </div>
        </div>
      </div>
    );
  }
}
const mpStP = (state) => ({
  isSelected: state.shop.isSelectedCategory,
  itemsCart: state.shop.itemsCart,
});
export default withRouter(connect(mpStP, ShopActions)(SubHeader));

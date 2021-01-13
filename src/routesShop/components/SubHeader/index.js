import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";
import { withRouter } from "react-router-dom";
import { get, isObject } from "lodash";

class SubHeader extends Component {
  state = {
    isOpenCat: false,
    itemS: null,
  };
  componentDidMount() {
    const catProduct = this.props.match.params.cat;
    if (catProduct) {
      this.props.setCategory(catProduct.replace("__", " | "));
    }
    this.props.getItemsCart();
    console.log("this.props", this.props.cat);
  }
  setIsShown = (n) => {
    this.setState({ isOpenCat: n });
  };
  // getProdCat = (cat) => {
  //   this.props.getProdCat(cat);
  //   console.log("cat", cat);
  // };
  render() {
    const { cat, isSelected, itemsCart, prodCat } = this.props;
    let { itemS } = this.state;

    let cartItems = 0;
    let cart = get(itemsCart, "cart", {});
    cartItems = Object.keys(cart).length;

    if (itemS === null) itemS = Object.keys(cat)[0];

    return (
      <div className="subheader" onMouseLeave={() => this.setIsShown(false)}>
        {this.state.isOpenCat && (
          <div className="categOpened">
            <div className="maxWidth">
              <div className="categories">
                {cat &&
                  isObject(cat) &&
                  Object.keys(cat).map((item, index) => {
                    return (
                      <div
                        className={
                          "categories__category" +
                          (isSelected === cat[item].name ? " active" : "")
                        }
                        key={index}
                        onMouseEnter={() => this.setState({ itemS: item })}
                        onClick={() => {
                          this.props.getProductsList(null, null, cat[item]);
                          this.props.setCategory(cat[item].name);
                          this.props.history.push(
                            `/product-filtered/${
                              cat[item].name.split(" | ")[0]
                            }__${cat[item].name.split(" | ")[1]}`
                          );
                        }}
                      >
                        <div className={cat[item]?.name.toLowerCase()}>
                          {cat[item]?.name}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="subCatgegories">
                <div className="subCategory">
                  {cat[itemS] &&
                    Object.keys(cat[itemS].subcategories).map(
                      (subitem, subIndex) => {
                        let sub = cat[itemS].subcategories;
                        return (
                          <div key={subIndex} className="subCategory__item">
                            <i className="far fa-chevron-right"></i>
                            {sub[subitem].name}
                          </div>
                        );
                      }
                    )}
                </div>
                <img src={cat[itemS]?.url}></img>
              </div>
              <div className="brands">brands</div>
            </div>
          </div>
        )}

        <div className="maxWidth">
          {/* <div className="opencategories">
            <i className="fas fa-bars"></i>
            Categories:
          </div> */}

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
              <i className="fas fa-home"></i>
            </div>
            {cat &&
              Object.keys(cat).map((item, index) => {
                return (
                  <div
                    className={
                      "categories__category" +
                      (isSelected === cat[item].name ? " active" : "")
                    }
                    key={index}
                    onMouseEnter={() => this.setIsShown(true)}
                    // onMouseLeave={() => this.setIsShown(false)}
                    onClick={() => {
                      this.props.getProductsList(null, null, cat[item].name);
                      this.props.setCategory(cat[item].name);
                      this.props.history.push(
                        `/product-filtered/${
                          cat[item]?.name?.split(" | ")[0]
                        }__${cat[item]?.name?.split(" | ")[1]}`
                      );
                    }}
                  >
                    <div>
                      {cat[item]?.name?.split("|")[0]}
                      <p> {cat[item]?.name?.split("|")[1]}</p>
                    </div>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                );
              })}
            {/* {cat &&
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
              })} */}
          </div>

          <div
            className="cart"
            onClick={() => this.props.history.push("/shop-cart")}
          >
            <span>
              Preferiti: <span className="cart__nr">0</span>
              <i className="fal fa-heart"></i>
            </span>
            <span onClick={() => this.props.history.push("/shop-cart")}>
              Cart: <span className="cart__nr">{cartItems}</span>
              <i className="fal fa-shopping-cart"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const mpStP = (state) => ({
  isSelected: state.shop.isSelectedCategory,
  itemsCart: state.shop.itemsCart,
  prodCat: state.shop.prodCat,
});
export default withRouter(connect(mpStP, ShopActions)(SubHeader));

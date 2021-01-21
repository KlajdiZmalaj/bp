import React, { Component } from "react";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import "./style.css";
import { withRouter } from "react-router-dom";
import { get, isObject } from "lodash";
import Brand from "./Brand";

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
  }
  setIsShown = (n) => {
    this.setState({ isOpenCat: n });
  };

  render() {
    const { cat, isSelected, itemsCart } = this.props;
    let { itemS } = this.state;

    let cartItems = 0;
    let cart = get(itemsCart, "cart", {});
    cartItems = Object.keys(cart).length;

    if (itemS === null) itemS = Object.keys(cat)[0];

    return (
      <div
        className={"subheader " + (this.state.isOpenCat ? "blur" : "")}
        onMouseLeave={() => this.setIsShown(false)}
      >
        {this.state.isOpenCat && (
          <div className="categOpened">
            <div
              className="maxWidth"
              onMouseLeave={() => this.setIsShown(false)}
            >
              <div className="categories">
                {cat &&
                  isObject(cat) &&
                  Object.keys(cat).map((item, index) => {
                    let url =
                      cat[item]?.name.split(" | ")[0] +
                      (cat[item]?.name.split(" | ")[1]
                        ? "__" + cat[item]?.name.split(" | ")[1]
                        : "");
                    return (
                      <div
                        className={
                          "categories__category" +
                          (isSelected === cat[item].name ? " active" : "")
                        }
                        key={index}
                        onMouseEnter={() => this.setState({ itemS: item })}
                        onClick={() => {
                          this.props.getProductsList(
                            null,
                            null,
                            cat[item].name
                          );
                          this.props.setCategory(cat[item].name);
                          this.props.setSubCategory(null);
                          this.props.setSubSubCategory(null);
                          this.props.setManufacturer(null);
                          this.props.history.push(`/product-filtered/${url}`);
                          this.props.openProducts(false);
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
                        let url =
                          cat[itemS]?.name.split(" | ")[0] +
                          (cat[itemS]?.name.split(" | ")[1]
                            ? "__" + cat[itemS]?.name.split(" | ")[1]
                            : "");
                        return (
                          <div
                            key={subIndex}
                            className="subCategory__item"
                            onClick={() => {
                              this.props.getProductsList(
                                null,
                                null,
                                cat[itemS].name,
                                null,
                                null,
                                null,
                                null,
                                sub[subitem].name
                              );
                              this.props.setCategory(cat[itemS].name);
                              this.props.setSubCategory(sub[subitem].name);
                              this.props.setSubSubCategory(null);
                              this.props.setManufacturer(null);

                              this.setIsShown(false);
                              this.props.history.push(
                                `/product-filtered/${url}`
                              );
                            }}
                          >
                            <i className="far fa-chevron-right"></i>
                            {sub[subitem].name}
                          </div>
                        );
                      }
                    )}
                </div>
                <img src={cat[itemS]?.url} alt={cat[itemS]?.name}></img>
              </div>
              <div className="brands">
                <div className="brands__title">Brands</div>
                <div className="brands__body">
                  {cat[itemS] &&
                    Object.keys(cat[itemS].brands).map((brand, index) => {
                      let brandi = cat[itemS].brands;
                      return (
                        <Brand
                          key={index}
                          getProductsList={this.props.getProductsList}
                          brand={brandi[brand]}
                          cat={cat}
                          itemS={itemS}
                          setIsShown={this.setIsShown}
                        ></Brand>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

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
              <i className="fas fa-home"></i>
            </div>
            <span
              className="categories__category openC"
              onMouseEnter={() => {
                this.setIsShown(true);
              }}
            >
              <i className="far fa-bars"></i>
              Categories
            </span>
          </div>

          <div className="cart">
            <span onClick={() => this.props.history.push("/shop-fav")}>
              {/* <span className="cart__nr">0</span> */}
              <i className="fal fa-heart"></i>
            </span>
            <span onClick={() => this.props.history.push("/shop-cart")}>
              <span className={"cart__nr" + (cartItems > 0 ? " red" : "")}>
                {cartItems}
              </span>
              <i
                className={
                  "fal fa-shopping-bag" + (cartItems > 0 ? " red" : "")
                }
              ></i>
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
});
export default withRouter(connect(mpStP, ShopActions)(SubHeader));

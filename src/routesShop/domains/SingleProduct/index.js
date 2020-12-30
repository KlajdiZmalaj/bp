import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { find } from "lodash";
import Slider from "react-slick";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select } from "antd";

const { Option } = Select;

class SingleProduct extends Component {
  state = {
    orderQuanity: 1,
    bigproduct: null,
    product: {},
    selectedColor: null,
    selectedSize: null,
    itemSelected: null,
  };
  changeBigProduct = (src) => {
    this.setState({ bigproduct: src });
  };

  componentDidMount() {
    const idProduct = this.props.match.params.id;
    const suppProduct = this.props.match.params.supp;

    let product = {};

    product = find(
      this.props.prodList && this.props.prodList.data,
      function (o) {
        return o.Product_id.toString() === idProduct.toString();
      }
    );

    this.props.getProductDetails(idProduct, suppProduct);
    this.setState({ product: product });
    this.setState({ itemSelected: product });
  }

  decreasevalue = () => {
    if (this.state.orderQuanity > 1) {
      this.setState({ orderQuanity: this.state.orderQuanity - 1 });
    }
  };

  increasevalue = () => {
    this.setState({ orderQuanity: this.state.orderQuanity + 1 });
  };

  handleChangeColour = (e) => {
    this.setState({ selectedColor: e });
  };

  handleChangeSize = (e) => {
    this.setState({ selectedSize: e });
  };

  handleProduct = (item) => {
    this.setState({ itemSelected: item });
  };

  addTocart = () => {
    let idProd = this.props.product.Product_id;
    if (
      this.props.product.Models &&
      Object.keys(this.props.product.Models).length > 0
    ) {
      idProd = this.state.itemSelected.id;
    }

    let products =
      JSON.parse(localStorage.getItem("shopProducts")) !== null
        ? JSON.parse(localStorage.getItem("shopProducts"))
        : [];

    products.push({
      product_id: idProd,
      product_quantity: this.state.orderQuanity,
    });

    localStorage.setItem("shopProducts", JSON.stringify(products));
    this.props.setCart(products);
    this.props.getToCart(
      this.props.product.prd_supp,
      idProd,
      "cart",
      this.state.orderQuanity
    );
  };

  render() {
    const { product, match } = this.props;
    const {
      orderQuanity,
      bigproduct,
      selectedColor,
      selectedSize,
    } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
    };

    return (
      <div className="prod">
        <div className="single maxWidth">
          <p className="gobackBtns">
            <a href="/#">Home</a> <i className="far fa-chevron-right"></i>{" "}
            <a href="#/products"> {product && product.Product_Manufacturer}</a>
            <i className="far fa-chevron-right"></i>{" "}
            {product && product.Product_Name}
          </p>

          {product && Object.keys(product).length > 0 && (
            <div className="detailsP">
              <div className="images">
                <div className="images__other">
                  <Slider {...settings}>
                    {Object.keys(product.Photos).map((photo, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            this.changeBigProduct(product.Photos[photo]);
                          }}
                        >
                          <img src={product.Photos[photo]} alt="" />
                        </div>
                      );
                    })}
                  </Slider>
                </div>

                <div className="images__big">
                  {!bigproduct ? (
                    <img src={product.Photos["Product_Image_1"]} alt="" />
                  ) : (
                    <img src={bigproduct} alt="" />
                  )}
                </div>
              </div>
              <div className="description">
                {product.Product_Manufacturer}
                <div className="title">
                  <span className="text-uppercase">{product.Product_Name}</span>
                  - {product.Product_SubCategory}
                </div>
                <div className="price marginBottom">
                  {product.Product_Price} €
                </div>
                <div className="borderB marginBottom"></div>
                <div className="description__text marginBottom">
                  <div className="label pb-1"> descrizione</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.Product_Description,
                    }}
                  ></div>
                </div>
                <div className="borderB marginBottom"></div>
                <div className="properties marginBottom">
                  <div className="prop1">
                    <p>
                      <span className="label">Categoria: </span>
                      {product.Product_MainCategory}
                    </p>
                    <p>
                      <span className="label">SubCategoria: </span>
                      {product.Product_SubCategory}
                    </p>
                    {product.Product_Weight && (
                      <p>
                        <span className="label">Peso: </span>
                        {product.Product_Weight}
                      </p>
                    )}
                  </div>

                  <div className="prop2">
                    {product.Product_MadeIn && (
                      <p>
                        <span className="label">Made in: </span>
                        {product.Product_MadeIn}
                      </p>
                    )}
                    {product.Product_Season && (
                      <p>
                        <span className="label">Stagione:</span>
                        {product.Product_Season}
                      </p>
                    )}
                    {product.Product_Model && (
                      <p>
                        <span className="label">Tipo: </span>
                        {product.Product_Model}
                      </p>
                    )}
                  </div>
                </div>
                {product.Models["colore"] && (
                  <div className="color text-uppercase pb-3">
                    Colour:
                    <Select
                      placeholder="Scegli un colore"
                      onChange={this.handleChangeColour}
                    >
                      <option value="" disabled selected>
                        Select your option
                      </option>
                      {product.Models["colore"] &&
                        product.Models["colore"].map((item, index) => {
                          return (
                            <Option
                              value={item.value}
                              key={index}
                              onClick={() => this.handleProduct(item)}
                            >
                              {item.value}
                            </Option>
                          );
                        })}
                    </Select>
                  </div>
                )}
                {product.Models["design"] && (
                  <div className="color text-uppercase pb-3">
                    Colour:
                    <Select
                      onChange={this.handleChangeColour}
                      placeholder="Scegli un colore"
                    >
                      {product.Models["design"] &&
                        product.Models["design"].map((item, index) => {
                          return (
                            <Option
                              value={item.value}
                              key={index}
                              onClick={() => this.handleProduct(item)}
                            >
                              {item.value}
                            </Option>
                          );
                        })}
                    </Select>
                  </div>
                )}

                {product.Models["taglia"] && (
                  <div className="size text-uppercase pb-3">
                    <div> Size:</div>

                    {selectedColor
                      ? product.Models["taglia"]
                          .filter((item) => item.parent_model === selectedColor)
                          .map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={
                                  "size__items" +
                                  (item.value === selectedSize ? " active" : "")
                                }
                                onClick={() => {
                                  this.handleChangeSize(item.value);
                                  this.handleProduct(item);
                                }}
                              >
                                {item.value}
                              </div>
                            );
                          })
                      : product.Models["taglia"].map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                "size__items" +
                                (item.value === selectedSize ? " active" : "")
                              }
                              onClick={() => {
                                this.handleChangeSize(item.value);
                                this.handleProduct(item);
                              }}
                            >
                              {item.value}
                            </div>
                          );
                        })}
                  </div>
                )}
                <div className="buy pb-3 text-uppercase">
                  <div className="addItem">
                    <div className="adjustContainer">
                      <div className="minus" onClick={this.decreasevalue}>
                        <i className="fal fa-chevron-left"></i>
                      </div>
                      <div className="amount">{orderQuanity}</div>
                      <div className="plus" onClick={this.increasevalue}>
                        <i className="fal fa-chevron-right"></i>
                      </div>
                    </div>
                    <div className="addTobag" onClick={this.addTocart}>
                      Add to bag <i className="fal fa-shopping-bag"></i>
                    </div>
                  </div>
                  <div
                    className="buyNow"
                    onClick={() => {
                      window.location.hash = `product-checkout/${match.params.id}/${match.params.supp}`;
                    }}
                  >
                    Buy now <i className="far fa-shopping-cart"></i>
                  </div>
                </div>
                <div className="availibillity">
                  Quantità Disponibili: <span>{product.Product_Quantity}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mpStP = (state) => ({
  productsList: state.shop.productsList,
  product: state.shop.productD,
});
export default withRouter(connect(mpStP, ShopActions)(SingleProduct));

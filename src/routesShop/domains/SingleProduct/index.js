import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { find, isObject } from "lodash";
import Slider from "react-slick";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Select, Radio, Form } from "antd";

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
    if (this.state.orderQuanity < this.props.product.Product_Quantity) {
      this.setState({ orderQuanity: this.state.orderQuanity + 1 });
    }
  };

  handleChangeColour = (e) => {
    this.setState({ selectedColor: e });
    this.setState({ selectedSize: null });
    this.props.form.resetFields();
  };

  handleChangeSize = (e) => {
    this.setState({ selectedSize: e });
  };

  handleProduct = (item) => {
    console.log("item", item);
    this.setState({ itemSelected: item });
  };

  addTocart = (cart) => {
    let idProd = this.props.product.Product_id;
    if (
      this.props.product.Models &&
      Object.keys(this.props.product.Models).length > 0
    ) {
      idProd = this.state.itemSelected.id;
    }
    this.props.getToCart(
      this.props.product.prd_supp,
      idProd,
      cart,
      this.state.orderQuanity
    );
  };
  handleSubmit = (e, buyNow) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (buyNow === "buyNow") {
          this.props.history.push("/shop-cart");
        }
        if (buyNow === "addFav") {
          this.addTocart("wish");
        }
        if (!buyNow) {
          this.addTocart("cart");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { product, productCart } = this.props;

    const {
      orderQuanity,
      bigproduct,
      selectedColor,
      selectedSize,
    } = this.state;

    const settings = {
      dots: false,
      speed: 500,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
    };

    return (
      product && (
        <div className="prod">
          <div className="single maxWidth">
            <p className="gobackBtns">
              <a href="/#">Home</a> <i className="far fa-chevron-right"></i>{" "}
              <a href="#/products">
                {" "}
                {product && product.Product_Manufacturer}
              </a>
              <i className="far fa-chevron-right"></i>{" "}
              {product && product.Product_Name}
            </p>

            {product && Object.keys(product).length > 0 && (
              <div className="detailsP">
                <div className="images">
                  <div className="images__other">
                    <Slider
                      {...settings}
                      slidesToShow={
                        Object.keys(product.Photos).length < 4
                          ? Object.keys(product.Photos).length
                          : 4
                      }
                    >
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
                  <div className="description__brand">
                    {product.Product_Manufacturer}
                  </div>
                  <div className="title">
                    <span className="text-uppercase">
                      {product.Product_Name}
                    </span>
                    - {product.Product_SubCategory}
                  </div>
                  <div
                    className="addToFav"
                    onClick={(e) => {
                      this.handleSubmit(e, "addFav");
                    }}
                  >
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="price marginBottom">
                    {this.props.product.Models &&
                    Object.keys(this.props.product.Models).length > 0 &&
                    this.state.itemSelected
                      ? this.state.itemSelected.price
                      : product.Product_Price_Special}
                    €
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
                  <Form onSubmit={this.handleSubmit}>
                    {product.Models &&
                      isObject(product.Models) &&
                      Object.keys(product.Models)
                        .filter((item) => item.toLowerCase() !== "taglia")
                        .map((item, index) => {
                          return (
                            <Form.Item key={index}>
                              <div className="color text-uppercase pb-3">
                                {item}:
                                {getFieldDecorator(item, {
                                  rules: [
                                    {
                                      required: true,
                                      message: `Scegli un ${item}`,
                                    },
                                  ],
                                })(
                                  <Select
                                    placeholder={`Scegli un ${item}`}
                                    onChange={this.handleChangeColour}
                                  >
                                    {product.Models[item] &&
                                      product.Models[item].map(
                                        (item, index) => {
                                          return (
                                            <Option
                                              value={item.value}
                                              key={index}
                                              onClick={() =>
                                                this.handleProduct(item)
                                              }
                                            >
                                              {item.value}
                                            </Option>
                                          );
                                        }
                                      )}
                                  </Select>
                                )}
                              </div>
                            </Form.Item>
                          );
                        })}

                    {product.Models["taglia"] && (
                      <Form.Item>
                        <div className="size text-uppercase pb-3">
                          <div> Taglia:</div>
                          {getFieldDecorator("Taglia", {
                            rules: [
                              {
                                required: true,
                                message: "Scegli una taglia",
                              },
                            ],
                          })(
                            <Radio.Group>
                              {selectedColor
                                ? product.Models["taglia"]
                                    .filter(
                                      (item) =>
                                        item.parent_model === selectedColor
                                    )
                                    .map((item, index) => {
                                      return (
                                        <Radio.Button
                                          value={item.value}
                                          className={
                                            "size__items" +
                                            (item.value === selectedSize
                                              ? " active"
                                              : "")
                                          }
                                          onClick={() => {
                                            this.handleChangeSize(item.value);
                                            this.handleProduct(item);
                                          }}
                                          key={index}
                                        >
                                          {item.value}
                                        </Radio.Button>
                                      );
                                    })
                                : product.Models["taglia"].map(
                                    (item, index) => {
                                      return (
                                        <Radio.Button
                                          key={index}
                                          value={item.value}
                                          className={
                                            "size__items" +
                                            (item.value === selectedSize
                                              ? " active"
                                              : "")
                                          }
                                          onClick={() => {
                                            this.handleChangeSize(item.value);
                                            this.handleProduct(item);
                                          }}
                                        >
                                          {item.value}
                                        </Radio.Button>
                                      );
                                    }
                                  )}
                            </Radio.Group>
                          )}
                        </div>
                      </Form.Item>
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

                        {productCart === "" ? (
                          <button className="addTobag" htmltype="submit">
                            Add to bag <i className="fal fa-shopping-bag"></i>
                          </button>
                        ) : (
                          <div className="addTobag active">
                            {productCart}{" "}
                            <i className="fal fa-shopping-bag"></i>
                          </div>
                        )}
                      </div>
                      <div
                        className="buyNow"
                        onClick={(e) => {
                          this.handleSubmit(e, "buyNow");
                          // window.location.hash = `product-checkout/${match.params.id}/${match.params.supp}`;
                        }}
                      >
                        Buy now <i className="far fa-shopping-cart"></i>
                      </div>
                    </div>
                    <div className="availibillity">
                      Quantità Disponibili:{" "}
                      <span>{product.Product_Quantity}</span>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    );
  }
}

const mapsStateToProps = (state) => ({
  product: state.shop.productD,
  productCart: state.shop.productCart,
});

export default withRouter(
  connect(mapsStateToProps, { ...ShopActions })(Form.create()(SingleProduct))
);

import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { find } from "lodash";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import "./style.css";

class SingleProduct extends Component {
  state = {
    id: null,
    supp: null,
    orderQuanity: 1,
    bigproduct: null,
    product: {},
  };
  changeBigProduct = (src) => {
    this.setState({ bigproduct: src });
  };

  componentDidMount() {
    const idProduct = this.props.match.params.id;
    const suppProduct = this.props.match.params.supp;
    this.setState({ id: idProduct });
    this.setState({ supp: suppProduct });

    let product = {};

    product = find(
      this.props.prodList && this.props.prodList.data,
      function (o) {
        return o.Product_id.toString() === idProduct.toString();
      }
    );

    this.props.getProductDetails(idProduct, suppProduct);
    this.setState({ product: product });
  }

  decreasevalue = () => {
    if (this.state.orderQuanity > 1) {
      this.setState({ orderQuanity: this.state.orderQuanity - 1 });
    }
  };
  increasevalue = () => {
    this.setState({ orderQuanity: this.state.orderQuanity + 1 });
  };
  render() {
    const { product } = this.props;
    const { orderQuanity, bigproduct } = this.state;

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
                  {product.Product_Description}
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
                      {product.Product_Category}
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
                    <select
                    // value={this.state.selectValue}
                    // onChange={this.handleChange}
                    >
                      {product.Models["colore"] &&
                        product.Models["colore"].map((item, index) => {
                          return (
                            <option value={item.value} key={index}>
                              {item.value}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}

                {product.Models["taglia"] && (
                  <div className="size text-uppercase pb-3">
                    <div> Size:</div>

                    {product.Models["taglia"].map((item, index) => {
                      return (
                        <div key={index} className="size__items">
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
                    <div className="addTobag">
                      Add to bag <i className="fal fa-shopping-bag"></i>
                    </div>
                  </div>
                  <div className="buyNow">
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

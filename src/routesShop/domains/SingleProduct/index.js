import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { find } from "lodash";

import "./style.css";

class SingleProduct extends Component {
  state = {
    id: null,
    orderQuanity: 1,
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
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
    const { prodList } = this.props;
    const { id, orderQuanity } = this.state;

    let product = {};
    product = find(prodList && prodList.data, function (o) {
      return parseInt(o.Product_id) === parseInt(id);
    });

    return (
      <div className="prod">
        <div className="single maxWidth">
          {product && Object.keys(product).length > 0 && (
            <div className="detailsP">
              <div className="images">
                <div className="images__other">
                  <div>
                    <img src={product.Product_Image_1} alt="" />
                  </div>
                  <div>
                    <img src={product.Product_Image_1} alt="" />
                  </div>
                  <div>
                    <img src={product.Product_Image_1} alt="" />
                  </div>
                </div>
                <div className="images__big">
                  <img src={product.Product_Image_1} alt="" />
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
                      <span className="label">Categoria:</span>
                      {product.Product_MainCategory}
                    </p>
                    <p>
                      {" "}
                      <span className="label">SubCategoria: </span>
                      {product.Product_SubCategory}
                    </p>
                    <p>
                      <span className="label">Peso: </span>
                      {product.Product_Weight}
                    </p>
                  </div>
                  <div className="prop2">
                    <p>
                      <span className="label">Made in: </span>
                      {product.Product_MadeIn}
                    </p>
                    <p>
                      <span className="label">Stagione:</span>
                      {product.Product_Season}
                    </p>
                    <p>
                      <span className="label">Tipo: </span>
                      {product.Product_Model}
                    </p>
                  </div>
                </div>
                <div className="color text-uppercase pb-3">
                  Colour:
                  <select
                  // value={this.state.selectValue}
                  // onChange={this.handleChange}
                  >
                    <option value={product.Product_Colour}>
                      {product.Product_Colour}
                    </option>
                  </select>
                </div>
                <div className="size text-uppercase pb-3">
                  <div> Size:</div>
                  {product.Models &&
                    product.Models.map((model, index) => {
                      return (
                        <div key={index} className="size__items">
                          {model.size}
                        </div>
                      );
                    })}
                </div>
                {/* <div className="buy pb-3">
                  <span>ttt</span>
                  <div className="adjustContainer">
                    <div className="minus" onClick={this.decreasevalue}>
                      <span>-</span>
                    </div>
                    <div className="amount">{orderQuanity}</div>
                    <div className="plus" onClick={this.increasevalue}>
                      <span>+</span>
                    </div>
                  </div>
                </div> */}
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

export default withRouter(SingleProduct);

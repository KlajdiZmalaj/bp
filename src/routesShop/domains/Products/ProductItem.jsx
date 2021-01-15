import React, { Component } from "react";

import "./style.css";

import { withRouter } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { item } = this.props;

    return (
      <div
        className="products__item"
        onClick={() => {
          this.props.history.push(
            `/product/${item.Product_id}/${item.prd_supp}`
          );
        }}
      >
        <div className="pBorder">
          <img src={item.Product_Image_1} alt=""></img>
        </div>
        <div className="name">{item.Product_Name}</div>
        <div className="price">€{item.Product_Price}</div>
      </div>
    );
  }
}

export default withRouter(ProductItem);

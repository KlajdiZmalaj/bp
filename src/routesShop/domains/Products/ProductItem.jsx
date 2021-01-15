import React, { Component } from "react";
import images from "themes/images";
import "./style.css";

// import ShopList from "./ShopList";
import BestSeller from "./BestSeller";
import PromotionBottom from "./PromotionBottom";
import PromotionTop from "./PromotionTop";

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

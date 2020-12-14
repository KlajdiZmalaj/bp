import React, { Component } from "react";
import images from "themes/images";
import "./style.css";

import ShopList from "./ShopList";
import BestSeller from "./BestSeller";
import PromotionBottom from "./PromotionBottom";
import PromotionTop from "./PromotionTop";

import FlashDeals from "./FlashDeals";

class Products extends Component {
  render() {
    const { prodList, brands } = this.props;

    return (
      <div className="shopProd">
        <div className="mainBanner marginBottom">
          <img src={images.mainBanner} className="maxWidth" alt=""></img>
        </div>
        <div className="banners maxWidth">
          <div>
            <img src={images.bg1} alt=""></img>
          </div>
          <div>
            <img src={images.bg2} alt=""></img>
          </div>
          <div>
            <img src={images.bg3} alt=""></img>
          </div>
          <div>
            <img src={images.bg4} alt=""></img>
          </div>
        </div>

        <ShopList brands={brands}></ShopList>
        <BestSeller prodList={prodList}></BestSeller>
        <PromotionTop></PromotionTop>
        <FlashDeals></FlashDeals>
        <PromotionBottom></PromotionBottom>
        <BestSeller prodList={prodList}></BestSeller>
      </div>
    );
  }
}

export default Products;

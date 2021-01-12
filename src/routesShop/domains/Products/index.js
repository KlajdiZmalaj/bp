import React, { Component } from "react";
import images from "themes/images";
import "./style.css";

import ShopList from "./ShopList";
import BestSeller from "./BestSeller";
import PromotionBottom from "./PromotionBottom";
import PromotionTop from "./PromotionTop";

import FlashDeals from "./FlashDeals";

import { withRouter } from "react-router-dom";

class Products extends Component {
  render() {
    const { prodList, brands, categories } = this.props;

    return (
      <div className="shopProd">
        <div className="mainBanner marginBottom">
          <img src={images.mainBanner} className="maxWidth" alt=""></img>
        </div>
        <div className="title maxWidth">categorie</div>
        <div className="banners maxWidth">
          {categories &&
            Object.keys(categories).map((item, index) => {
              return (
                <div
                  key={index}
                  className={`categoriesP  ${item}`}
                  onClick={() => {
                    this.props.getProductsList(null, null, categories[item]);
                    this.props.setCategory(categories[item]);
                    this.props.history.push(
                      `/product-filtered/${categories[item].split(" | ")[0]}__${
                        categories[item].split(" | ")[1]
                      }`
                    );
                  }}
                >
                  <div className="text">
                    {categories[item].split(" | ")[0]}
                    <b>{categories[item].split(" | ")[1]}</b>
                  </div>

                  <img src={images[item]} alt=""></img>
                </div>
              );
            })}
        </div>

        <ShopList brands={brands}></ShopList>
        <BestSeller prodList={prodList} title="New arrivals"></BestSeller>
        <PromotionTop></PromotionTop>
        <FlashDeals></FlashDeals>
        <PromotionBottom></PromotionBottom>
        <FlashDeals></FlashDeals>
      </div>
    );
  }
}

export default withRouter(Products);

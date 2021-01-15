import React, { Component } from "react";
import images from "themes/images";
import "./style.css";

// import ShopList from "./ShopList";
// import BestSeller from "./BestSeller";
import PromotionBottom from "./PromotionBottom";
import PromotionTop from "./PromotionTop";

import { withRouter } from "react-router-dom";

import ProductItem from "./ProductItem";

class Products extends Component {
  render() {
    const { defaultProducts, categories } = this.props;

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
                    this.props.getProductsList(
                      null,
                      null,
                      categories[item].name
                    );
                    this.props.setCategory(categories[item].name);
                    this.props.history.push(
                      `/product-filtered/${
                        categories[item]?.name?.split(" | ")[0]
                      }__${categories[item]?.name?.split(" | ")[1]}`
                    );
                  }}
                >
                  <div className="text">
                    {categories[item]?.name?.split(" | ")[0]}
                    <b>{categories[item]?.name?.split(" | ")[1]}</b>
                  </div>

                  <img src={images[item]} alt=""></img>
                </div>
              );
            })}
        </div>

        {/* <ShopList brands={brands}></ShopList> */}
        <div className="maxWidth">
          <div className="bestSeller paddingBottom">
            {Object.keys(defaultProducts).map((item) => {
              const prod = defaultProducts[item];
              return (
                <div className="homeProd" key={item}>
                  <div className="filtersCateg text-uppercase">
                    {categories[item]?.name}
                  </div>
                  <div className="products">
                    {prod.map((subItem, index) => {
                      return (
                        <ProductItem item={subItem} key={index}></ProductItem>
                      );
                    })}
                  </div>
                  <div
                    className="viewMore"
                    onClick={() => {
                      this.props.getProductsList(
                        null,
                        null,
                        categories[item]?.name
                      );
                      this.props.setCategory(categories[item]?.name);
                      this.props.history.push(
                        `/product-filtered/${
                          categories[item]?.name?.split(" | ")[0]
                        }__${categories[item]?.name?.split(" | ")[1]}`
                      );
                    }}
                  >
                    Vedi tutti
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <PromotionTop></PromotionTop>
        {/* <FlashDeals></FlashDeals> */}
        <PromotionBottom></PromotionBottom>
        {/* <FlashDeals></FlashDeals> */}
      </div>
    );
  }
}

export default withRouter(Products);

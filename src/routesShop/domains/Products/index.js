import React, { Component } from "react";
import images from "themes/images";
import "./style.css";
import { Loader } from "shared-components";
// import ShopList from "./ShopList";
// import BestSeller from "./BestSeller";
// import PromotionBottom from "./PromotionBottom";
// import PromotionTop from "./PromotionTop";

import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import { connect } from "react-redux";
class Products extends Component {
  state = {
    tagSelected: "",
  };
  clickBannerHandler = (id) => {
    window.location.hash = `products/${id}`;
    let el = document.querySelector(".homeProd");
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  render() {
    const { defaultProducts, categories, isMobile, shopTags } = this.props;
    const { tagSelected } = this.state;
    const tagParam = this.props.match.params.tag;

    return (
      <div className="shopProd">
        {!isMobile && (
          <div className="mainBanner marginBottom">
            <Slider
              {...{
                dots: true,
                speed: 500,
                infinite: true,
                autoplay: true,
                slidesToScroll: 1,
                draggable: false,
              }}
              className="catgItems__items maxWidth"
            >
              <img
                onClick={(e) => {
                  e.preventDefault();
                  this.clickBannerHandler("sportivi%20/%20in%20forma");
                }}
                src={images.mainBanner2}
                alt=""
              ></img>
              <img
                onClick={(e) => {
                  e.preventDefault();
                  this.clickBannerHandler("comodità%20/%20essere%20comodi");
                }}
                src={images.mainBanner3}
                alt=""
              ></img>
            </Slider>
          </div>
        )}

        <div className="title maxWidth">categorie</div>
        <div className="banners maxWidth">
          {categories &&
          categories.hasOwnProperty("offerterefurbished") ? null : (
            <div className="categoriesP offerterefurbished">
              <div className="text">
                Outlet<b>Offerte</b>
              </div>
              <img src={images["offerterefurbished"]} alt="" />
            </div>
          )}
          {categories &&
            Object.keys(categories).map((item, index) => {
              let url =
                categories[item]?.name?.split(" | ")?.[0] +
                (categories[item]?.name?.split(" | ")?.[1]
                  ? "__" + categories[item]?.name?.split(" | ")?.[1]
                  : "");
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
                    this.props.history.push(`/product-filtered/${url}`);
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
        {!isMobile && (
          <div className="shopTags maxWidth">
            {Object.keys(shopTags).map((tagKey) => (
              <span
                key={tagKey}
                className={tagSelected === tagKey ? "active" : ""}
                onClick={() => {
                  window.location.hash = `products/${shopTags[tagKey]}`;
                  this.setState({ tagSelected: tagKey });
                }}
              >
                {shopTags[tagKey]}
              </span>
            ))}
          </div>
        )}

        {/* <ShopList brands={brands}></ShopList> */}
        <div className="maxWidth">
          <div className="bestSeller paddingBottom">
            {Object.keys(defaultProducts).length < 1 ? (
              <Loader></Loader>
            ) : (
              Object.keys(defaultProducts).map((item) => {
                const prod = defaultProducts[item];
                let url =
                  categories[item]?.name?.split(" | ")?.[0] +
                  (categories[item]?.name?.split(" | ")?.[1]
                    ? "__" + categories[item]?.name?.split(" | ")?.[1]
                    : "");
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
                          `/product-filtered/${url}/${tagParam ? tagParam : ""}`
                        );
                      }}
                    >
                      Vedi tutti
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* <PromotionTop></PromotionTop> */}
        {/* <FlashDeals></FlashDeals> */}
        {/* <PromotionBottom></PromotionBottom> */}
        {/* <FlashDeals></FlashDeals> */}
      </div>
    );
  }
}

export default withRouter(
  connect(({ shop: { shopTags } }) => ({
    shopTags,
  }))(Products)
);

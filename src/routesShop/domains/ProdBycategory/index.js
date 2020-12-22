import React, { Component } from "react";

import "./style.css";
import BestSeller from "routesShop/domains/Products/BestSeller";

import { withRouter } from "react-router-dom";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import { Slider } from "antd";
import { get } from "lodash";

import Categories from "./Categories";

class ProdBycategory extends Component {
  state = {
    isOpenSlide: false,
    isOpenBrands: false,
    brandSelected: null,
  };

  componentDidMount() {
    const catProduct = this.props.match.params.cat;
    this.props.getProductsList(
      null,
      null,
      catProduct && catProduct.replace("__", " | ")
    );
  }

  handleChange = (event) => {
    this.props.setOrderVal(event.target.value);
    this.props.getProductsList(
      null,
      this.props.isSelected,
      this.props.isSelectedC,
      this.props.isSelectedSC,
      event.target.value,
      this.props.sliderVal
    );
  };

  openSlide = () => {
    this.setState({ isOpenSlide: !this.state.isOpenSlide });
  };

  openBrands = () => {
    this.setState({ isOpenBrands: !this.state.isOpenBrands });
  };

  handleChangeSlider = (event) => {
    this.props.setSliderVal(event);
  };

  filterByRange = () => {
    this.props.getProductsList(
      null,
      this.props.isSelected,
      this.props.isSelectedC,
      this.props.isSelectedSC,
      this.props.orderVal,
      this.props.sliderVal
    );
  };

  search = (event) => {
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      this.props.getProductsList(
        null,
        null,
        this.props.isSelectedC,
        this.props.isSelectedSC,
        this.props.orderVal,
        this.props.sliderVal,
        event.target.value
      );
    }
  };

  render() {
    const { prodList, orderVal } = this.props;
    const { isOpenSlide, isOpenBrands, brandSelected } = this.state;

    const brands = get(prodList, "category_info.brands");

    const subcategories = get(prodList, "category_info.subcategories");

    return (
      <div className="shopProd">
        <div className="filters">
          <div className="filters__items">
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                onChange={this.search}
              ></input>
              <i className="far fa-search"></i>
            </div>

            <div className="right">
              <div className="itemFilter">
                <div className="price" onClick={this.openBrands}>
                  Brands
                  {!isOpenBrands ? (
                    <i className="fas fa-chevron-down"></i>
                  ) : (
                    <i className="fas fa-chevron-up"></i>
                  )}
                </div>
                <div
                  className={
                    "price_Options brands" + (!isOpenBrands ? " hidden" : "")
                  }
                >
                  {brands &&
                    Object.keys(brands).map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "brands__item" +
                            (brandSelected === item ? " active" : "")
                          }
                          onClick={() => {
                            this.props.getProductsList(
                              null,
                              brands[item].name,
                              this.props.isSelectedC,
                              this.props.isSelectedSC,
                              this.props.orderVal,
                              this.props.sliderVal
                            );
                            this.props.setManufacturer(brands[item].name);
                            this.setState({ brandSelected: item });
                          }}
                        >
                          <img
                            src={brands[item].image}
                            alt={brands[item].name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                          ></img>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="itemFilter">
                <div className="price" onClick={this.openSlide}>
                  Price
                  {!isOpenSlide ? (
                    <i className="fas fa-chevron-down"></i>
                  ) : (
                    <i className="fas fa-chevron-up"></i>
                  )}
                </div>
                <div
                  className={"price_Options" + (!isOpenSlide ? " hidden" : "")}
                >
                  <Slider
                    min={0}
                    max={prodList && Math.ceil(prodList.highest_price)}
                    range
                    onChange={this.handleChangeSlider}
                  />
                  <button onClick={this.filterByRange}>Filter</button>
                </div>
              </div>
              <div className="order">
                <select
                  className="collection-layout__sort-order"
                  value={orderVal}
                  onChange={this.handleChange}
                >
                  <option value="">Newest Arrivals</option>
                  <option value="2">Price: High to Low</option>
                  <option value="1">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="catProd">
          <div className="catProd__categories">
            <div className="title">Categorie</div>
            {subcategories &&
              Object.keys(subcategories).map((item, index) => {
                return (
                  <Categories
                    key={index}
                    cat={subcategories[item]}
                  ></Categories>
                );
              })}
          </div>
          <BestSeller prodList={prodList} type="categories"></BestSeller>
        </div>
      </div>
    );
  }
}

const mpStP = (state) => ({
  productsList: state.shop.productsList,
  product: state.shop.productD,
  isSelected: state.shop.isSelectedManufacturer,
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});
export default withRouter(connect(mpStP, ShopActions)(ProdBycategory));

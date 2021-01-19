import React, { Component } from "react";

import "./style.css";
import BestSeller from "routesShop/domains/Products/BestSeller";

import { withRouter } from "react-router-dom";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

import { Slider, Select, Dropdown, Menu } from "antd";
import { filter, head } from "lodash";

import Categories from "./Categories";
import Brand from "./Brand";
import Slider2 from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const { Option } = Select;
class ProdBycategory extends Component {
  state = {
    highP: this.props.prodList.highest_price
      ? Math.ceil(this.props.prodList.highest_price)
      : null,
  };

  componentDidMount() {
    const catProduct = this.props.match.params.cat;
    this.props.getProductsList(
      null,
      null,
      catProduct && catProduct.replace("__", " | ")
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.prodList !== this.props.prodList) {
      this.setState({ highP: Math.ceil(this.props.prodList.highest_price) });
    }
  }
  handleChange = (event) => {
    this.props.setOrderVal(event);
    this.props.getProductsList(
      null, //page
      this.props.isSelected, //brand
      this.props.isSelectedC, //category
      this.props.isSelectedSSC, //subcategory
      event, //order
      this.props.sliderVal, //slider
      null, //search
      this.props.isSelectedSC //subcategory
    );
  };

  handleChangeSlider = (event) => {
    this.props.setSliderVal(event);
  };

  filterByRange = () => {
    this.props.getProductsList(
      null,
      this.props.isSelected,
      this.props.isSelectedC,
      this.props.isSelectedSSC,
      this.props.orderVal,
      this.props.sliderVal,
      null,
      this.props.isSelectedSC
    );
  };

  search = (event) => {
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      this.props.getProductsList(
        null, //page
        this.props.isSelected, //brand
        this.props.isSelectedC, //category
        this.props.isSelectedSSC, //subcategory
        this.props.orderVal, //order
        this.props.sliderVal, //slider
        event.target.value, //search
        this.props.isSelectedSC //subcategory
      );
    }
  };

  render() {
    const { prodList, categories, isSelectedC } = this.props;
    const { highP } = this.state;

    const settings = {
      dots: false,
      speed: 500,
      infinite: false,
      slidesToScroll: 1,
      slidesToShow: 7,
    };

    let filterCat = filter(categories, { name: isSelectedC });
    let brands = head(filterCat)?.brands;
    const subcategories = head(filterCat)?.subcategories;

    const menu = (
      <Menu className={"price_Options"}>
        <div>
          {highP && (
            <div className="range">
              {this.props.sliderVal.length === 0 ? (
                <p>
                  Price range Selected:
                  <span> €0 - €{highP}</span>
                </p>
              ) : (
                <p>
                  Price range Selected:
                  <span>
                    €{this.props.sliderVal[0]} - €{this.props.sliderVal[1]}
                  </span>
                </p>
              )}
              <button onClick={this.filterByRange}>Filter</button>
            </div>
          )}

          {highP && (
            <Slider
              min={0}
              max={highP}
              range={true}
              marks={{ 0: "0€", 1: `${highP}€` }}
              value={[this.props.sliderVal[0], this.props.sliderVal[1]]}
              defaultValue={[0, highP]}
              disabled={false}
              onChange={this.handleChangeSlider}
              included={true}
            />
          )}
        </div>
      </Menu>
    );

    const menuBrands = (
      <Menu className={"price_Options brands"}>
        <div
          onClick={() => {
            this.props.setManufacturer(null);
            this.props.getProductsList(
              null,
              null,
              this.props.isSelectedC,
              this.props.isSelectedSSC,
              this.props.orderVal,
              this.props.sliderVal,
              null,
              this.props.isSelectedSC
            );
          }}
          className="tutti"
        >
          Tutti Brands
        </div>
        {brands &&
          Object.keys(brands).map((item, index) => {
            return (
              <Brand
                key={index}
                getProductsList={this.props.getProductsList}
                setManufacturer={this.props.setManufacturer}
                brands={brands}
                item={item}
              ></Brand>
            );
          })}
      </Menu>
    );

    return (
      <div className="shopProd">
        <div className="catgItems">
          {subcategories && (
            <Slider2 {...settings} className="maxWidth">
              {Object.keys(subcategories).map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      this.props.setSubCategory(subcategories[item].name);
                      this.props.setSubSubCategory(null);
                      this.props.getProductsList(
                        null,
                        null,
                        this.props.isSelectedC,
                        null,
                        this.props.orderVal,
                        null,
                        null,
                        subcategories[item].name
                      );
                    }}
                  >
                    <span>{subcategories[item].name}</span>
                    <img src={subcategories[item].url} alt=""></img>
                  </div>
                );
              })}
            </Slider2>
          )}
        </div>
        <div className="filters maxWidth">
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
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                className="itemFilter"
              >
                <a className="price" onClick={(e) => e.preventDefault()}>
                  Price <i className="fas fa-chevron-down"></i>
                </a>
              </Dropdown>

              <Dropdown
                overlay={menuBrands}
                trigger={["click"]}
                className="itemFilter"
              >
                <a className="price" onClick={(e) => e.preventDefault()}>
                  {this.props.isSelected ? this.props.isSelected : "Brands"}{" "}
                  <i className="fas fa-chevron-down"></i>
                </a>
              </Dropdown>

              <div className="order">
                <Select
                  placeholder="Newest Arrivals"
                  className="collection-layout__sort-order"
                  onChange={this.handleChange}
                >
                  <Option value="">Newest Arrivals</Option>
                  <Option value="2">Price: High to Low</Option>
                  <Option value="1">Price: Low to High</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="catProd maxWidth">
          <div className="catProd__categories">
            <div className="title">Categorie</div>
            <div className="catItems">
              {categories &&
                Object.keys(categories).map((item, index) => {
                  return (
                    <Categories
                      key={index}
                      cat={categories[item]}
                      isSelectedC={this.props.isSelectedC}
                    ></Categories>
                  );
                })}
            </div>
          </div>

          <BestSeller
            prodList={prodList}
            type="categories"
            pageNumber={1}
          ></BestSeller>
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
  isSelectedSSC: state.shop.isSelectedSubSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
  categories: state.shop.categories,
});
export default withRouter(connect(mpStP, ShopActions)(ProdBycategory));

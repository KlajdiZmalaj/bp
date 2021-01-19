import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination } from "antd";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import images from "themes/images";

import ProductItem from "./ProductItem";

class BestSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_number: this.props.pageNumber,
    };
  }

  handleChange = (event) => {
    this.props.setOrderVal(event.target.value);
    this.props.getProductsList(
      null,
      this.props.isSelected,
      this.props.isSelectedC,
      null,
      event.target.value
    );
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSelectedC !== this.props.isSelectedC ||
      prevProps.isSelectedSC !== this.props.isSelectedSC ||
      prevProps.isSelectedSSC !== this.props.isSelectedSSC
    ) {
      this.setState({ page_number: 1 });
    }
  }

  render() {
    const {
      title,
      prodList,
      isSelected,
      isSelectedC,
      isSelectedSC,
      isSelectedSSC,
      orderVal,
      sliderVal,
      type,
    } = this.props;
    const { page_number } = this.state;
    const total_pages = prodList.total_pages;
    const total_records = prodList.total_records;

    return (
      <div className="bestSeller paddingBottom">
        <div className="filtersCateg">
          <div className="title">{title}</div>

          {isSelectedC && type && type === "categories" && (
            <span>
              {total_records} products in{" "}
              <span className="text-uppercase"> {isSelectedC}</span>
            </span>
          )}

          {type !== "categories" && (
            <div className="right">
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
          )}
        </div>
        <div className="products">
          {prodList?.data ? (
            Object.keys(prodList.data).map((item, index) => {
              return (
                <ProductItem
                  item={prodList.data[item]}
                  key={index}
                ></ProductItem>
              );
            })
          ) : (
            <div className="products__item">
              <div className="pBorder">
                <img src={images.placeholder} alt=""></img>
              </div>
            </div>
          )}
        </div>
        <div className="paginationWrapper">
          <Pagination
            current={page_number}
            onChange={(e) => {
              this.setState({ page_number: e });
              this.props.getProductsList(
                e,
                isSelected,
                isSelectedC,
                isSelectedSSC,
                orderVal,
                sliderVal,
                null,
                isSelectedSC
              );
            }}
            total={total_pages ? total_pages * 10 : 10}
          />
        </div>
      </div>
    );
  }
}

const mpStP = (state) => ({
  isSelected: state.shop.isSelectedManufacturer,
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  isSelectedSSC: state.shop.isSelectedSubSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});

export default withRouter(connect(mpStP, ShopActions)(BestSeller));

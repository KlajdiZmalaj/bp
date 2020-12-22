import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination } from "antd";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

class BestSeller extends Component {
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

  render() {
    const {
      title,
      prodList,
      isSelected,
      isSelectedC,
      isSelectedSC,
      orderVal,
      sliderVal,
      type,
    } = this.props;

    const total_pages = prodList.total_pages;
    const total_records = prodList.total_records;
    return (
      <div className="bestSeller maxWidth paddingBottom">
        <div className="filtersCateg">
          <div className="title">{title}</div>

          {isSelectedC && type === "categories" && (
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
          {prodList &&
            prodList.data &&
            Object.keys(prodList.data).map((item, index) => {
              return (
                <div
                  className="products__item"
                  key={index}
                  onClick={() => {
                    this.props.history.push(
                      `/product/${prodList.data[item].Product_id}/${prodList.data[item].prd_supp}`
                    );
                  }}
                >
                  <div className="pBorder">
                    <img src={prodList.data[item].Product_Image_1} alt=""></img>
                  </div>
                  <div className="name">{prodList.data[item].Product_Name}</div>
                  <div className="price">
                    €{prodList.data[item].Product_Price}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="paginationWrapper">
          <Pagination
            onChange={(e) => {
              this.setState({ page_number: e });
              this.props.getProductsList(
                e,
                isSelected,
                isSelectedC,
                isSelectedSC,
                orderVal,
                sliderVal
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
  productsList: state.shop.productsList,
  isSelected: state.shop.isSelectedManufacturer,
  isSelectedC: state.shop.isSelectedCategory,
  isSelectedSC: state.shop.isSelectedSubCategory,
  orderVal: state.shop.orderVal,
  sliderVal: state.shop.sliderVal,
});

export default withRouter(connect(mpStP, ShopActions)(BestSeller));

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
      event.target.value
    );
  };

  render() {
    const { prodList, isSelected, isSelectedC, orderVal } = this.props;
    console.log("orderValorderVal", orderVal);
    const total_pages = prodList.total_pages;

    return (
      <div className="bestSeller maxWidth paddingBottom">
        <div className="title">New arrivals </div>
        <div className="order">
          <select
            class="collection-layout__sort-order"
            value={orderVal}
            onChange={this.handleChange}
          >
            <option value="">Newest Arrivals</option>
            <option value="2">Price: High to Low</option>
            <option value="1">Price: Low to High</option>
          </select>
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
              this.props.getProductsList(e, isSelected, isSelectedC);
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
  orderVal: state.shop.orderVal,
});

export default withRouter(connect(mpStP, ShopActions)(BestSeller));

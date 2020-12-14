import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination } from "antd";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";

class BestSeller extends Component {
  render() {
    // const prod = [
    //   {
    //     id: 1,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product2,
    //   },
    //   {
    //     id: 2,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product,
    //   },
    //   {
    //     id: 3,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product2,
    //   },
    //   {
    //     id: 4,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product,
    //   },
    //   {
    //     id: 5,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product2,
    //   },
    //   {
    //     id: 6,
    //     name: "Stowell Hood Fleece",
    //     price: "200,00",
    //     img: images.product,
    //   },
    // ];
    const { prodList } = this.props;

    const total_pages = prodList.total_pages;

    // Product_id
    return (
      <div className="bestSeller maxWidth paddingBottom">
        <div className="title">New arivals</div>
        <div className="products">
          {prodList &&
            prodList.data &&
            Object.keys(prodList.data).map((item, index) => {
              return (
                <div
                  className="products__item"
                  key={index}
                  onClick={(id) => {
                    this.props.history.push(
                      `/product/${prodList.data[item].Product_id}`
                    );
                  }}
                >
                  <img src={prodList.data[item].Product_Image_1} alt=""></img>
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
              this.props.getProductsList(e);
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
});

export default withRouter(connect(mpStP, ShopActions)(BestSeller));

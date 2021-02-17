import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination } from "antd";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import images from "themes/images";
import { Loader } from "shared-components";
import ProductItem from "./ProductItem";

class BestSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page_number: this.props.pageNumber,
      tagParam: this.props.tagParam,
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
      tags,
      catParam,
      tagParam,
      isMobile,
    } = this.props;

    const { page_number } = this.state;
    const total_pages = prodList.total_pages;
    const total_records = prodList.total_records;

    return (
      <div className="bestSeller paddingBottom">
        {isMobile && tags && (
          <div className="shopTags mob">
            {Object.keys(tags).map((tagKey) => {
              return (
                <span
                  key={tagKey}
                  className={tagParam === tags[tagKey] ? "active" : ""}
                  onClick={() => {
                    window.location.hash = `product-filtered/${catParam}/${tags[tagKey]}`;
                  }}
                >
                  {tags[tagKey]}
                </span>
              );
            })}
          </div>
        )}
        <div className="filtersCateg">
          <div className="title">{title}</div>

          {isSelectedC && type && type === "categories" && (
            <span>
              Trovati {total_records} prodotti
              {/* {total_records} prodotti in{" "}
              <b className="text-uppercase"> {isSelectedC}</b> */}
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
                  <option value="">Nuovi arrivi</option>
                  <option value="2">Prezzo decrescente</option>
                  <option value="1">Prezzo crescente</option>
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
            <React.Fragment>
              <div className="products__item">
                <div className="pBorder">
                  <img src={images.placeholder} alt=""></img>
                </div>
              </div>
              <Loader></Loader>
            </React.Fragment>
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
        <div className="shopTags">
          {!isMobile &&
            tags &&
            Object.keys(tags).map((tagKey) => {
              return (
                <span
                  key={tagKey}
                  className={tagParam === tags[tagKey] ? "active" : ""}
                  onClick={() => {
                    window.location.hash = `product-filtered/${catParam}/${tags[tagKey]}`;
                    // this.setState({ tagSelected: tagKey });
                  }}
                >
                  {tags[tagKey]}
                </span>
              );
            })}
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

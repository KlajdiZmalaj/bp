import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import SubCategories from "./SubCategories";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isSelectedC === this.props.cat.name ? true : false,
    };
  }

  render() {
    const { cat, isSelectedC } = this.props;
    const { isOpen } = this.state;

    let url =
      cat?.name.split(" | ")?.[0] +
      (cat?.name.split(" | ")?.[1] ? "__" + cat?.name.split(" | ")?.[1] : "");
    console.log("this.props.cat", this.props.cat);
    return (
      <div
        className={"category" + (isSelectedC === cat?.name ? " active" : "")}
      >
        {isOpen && (
          <i
            className="fas fa-caret-down"
            onClick={() => this.setState({ isOpen: false })}
          ></i>
        )}
        <div
          className="title"
          onClick={() => {
            this.props.setProductsList({});
            this.props.getProductsList(null, null, cat.name);
            this.props.setCategory(cat.name);
            this.props.setSubCategory(null);
            this.props.setSubSubCategory(null);
            this.props.setManufacturer(null);
            this.props.history.push(`/product-filtered/${url}`);
            this.props.openProducts(false);
            this.setState({ isOpen: true });
          }}
        >
          {!isOpen && (
            <i
              className="fas fa-caret-right"
              onClick={() => this.setState({ isOpen: true })}
            ></i>
          )}
          <span>{cat.name}</span>
        </div>
        {isOpen &&
          Object.keys(cat.subcategories).map((sub, i) => {
            return (
              <SubCategories
                key={i}
                item={cat.subcategories[sub]}
                catg={cat.name}
                catParam={this.props.match.params.cat}
              ></SubCategories>
            );
          })}
      </div>
    );
  }
}

const mpStP = () => ({});
export default withRouter(connect(mpStP, ShopActions)(Categories));

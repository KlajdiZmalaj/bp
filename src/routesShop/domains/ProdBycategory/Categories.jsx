import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import SubCategories from "./SubCategories";

class Categories extends Component {
  render() {
    const { cat, isSelectedC } = this.props;

    let isOpen = this.props.isSelectedC === this.props.cat.name ? true : false;

    return (
      <div
        className={"category" + (isSelectedC === cat?.name ? " active" : "")}
      >
        {isOpen && (
          <i
            className="fas fa-caret-down"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          ></i>
        )}
        <div
          className="title"
          onClick={() => {
            // this.setState({ isOpen: !this.state.isOpen });
            this.props.setProductsList({});
            this.props.getProductsList(null, null, cat.name);
            this.props.setCategory(cat.name);
            this.props.history.push(
              `/product-filtered/${cat?.name?.split(" | ")[0]}__${
                cat?.name?.split(" | ")[1]
              }`
            );
          }}
        >
          {!isOpen && <i className="fas fa-caret-right"></i>}
          <span>{cat.name}</span>
        </div>
        {isOpen &&
          Object.keys(cat.subcategories).map((sub, i) => {
            return (
              <SubCategories
                key={i}
                item={cat.subcategories[sub]}
                catg={cat.name}
              ></SubCategories>
            );
          })}
      </div>
    );
  }
}

const mpStP = () => ({});
export default withRouter(connect(mpStP, ShopActions)(Categories));

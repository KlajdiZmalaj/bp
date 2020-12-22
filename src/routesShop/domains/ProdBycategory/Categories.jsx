import React, { Component } from "react";
import SubCategories from "./SubCategories";

class Categories extends Component {
  state = {
    isOpen: true,
  };
  render() {
    const { cat } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="category">
        <div
          className="title"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          {isOpen ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-right"></i>
          )}
          {cat.name}
        </div>
        {isOpen &&
          Object.keys(cat.subcategories).map((sub, i) => {
            return (
              <SubCategories
                key={i}
                item={cat.subcategories[sub]}
              ></SubCategories>
            );
          })}
      </div>
    );
  }
}

export default Categories;

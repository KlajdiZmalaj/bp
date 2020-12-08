import React, { Component } from "react";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";

class SubHeader extends Component {
  render() {
    const cat = [
      {
        name: "Abbigliamento & Moda",
        icon: "fal fa-tshirt",
      },
      {
        name: "Elettronica",
        icon: "fal fa-mobile",
      },
      {
        name: "Belleza",
        icon: "fal fa-gem",
      },
      {
        name: "Mobilia",
        icon: "fal fa-lamp",
      },
    ];
    return (
      <div className="subheader maxWidth">
        <div className="categories">
          {cat.map((categories, index) => {
            return (
              <div className="categories__category" key={index}>
                <i className={categories.icon}></i> {categories.name}
              </div>
            );
          })}
        </div>
        <div className="cart">cart</div>
      </div>
    );
  }
}
const mpStP = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mpStP, AuthActions)(SubHeader);

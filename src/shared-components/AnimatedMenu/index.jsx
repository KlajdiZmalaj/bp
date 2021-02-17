import React, { Component } from "react";
import "./style.css";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class AnimatedMenu extends Component {
  state = {
    beforeActive: this.props.activeM - 1 || 4,
    active: this.props.activeM || 5,
    afterActive: this.props.activeM + 1 || 6,
  };
  componentDidMount() {
    const catProduct = this.props.match.params.cat;
    if (catProduct) {
      this.props.setCategory(catProduct.replace("__", " | "));
    }
    this.props.getItemsCart();
  }

  setActive = (active) => {
    this.setState({
      active,
      beforeActive: active - 1,
      afterActive: active + 1,
    });
    if (active === this.state.active) {
      this.setState({ active: -1 });
    }

    const act = active;

    if (act === 1) {
      this.props.setShopLeftMenuMob(true);
    }
    if (act === this.state.active) {
      this.props.setShopLeftMenuMob(false);
    }
    if (act === 2) {
      window.location.hash = "shop-fav";
    }
    if (act === 3) {
      window.location.hash = "shop-cart";
    }
    if (act === 4) {
      window.location.hash = "products";
    }
    if (act === 5) {
      window.location.hash = "products";
    }
  };
  renderClassName = (el) => {
    return `animatedMenu__el ${
      el === this.state.active
        ? "active"
        : el + 1 === this.state.active
        ? "beforeActive"
        : el - 1 === this.state.active
        ? "afterActive"
        : ""
    }`;
  };
  render() {
    return (
      <div className="animatedMenu">
        <div
          onClick={() => {
            this.setActive(1);
          }}
          className={this.renderClassName(1)}
        >
          <div className="bg"></div>
          <div className="icon">
            <svg>
              <use xlinkHref={`#bars`}></use>
            </svg>
          </div>
        </div>
        <div
          onClick={() => {
            this.setActive(2);
          }}
          className={this.renderClassName(2)}
        >
          {" "}
          <div className="bg"></div>
          <div className="icon">
            <svg>
              <use xlinkHref={`#heart`}></use>
            </svg>
          </div>
        </div>
        <div
          onClick={() => {
            this.setActive(3);
          }}
          className={this.renderClassName(3)}
        >
          {" "}
          <div className="bg"></div>
          <div className="icon">
            <svg>
              <use xlinkHref={`#cart`}></use>
            </svg>
          </div>
        </div>
        <div
          onClick={() => {
            this.setActive(4);
          }}
          className={this.renderClassName(4)}
        >
          {" "}
          <div className="bg"></div>
          <div className="icon">
            <svg>
              <use xlinkHref={`#bell`}></use>
            </svg>
          </div>
        </div>
        <div
          onClick={() => {
            this.setActive(5);
          }}
          className={this.renderClassName(5)}
        >
          {" "}
          <div className="bg"></div>
          <div className="icon">
            <svg>
              <use xlinkHref={`#home`}></use>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, ShopActions)(AnimatedMenu));

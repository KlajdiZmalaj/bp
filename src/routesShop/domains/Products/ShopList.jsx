import React, { Component } from "react";
import images from "themes/images";

class ShopList extends Component {
  render() {
    const shop = [
      images.adidas,
      images.zara,
      images.nike,
      images.lacoste,
      images.calvinClein,
      images.philipPlein,
    ];
    return (
      <div className="shopList maxWidth">
        {shop.map((item, index) => {
          return (
            <div key={index} className="shopList__item">
              <img src={item} alt=""></img>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShopList;

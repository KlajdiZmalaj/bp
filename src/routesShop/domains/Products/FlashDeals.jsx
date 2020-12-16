import React, { Component } from "react";
import images from "themes/images";

class FlashDeals extends Component {
  render() {
    const prod = [
      {
        id: 1,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product2,
      },
      {
        id: 2,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product,
      },
      {
        id: 3,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product2,
      },
      {
        id: 4,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product,
      },
      {
        id: 5,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product2,
      },
      {
        id: 6,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product,
      },
      {
        id: 7,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product2,
      },
      {
        id: 8,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product,
      },
      {
        id: 9,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product2,
      },
      {
        id: 10,
        name: "Stowell Hood Fleece",
        price: "200,00",
        img: images.product,
      },
    ];
    return (
      <div className="bestSeller maxWidth paddingBottom">
        <div className="title">Flash Deals</div>
        <div className="products">
          {prod.map((item, index) => {
            return (
              <div className="products__item" key={index}>
                <div className="pBorder">
                  <img src={item.img} alt=""></img>
                </div>

                <div className="name">{item.name}</div>
                <div className="price"> €{item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FlashDeals;

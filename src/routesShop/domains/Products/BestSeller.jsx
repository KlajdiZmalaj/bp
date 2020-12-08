import React, { Component } from "react";
import images from "themes/images";

class BestSeller extends Component {
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
    ];
    const { prodList } = this.props;
    return (
      <div className="bestSeller maxWidth paddingBottom">
        <div className="title">Best Sellers</div>
        <div className="products">
          {prodList &&
            prodList.data &&
            Object.keys(prodList.data).map((item, index) => {
              return (
                <div className="products__item" key={index}>
                  <img src={prodList.data[item].Product_Image_1} alt=""></img>
                  <div className="name">{prodList.data[item].Product_Name}</div>
                  <div className="price">
                    €{prodList.data[item].Product_Price}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default BestSeller;

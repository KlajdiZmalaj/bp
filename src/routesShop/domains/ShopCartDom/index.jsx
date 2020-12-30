import React from "react";
import images from "themes/images";
import "./style.css";

const RowItem = ({ imgSrc, title, color, size, price, qnt = 0 }) => (
  <div className="cartItem">
    <img src={imgSrc || images["placeholder"]} alt="" />
    <div className="cartItem__details">
      <h3>{title}</h3>
      <div>
        <span>
          COLOUR: <span>{color}</span>
        </span>
        <span>
          SIZE : <span>{size}</span>
        </span>
      </div>
      <div className="price">{price}</div>
    </div>
    <div className="cartItem__actions">
      <div>
        <i className="fal fa-chevron-left" aria-hidden="true"></i>
        <span>{qnt}</span>
        <i className="fal fa-chevron-right" aria-hidden="true"></i>
      </div>
      <div>
        <i className="fal fa-times" aria-hidden="true"></i>
      </div>
    </div>
  </div>
);

const ShopCartDom = () => {
  return (
    <section className="maxWidth shopCartContainer">
      <div className="shopCartContainer--left">
        <RowItem
          imgSrc={""}
          title="OVERSIZED CONTRAST HALF JUMPER - Maglione"
          color="black"
          size="M"
          price="475,00 €"
        />
        <RowItem
          imgSrc={""}
          title="OVERSIZED CONTRAST HALF JUMPER - Maglione"
          color="black"
          size="M"
          price="475,00 €"
        />
      </div>
      <div className="shopCartContainer--right"></div>
    </section>
  );
};

export default ShopCartDom;

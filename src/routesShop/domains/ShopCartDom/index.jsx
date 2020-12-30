import React, { useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Tooltip, Select } from "antd";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

const { Option } = Select;
const RelatedProduct = ({ title, imgSrc, price }) => {
  return (
    <div className="relatedProduct">
      <img src={imgSrc || images["placeholder"]} alt="" />
      <div>{title}</div>
      <span>{price}</span>
    </div>
  );
};
const RowItem = ({ imgSrc, title, color, size, price, qnt }) => (
  <div className="cartItem">
    <img src={imgSrc || images["placeholder"]} alt="" />
    <div className="cartItem__details">
      <Tooltip title={title}>
        <h3>{title}</h3>
      </Tooltip>
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

const ShopCartDom = ({
  getItemsCart,
  itemsCart,
  getProductsList,
  productsList,
}) => {
  useEffect(() => {
    getItemsCart();
    getProductsList();
  }, []);

  const cartprod = get(itemsCart, "cart", {});

  return (
    <section className="maxWidth shopCartContainer">
      <div className="shopCartContainer--left">
        {Object.keys(cartprod).map((item) => {
          return (
            <RowItem
              key={item}
              imgSrc={cartprod[item].Product_Image_1}
              title={cartprod[item].Product_Name}
              color="black"
              size="M"
              price={`${cartprod[item].Product_Price} €`}
              qnt={cartprod[item].quantity}
            />
          );
        })}
        <div className="shopCartContainer--left__related">
          <h2>related products</h2>
          <div className="containerRealted">
            {productsList.data &&
              productsList.data
                .filter((item, index) => index < 6)
                .map((item, index) => {
                  return (
                    <RelatedProduct
                      imgSrc={item.Product_Image_1}
                      title={item.Product_Name}
                      price={`€ ${item.Product_Price}`}
                      key={index}
                    />
                  );
                })}
          </div>
        </div>
      </div>
      <div className="shopCartContainer--right">
        <div className="titleTop">Calcola spedizione</div>
        <div className="spedizoneContainer">
          <div className="label">Spedizione a BARI.</div>
          <div className="deliveryDate">
            {" "}
            <i className="fa fa-truck" aria-hidden="true"></i>
            lun 28 dic - lun 4 gen
          </div>
          <div className="spedizoneContainer--form">
            <Select defaultValue={"italia"}>
              <Option key="ita">Italia</Option>
              <Option key="al">Albania</Option>
            </Select>
            <Select defaultValue={"italia"}>
              <Option key="br">Bari</Option>
              <Option key="tr">Tirana</Option>
            </Select>
            <input type="text" placeholder="Citta" />
            <input type="text" placeholder="C.A.P" />
            <button>AGGIORNA</button>
          </div>
        </div>
        <div className="titleTop">Calcola spedizione</div>
      </div>
    </section>
  );
};

const mstp = (state) => ({
  itemsCart: state.shop.itemsCart,
  productsList: state.shop.productsList,
});
export default withRouter(connect(mstp, ShopActions)(ShopCartDom));

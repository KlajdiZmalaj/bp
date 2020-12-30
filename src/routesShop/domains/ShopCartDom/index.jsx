import React, { useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Select } from "antd";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import RowItem from "./RowItem";

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

const ShopCartDom = ({
  getItemsCart,
  itemsCart,
  getProductsList,
  productsList,
}) => {
  useEffect(() => {
    getItemsCart(true);
    getProductsList();
  }, [getItemsCart, getProductsList]);

  const cartprod = get(itemsCart, "cart", {});
  const user_data = get(itemsCart, "user_data", {});

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
              id={cartprod[item].Product_id}
              prd_supp={cartprod[item].prd_supp}
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

import React from "react";
import images from "themes/images";
import "./style.css";
import { Tooltip, Select } from "antd";

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
const RowItem = ({ imgSrc, title, color, size, price, qnt = 0 }) => (
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
        <RowItem
          imgSrc={""}
          title="OVERSIZED CONTRAST HALF JUMPER - Maglione"
          color="black"
          size="M"
          price="475,00 €"
        />
        <div className="shopCartContainer--left__related">
          <h2>related products</h2>
          <div className="containerRealted">
            <RelatedProduct
              imgSrc=""
              title="Stowell Hood Fleece"
              price="€200,00"
            />
            <RelatedProduct
              imgSrc=""
              title="Stowell Hood Fleece"
              price="€200,00"
            />
            <RelatedProduct
              imgSrc=""
              title="Stowell Hood Fleece"
              price="€200,00"
            />
            <RelatedProduct
              imgSrc=""
              title="Stowell Hood Fleece"
              price="€200,00"
            />
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

export default ShopCartDom;

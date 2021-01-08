import React, { useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Select, Radio } from "antd";
import Slider from "react-slick";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import countriesArray from "config/countryArr";
import VirtualizedSelect from "react-virtualized-select";

import RowItem from "./RowItem";

export let removeComma = (str) => {
  return Number(str.replace(/,/g, "."));
};

// const { Option } = Select;
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};
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
  getCarries,
  carriers,
}) => {
  useEffect(() => {
    getItemsCart(true);
    getProductsList();
  }, [getItemsCart, getProductsList]);

  const cartprod = get(itemsCart, "cart", {});
  const user_data = get(itemsCart, "user_data", {});

  let sum = 0.0;

  Object.keys(cartprod).map((item, index) => {
    sum = (
      parseFloat(sum) +
      parseFloat(
        removeComma(cartprod[item].Product_Price) * cartprod[item].quantity
      )
    ).toFixed(2);
    return sum;
  });

  const [selectedCity, setCity] = React.useState("");
  const [selectedCap, setCap] = React.useState("");

  const [value, setValue] = React.useState("");
  const [cost, setCost] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    setCost(e.target.cost);
  };

  let sumTot = (parseFloat(sum) + parseFloat(removeComma(cost))).toFixed(2);

  return (
    <section className="maxWidth shopCartContainer">
      <div className="shopCartContainer--left">
        {Object.keys(cartprod).map((item) => {
          let colore = get(cartprod[item].model_details, "colore", "");
          let size = get(cartprod[item].model_details, "taglia", "");
          return (
            <RowItem
              key={item}
              imgSrc={cartprod[item].Product_Image_1}
              title={cartprod[item].Product_Name}
              color={colore}
              size={size}
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
            <Slider {...settings}>
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
            </Slider>
          </div>
        </div>
      </div>
      <div className="shopCartContainer--right">
        <div className="titleTop">Calcola spedizione</div>
        <div className="spedizoneContainer">
          <div className="label">Spedizione a {user_data.city}</div>
          {/* <div className="deliveryDate">
            <i className="fa fa-truck" aria-hidden="true"></i>
            lun 28 dic - lun 4 gen
          </div> */}
          <div className="spedizoneContainer--form">
            <input type="text" value="Italia"></input>
            {/* <Select defaultValue={"Italia"}>
              <Option key="Italia">Italia</Option>
            </Select> */}
            <VirtualizedSelect
              options={countriesArray
                .filter((obj) => obj.nazione === "ITALIA")
                .map((country) => ({
                  label: `${country.provincia} (${country.sigla}) (${country.nazione})`,
                  value: country.provincia,
                  sigla: country.sigla,
                }))}
              onChange={(e) => {
                setCity(e?.value);
              }}
              value={selectedCity}
              maxHeight={100}
              placeholder={"Citta"}
            />

            <input
              type="text"
              placeholder="C.A.P"
              value={selectedCap}
              onChange={(e) => {
                setCap(e.target.value);
              }}
            />

            <button
              onClick={() => {
                getCarries("it", selectedCap);
                setCost("");
                setValue("");
              }}
            >
              AGGIORNA
            </button>
          </div>
        </div>
        <div className="titleTop">Calcola spedizione</div>
        <div className="shipping">
          <div className="subTot">
            <div>Subtotale</div> <div>{sum} €</div>
          </div>
          <div className="dashedBorder"></div>
          <div className="subTot">
            <div>Shipping:</div>
          </div>

          <Radio.Group onChange={onChange} value={value}>
            {carriers &&
              carriers.map((item, index) => {
                return (
                  <Radio
                    // value={item.shippingService.serviceName}
                    key={index}
                    cost={item.cost}
                    value={item.shippingService.serviceName}
                  >
                    <span>{item.shippingService.serviceName}</span>

                    <div className="radioServ">
                      Delay: <span>{item.shippingService.delay}</span>
                    </div>
                    <div className="radioServ">
                      Cost: <span>{item.cost}</span>
                    </div>
                  </Radio>
                );
              })}
          </Radio.Group>

          <div className="subTot">
            <div>Totale</div> <div>€ {sumTot}€</div>
          </div>
          <div
            className="procedi"
            onClick={() => {
              window.location.hash = `product-checkout`;
            }}
          >
            <button>Procedi con l'ordine</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mstp = (state) => ({
  itemsCart: state.shop.itemsCart,
  productsList: state.shop.productsList,
  carriers: state.shop.carries,
});
export default withRouter(connect(mstp, ShopActions)(ShopCartDom));

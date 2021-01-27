import React, { useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Radio } from "antd";
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

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 3,
// };
// const RelatedProduct = ({ title, imgSrc, price }) => {
//   return (
//     <div className="relatedProduct">
//       <img src={imgSrc || images["placeholder"]} alt="" />
//       <div>{title}</div>
//       <span>{price}</span>
//     </div>
//   );
// };

const ShopCartDom = ({ getItemsCart, itemsCart, getCarries, carriers }) => {
  useEffect(() => {
    getItemsCart(true);
  }, [getItemsCart]);

  const cartprod = get(itemsCart, "cart", {});
  const user_data = get(itemsCart, "user_data", {});

  let sum = 0.0;

  sum = Object.keys(cartprod).reduce(function (sumT, item) {
    return (
      parseFloat(sumT) +
      parseFloat(
        removeComma(cartprod[item].Product_Price.replace(".", "")) *
          cartprod[item].quantity
      )
    ).toFixed(2);
  }, 0.0);

  const [selectedCity, setCity] = React.useState("");
  const [selectedCap, setCap] = React.useState("");

  const [value, setValue] = React.useState("");
  const [cost, setCost] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
    setCost(e.target.cost);
  };

  let sumTot = (parseFloat(sum) + parseFloat(removeComma(cost))).toFixed(2);
  console.log("cartprod", cartprod);
  return (
    <section className="maxWidth shopCartContainer">
      <div className="shopCartContainer--left">
        {Object.keys(cartprod).map((item) => {
          let models = cartprod[item].model_details;
          return (
            <RowItem
              key={item}
              imgSrc={cartprod[item].Product_Image_1}
              title={cartprod[item].Product_Name}
              price={`${cartprod[item].Product_Price} €`}
              qnt={cartprod[item].quantity}
              id={cartprod[item].Product_id}
              prd_supp={cartprod[item].prd_supp}
              main_id={cartprod[item].main_id}
              models={models}
            />
          );
        })}
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
        <div className="titleTop">Spedizione</div>
        <div className="shipping">
          <div className="subTot">
            <div>Subtotale</div>
            <div>{sum.toString().replace(/\./g, ",")} €</div>
          </div>
          <div className="dashedBorder"></div>
          <div className="subTot">
            <div>Spedizione:</div> {cost && <div>{cost} €</div>}
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
                    <img
                      src={
                        images[
                          get(item.shippingService, "serviceName").toLowerCase()
                        ]
                      }
                      alt={get(
                        item.shippingService,
                        "serviceName"
                      ).toLowerCase()}
                    ></img>

                    <div className="detailsServices">
                      <div className="radioServ">
                        {item.shippingService.transportMethod === "van" ? (
                          <i className="fas fa-truck"></i>
                        ) : (
                          <i className="fas fa-plane"></i>
                        )}{" "}
                        Consegna: <b>{item.shippingService.delay}</b>
                      </div>
                      <div className="radioServ">
                        Cost: <b>{item.cost}</b>
                      </div>
                    </div>
                  </Radio>
                );
              })}
          </Radio.Group>

          <div className="totale">
            <div>Totale</div> <div>{sumTot.replace(/\./g, ",")} €</div>
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
  carriers: state.shop.carries,
});
export default withRouter(connect(mstp, ShopActions)(ShopCartDom));

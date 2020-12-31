import React, { useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Select } from "antd";
import Slider from "react-slick";
import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import countriesArray from "config/countryArr";
import VirtualizedSelect from "react-virtualized-select";

import RowItem from "./RowItem";
const { Option } = Select;
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
}) => {
  useEffect(() => {
    getItemsCart(true);
    getProductsList();
    // getCarries(get(itemsCart, "user_data", {}).postcode);
  }, [getItemsCart, getProductsList]);

  const cartprod = get(itemsCart, "cart", {});
  const user_data = get(itemsCart, "user_data", {});
  const carriers = get(itemsCart, "carriers", []);

  // const [carr, setCarrierss] = useState("");

  const [selectedCity, setCity] = React.useState("");

  console.log("carriers", carriers);
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
          <div className="label">Spedizione a BARI.</div>
          <div className="deliveryDate">
            {" "}
            <i className="fa fa-truck" aria-hidden="true"></i>
            lun 28 dic - lun 4 gen
          </div>
          <div className="spedizoneContainer--form">
            <Select defaultValue={"Italia"}>
              <Option key="Italia">Italia</Option>
            </Select>
            <VirtualizedSelect
              options={countriesArray
                .filter((obj) => obj.nazione === "ITALIA")
                .map((country) => ({
                  label: `${country.provincia} (${country.sigla}) (${country.nazione})`,
                  value: country.provincia,
                  sigla: country.sigla,
                }))}
              onChange={(e) => {
                //console.log("ca ka e", e);
                setCity(e?.value);
              }}
              value={selectedCity}
              maxHeight={100}
              placeholder={"Citta"}
            />

            <input type="text" placeholder="C.A.P" />
            <button>AGGIORNA</button>
          </div>
        </div>
        <div className="titleTop">Calcola spedizione</div>
        <div className="shipping">
          <div className="subTot">
            <div>Subtotale</div> <div>5,98 € </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mstp = (state) => ({
  itemsCart: state.shop.itemsCart,
  productsList: state.shop.productsList,
  carries: state.shop.carries,
});
export default withRouter(connect(mstp, ShopActions)(ShopCartDom));

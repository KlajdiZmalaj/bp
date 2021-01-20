import React, { useEffect } from "react";
import "./style.css";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import RowItem from "./RowItem";

const ShopFavDom = ({ getItemsCart, itemsCart }) => {
  useEffect(() => {
    getItemsCart(true);
  }, [getItemsCart]);

  const cartprod = get(itemsCart, "wish", {});

  return (
    <section className="maxWidth favCartContainer shopCartContainer">
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
              main_id={cartprod[item].main_id}
            />
          );
        })}
      </div>
    </section>
  );
};

const mstp = (state) => ({
  itemsCart: state.shop.itemsCart,
});
export default withRouter(connect(mstp, ShopActions)(ShopFavDom));

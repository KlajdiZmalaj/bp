import React from "react";
import { Header } from "shared-components";
import SubHeader from "routesShop/components/SubHeader/index.js";
import ShopCartDom from "../domains/ShopCartDom";
import DomTitle from "../domains/DomTitle";
const ShopCart = () => {
  return (
    <div className="products shopCart">
      <Header />
      <SubHeader />
      <DomTitle
        title={"VISUALIZZA CARRELLO"}
        icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
      />

      <ShopCartDom />
    </div>
  );
};

export default ShopCart;

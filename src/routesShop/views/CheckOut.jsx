import React from "react";
import { Header } from "shared-components";
import SubHeader from "routesShop/components/SubHeader/index.js";
import CheckOutDom from "../domains/CheckOutDom";
import DomTitle from "../domains/DomTitle";

export default () => {
  return (
    <div className="products checkout">
      <Header />
      <SubHeader />
      <DomTitle
        title={"Checkout"}
        icon={<i className="fal fa-shopping-cart" aria-hidden="true"></i>}
      />
      <CheckOutDom />
    </div>
  );
};

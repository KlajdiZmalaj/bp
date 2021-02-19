import React, { Fragment } from "react";
import { Header, Azioni } from "shared-components";
import OrdersShopDomain from "../domains/OrdersShopDomain/index.jsx";

const OrdersShop = () => (
  <Fragment>
    <Header />
    <Azioni activeMain="contabilita" active="orders-shop" />
    <OrdersShopDomain />
  </Fragment>
);

export default OrdersShop;

import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import AuthActions from "redux-store/models/auth";
import { Loader } from "shared-components";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { Radio, Form, Modal, Button } from "antd";

import images from "themes/images";

const OrdersShopDomain = ({
  accountInfo,
  ordersShop,
  getOrders,
  getOrderData,
  orderData,
}) => {
  useEffect(() => {
    getOrders();
  }, [accountInfo]);

  const [isOpened, openDetails] = useState(null);
  const openDetail = (id) => {
    getOrderData(id);
  };

  return (
    <div className="accountInfo ordersShop">
      <div className="contentAcc maxWidth">
        <div className="userList">
          <div className="userList--Doc">
            <div className="title">Ordine</div>
          </div>
        </div>
        <div className="ordersDiv">
          {ordersShop &&
            ordersShop.map((order, index) => {
              return (
                <div key={index} className="ordersShop__row">
                  <div className="oid">
                    Order id: <span>{order.id}</span>
                  </div>
                  <div>
                    <span className="odata">{order.data}</span>
                    <span className="osubTot">
                      Subtotal: <span>{order.importo} € </span>
                    </span>
                    <span
                      className={
                        "showD" + (isOpened === order.id ? " active" : "")
                      }
                    >
                      {isOpened === order.id ? (
                        <i
                          className="far fa-times"
                          onClick={() => openDetails(null)}
                        ></i>
                      ) : (
                        <i
                          className="far fa-chevron-right"
                          onClick={() => {
                            openDetail(order.id);
                            openDetails(order.id);
                          }}
                        ></i>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="orderDetails">
          <div className="title">
            Order id
            <p>{orderData?.order_id}</p>
          </div>

          {orderData?.products?.map((prod, index) => {
            return (
              <div className="orderDetails__row" key={index}>
                <img src={prod?.imgSrc || images["placeholder"]} alt="" />
                <div className="odDetails">
                  <div className="name">{prod?.name}</div>
                  <div className="price">{prod?.price}€</div>
                </div>
                <div className="odCount">{prod?.quantity}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mstp = (state) => ({
  carriers: state.shop.carries,
  accountInfo: state.auth.accountInfo,
  hasLoader: state.shop.hasLoader,
  orderD: state.shop.orderD,
  ordersShop: state.shop.ordersShop,
  orderData: state.shop.orderData,
});

export default withRouter(
  connect(mstp, { ...ShopActions, AuthActions })(
    Form.create()(OrdersShopDomain)
  )
);

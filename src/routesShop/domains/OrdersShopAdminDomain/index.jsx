import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import AuthActions from "redux-store/models/auth";
import MainActions from "redux-store/models/main";

// import { Loader } from "shared-components";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form } from "antd";

import images from "themes/images";

const OrdersShopAdminDomain = ({
  accountInfo,
  ordersShop,
  getOrders,
  getOrderData,
  orderData,
  setOrderData,
  activeSkinId,
}) => {
  useEffect(() => {
    getOrders();
  }, [accountInfo]);

  const [isOpened, openDetails] = useState(null);
  const openDetail = (id) => {
    getOrderData(id);
  };

  return (
    <div className="container-fluid overview ordersShop">
      <div className="panels-container">
        <div className="row no-gutters max-width">
          <div className="col-md-12">
            <table className="transTable Movimenti">
              <thead>
                <tr>
                  <td className="wsNwp">Date / Ora</td>
                  <td className="wsNwp">Supplier</td>
                  {/* <td className="wsNwp">Agenzia</td> */}
                  <td className="wsNwp">Id</td>
                  <td className="wsNwp">Order</td>
                  <td className="wsNwp">Stato</td>
                  <td className="wsNwp">Tracker id</td>
                  <td className="wsNwp right">Spedizione</td>
                  <td className="wsNwp right">Importo</td>
                  <td className="wsNwp right">Utile</td>
                  <td className="wsNwp right">Proviggione</td>
                  <td className="wsNwp right">Saldo</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {ordersShop &&
                  ordersShop.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td className="wsNwp">{order?.data}</td>
                        <td className="wsNwp">
                          <div className="bc">{order?.supplier}</div>
                        </td>
                        {/* <td className="wsNwp">
                          <i className="fal fa-store" aria-hidden="true"></i>{" "}
                          <span className="nomeTd">Bpoint</span>
                        </td> */}
                        <td className="wsNwp">{order?.id}</td>
                        <td className="wsNwp">{order?.order_name}</td>
                        <td className={`wsNwp st_${order?.status}`}>
                          {order?.status_description}
                        </td>
                        <td className="wsNwp">{order?.tracking_number}</td>
                        <td className="wsNwp right">{order?.spedizione}€</td>
                        <td className="wsNwp right">{order?.importo}€</td>
                        <td className="wsNwp right">{order?.utile}€</td>
                        <td className="wsNwp right">{order?.proviggione}€</td>
                        <td className="wsNwp right">{order?.saldo}€</td>
                        <td
                          className="wsNwp"
                          onClick={() => {
                            openDetail(order?.id);
                            openDetails(true);
                          }}
                        >
                          <span className="detail">Detagli</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {orderData && Object.keys(orderData).length > 0 && (
        <div className="orderDetails">
          <div className="title">
            <div>
              <div>
                <i className="far fa-shopping-cart"></i>
                <span>
                  Order id
                  <p>{orderData?.order_id}</p>
                </span>
              </div>
              <div>
                <i className="far fa-truck"></i>
                <span>
                  tracking number
                  <p>{orderData?.tracking_number}</p>
                </span>
              </div>
            </div>

            <div>
              <i
                className="far fa-times"
                onClick={() => {
                  openDetails(null);
                  setOrderData({});
                }}
              ></i>
            </div>
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

          <div className="orderDetails__pay">
            <div className="subt">
              Subtotal <span>{orderData?.subtotal}€</span>
            </div>
            <div className="subt">
              Shiping <span>{orderData?.shipping}€</span>
            </div>
            <div className="subt">
              tax <span>{orderData?.tax}€</span>
            </div>
          </div>
          <div className="orderDetails__customer">
            <div className="title">Customer details</div>
            <div className="subt">
              email address <span>{orderData?.user_data?.email}</span>
            </div>
            <div className="subt">
              phone <span>{orderData?.user_data?.phone}</span>
            </div>
          </div>

          <div className="orderDetails__shipping">
            <div className="title">Shipping address</div>
            <div className="subt">
              Nome <span>{orderData?.user_data?.firstName}</span>
            </div>
            <div className="subt">
              Cognome <span>{orderData?.user_data?.lastName}</span>
            </div>
            <div className="subt">
              indirizzo <span>{orderData?.user_data?.address}</span>
            </div>
            <div className="subt">
              cap <span>{orderData?.user_data?.postcode}</span>
            </div>
            <div className="subt">
              citta <span>{orderData?.user_data?.town}</span>
            </div>
            <div className="subt">
              stato <span>{orderData?.user_data?.country}</span>
            </div>
          </div>
          <div className="orderDetails__footer">
            <div>
              Importo <p>{orderData?.importo}€</p>
            </div>
            <div>
              Utile <p>{orderData?.utile}€</p>
            </div>
            <div>
              Proviggione <p>{orderData?.proviggione}€</p>
            </div>
            <div>
              subtotal <p>{orderData?.subtotal}€</p>
            </div>
          </div>
        </div>
      )}
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
  activeSkinId: state.main.activeSkinId,
});

export default withRouter(
  connect(mstp, { ...ShopActions, AuthActions, MainActions })(
    Form.create()(OrdersShopAdminDomain)
  )
);

import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import AuthActions from "redux-store/models/auth";
// import { Loader } from "shared-components";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Form } from "antd";

import images from "themes/images";

const OrdersShopDomain = ({
  accountInfo,
  ordersShop,
  getOrders,
  getOrderData,
  orderData,
  setOrderData,
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
                      Total: <span>{order.importo} € </span>
                    </span>
                    <span
                      className={
                        "showD" + (isOpened === order.id ? " active" : "")
                      }
                    >
                      {isOpened === order.id ? (
                        <i
                          className="far fa-times"
                          onClick={() => {
                            openDetails(null);
                            setOrderData({});
                          }}
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
        {orderData && Object.keys(orderData).length > 0 && (
          <div className="orderDetails">
            <div className="title">
              Order id
              <p>{orderData?.order_id}</p>
              tracking number
              <p>{orderData?.tracking_number}</p>
              <div className="tracking">
                <div>
                  metodo di spedizione: <span>{orderData?.carrier}</span>
                </div>
                <div>
                  monitorare il tuo ordine:
                  <span>
                    {orderData?.carrier?.toLowerCase() === "seur" && (
                      <a href="https://www.seur.com/livetracking/pages/seguimiento-online-busqueda.do?faces-redirect=true&segOnlineIdioma=en">
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "chrono" && (
                      <a href="https://www.chronopost.fr/en/private/track-your-parcel">
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "gls" && (
                      <a href="https://gls-group.eu/GROUP/en/parcel-tracking">
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "tnt" && (
                      <a
                        href={`https://www.tnt.com/express/en_us/site/tracking.html?searchType=con&cons=${orderData?.tracking_number}`}
                      >
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "ups" && (
                      <a href="https://www.ups.com/track?loc=en_US&requester=ST/">
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "dachser" && (
                      <a
                        href={`https://www.trackingmore.com/dachser-tracking.html?number=${orderData?.tracking_number}`}
                      >
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() ===
                      "correos international" && (
                      <a
                        href={`https://www.trackingmore.com/correos-spain-tracking.html?number=${orderData?.tracking_number}`}
                      >
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() ===
                      "pallet delivery" && (
                      <a
                        href={`https://www.nationalpallets.co.uk/tracking/${orderData?.tracking_number}`}
                      >
                        {orderData?.carrier}
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "dhl freight" && (
                      <a href="https://www.dhl.com/en/logistics/customer_resource_area/freight_tracking_and_applications/tracking.html#.YC_MoWhKiUl">
                        Vedi
                      </a>
                    )}
                    {orderData?.carrier?.toLowerCase() === "postal service" && (
                      <a href="https://www.usps.com/manage/">Vedi</a>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {orderData?.products?.map((prod, index) => {
              return (
                <div className="orderDetails__row" key={index}>
                  <img src={prod?.image || images["placeholder"]} alt="" />
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
          </div>
        )}
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

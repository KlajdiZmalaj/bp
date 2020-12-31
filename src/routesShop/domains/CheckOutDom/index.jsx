import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Select, Radio } from "antd";
const FORM_DATA = {
  name: "",
  last_name: "",
  fiscal_code: "",
  nome_societa: "",
  paese: "",
  via_nr: "",
  email: "",
  tel: "",
  citty: "",
  province: "",
  cap: "",
  indirizzo_diff: true,
  punto_vendia: false,
  payment: 1,
  paymentBtnLabel: "BPoint Wallet",
  terms: false,
};

const InpCheck = ({ id, label1, label2, handler, checked }) => (
  <>
    <input id={id} type="checkbox" checked={checked} onChange={handler} />
    <label htmlFor={id}>
      <div>
        <i className="fal fa-check" aria-hidden="true"></i>
      </div>
      {label2 ? (
        <span>
          {label1} <span>{label2}</span>{" "}
        </span>
      ) : (
        label1
      )}
    </label>
  </>
);

const CheckOutDom = ({
  getCategories,
  getProductDetails,
  checkOut,
  match,
  productD,
  accountInfo,
  itemsCart,
  getItemsCart,
}) => {
  useEffect(() => {
    getItemsCart(true);
    getProductDetails(match.params.id, match.params.supp);
    getCategories();
  }, [match.params.id, match.params.supp, getProductDetails, getCategories]);
  const [formData, setData] = useState(FORM_DATA);
  const carriers = itemsCart?.carriers || [];
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    console.log("itemsCart", itemsCart);
    setValue(e.target.value);
  };
  //console.log("props", accountInfo);
  return (
    <div className="shopCheckout maxWidth">
      <div className="shopCheckout--form">
        <div className="shopCheckout--form__left">
          <div className="titleTop">Dettagli di fatturazione</div>
          <div className="formContainer">
            <input
              type="text"
              placeholder="Nome"
              value={
                formData.name || accountInfo?.profile?.name?.split?.(" ")?.[0]
              }
              onChange={(e) => {
                setData({ ...formData, name: e.target.value });
              }}
            />
            <input
              type="text"
              value={
                formData.last_name ||
                accountInfo?.profile?.name?.split?.(" ")?.[1]
              }
              placeholder="Cognome"
              onChange={(e) => {
                setData({ ...formData, last_name: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.fiscal_code}
              placeholder="Codice Fiscale/P.Iva"
              onChange={(e) => {
                setData({ ...formData, fiscal_code: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.nome_societa}
              placeholder="Nome della società (opzionale)"
              onChange={(e) => {
                setData({ ...formData, nome_societa: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.paese}
              placeholder="Paese/regione"
              onChange={(e) => {
                setData({ ...formData, paese: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.via_nr}
              placeholder="Via e numero"
              onChange={(e) => {
                setData({ ...formData, via_nr: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.email || accountInfo?.profile?.email}
              placeholder="Indirizzo email"
              onChange={(e) => {
                setData({ ...formData, email: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.tel}
              placeholder="Telefono"
              onChange={(e) => {
                setData({ ...formData, tel: e.target.value });
              }}
            />
            <input
              type="text"
              value={formData.citty}
              placeholder="Città"
              onChange={(e) => {
                setData({ ...formData, citty: e.target.value });
              }}
            />
            <div className="inpGr">
              <input
                type="text"
                value={formData.province}
                placeholder="Provincia"
                className="w-60"
                onChange={(e) => {
                  setData({ ...formData, province: e.target.value });
                }}
              />
              <input
                type="text"
                value={formData.cap}
                placeholder="C.A.P."
                className="w-40"
                onChange={(e) => {
                  setData({ ...formData, cap: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="checkContainer">
            <InpCheck
              id="check1"
              label1="Spedire ad un indirizzo differente?"
              checked={formData.indirizzo_diff}
              handler={(e) => {
                setData({
                  ...formData,
                  indirizzo_diff: e.target.checked,
                });
              }}
            />
            <InpCheck
              id="check2"
              label1="Ritiro presso il punto vendita"
              checked={formData.punto_vendia}
              handler={(e) => {
                setData({
                  ...formData,
                  punto_vendia: e.target.checked,
                });
              }}
            />
          </div>
        </div>
        <div className="shopCheckout--form__right">
          <div className="titleTop">Il tuo ordine</div>
          <div className="infos">
            <div className="subTotal">
              <div>Subtotale:</div>
              <div>€19,80</div>
            </div>
            <div className="shipping">
              <div>Shipping:</div>
              <div>
                Tariffa unica: <span>€5,00</span>
              </div>
              <Radio.Group onChange={onChange} value={value}>
                {carriers &&
                  carriers.map((item, index) => {
                    return (
                      <Radio
                        value={item.shippingService.serviceName}
                        key={index}
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
            </div>

            <div className="total">
              <div>Totale:</div>
              <div>{productD?.Product_Price || 0} €</div>
            </div>
          </div>
          <div className="titleTop">Payments:</div>
          <div className="checkContainer right">
            <InpCheck
              id="pwall"
              label1="BPoint Wallet"
              checked={formData.payment === 1}
              handler={() => {
                setData({
                  ...formData,
                  payment: 1,
                  paymentBtnLabel: "BPoint Wallet",
                });
              }}
            />
            <InpCheck
              id="scrill"
              label1="Skrill"
              checked={formData.payment === 2}
              handler={() => {
                setData({
                  ...formData,
                  payment: 2,
                  paymentBtnLabel: "Skrill",
                });
              }}
            />
            <InpCheck
              id="Satispay"
              label1="Satispay"
              checked={formData.payment === 3}
              handler={() => {
                setData({
                  ...formData,
                  payment: 3,
                  paymentBtnLabel: "Satispay",
                });
              }}
            />
            <InpCheck
              id="Paypal"
              label1="Paypal"
              checked={formData.payment === 4}
              handler={() => {
                setData({
                  ...formData,
                  payment: 4,
                  paymentBtnLabel: "Paypal",
                });
              }}
            />
          </div>
          <div className="checkContainer bottom">
            <InpCheck
              id="termi"
              label1="Ho letto e accetto"
              label2="termini e condizioni*"
              checked={formData.terms}
              handler={(e) => {
                setData({
                  ...formData,
                  terms: e.target.checked,
                });
              }}
            />
          </div>
          <button
            className="pagaBtn"
            onClick={() => {
              checkOut(formData, () => {
                setData(FORM_DATA);
              });
            }}
          >
            PAGA CON {formData.paymentBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
const mstp = ({ shop: { productD, itemsCart }, auth: { accountInfo } }) => ({
  productD,
  accountInfo,
  itemsCart,
});
export default withRouter(connect(mstp, ShopActions)(CheckOutDom));

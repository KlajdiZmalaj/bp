import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import AuthActions from "redux-store/models/auth";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { Radio, Form } from "antd";

import images from "themes/images";

export let removeComma = (str) => {
  if (str) {
    return Number(str.replace(/,/g, "."));
  } else return str;
};

const FORM_DATA = {
  name: "",
  last_name: "",
  paese: "Italia",
  via_nr: "",
  email: "",
  tel: "",
  citty: "",
  cap: "",
  // indirizzo_diff: true,
  // punto_vendia: false,
  // payment: 1,
  // paymentBtnLabel: "BPoint Wallet",
  terms: false,
  carrier: "",
  comment: "",
  isClicked: false,
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
  checkOut,
  // match,
  accountInfo,
  itemsCart,
  getCarries,
  carriers,
  form,
}) => {
  useEffect(() => {
    setData({
      ...formData,
      name: accountInfo?.profile?.name?.split?.(" ")?.[0],
      last_name: accountInfo?.profile?.name?.split?.(" ")?.[1],
      email: accountInfo?.profile?.email,
      cap: itemsCart?.user_data?.postcode,
    });
  }, [
    accountInfo,
    // match.params.id,
    // match.params.supp,
  ]);
  const [formData, setData] = useState(FORM_DATA);

  const cartprod = get(itemsCart, "cart", {});

  const [cost, setCost] = useState(0);

  const onChange = (e) => {
    setCost(e.target.cost);
    setData({ ...formData, carrier: e.target.value });
  };

  let sum = 0.0;

  sum = Object.keys(cartprod).reduce(function (sumT, item) {
    return (
      parseFloat(sumT) +
      parseFloat(
        removeComma(cartprod[item].Product_Price) * cartprod[item].quantity
      )
    ).toFixed(2);
  }, 0.0);

  let sumTot = (parseFloat(sum) + parseFloat(removeComma(cost))).toFixed(2);

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    setData({ ...formData, isClicked: true });
    form.validateFields().then((values) => {
      if (formData.terms && formData.carrier.length > 0) {
        checkOut(formData, () => {
          setData(FORM_DATA);
        });
      }
    });
  };
  return (
    itemsCart &&
    Object.keys(itemsCart).length > 0 && (
      <div className="shopCheckout maxWidth">
        <div className="shopCheckout--form">
          <div className="shopCheckout--form__left">
            <div className="titleTop">Dettagli di fatturazione </div>

            <div className="formContainer">
              <Form onSubmit={handleSubmit}>
                <Form.Item>
                  {getFieldDecorator("name", {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        message: "Scegli un nome",
                      },
                    ],
                  })(
                    <input
                      type="text"
                      placeholder="Nome"
                      onChange={(e) => {
                        setData({ ...formData, name: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("cognome", {
                    initialValue: formData.last_name,
                    rules: [
                      {
                        required: true,
                        message: "Scegli un cognome",
                      },
                    ],
                  })(
                    <input
                      type="text"
                      placeholder="Cognome"
                      onChange={(e) => {
                        setData({ ...formData, last_name: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("paese", {
                    initialValue: formData.paese,
                    rules: [
                      {
                        required: true,
                        message: "Scegli un paese",
                      },
                    ],
                  })(
                    <input type="text" readOnly placeholder="Paese/regione" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("via", {
                    initialValue: formData.via_nr,
                    rules: [
                      {
                        required: true,
                        message: "Scegli una via",
                      },
                    ],
                  })(
                    <input
                      type="text"
                      placeholder="Via e numero"
                      onChange={(e) => {
                        setData({ ...formData, via_nr: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("email", {
                    initialValue: formData.email,
                    rules: [
                      {
                        required: true,
                        message: "Scegli una email",
                      },
                    ],
                  })(
                    <input
                      type="text"
                      placeholder="Indirizzo email"
                      onChange={(e) => {
                        setData({ ...formData, email: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("tel", {
                    initialValue: formData.tel,
                    rules: [
                      {
                        required: true,
                        message: "Scegli un nr telefono",
                      },
                    ],
                  })(
                    <input
                      required
                      type="text"
                      placeholder="Telefono"
                      onChange={(e) => {
                        setData({ ...formData, tel: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("citty", {
                    initialValue: formData.citty,
                    rules: [
                      {
                        required: true,
                        message: "Scegli una citta",
                      },
                    ],
                  })(
                    <input
                      type="text"
                      placeholder="Città"
                      onChange={(e) => {
                        setData({ ...formData, citty: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <div className="inpGr">
                    {getFieldDecorator("cap", {
                      initialValue: formData.cap,
                      rules: [
                        {
                          required: true,
                          message: "Scegli una cap",
                        },
                        { min: 5, message: "Cap dovrebbe essere 5 characteri" },
                      ],
                    })(
                      <input
                        type="text"
                        placeholder="C.A.P."
                        className="w-40"
                        onChange={(e) => {
                          setData({ ...formData, cap: e.target.value });
                          e.target.value.length === 5 &&
                            getCarries("it", formData.cap);
                          setCost(0);
                          setData({ ...formData, carrier: "" });
                        }}
                      />
                    )}
                    {formData.cap && formData.cap.length === 5 ? (
                      <button
                        className="w-20 recal"
                        onClick={() => {
                          getCarries("it", formData.cap);
                          setCost(0);
                          setData({ ...formData, carrier: "" });
                        }}
                      >
                        Ricalcola spedizione
                      </button>
                    ) : (
                      <button disabled> Ricalcola spedizione</button>
                    )}
                  </div>
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("comment", {
                    initialValue: formData.comment,
                  })(
                    <input
                      type="text"
                      placeholder="Comment"
                      className="w-100"
                      onChange={(e) => {
                        setData({ ...formData, comment: e.target.value });
                      }}
                    />
                  )}
                </Form.Item>
              </Form>

              {/* <input
                type="text"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) => {
                  setData({ ...formData, name: e.target.value });
                }}
              />

              <input
                type="text"
                value={formData.last_name}
                placeholder="Cognome"
                onChange={(e) => {
                  setData({ ...formData, last_name: e.target.value });
                }}
              />

              <input
                type="text"
                readOnly
                value={formData.paese}
                placeholder="Paese/regione"
              />
              <input
                required
                type="text"
                value={formData.via_nr}
                placeholder="Via e numero"
                onChange={(e) => {
                  setData({ ...formData, via_nr: e.target.value });
                }}
              />
              <input
                type="text"
                value={formData.email}
                placeholder="Indirizzo email"
                onChange={(e) => {
                  setData({ ...formData, email: e.target.value });
                }}
              />
              <input
                required
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
                  value={formData.cap}
                  placeholder="C.A.P."
                  className="w-40"
                  onChange={(e) => {
                    setData({ ...formData, cap: e.target.value });
                  }}
                />
                {formData.cap && formData.cap.length === 5 ? (
                  <button
                    className="w-20 recal"
                    onClick={() => {
                      getCarries("it", formData.cap);
                      setCost(0);
                      setData({ ...formData, carrier: "" });
                    }}
                  >
                    Ricalcola spedizione
                  </button>
                ) : (
                  <button disabled> Ricalcola spedizione</button>
                )}
              </div>
              <input
                type="text"
                value={formData.comment}
                placeholder="Comment"
                className="w-100"
                onChange={(e) => {
                  setData({ ...formData, comment: e.target.value });
                }}
              /> */}
            </div>
            {/* <div className="checkContainer">
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
            </div> */}
          </div>
          <div className="shopCheckout--form__right">
            <div className="titleTop">Il tuo ordine</div>
            <div className="infos">
              <div className="subTotal">
                <div>Subtotale:</div>
                <div>€ {sum}</div>
              </div>
              <div className="subTotal">
                <div>Shipping:</div>
                {cost && <div>€ {cost}</div>}
              </div>
              <div className="subTotal">
                <div>Totale:</div>
                <div>€ {sumTot}</div>
              </div>
              {/* <div className="total">
                <div>Totale:</div>
                <div>{sumTot} €</div>
              </div> */}
              <div className="shipping">
                <div
                  className={
                    "titleTop" +
                    (formData.isClicked && formData.carrier.length === 0
                      ? " error"
                      : "")
                  }
                >
                  Scegli un tipo di Spedizione:
                </div>

                <Radio.Group onChange={onChange} value={formData.carrier}>
                  {carriers &&
                    carriers.map((item, index) => {
                      return (
                        <Radio
                          value={item.shippingService.serviceName}
                          cost={item.cost}
                          key={index}
                        >
                          <img
                            src={
                              images[
                                get(
                                  item.shippingService,
                                  "serviceName"
                                ).toLowerCase()
                              ]
                            }
                            alt={get(
                              item.shippingService,
                              "serviceName"
                            ).toLowerCase()}
                          ></img>

                          <div className="detailsServices">
                            <div className="radioServ">
                              {item.shippingService.transportMethod ===
                              "van" ? (
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
              </div>
            </div>
            {/* <div className="titleTop">Payments:</div>
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
            </div> */}
            <div
              className={
                "checkContainer bottom" +
                (formData.isClicked && !formData.terms ? " error" : "")
              }
            >
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
              onClick={() => handleSubmit()}
              // onClick={() => {
              //   checkOut(formData, () => {
              //     setData(FORM_DATA);
              //   });
              // }}
            >
              Paga
              {/* PAGA CON {formData.paymentBtnLabel} */}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const mstp = (state) => ({
  carriers: state.shop.carries,
  accountInfo: state.auth.accountInfo,
});

export default withRouter(
  connect(mstp, { ...ShopActions, AuthActions })(Form.create()(CheckOutDom))
);

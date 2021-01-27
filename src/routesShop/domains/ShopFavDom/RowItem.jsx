import React, { useState, useEffect } from "react";
import images from "themes/images";
import "./style.css";
import { Tooltip } from "antd";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const RowItem = ({
  imgSrc,
  title,
  price,
  qnt,
  id,
  prd_supp,
  main_id,
  getRemoveToCart,
  history,
  getToCart,
  models,
}) => {
  let [qnty, setQnt] = useState(qnt);
  useEffect(() => {
    setQnt(qnt);
  }, [qnt]);

  return (
    <div className="cartItem">
      <img src={imgSrc || images["placeholder"]} alt="" />
      <div className="cartItem__details">
        <Tooltip
          title={title}
          onClick={() => {
            history.push(`/product/${main_id}/${prd_supp}`);
          }}
        >
          <h3>{title}</h3>
        </Tooltip>
        <div>
          {models &&
            Object.keys(models).map((item, index) => {
              return (
                <span key={index}>
                  {item.replace(/__/g, " ")}:
                  <span>
                    <span>{models[item]}</span>
                  </span>
                </span>
              );
            })}
        </div>
        <div className="price">{price}</div>
      </div>
      <div className="cartItem__actions">
        <div>
          <i
            className="fal fa-chevron-left"
            aria-hidden="true"
            onClick={() => {
              qnty > 1 && setQnt(qnty - 1);
              qnty > 1 && getRemoveToCart(prd_supp, id, qnty - 1, "wish");
            }}
          ></i>
          <span>{qnty}</span>
          <i
            className="fal fa-chevron-right"
            aria-hidden="true"
            onClick={() => {
              setQnt(qnty + 1);
              getRemoveToCart(prd_supp, id, qnty + 1, "wish");
            }}
          ></i>
        </div>
        <div>
          <i
            className="fal fa-times"
            aria-hidden="true"
            onClick={() => getRemoveToCart(prd_supp, id, "0", "wish")}
          ></i>
        </div>
        <div>
          <button
            className="addTobag"
            onClick={() => getToCart(prd_supp, id, "cart", qnty, "wish")}
          >
            Acquista
          </button>
        </div>
      </div>
    </div>
  );
};

const mstp = () => ({});
export default withRouter(connect(mstp, ShopActions)(RowItem));

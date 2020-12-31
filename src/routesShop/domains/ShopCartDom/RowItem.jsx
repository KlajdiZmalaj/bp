import React, { useState } from "react";
import images from "themes/images";
import "./style.css";
import { Tooltip } from "antd";

import ShopActions from "redux-store/models/shop";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const RowItem = ({
  imgSrc,
  title,
  color,
  size,
  price,
  qnt,
  id,
  prd_supp,
  getRemoveToCart,
}) => {
  const [qnty, setQnt] = useState(qnt);

  return (
    <div className="cartItem">
      <img src={imgSrc || images["placeholder"]} alt="" />
      <div className="cartItem__details">
        <Tooltip title={title}>
          <h3>{title}</h3>
        </Tooltip>
        <div>
          <span>
            COLOUR: <span>{color}</span>
          </span>
          <span>
            SIZE : <span>{size}</span>
          </span>
        </div>
        <div className="price">{price}</div>
      </div>
      <div className="cartItem__actions">
        <div>
          <i
            className="fal fa-chevron-left"
            aria-hidden="true"
            onClick={() => {
              setQnt(qnty - 1);
              getRemoveToCart(prd_supp, id, qnty - 1, "cart");
            }}
          ></i>
          <span>{qnty}</span>
          <i
            className="fal fa-chevron-right"
            aria-hidden="true"
            onClick={() => {
              setQnt(qnty + 1);
              getRemoveToCart(prd_supp, id, qnty + 1, "cart");
            }}
          ></i>
        </div>
        <div>
          <i
            className="fal fa-times"
            aria-hidden="true"
            onClick={() => getRemoveToCart(prd_supp, id, "0", "cart")}
          ></i>
        </div>
      </div>
    </div>
  );
};

const mstp = () => ({});
export default withRouter(connect(mstp, ShopActions)(RowItem));

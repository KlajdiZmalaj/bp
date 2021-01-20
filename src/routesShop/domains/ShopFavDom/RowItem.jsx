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
  main_id,
  getRemoveToCart,
  history,
  getToCart,
}) => {
  const [qnty, setQnt] = useState(qnt);

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
          {color.length > 0 && (
            <span>
              COLOUR: <span>{color}</span>
            </span>
          )}
          {size.length > 0 && (
            <span>
              SIZE : <span>{size}</span>
            </span>
          )}
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
            Move to bag
          </button>
        </div>
      </div>
    </div>
  );
};

const mstp = () => ({});
export default withRouter(connect(mstp, ShopActions)(RowItem));

import React, { useState, useEffect } from "react";
import ShopActions from "redux-store/models/shop";
import AuthActions from "redux-store/models/auth";

import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import { Radio, Form } from "antd";

import images from "themes/images";

const Brand = ({
  getProductsList,
  history,
  brand,
  accountInfo,
  cat,
  itemS,
}) => {
  useEffect(() => {
    // setData({
    //   ...formData,
    //   name: accountInfo?.profile?.name?.split?.(" ")?.[0],
    //   last_name: accountInfo?.profile?.name?.split?.(" ")?.[1],
    //   email: accountInfo?.profile?.email,
    //   cap: itemsCart?.user_data?.postcode,
    // });
  }, [
    accountInfo,
    // match.params.id,
    // match.params.supp,
  ]);

  const [cost, setCost] = useState(false);

  return (
    <div
      className="brands__item"
      onClick={() => {
        getProductsList(null, brand.name, cat[itemS].name);
        this.setIsShown(false);
        history.push(
          `/product-filtered/${cat[itemS].name.split(" | ")[0]}__${
            cat[itemS].name.split(" | ")[1]
          }`
        );
      }}
    >
      <img
        src={brand?.url || images["placeholder"]}
        className={cost && "hidden"}
        onError={(e) => {
          e.target.onerror = null;
          setCost(true);
        }}
      />
      {cost && brand?.name}
    </div>
  );
};

const mstp = (state) => ({
  carriers: state.shop.carries,
  accountInfo: state.auth.accountInfo,
});

export default withRouter(
  connect(mstp, { ...ShopActions, AuthActions })(Form.create()(Brand))
);

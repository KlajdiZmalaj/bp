import React from "react";
import { AuthActions } from "redux-store/models";
import { ItemFull } from "./AdminComp";
import { connect } from "react-redux";
const SkinExtraComp = ({ getSkinExtras, userDetail, skinExtras = {} }) => {
  React.useEffect(() => {
    getSkinExtras(userDetail?.id);
    //eslint-disable-next-line
  }, [getSkinExtras]);
  return (
    <div className="newReg--row usercomp">
      <div className="newReg--row__col">
        <ItemFull
          Class="semi"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"Account name"}
          value={skinExtras.account_name}
        />
        <ItemFull
          Class="semi"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"Address"}
          value={skinExtras.address}
        />
        <ItemFull
          Class="semi"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"Bank name"}
          value={skinExtras.bank_name}
        />
        <ItemFull
          Class="semi"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"Telefono"}
          value={skinExtras.cel}
        />
        <ItemFull
          Class="full"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"E-mail"}
          value={skinExtras.mail}
        />
      </div>
      <div className="newReg--row__col">
        <div className="itemCol full">
          <div className="inputLabel">Skin Color</div>
          <input
            className="ant-input"
            disabled
            type="text"
            style={{ background: `#${skinExtras.main_color}`, border: 0 }}
          />
        </div>
        <ItemFull
          Class="full"
          readOnly={true}
          handleChange={() => {}}
          changeValue={""}
          title={"Iban"}
          value={skinExtras.iban}
        />
      </div>
    </div>
  );
};

export default connect(({ auth }) => {
  return { skinExtras: auth.skinExtras };
}, AuthActions)(SkinExtraComp);

import React from "react";
import { connect } from "react-redux";
import "./style.css";
const UserInfoBar = ({ accountInfo }) => {
  return (
    <div className="userBar">
      {accountInfo?.profile ? (
        <>
          <div>{accountInfo?.profile?.name}</div>
          <div>
            Saldo: <span> {accountInfo?.profile?.wallet}€</span>
          </div>
        </>
      ) : (
        <span>Benvenuto su Bpoint Store</span>
      )}
    </div>
  );
};
const mstp = ({ auth: { accountInfo } }) => ({
  accountInfo,
});
export default connect(mstp, null)(UserInfoBar);

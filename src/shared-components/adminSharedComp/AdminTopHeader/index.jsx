import React from "react";
import AuthActions from "redux-store/models/auth";
import { Time, MainAdminCarousel } from "shared-components";
import { connect } from "react-redux";
const TopHeader = ({ accountInfo, logOut }) => {
  return (
    <div className="TopHeader">
      <Time />
      <MainAdminCarousel accountInfo={accountInfo} />

      <span className="creditoD">
        Credito : {accountInfo?.profile?.wallet}€{" "}
      </span>
      <span
        className="logOutBtn"
        onClick={() => {
          logOut();
          window.location.hash = "login";
        }}
      >
        Log OUT
      </span>
    </div>
  );
};

const mapStatToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStatToProps, AuthActions)(TopHeader);

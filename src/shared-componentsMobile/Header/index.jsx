import React, { useState, useEffect } from "react";
import "./style.css";
import images from "themes/images";
import { connect } from "react-redux";
import TabBody from "./TabBody";
import { AuthActions, MainActions } from "redux-store/models";
const Header = ({ accountInfo, logOut, getAllServices, allServices }) => {
  const [leftMenu, setMenu] = useState(false);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    getAllServices(1);
  }, []);
  return (
    <header className="headerMob">
      <i onClick={() => setMenu(!leftMenu)} className="fal fa-bars"></i>
      <img
        onClick={() => {
          window.location.hash = "dashboard";
        }}
        src={images.logo}
        alt=""
        className="logoMob"
      />
      {accountInfo?.profile ? (
        <i
          onClick={() => {
            window.location.hash = "configura";
          }}
          className={`fal fa-user-circle${
            window.location.hash.includes("configura") ? " active" : ""
          }`}
        ></i>
      ) : (
        <i
          onClick={() => {
            window.location.hash = "login";
          }}
          className="fal fa-sign-in"
        ></i>
      )}

      {leftMenu && (
        <>
          <nav
            className={`animated slideInLeft${
              leftMenu === "out" ? " slideOutLeft" : ""
            }`}
          >
            <div className="tabs">
              <div
                onClick={() => setTab(1)}
                className={tab === 1 ? "active fadeIn animated" : "animated"}
              >
                <i className="fal fa-ellipsis-v-alt"></i> Menu
              </div>
              <div
                onClick={() => setTab(2)}
                className={tab === 2 ? "active fadeIn animated" : "animated"}
              >
                <i className="fal fa-store"></i> Servizi
              </div>
            </div>
            <TabBody
              setMenu={setMenu}
              allServices={allServices}
              logOut={logOut}
              accountInfo={accountInfo}
              tab={tab}
            />
          </nav>
          <div
            onClick={() => {
              setMenu("out");
              setTimeout(() => {
                setMenu(false);
              }, 500);
            }}
            className="backDrop"
          ></div>{" "}
        </>
      )}
    </header>
  );
};
const mstp = ({ auth: { accountInfo, allServices } }) => ({
  accountInfo,
  allServices,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(Header);

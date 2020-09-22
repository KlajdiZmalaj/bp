import React, { useState } from "react";
import "./style.css";
import images from "themes/images";
import { connect } from "react-redux";
import TabBody from "./TabBody";
import { AuthActions, MainActions } from "redux-store/models";
const Header = ({ accountInfo, logOut, services }) => {
  const [leftMenu, setMenu] = useState(false);
  const [tab, setTab] = useState(1);
  const [initialX, setInitialX] = useState(0);
  const [transformValue, setTransform] = useState(0);
  console.log("transformValue", transformValue);
  return (
    <header className={"headerMob" + (leftMenu ? " open" : " closed")}>
      <button onClick={() => setMenu(!leftMenu)}>
        <span></span>
      </button>

      <img
        onTouchStart={(e) => {
          const touch = e?.touches[0]?.clientX;
          setInitialX(touch);
        }}
        onTouchMove={(e) => {
          const touch = e?.touches[0]?.clientX;
          if (initialX < touch) {
            setTransform(30);
            setTimeout(() => {
              const el = document.querySelector(".headerMob i:nth-child(3)");
              if (el) {
                el.click();
              }
            }, 300);
          }
          if (initialX > touch) {
            setTransform(-30);
            setTimeout(() => {
              setMenu(true);
            }, 300);
          }
          // setTransform(touch - initialX);
        }}
        onTouchEnd={() => {
          setTransform(0);
        }}
        onClick={() => {
          window.location.hash = "dashboard";
        }}
        src={images.logo}
        style={{
          transform: `translateX(${
            transformValue > 30
              ? 30
              : transformValue < -30
              ? -30
              : transformValue
          }px)`,
        }}
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
              services={services}
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
          ></div>
        </>
      )}
    </header>
  );
};
const mstp = ({ auth: { accountInfo }, main: { services } }) => ({
  accountInfo,
  services,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(Header);

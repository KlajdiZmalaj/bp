import React from "react";
import { azioni } from "config";
import { get, includes } from "lodash";
import { Tooltip } from "antd";
import { open } from "shared-components/Chat/Chat";
export default ({ tab, accountInfo, logOut, allServices, setMenu }) => {
  return tab === 1 ? (
    <div className="tabBody body1">
      {accountInfo?.profile ? (
        <div className="tabBody--item">
          <i className="fal fa-user-circle" aria-hidden="true"></i>

          <Tooltip title={accountInfo?.profile?.name}>
            {" "}
            <div className="nameUser">{accountInfo?.profile?.name}</div>
          </Tooltip>

          <span>{accountInfo?.profile?.wallet}€</span>
        </div>
      ) : (
        <div className="tabBody--item active">
          <i className="fal fa-store"></i>
          Servizi
        </div>
      )}

      {azioni.map((tab) => {
        return (
          includes(tab.displayRole, get(accountInfo, "profile.role.name")) && (
            <div
              key={tab.id}
              onClick={() => {
                window.location.hash = `${tab.link}`;
              }}
              className={
                "tabBody--item" +
                (window.location.hash.includes(tab.link) ? " active" : "")
              }
            >
              <i className={`icon ${tab.i}`}></i>
              {tab.name}
            </div>
          )
        );
      })}
      <div className="tabBody--a">
        <div
          className="tabBody--a__b"
          onClick={() => {
            open(window.innerWidth, window.innerHeight);
          }}
        >
          <i className="fal fa-cog" aria-hidden="true"></i>
          Helpdesk
        </div>
        {accountInfo?.profile ? (
          <div onClick={() => logOut()} className="tabBody--a__b">
            LOGOUT <i className="fal fa-sign-out"></i>
          </div>
        ) : (
          <div
            onClick={() => {
              window.location.hash = "login";
            }}
            className="tabBody--a__b"
          >
            LOGIN <i className="fal fa-sign-out"></i>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="tabBody body2">
      {accountInfo?.profile ? (
        <div className="tabBody--item">
          <i className="fal fa-user-circle" aria-hidden="true"></i>

          <Tooltip title={accountInfo?.profile?.name}>
            {" "}
            <div className="nameUser">{accountInfo?.profile?.name}</div>
          </Tooltip>

          <span>{accountInfo?.profile?.wallet}€</span>
        </div>
      ) : (
        <div
          onClick={() => {
            window.location.hash = "login";
          }}
          className="tabBody--item active"
        >
          <i className="fal fa-sign-in" aria-hidden="true"></i>
          Login
        </div>
      )}
      {(allServices?.categories || []).map((category) => (
        <div
          className="tabBody--item"
          onClick={() => {
            setMenu("out");
            setTimeout(() => {
              setMenu(false);
              const el = document.querySelector(`#${category.name}`);
              if (category.name === "BGLT" || category.name === "VSRE") {
                window.location.hash = "forms";
              } else {
                if (el) {
                  setTimeout(() => {
                    el.click();
                    el.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                } else {
                  window.location.hash = "dashboard";
                  setTimeout(() => {
                    const el = document.querySelector(`#${category.name}`);
                    if (el) {
                      el.click();
                      el.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }, 300);
                }
              }
            }, 500);
          }}
        >
          <i className={`fal ${category.name}`} aria-hidden="true"></i>{" "}
          <span> {category.full_name}</span>
          <i className="fal fa-chevron-right" aria-hidden="true"></i>{" "}
        </div>
      ))}
    </div>
  );
};

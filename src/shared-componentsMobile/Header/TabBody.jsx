import React from "react";
import { azioni } from "config";
import { capitalize, get, includes } from "lodash";
import { Tooltip } from "antd";
export default ({ tab, accountInfo, logOut, services, setMenu }) => {
  // console.log("services", services);
  return tab === 1 ? (
    <div className="tabBody body1">
      {accountInfo?.profile?.role?.name === "super_admin" && (
        <div
          className="tabBody--item"
          onClick={() => {
            window.location.hash = "registerAgent";
          }}
        >
          <i className="fal fa-user"></i>
          Register Agent
        </div>
      )}
      {(accountInfo?.profile?.role?.name === "agent" ||
        accountInfo?.profile?.role?.name === "super_admin") && (
        <div
          className="tabBody--item"
          onClick={() => {
            window.location.hash = "registerAgency";
          }}
        >
          <i className="fal fa-user"></i>
          Registra Agenzia
        </div>
      )}
      {accountInfo?.profile?.role?.name === "agency" && (
        <div
          className="tabBody--item"
          onClick={() => {
            window.location.hash = "ru";
          }}
        >
          <i className="fal fa-user"></i>
          Registra Nuovi Utenti
        </div>
      )}
      {accountInfo?.profile ? (
        <div className="tabBody--item">
          <i className="fal fa-user-circle" aria-hidden="true"></i>

          <Tooltip title={accountInfo?.profile?.name}>
            <div className="nameUser">{accountInfo?.profile?.name}</div>
          </Tooltip>

          <span>{accountInfo?.profile?.wallet}€</span>
        </div>
      ) : (
        <>
          <div className="tabBody--item">
            <i className="fal fa-store"></i>
            Servizi
          </div>
        </>
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
        <a
          href="https://tawk.to/chat/5d443c5f7d27204601c8f6b8/default"
          target="_blank"
          className="tabBody--a__b"
          rel="noopener noreferrer"
        >
          <i className="fal fa-cog" aria-hidden="true"></i>
          Helpdesk
        </a>
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
      {accountInfo?.profile && (
        <div className="tabBody--item">
          <i className="fal fa-user-circle" aria-hidden="true"></i>

          <Tooltip title={accountInfo?.profile?.name}>
            {" "}
            <div className="nameUser">{accountInfo?.profile?.name}</div>
          </Tooltip>

          <span>{accountInfo?.profile?.wallet}€</span>
        </div>
      )}

      {(Object.keys(services) || []).map((categoryKey) =>
        !services[categoryKey]?.name.includes("TELEFONICHE ") ? (
          <div
            key={categoryKey}
            className="tabBody--item"
            onClick={() => {
              setMenu("out");
              setTimeout(() => {
                setMenu(false);
                const tabtutte = document.getElementById("tab0");
                function funx(elem) {
                  if (elem) {
                    setTimeout(() => {
                      elem.click();
                      elem.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                      });
                    }, 100);
                  }
                }

                if (tabtutte) {
                  tabtutte.click();
                  setTimeout(() => {
                    const el = document.querySelector(`#${categoryKey}`);
                    funx(el);
                  }, 100);
                } else {
                  window.location.hash = "dashboard";
                  setTimeout(() => {
                    const el = document.querySelector(`#${categoryKey}`);
                    funx(el);
                  }, 300);
                }

                if (categoryKey === "BGLT" || categoryKey === "VSRE") {
                  window.location.hash = "forms";
                }
              }, 500);
            }}
          >
            <i className={`fal ${categoryKey}`} aria-hidden="true"></i>{" "}
            <span> {capitalize(services[categoryKey]?.name)}</span>
            <i className="fal fa-chevron-right" aria-hidden="true"></i>{" "}
          </div>
        ) : (
          <div
            key={categoryKey}
            className="tabBody--item tel"
            onClick={() => {
              setMenu("out");
              setTimeout(() => {
                setMenu(false);
                window.location.hash = "dashboard";
                setTimeout(() => {
                  const el = document.getElementById("tabRTELC,RTELD,RTELI");
                  if (el) {
                    el.click();
                    el.scrollIntoView({
                      behavior: "smooth",
                    });
                    const panel = document.getElementById("RTELD");
                    if (panel) {
                      panel.click();
                    }
                  }
                }, 300);
              }, 500);
            }}
          >
            <i className={`fal ${categoryKey}`} aria-hidden="true"></i>{" "}
            <span> Ricariche Telefono</span>
            <i className="fal fa-chevron-right" aria-hidden="true"></i>{" "}
          </div>
        )
      )}
      <div className="tabBody--a">
        <a
          href="https://tawk.to/chat/5d443c5f7d27204601c8f6b8/default"
          target="_blank"
          className="tabBody--a__b"
          rel="noopener noreferrer"
        >
          <i className="fal fa-cog" aria-hidden="true"></i>
          Helpdesk
        </a>
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
  );
};

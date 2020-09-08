import React from "react";
import { azioni } from "config";
import { get, includes } from "lodash";
export default ({ tab, accountInfo, logOut }) => {
  return tab === 1 ? (
    <div className="tabBody body1">
      {accountInfo?.profile ? (
        <div className="tabBody--item">
          <i className="fal fa-user-circle" aria-hidden="true"></i>
          {accountInfo?.profile?.name}
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
        <div className="tabBody--a__b">
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
    <div className="tabBody body2"></div>
  );
};

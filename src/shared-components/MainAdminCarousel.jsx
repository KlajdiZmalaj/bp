import React from "react";

const MainAdminCarousel = ({ accountInfo }) => {
  return (
    <div className="wallets-carusel">
      <div className="wallets-carusel-wrapper">
        {Object.keys(accountInfo?.profile?.supplier_wallets || {}).map(
          (wallet, i) => {
            return (
              <div key={i}>
                <span>{wallet} : </span>
                <span>
                  {accountInfo?.profile?.supplier_wallets?.[wallet]}
                  &euro;
                </span>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default React.memo(MainAdminCarousel);

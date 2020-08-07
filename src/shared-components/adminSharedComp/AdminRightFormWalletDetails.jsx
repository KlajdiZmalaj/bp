import React from "react";
const AdminRightFormWalletDetails = ({
  handleDepositoVisibility,
  handleDebitoVisibility,
  depositoActiveVisibility,
  addebitoActiveVisibility,
}) => (
  <div className="AdminRightForm--Box--Wallet--Dropdown">
    <div className="AdminRightForm--Box--Wallet--Dropdown--ChoseButtons">
      <button
        onClick={handleDepositoVisibility}
        className={`${depositoActiveVisibility === true ? "active" : ""}`}
      >
        DEPOSITO{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path className="a" d="M5.5,0,11,7H0Z" />
        </svg>
      </button>
      <button
        onClick={handleDebitoVisibility}
        className={`${addebitoActiveVisibility === true ? "active" : ""}`}
      >
        ADDEBITO{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path className="a" d="M5.5,0,11,7H0Z" />
        </svg>
      </button>
    </div>
    <div className="InputHolder">
      <input placeholder="SEARCH USERNAME" />
      <i className="fal fa-search"></i>
    </div>

    <div className="InputHolder">
      <input placeholder="SOMMA" />
      <span>&euro;</span>
    </div>
    <div className="InputHolder">
      <input placeholder="NOTIFICA ALL’USER" />
      <i className="far fa-check"></i>
    </div>

    <button className="AdminRightForm--Box--Wallet--Dropdown--Submit">
      DEPOSITO
    </button>
  </div>
);
export default AdminRightFormWalletDetails;

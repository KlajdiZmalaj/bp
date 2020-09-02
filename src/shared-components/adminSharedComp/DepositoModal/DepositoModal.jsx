import React, { useState, Fragment } from "react";
import { transferMoney } from "services/auth";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";

import "./depositoModal.css";
const DepositoModal = ({
  Close,
  type,
  username,
  id,
  role,
  activeSkinId,
  amountGiven,
  getUsers,
}) => {
  const amountCheck = amountGiven ? amountGiven : 0;
  const [amount, setAmount] = useState(amountCheck);
  const [message, setMessage] = useState("");
  const [tickOrX, setTickOrX] = useState(true);
  return (
    <div className="DepositoModal">
      <div className="backDrop" style={{ zIndex: 8 }} onClick={Close}></div>
      <div className="DepositoModal--Container">
        <div className="DepositoModal--Container--Up">
          <div className="DepositoModal--Container--Up--Title">{`${
            type === "deposit" ? "DEPOSITO" : "ADDEBITO"
          }`}</div>
          <div className="DepositoModal--Container--Up--Agguntoal">
            {" "}
            <span className="DepositoModal--Container--Up--Agguntoal--Persona">
              <span className="DepositoModal--Container--Up--Agguntoal--Persona--Part1">
                Il credito vera a
              </span>
              {/* <i className={`${allRoles[itemList.role]}`} /> */}
              <i className="fal fa-user" />
              <span className="DepositoModal--Container--Up--Agguntoal--Persona--Part3">
                {username?.toUpperCase()}
              </span>
            </span>
          </div>
        </div>
        <div className="DepositoModal--Container--Down">
          <form className="DepositoModal--Container--Down--Form">
            <div className="DepositoModal--Container--Down--Form--AmountLine">
              {" "}
              <span className="DepositoModal--Container--Down--Form--AmountLine--Amount">
                AMOUNT
              </span>{" "}
              <div className="DepositoModal--Container--Down--Form--AmountLine--Input">
                <input
                  type="text"
                  placeholder="0.00"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                  className="DepositoModal--Container--Down--Form--AmountLine--Input--Input"
                />{" "}
                <span className="DepositoModal--Container--Down--Form--AmountLine--Input--Euro">
                  {" "}
                  &euro;
                </span>
              </div>
            </div>
            <div className="DepositoModal--Container--Down--Form--NotifyLine">
              {" "}
              <span>NOTIFICA ALL'USER</span>
              <i
                style={{ cursor: "pointer" }}
                className={`${tickOrX ? "far fa-check" : "fas fa-times"}`}
                onClick={() => {
                  setTickOrX(!tickOrX);
                }}
              ></i>
            </div>

            <textarea
              placeholder="MESSAGE"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="DepositoModal--Container--Down--Form--MessageLine"
            />
            <div className="DepositoModal--Container--Down--Form--buttons">
              <button
                className="DepositoModal--Container--Down--Form--buttons--Conferma"
                onClick={() => {
                  // api
                  transferMoney(id, amount, type, () => {}, role, activeSkinId);
                  Close();
                  if (activeSkinId === -1) {
                    getUsers(null, {
                      skin_id: 1,
                    });
                  } else {
                    getUsers(null, {
                      skin_id: activeSkinId,
                      backoffice: true,
                    });
                  }
                }}
              >
                CONFERMA
              </button>
              <button className="DepositoModal--Container--Down--Form--buttons--Cancel">
                {" "}
                <i class="fal fa-times"></i>
                <span onClick={Close}>CANCEL</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  role: state.auth.accountInfo.profile.role,
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStateToProps, MainActions)(DepositoModal);

import React, { useState } from "react";
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
  SecondClose,
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
                Il credito verrà aggiunto a:
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
                SOMMA
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
              <span>NOTIFICA ALL'UTENTE</span>
              <i
                style={{ cursor: "pointer" }}
                className={`${tickOrX ? "far fa-check" : "fas fa-times"}`}
                onClick={() => {
                  setTickOrX(!tickOrX);
                }}
              ></i>
            </div>

            <textarea
              placeholder="MESSAGGIO"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="DepositoModal--Container--Down--Form--MessageLine"
            />
            <div className="DepositoModal--Container--Down--Form--buttons">
              <button
                className="DepositoModal--Container--Down--Form--buttons--Conferma"
                onClick={async () => {
                  // api
                  await transferMoney(
                    id,
                    amount,
                    type,
                    () => {},
                    role,
                    activeSkinId
                  );
                  await Close();
                  if (activeSkinId === -1) {
                    await getUsers(null, {
                      skin_id: 1,
                    });
                  } else {
                    await getUsers(null, {
                      skin_id: activeSkinId,
                      backoffice: true,
                    });
                  }
                  if (SecondClose) {
                    await SecondClose();
                  }
                }}
              >
                CONFERMA
              </button>
              <button
                className="DepositoModal--Container--Down--Form--buttons--Cancel"
                onClick={Close}
              >
                <i className="fal fa-times"></i>
                <span>CANCELLA</span>
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

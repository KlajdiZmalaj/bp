import React from "react";
const DepositoModal = () => {
  return (
    <div className="DepositoModal">
      <div className="backDrop"></div>
      <div className="DepositoModal--Container">
        <div className="DepositoModal--Container--Up">
          <div className="DepositoModal--Container--Up--Title">DEPOSITO</div>
          <div className="DepositoModal--Container--Up--Agguntoal">
            {" "}
            <span className="DepositoModal--Container--Up--Agguntoal--Persona">
              <span className="DepositoModal--Container--Up--Agguntoal--Persona--Part1">
                Il credito vera asdas
              </span>
              {/* <i className={`${allRoles[itemList.role]}`} /> */}
              <i className="fal fa-user" />
              <span className="DepositoModal--Container--Up--Agguntoal--Persona--Part3">
                RnHristova
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
              <span>NOTIFY THE USER</span>
              <i className="far fa-check"></i>
            </div>

            <textarea
              placeholder="MESSAGE"
              className="DepositoModal--Container--Down--Form--MessageLine"
            />
            <div className="DepositoModal--Container--Down--Form--buttons">
              <button className="DepositoModal--Container--Down--Form--buttons--Conferma">
                CONFERMA
              </button>
              <button className="DepositoModal--Container--Down--Form--buttons--Cancel">
                {" "}
                <i class="fal fa-times"></i>
                <span>CANCEL</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DepositoModal;

import React, { Component } from "react";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import { switchUserStatus, transferMoney } from "services/auth";
class SingleUser extends Component {
  state = {
    label: "deposit",
    val: "",
    isPopUpActive: false,
    isOpen: false,
    valueInput: ""
  };
  transferCallback = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };

  inpHandler = e => {
    this.setState({ valueInput: e.target.value });
  };
  switchLabel = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  setTransferItem = val => {
    this.setState({ val, isPopUpActive: true });
  };
  setPopUpFalse = () => {
    this.setState({ isPopUpActive: false });
  };
  componentDidMount() {}
  render() {
    const { user } = this.props;
    const { label, val, isOpen, isPopUpActive, valueInput } = this.state;
    console.log("valueInput", valueInput);
    return (
      <React.Fragment>
        <div className="userList--noDoc__user singleUser">
          {" "}
          <div className="body">
            <span>#{user.id}</span>
            <span className="text-left justify-content-start">
              <i
                className={
                  "fas fa-user-alt pr-2 d-flex align-items-center" +
                  (user.status === 1 ? " text-success" : " text-danger")
                }
              ></i>{" "}
              {user.first_name}
            </span>
            <span> {user.last_name}</span>
            <span>{user.rag_soc}</span>
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
            <span>{user.last_deposit}</span>
            <span>
              {user.wallet}
              <div
                className={"label" + (isOpen ? " active" : "")}
                onClick={() => {
                  this.switchLabel();
                }}
              >
                {val || label}{" "}
                <i className={"fas fa-chevron-" + (isOpen ? "up" : "down")}></i>
                <div className={"ddItems" + (isOpen ? " viz" : "")}>
                  <span
                    onClick={() => {
                      this.setTransferItem("deposit");
                    }}
                  >
                    Deposit
                  </span>
                  <span
                    onClick={() => {
                      this.setTransferItem("withdraw");
                    }}
                  >
                    Withdraw
                  </span>

                  <span
                    onClick={() => {
                      switchUserStatus(
                        user.id,
                        user.status == 1 ? 2 : 1,
                        this.switchCallBack
                      );
                    }}
                  >
                    {user.status === 1 ? "Block User" : "Activate User"}
                  </span>
                </div>
              </div>
            </span>
          </div>
        </div>
        {isPopUpActive ? (
          <React.Fragment>
            {" "}
            <div className="popUp">
              <div className="title">{val}</div>
              <p>
                The amount will be {val == "deposit" ? "added" : "substracted"}{" "}
                to the current balance.
              </p>
              <div className="inpgr">
                <div className="inplabel">Amount</div>
                <input
                  type="number"
                  placeholder="0.00€"
                  onChange={e => {
                    this.inpHandler(e);
                  }}
                />
              </div>

              <button
                className="sendInput"
                onClick={() => {
                  transferMoney(
                    user.id,
                    valueInput,
                    val,
                    this.transferCallback
                  );
                }}
              >
                <i class="fa fa-check"></i> Conferma
              </button>
              <button
                className="sendInput cancelInput"
                onClick={() => {
                  this.setPopUpFalse();
                }}
              >
                <i class="fa fa-times"></i> Cancel
              </button>
            </div>
            <div
              className="backDrop"
              onClick={() => {
                this.setPopUpFalse();
              }}
            ></div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default connect(null, { ...MainActions, ...AuthActions })(SingleUser);

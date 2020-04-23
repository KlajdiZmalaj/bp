import React, { Component } from "react";
import { switchUserStatus, transferMoney } from "services/auth.js";
class SingleUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      isPopUpActive: false,
      moreInfo: false,
      valueInput: "",
    };
  }
  transferCallback = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };
  inpHandler = (e) => {
    this.setState({ valueInput: e.target.value });
  };
  setTransferItem = (val) => {
    this.setState({ val, isPopUpActive: true });
  };
  setInfos = () => {
    this.setState({ moreInfo: !this.state.moreInfo });
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };
  setPopUpFalse = () => {
    this.setState({ isPopUpActive: false });
  };
  render() {
    const { user } = this.props;
    const { moreInfo, isPopUpActive, val, valueInput } = this.state;
    return (
      <div className="userList--noDoc__user singleUser">
        <div className="body">
          <span>{user.id}</span>
          <span className="text-left justify-content-start">
            {" "}
            <i
              className={
                "fas fa-user-alt pr-2 d-flex align-items-center " +
                (user.status == 1 ? "text-success" : "text-danger")
              }
              aria-hidden="true"
            ></i>{" "}
            {user.username}
          </span>
          <span>{user.full_name}</span>
          <span className="text-right justify-content-end">
            {user.credito}€
          </span>
          <span>{user.totale_speso}</span>
          <span>{user.last_deposit}</span>
          <span>{user.last_login}</span>
          <span style={{ width: "100%" }}>
            <button
              onClick={() => {
                this.setTransferItem("deposit");
              }}
            >
              Ricarica conto
            </button>
            {/* <button
              onClick={() => {
                this.setTransferItem("withdraw");
              }}
            >
              Debito
            </button> */}

            {user.status == 1 ? (
              <i
                className="fal fa-lock"
                onClick={() => {
                  switchUserStatus(user.id, 2, this.switchCallBack);
                }}
              ></i>
            ) : (
              <i
                className="fal fa-lock-open"
                onClick={() => {
                  switchUserStatus(user.id, 1, this.switchCallBack);
                }}
              ></i>
            )}
            <i
              className="fal fa-eye"
              onClick={() => {
                this.setInfos();
              }}
              aria-hidden="true"
            ></i>
          </span>
        </div>
        {moreInfo && (
          <React.Fragment>
            <div className="popUp">
              <div className="title">More Info</div>
              <ul>
                <li>
                  User ID : <span>{user.id}</span>{" "}
                </li>
                <li>
                  Nome Cognome: <span>{user.full_name}</span>{" "}
                </li>
                <li>
                  Credito: <span> {user.credito} €</span>
                </li>
              </ul>
            </div>
            <div
              className="backDrop"
              onClick={() => {
                this.setInfos();
              }}
            ></div>
          </React.Fragment>
        )}
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
                  onChange={(e) => {
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
              {user.status === 2 && (
                <p className="info">
                  <i className="fad fa-info-circle"></i> User is locked
                </p>
              )}
            </div>
            <div
              className="backDrop"
              onClick={() => {
                this.setPopUpFalse();
              }}
            ></div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default SingleUser;

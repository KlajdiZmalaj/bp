import React, { Component } from "react";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import { switchUserStatus, transferMoney } from "services/auth";
import { capitalize } from "lodash";
class SingleUser extends Component {
  state = {
    label: "deposit",
    val: "",
    isPopUpActive: false,
    isOpen: false,
    valueInput: "",
    moreInfo: false,
  };
  setInfos = () => {
    this.setState({ moreInfo: !this.state.moreInfo });
  };
  transferCallback = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };

  inpHandler = (e) => {
    this.setState({ valueInput: e.target.value });
  };
  switchLabel = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  setTransferItem = (val) => {
    this.setState({ val, isPopUpActive: true });
  };
  setPopUpFalse = () => {
    this.setState({ isPopUpActive: false });
  };
  componentDidMount() {}
  render() {
    const { user } = this.props;
    const {
      label,
      val,
      isOpen,
      isPopUpActive,
      valueInput,
      moreInfo,
    } = this.state;
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
              {user.username}
            </span>
            <span>{capitalize(user.rag_soc)}</span>
            <span className="text-right justify-content-end">
              {user.wallet}€
            </span>
            <span className="text-right justify-content-start">
              {user.city}
            </span>
            <span>{user.last_deposit}</span>
            <span>{user.last_login_time}</span>

            <span>
              <button
                onClick={() => {
                  this.setTransferItem("deposit");
                }}
              >
                Deposit
              </button>
              <button
                onClick={() => {
                  this.setTransferItem("withdraw");
                }}
              >
                Debito
              </button>
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
                  Nome: <span>{user.first_name}</span>{" "}
                </li>
                <li>
                  CogNome: <span>{user.last_name}</span>{" "}
                </li>
                <li>
                  Comune Code: <span> {user.comune_code}</span>
                </li>
                <li>
                  Credito: <span> {user.wallet} €</span>
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
      </React.Fragment>
    );
  }
}

export default connect(null, { ...MainActions, ...AuthActions })(SingleUser);

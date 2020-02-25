import React, { Component } from "react";
import axios from "axios";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";

class SingleUser extends Component {
  state = {
    label: "Azioni",
    val: "",
    isPopUpActive: false,
    isOpen: false,
    valueInput: ""
  };
  switchUserStatus = status => {
    axios
      .create({
        baseURL: "https://services-api.bpoint.store/api",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("accountDataB")).token
          }`
        }
      })
      .post(`/users/${this.props.user.id}/changeStatus`, {
        ...{ status }
      })
      .then(
        data => {
          if (data.status === 200) {
            this.setState({ isPopUpActive: false });
            this.props.getUsers();
          }
          console.log("succData", data);
        },
        data => {
          console.log("err data", data);
        }
      );
  };
  transferMoney = () => {
    axios
      .create({
        baseURL: "https://services-api.bpoint.store/api",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("accountDataB")).token
          }`
        }
      })
      .post(`/users/${this.props.user.id}/transfer`, {
        ...{ amount: this.state.valueInput },
        ...{ type: this.state.val }
      })
      .then(
        data => {
          if (data.status === 200) {
            this.setState({ isPopUpActive: false });
            this.props.getUsers();
          }
          console.log("succData", data);
        },
        data => {
          console.log("err data", data);
        }
      );
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
            <span>{user.city}</span>
            <span>{user.comune_code}</span>
            <span>
              {user.wallet}
              <div
                className={"label" + (isOpen ? " active" : "")}
                onClick={() => {
                  this.switchLabel();
                }}
              >
                {label}{" "}
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
                      this.switchUserStatus(user.status == 1 ? 2 : 1);
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
                  this.transferMoney();
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

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
            <span>{user.id}</span>
            <span>{user.username}</span>
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
              <input
                type="number"
                onChange={e => {
                  this.inpHandler(e);
                }}
              />
              <button
                className="sendInput"
                onClick={() => {
                  this.transferMoney();
                }}
              >
                Conferma <i class="fa fa-check"></i>
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

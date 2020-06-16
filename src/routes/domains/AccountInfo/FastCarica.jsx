import React, { Component } from "react";
import axios from "axios";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import { transferMoney } from "services/auth";

class FastCarica extends Component {
  state = {
    type: "deposit",
    toDisplayUserDD: false,
    valSearched: "",
    userId: "",
    userName: "",
    amountVal: 0,
    notifyUser: true,
  };
  toggleNotify = () => {
    this.setState({ notifyUser: !this.state.notifyUser });
  };
  transferCallback = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers();
  };

  setUser = (userId, userName) => {
    this.setState({ userId, userName });
  };
  setType = (type) => {
    this.setState({ type });
  };
  closeUsersDialog = () => {
    this.setState({ toDisplayUserDD: false });
  };
  amountHandler = (e) => {
    this.setState({ amountVal: e.target.value });
  };
  inpHandler = (e) => {
    this.setState({ valSearched: e.target.value, userName: e.target.value });
    if (this.state.userName) {
      this.setState({ toDisplayUserDD: true });
    } else {
      this.setState({ toDisplayUserDD: false });
    }
  };
  render() {
    const {
      type,
      valSearched,
      userName,
      userId,
      amountVal,
      toDisplayUserDD,
    } = this.state;
    const { users } = this.props;
    // console.log("users", userName, userId, amountVal);
    return (
      <div className="fastCarica">
        <div className="switchGr">
          <span
            onClick={() => {
              this.setType("deposit");
            }}
            className={`${type === "deposit" ? "active" : ""}`}
          >
            Accredita
          </span>
          <span className="or">Or</span>
          <span
            onClick={() => {
              this.setType("withdraw");
            }}
            className={`${type === "withdraw" ? "active" : ""}`}
          >
            Preleva
          </span>
        </div>
        <div className="searchUser">
          <input
            type="text"
            placeholder="Search Username"
            onChange={(e) => {
              this.inpHandler(e);
            }}
            value={userName}
          />
          <i className="fal fa-search"></i>
          {toDisplayUserDD && (
            <div className="ddUsers">
              {(users || []).map((user) => {
                return (
                  user.username
                    .toLowerCase()
                    .includes(valSearched.toLowerCase()) && (
                    <span
                      key={user.id}
                      onClick={() => {
                        this.setUser(user.id, user.username);
                        this.closeUsersDialog();
                      }}
                    >
                      {user.username}
                    </span>
                  )
                );
              })}
            </div>
          )}
        </div>
        <div className="amountGr">
          <div className="label">Somma</div>
          <input
            type="text"
            placeholder="0.00€"
            onChange={(e) => {
              this.amountHandler(e);
            }}
          />
        </div>
        <div className="amountGr" onClick={this.toggleNotify}>
          <div className="label">Notifica all’user</div>
          <div>
            <i
              className={
                "fal fa-" + (this.state.notifyUser ? "check" : "times")
              }
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <button
          className="addFounds"
          onClick={() => {
            transferMoney(userId, amountVal, type, this.transferCallback);
          }}
        >
          {type == "deposit" ? "Accredita" : "Preleva"}
        </button>
      </div>
    );
  }
}

export default connect(null, { ...MainActions, ...AuthActions })(FastCarica);

import React, { Component } from "react";
import axios from "axios";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
class FastCarica extends Component {
  state = {
    type: "deposit",
    toDisplayUserDD: false,
    valSearched: "",
    userId: "",
    userName: "",
    amountVal: 0
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
      .post(`/users/${this.state.userId}/transfer`, {
        ...{ amount: this.state.amountVal },
        ...{ type: this.state.type }
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
  setUser = (userId, userName) => {
    this.setState({ userId, userName });
  };
  setType = type => {
    this.setState({ type });
  };
  closeUsersDialog = () => {
    this.setState({ toDisplayUserDD: false });
  };
  amountHandler = e => {
    this.setState({ amountVal: e.target.value });
  };
  inpHandler = e => {
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
      toDisplayUserDD
    } = this.state;
    const { users } = this.props;
    console.log("users", userName, userId, amountVal);
    return (
      <div className="fastCarica">
        <div className="switchGr">
          <span
            onClick={() => {
              this.setType("deposit");
            }}
            className={`${type === "deposit" ? "active" : ""}`}
          >
            Add credit
          </span>
          <span className="or">Or</span>
          <span
            onClick={() => {
              this.setType("withdraw");
            }}
            className={`${type === "withdraw" ? "active" : ""}`}
          >
            withdraw
          </span>
        </div>
        <div className="searchUser">
          <input
            type="text"
            placeholder="Search Username"
            onChange={e => {
              this.inpHandler(e);
            }}
            value={userName}
          />
          <i className="fal fa-search"></i>
          {toDisplayUserDD && (
            <div className="ddUsers">
              {(users || []).map(user => {
                return (
                  user.first_name
                    .toLowerCase()
                    .includes(valSearched.toLowerCase()) && (
                    <span
                      onClick={() => {
                        this.setUser(user.id, user.first_name);
                        this.closeUsersDialog();
                      }}
                    >
                      {user.first_name}
                    </span>
                  )
                );
              })}
            </div>
          )}
        </div>
        <div className="amountGr">
          <div className="label">Amount</div>
          <input
            type="text"
            placeholder="0.00€"
            onChange={e => {
              this.amountHandler(e);
            }}
          />
        </div>
        <button
          className="addFounds"
          onClick={() => {
            this.transferMoney();
          }}
        >
          {type == "deposit" ? "Add Founds" : "Substract Founds"}
        </button>
      </div>
    );
  }
}

export default connect(null, { ...MainActions, ...AuthActions })(FastCarica);

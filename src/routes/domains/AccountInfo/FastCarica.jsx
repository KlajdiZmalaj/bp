import React, { Component } from "react";
// import axios from "axios";
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
  };
  returnAllUsers = (users) => {
    const allUsers = users;
    users.forEach((user) => {
      if (user?.children && user?.children.length >= 0) {
        user.children.forEach((child) => {
          allUsers.push(child);
          if (child?.children && child?.children.length >= 0) {
            let arrayToGet = this.checkIfHaveMoreUsers(child.children);
            if (arrayToGet.length >= 0) {
              arrayToGet.forEach((element) => {
                allUsers.push(element);
              });
            }
          }
        });
      }
    });
    return allUsers;
  };
  checkIfHaveMoreUsers = (users) => {
    const allUsers = users;
    users.forEach((user) => {
      if (user?.children && user?.children.length >= 0) {
        user.children.forEach((child) => {
          allUsers.push(child);
          if (child?.children && child?.children.length >= 0) {
            let arrayToGet = this.returnAllUsers(child.children);
            if (arrayToGet.length >= 0) {
              arrayToGet.forEach((element) => {
                allUsers.push(element);
              });
            }
          }
        });
      }
    });
    return allUsers;
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
    console.log(valSearched);
    const allUsers = [...this.props.users];
    const UsersToSearch = [...new Set(this.returnAllUsers(allUsers))];
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
            onClick={() => {
              this.setState({
                toDisplayUserDD: true,
              });
            }}
            onChange={(e) => {
              this.inpHandler(e);
            }}
            value={userName}
          />
          <i className="fal fa-search"></i>
          {toDisplayUserDD && (
            <React.Fragment>
              <div
                onClick={this.closeUsersDialog}
                className="backDrop"
                style={{
                  background: "transparent",
                  zIndex: 1,

                  position: "absolute",
                  top: "35px",
                  left: "-100px",
                  padding: "15px",
                  width: "200%",
                  height: "500px",
                }}
              ></div>
              <div className="ddUsers" style={{ zIndex: 2 }}>
                {(UsersToSearch || []).map((user) => {
                  return (
                    (user?.username
                      .toLowerCase()
                      .includes(valSearched.toLowerCase()) ||
                      valSearched === "") && (
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
            </React.Fragment>
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

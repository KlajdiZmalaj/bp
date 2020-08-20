import React, { Component } from "react";
// import axios from "axios";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import { transferMoney } from "services/auth";
import { numberWithCommas } from "utils/HelperFunc";

class Popup extends Component {
  componentDidMount() {
    const { confirmTranzacionModal } = this.props;
    if (
      confirmTranzacionModal.data.amount === 0 ||
      !confirmTranzacionModal.data.userName
    ) {
      setTimeout(() => {
        this.props.settingState();
      }, 800);
    }
  }
  render() {
    const { confirmTranzacionModal, settingState, confirmation } = this.props;
    return (
      <div className="Confirma">
        {confirmTranzacionModal?.data?.amount === 0 ||
        !confirmTranzacionModal?.data?.userName ? (
          <div className="Message">
            <div>
              Verifica nome utente e importo non devono essere vuoti o 0{" "}
            </div>
          </div>
        ) : (
          <div className="Message">
            <div>
              {" "}
              {` Stai per ${
                confirmTranzacionModal.data.type === "deposit"
                  ? "Accreditare"
                  : "Prelevare"
              } la somma di:  € ${numberWithCommas(
                confirmTranzacionModal.data.amount
              )}   
                a ${confirmTranzacionModal.data.userName} `}
            </div>
            <div>Confermi ?</div>
            <div className="Buttons">
              <button
                onClick={() => {
                  confirmation();
                }}
              >
                Si
              </button>
              <button onClick={settingState}>No</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
class FastCarica extends Component {
  state = {
    type: "deposit",
    toDisplayUserDD: false,
    valSearched: "",
    userId: "",
    userName: "",
    amountVal: 0,
    notifyUser: true,
    confirmTranzacionModal: { visibility: false, data: "" },
  };
  toggleNotify = () => {
    this.setState({ notifyUser: !this.state.notifyUser });
  };
  transferCallback = () => {
    this.setState({ confirmTranzacionModal: { visibility: false, data: "" } });
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
      confirmTranzacionModal,
    } = this.state;

    console.log(confirmTranzacionModal);
    const allUsers = [...this.props.users];
    const UsersToSearch = [...new Set(this.returnAllUsers(allUsers))];
    return (
      <div className="fastCarica">
        {confirmTranzacionModal?.visibility === true && (
          <React.Fragment>
            <Popup
              settingState={() => {
                this.setState({
                  confirmTranzacionModal: {
                    ...{ visibility: false, data: "" },
                  },
                });
              }}
              confirmTranzacionModal={confirmTranzacionModal}
              confirmation={() => {
                transferMoney(userId, amountVal, type, this.transferCallback);
              }}
            />
            <div
              className="backDrop"
              onClick={() => {
                this.setState({
                  confirmTranzacionModal: {
                    ...{ visibility: false, data: "" },
                  },
                });
              }}
            ></div>
          </React.Fragment>
        )}
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
            this.setState({
              confirmTranzacionModal: {
                visibility: true,
                data: { amount: amountVal, type: type, userName: userName },
              },
            });
            // transferMoney(userId, amountVal, type, this.transferCallback);
          }}
        >
          {type == "deposit" ? "Accredita" : "Preleva"}
        </button>
      </div>
    );
  }
}

export default connect(null, { ...MainActions, ...AuthActions })(FastCarica);

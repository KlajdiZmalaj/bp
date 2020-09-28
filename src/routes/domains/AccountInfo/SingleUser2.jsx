import React, { Component } from "react";
import MainActions from "redux-store/models/main";
import AuthActions from "redux-store/models/auth";
import { connect } from "react-redux";
import { switchUserStatus, transferMoney } from "services/auth";
import { capitalize, get } from "lodash";
import { message } from "antd";
import SingleUser from "./SingleUser";
class SingleUser2 extends Component {
  state = {
    label: "deposit",
    val: "",
    isPopUpActive: false,
    isOpen: false,
    valueInput: "",
    moreInfo: false,
    displayChildren: false,
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
  setPopUpFalse = () => {
    this.setState({ isPopUpActive: false });
  };
  render() {
    const { user } = this.props;
    const { val, isPopUpActive, valueInput } = this.state;
    const role = get(this.props.accountInfo, "profile.role.name");
    return (
      <React.Fragment>
        <div
          className={
            "userList--noDoc__user singleUser" +
            (user.children && user.children.length > 0 ? " hasChildren" : "") +
            (this.state.displayChildren ? " isopenrow" : "") +
            ` level${this.props.level}`
          }
        >
          {" "}
          <div className="body">
            <span>#{user.id}</span>
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (
                  user.children &&
                  user.children.length > 0 &&
                  !e.target.classList.contains("fa-ey") &&
                  !e.target.classList.contains(" fa-lock-open") &&
                  !e.target.classList.contains(" fa-lock") &&
                  e.target.tagName != "BUTTON"
                ) {
                  this.setState({
                    displayChildren: !this.state.displayChildren,
                  });
                }
              }}
              className={
                "text-left justify-content-start userDropAnch" +
                (user.children &&
                user.children.length > 0 &&
                !this.state.displayChildren
                  ? " isPlus"
                  : " isMinus")
              }
              style={{
                paddingLeft: `calc(10px * ${this.props.level || 1})`,
              }}
            >
              {user.children &&
                user.children.length > 0 &&
                !this.state.displayChildren && (
                  <i className="fal fa-plus-square mpIcon"></i>
                )}
              {this.state.displayChildren && (
                <i className="fal fa-minus-square mpIcon"></i>
              )}
              {user.role === "agency" && (
                <i
                  className={
                    "fal fa-store" +
                    (user.status === 1 ? " text-success" : " text-danger")
                  }
                ></i>
              )}
              {user.role === "agent" && (
                <i
                  className={
                    "fas fa-user-tie" +
                    (user.status === 1 ? " text-success" : " text-danger")
                  }
                ></i>
              )}
              {user.role === "user" && (
                <i
                  className={
                    "fal fa-user" +
                    (user.status === 1 ? " text-success" : " text-danger")
                  }
                ></i>
              )}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.props.setDepositoPopup({
                    val: "deposit",
                    data: user,
                    visibility: true,
                  });
                }}
              >
                Deposit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.props.setDepositoPopup({
                    val: "withdraw",
                    data: user,
                    visibility: true,
                  });
                }}
              >
                Addebito
              </button>
              {user.status == 1 ? (
                <i
                  className="fal fa-lock-open"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    switchUserStatus(user.id, 2, this.switchCallBack, role);
                    message.error(
                      "lo stato dell`utente è cambiato : `DISATTIVATO`"
                    );
                  }}
                ></i>
              ) : (
                <i
                  className="fal fa-lock"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    switchUserStatus(user.id, 1, this.switchCallBack, role);
                    message.success(
                      "lo stato dell`utente è cambiato : `ATTIVATO`"
                    );
                  }}
                ></i>
              )}
              {role === "main_admin" ? (
                ""
              ) : (
                <i
                  className="fal fa-eye"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setInfos();
                    user && user.role === "user"
                      ? this.props.getUserByUserId(user.id)
                      : user.role === "agent"
                      ? this.props.getAgentByUserId(user.id)
                      : this.props.getUserDetail(user.id);
                  }}
                  aria-hidden="true"
                ></i>
              )}
            </span>
          </div>
        </div>
        {this.state.displayChildren &&
          user.children &&
          user.children.length > 0 && (
            <div className={"wrapppper"}>
              {user.children.map((user) => {
                return (
                  <SingleUser
                    level={parseInt(this.props.level) + 1}
                    user={user}
                    key={user.id}
                  />
                );
              })}
            </div>
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
              <div className="buttons">
                <button
                  className="sendInput"
                  onClick={() => {
                    transferMoney(
                      user.id,
                      valueInput,
                      val,
                      this.transferCallback,
                      role
                    );
                  }}
                >
                  <i className="fa fa-check"></i> Conferma
                </button>
                <button
                  className="sendInput cancelInput"
                  onClick={() => {
                    this.setPopUpFalse();
                  }}
                >
                  <i className="fa fa-times"></i> Cancel
                </button>
              </div>
              {user.status === 2 && (
                <p className="info">
                  <i className="fad fa-info-circle"></i> L'UTENTE È BLOCCATO
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
const mstp = (state) => {
  return {
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, { ...MainActions, ...AuthActions })(SingleUser2);

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
    this.props.getUsers(null, null, 25, this.props.page_number, "LOAD_FALSE");
  };
  switchCallBack = () => {
    this.setState({ isPopUpActive: false });
    this.props.getUsers(null, null, 25, this.props.page_number, "LOAD_FALSE");
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
    const { user, screenWidth } = this.props;
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
          data-level={this.props.level}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (screenWidth <= 1024) {
              this.props.setRowData(user);
            }
          }}
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
                  e.target.tagName !== "BUTTON"
                ) {
                  this.setState({
                    displayChildren: !this.state.displayChildren,
                  });
                }
              }}
              className={
                "text-left justify-content-start userDropAnch text-uppercase" +
                (user.children &&
                user.children.length > 0 &&
                !this.state.displayChildren
                  ? " isPlus"
                  : " isMinus") +
                ((user.children &&
                  user.children.length > 0 &&
                  !this.state.displayChildren) ||
                this.state.displayChildren
                  ? " hasIcon"
                  : "")
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
              <div className="w-100 d-block"> {user.username}</div>
            </span>
            <span>
              <div className="w-100 d-block">{capitalize(user.rag_soc)}</div>
            </span>
            <span className="text-right justify-content-end">
              {user.wallet}???
            </span>
            <span className="text-right justify-content-start">
              {capitalize(user.city)}
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

              {user.status === 1 ? (
                <i
                  className="fal fa-lock-open"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    switchUserStatus(user.id, 2, this.switchCallBack, role);
                    message.error(
                      "lo stato dell`utente ?? cambiato : `DISATTIVATO`"
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
                      "lo stato dell`utente ?? cambiato : `ATTIVATO`"
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
                      setRowData={this.props.setRowData}
                    />
                  );
                })}
              </div>
            )}
        </div>

        {isPopUpActive ? (
          <React.Fragment>
            {" "}
            <div className="popUp">
              <div className="title">{val}</div>
              <p>
                The amount will be {val === "deposit" ? "added" : "substracted"}{" "}
                to the current balance.
              </p>
              <div className="inpgr">
                <div className="inplabel">Amount</div>
                <input
                  type="number"
                  placeholder="0.00???"
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
                      parseFloat(valueInput.replace(",", ".")),
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
              {user.status !== 1 && (
                <p className="info">
                  <i className="fad fa-info-circle"></i> L'UTENTE ?? BLOCCATO
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
    screenWidth: state.main.screenWidth,
  };
};
export default connect(mstp, { ...MainActions, ...AuthActions })(SingleUser2);

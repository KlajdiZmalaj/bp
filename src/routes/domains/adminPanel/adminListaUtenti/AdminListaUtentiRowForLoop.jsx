import React from "react";
import { connect } from "react-redux";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import AuthActions from "redux-store/models/auth";
import { allRoles } from "config/index";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";
import { switchUserStatus } from "services/auth";
import MainActions from "redux-store/models/main";
import { message } from "antd";
import moment from "moment";
class AdminListaUtentiRowForLoop extends React.Component {
  state = {
    activateChildren: false,
    eyeClicked: false,
    plusVisibility: false,
  };
  CheckClass = (number, CenterCls) => {
    if (CenterCls === "Center") {
      return number;
    } else {
      return parseInt((10 % number) + number);
    }
  };
  CheckSize = (screenWidth, CenterCls) => {
    if (screenWidth > 1600) {
      return this.CheckClass(32, CenterCls);
    } else {
      if (screenWidth > 1440 && screenWidth <= 1600) {
        return this.CheckClass(17, CenterCls);
      } else {
        if (screenWidth <= 1440 && screenWidth > 1280) {
          return this.CheckClass(25, CenterCls);
        } else {
          if (screenWidth <= 1280 && screenWidth >= 1100) {
            return this.CheckClass(22, CenterCls);
          } else {
            if (screenWidth < 1100) {
              return this.CheckClass(11, CenterCls);
            } else {
              if (screenWidth <= 550) {
                return this.CheckClass(11, CenterCls);
              } else {
                return this.CheckClass(18, CenterCls);
              }
            }
          }
        }
      }
    }
  };
  render() {
    const {
      itemList,
      screenWidth,
      editUtentiRespModal,
      setDepositoModalAdmin,
      accountInfo,
      activeSkinId,
      CenterCls,
      perPage,
      page_number,
    } = this.props;
    const Special =
      activeSkinId === -1 && accountInfo?.profile?.role?.name !== "support";

    return (
      <div className="AdminListaUtentiRow--Complete">
        <div
          className={`AdminListaUtentiRow--Complete--Main ${
            itemList && itemList.children?.length > 0 ? "active" : ""
          }`}
          onClick={(e) => {
            if (
              screenWidth <= 850 &&
              screenWidth >= 550 &&
              e.target.tagName !== "I"
            ) {
              editUtentiRespModal({
                visibility: true,
                data: { ...itemList },
              });
            }
          }}
        >
          <span>{itemList.id}</span>
          {Special ? (
            <span>
              <div></div>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10%",
                  width: "100%",
                  height: "100%",
                }}
                href={itemList.link}
              >
                {itemList.username}
              </a>
            </span>
          ) : (
            <React.Fragment>
              <span>
                <i
                  className={`fal fa-${
                    this.state.plusVisibility === false ? "plus" : "minus"
                  }-square`}
                  onClick={() => {
                    this.setState((state) => ({
                      plusVisibility: !state.plusVisibility,
                      activateChildren: !state.activateChildren,
                    }));
                  }}
                ></i>
                <div className="Link"></div>
                <i className={`${allRoles[itemList.role]}`} />
                <SpanFormater
                  myClassName="Username"
                  Word={itemList.username}
                  size={screenWidth <= 1600 ? 12 : 17}
                  nrOfRows={2}
                  formatWord={true}
                />
              </span>
            </React.Fragment>
          )}

          <SpanFormater
            Word={itemList.rag_soc}
            myClassName={`${
              Special && screenWidth < 1024 ? "SpecSm" : Special ? "none" : ""
            }`}
            styles={
              Special && screenWidth <= 1440
                ? { width: "calc(43.5% - 230px)", marginLeft: "1%" }
                : Special
                ? { width: "calc(36.5% - 230px)", marginLeft: "1%" }
                : { width: "calc(36.5% - 230px)" }
            }
            size={this.CheckSize(screenWidth, CenterCls)}
            nrOfRows={1}
            formatWord={true}
          />
          <SpanFormater
            styles={
              screenWidth <= 550
                ? {
                    width: "20%",
                    left: "-0.2%",
                    position: "relative",
                    justifyContent: "flex-end",
                    paddingRight: "1%",
                  }
                : Special
                ? {
                    width: "8%",
                    justifyContent: "flex-end",
                    paddingRight: "1%",
                  }
                : { justifyContent: "flex-end", paddingRight: "1%" }
            }
            Word={itemList.wallet}
            myClassName={`${Special && screenWidth < 1024 ? "SpecSm" : ""}`}
            size={8}
            type={"number"}
            formatWord={true}
            nrOfRows={1}
          />
          {Special ? null : (
            <SpanFormater
              Word={itemList.city}
              size={
                screenWidth <= 1700 && screenWidth >= 1024
                  ? 13
                  : screenWidth <= 1600
                  ? 8
                  : 11
              }
              nrOfRows={1}
              formatWord={true}
            />
          )}

          <span
            style={
              Special
                ? { width: "13%", justifyContent: "center", left: 0 }
                : { width: "13%", justifyContent: "center", left: 0 }
            }
            className={`${
              Special && screenWidth < 1024 ? "SpecSm" : Special ? "none" : ""
            }`}
          >
            {!itemList.last_deposit || itemList.last_deposit === "-"
              ? "-"
              : moment(itemList.last_deposit, "DD-MM-YYYY hh:mm:ss").format(
                  "DD/MM/YYYY HH:mm:ss"
                )}{" "}
          </span>
          <span
            style={
              !Special && screenWidth <= 850
                ? { justifyContent: "center", left: 0, display: "none" }
                : Special
                ? { width: "13%", justifyContent: "center", left: 0 }
                : { width: "13%", justifyContent: "center", left: 0 }
            }
            className={`${Special ? "none" : ""}`}
          >
            {!itemList.last_login_time || itemList.last_login_time === "-"
              ? "-"
              : moment(itemList.last_login_time, "DD-MM-YYYY hh:mm:ss").format(
                  "DD/MM/YYYY HH:mm:ss"
                )}
          </span>
          <span
            className={`${Special ? "activated" : ""}`}
            style={{
              width: "220px",
              justifyContent: "space-between",
              marginRight: "10px",
            }}
          >
            <button
              onClick={() => {
                setDepositoModalAdmin({
                  depositoModalVis: true,
                  type: "deposit",
                  username: itemList.username,
                  id: itemList.id,
                });
              }}
            >
              DEPOSITO
            </button>
            <button
              onClick={() => {
                setDepositoModalAdmin({
                  depositoModalVis: true,
                  type: "withdraw",
                  username: itemList.username,
                  id: itemList.id,
                });
              }}
            >
              ADDEBITO
            </button>
            <i
              id="lock"
              className={`fal fa-lock${
                itemList.status !== 1 ? "-alt" : "-open-alt active"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const changedStatus =
                  itemList.status !== 1 ? 1 : Special ? 0 : 3;
                switchUserStatus(
                  itemList.id,
                  changedStatus,
                  () => {
                    changedStatus === 1
                      ? message.success(
                          `lo stato dell${
                            itemList.username
                          } ${`?? cambiato : 'ATTIVATO'`}`
                        )
                      : message.error(
                          `lo stato dell${
                            itemList.username
                          } ${`?? cambiato : 'DISATTIVATO'`}`
                        );

                    this.props.getUsers(
                      null,
                      Special
                        ? { skin_id: 1 }
                        : {
                            skin_id: this.props.activeSkinId,
                            backoffice: true,
                          },
                      perPage,
                      page_number
                    );
                  },
                  accountInfo.role,
                  activeSkinId
                );
              }}
            ></i>
            <i
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.props.getAgents(this.props.activeSkinId);
                if (activeSkinId === -1) {
                  this.props.setUserDetail({
                    username: "extra",
                    id: itemList.id,
                  });
                } else {
                  itemList && itemList.role === "user"
                    ? this.props.getUserByUserId(itemList.id, activeSkinId)
                    : itemList.role === "agent"
                    ? this.props.getAgentByUserId(itemList.id, activeSkinId)
                    : this.props.getUserDetail(itemList.id, activeSkinId);
                }
              }}
              className={`fal fa-eye${
                this.state.eyeClicked === true ? "-slash active" : ""
              }`}
              // onClick={() => {
              //   this.setState((state) => ({ eyeClicked: !state.eyeClicked }));
              // }}
            ></i>
          </span>
          {screenWidth <= 550 && (
            <span
              className={Special ? "SpecSm" : ""}
              style={Special ? { marginLeft: "16%" } : {}}
              onClick={(e) => {
                editUtentiRespModal({
                  visibility: true,
                  data: { ...itemList },
                });
              }}
            >
              <i className="fal fa-eye"> </i>
            </span>
          )}
        </div>
        {itemList &&
          Array.isArray(itemList.children) &&
          itemList.children?.length > 0 &&
          this.state.activateChildren === true &&
          itemList.children.map((child, i, arr) =>
            arr.length - 1 === i ? (
              <div
                className={`AdminListaUtentiRow--Complete--Main--Child children last ${
                  child?.children?.length > 0 ? "" : "lastNode"
                }`}
                key={child.id}
              >
                <AdminListaUtentiRow itemList={child} last={false} />
              </div>
            ) : (
              <div
                className={`AdminListaUtentiRow--Complete--Main--Child children  ${
                  child?.children?.length > 0 ? "" : "lastNode"
                }`}
                key={child.id}
              >
                <AdminListaUtentiRow
                  itemList={child}
                  last={true}
                  perPage={perPage}
                  page_number={page_number}
                />
              </div>
            )
          )}
      </div>
    );
  }
}
const mstp = (state) => ({
  screenWidth: state.main.screenWidth,
  accountInfo: state.auth.accountInfo,
  activeSkinId: state.main.activeSkinId,
  CenterCls: state.auth.CenterCls,
});
export default connect(mstp, { ...AuthActions, ...MainActions })(
  AdminListaUtentiRowForLoop
);

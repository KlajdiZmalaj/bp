import React from "react";
import { connect } from "react-redux";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import AuthActions from "redux-store/models/auth";
import { allRoles } from "config/index";
import SpanFormater from "shared-components/SpanFormater/SpanFormater";
import { numberWithCommas } from "utils/HelperFunc";
import { switchUserStatus } from "services/auth";
import MainActions from "redux-store/models/main";
import { message } from "antd";

class AdminListaUtentiRowForLoop extends React.Component {
  state = {
    activateChildren: false,
    lock: "",
    eyeClicked: false,
    plusVisibility: false,
  };
  render() {
    const {
      itemList,
      screenWidth,
      editUtentiRespModal,
      setDepositoModalAdmin,
      activeSkinId,
      accountInfo,
    } = this.props;
    const { lock } = this.state;
    return (
      <div className="AdminListaUtentiRow--Complete">
        <div
          className={`AdminListaUtentiRow--Complete--Main ${
            itemList && itemList.children?.length > 0 ? "active" : ""
          }`}
          onClick={(e) => {
            if (screenWidth <= 950 && e.target.tagName != "I") {
              editUtentiRespModal({
                visibility: true,
                data: { ...itemList },
              });
            }
          }}
        >
          <span>{itemList.id}</span>
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
              size={screenWidth <= 420 ? 7 : screenWidth <= 1600 ? 12 : 17}
              nrOfRows={2}
              formatWord={true}
            />{" "}
          </span>
          <SpanFormater
            Word={itemList.rag_soc}
            styles={this.props.activeSkinId === -1 ? { width: "16%" } : {}}
            size={17}
            nrOfRows={2}
            formatWord={true}
            link={this.props.activeSkinId === -1 ? true : false}
          />
          <SpanFormater
            styles={
              this.props.activeSkinId === -1
                ? {
                    width: "8%",
                    justifyContent: "flex-end",
                    paddingRight: "1%",
                  }
                : { justifyContent: "flex-end", paddingRight: "1%" }
            }
            Word={numberWithCommas(itemList.wallet)}
            size={8}
            nrOfRows={2}
          />
          {activeSkinId === -1 ? null : (
            <SpanFormater
              Word={itemList.city}
              size={screenWidth <= 1600 ? 8 : 11}
              nrOfRows={1}
              formatWord={true}
            />
          )}
          <span style={{ justifyContent: "center", left: 0 }}>
            {itemList.last_deposit}
          </span>
          <span
            style={
              this.props.activeSkinId != -1 && screenWidth <= 950
                ? { justifyContent: "center", left: 0, display: "none" }
                : { justifyContent: "center", left: 0 }
            }
          >
            {itemList.last_login_time}
          </span>
          <span>
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
                activeSkinId === -1 && itemList.status === 0
                  ? "-alt"
                  : itemList.status === 1 && activeSkinId != -1
                  ? "-alt"
                  : "-open-alt active"
              }`}
              onClick={async () => {
                const changeStatus = await (activeSkinId === -1 &&
                itemList.status === 1
                  ? 0
                  : itemList.status === 1 && activeSkinId != -1
                  ? 2
                  : 1);
                await switchUserStatus(
                  itemList.id,
                  changeStatus,
                  () => {},
                  accountInfo.role,
                  activeSkinId
                );
                if (this.props.activeSkinId === -1) {
                  await this.props.getUsers(null, {
                    skin_id: 1,
                  });
                } else {
                  await this.props.getUsers(null, {
                    skin_id: this.props.activeSkinId,
                    backoffice: true,
                  });
                }
                await ((changeStatus === 0 && activeSkinId === -1) ||
                (changeStatus === 1 && activeSkinId != -1)
                  ? message.error(
                      `lo stato dell${
                        itemList.username
                      } ${`è cambiato : 'DISATTIVATO'`}`
                    )
                  : message.success(
                      `lo stato dell${
                        itemList.username
                      } ${`è cambiato : 'ATTIVATO'`}`
                    ));
              }}
            ></i>
            <i
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                itemList && itemList.role === "user"
                  ? this.props.getUserByUserId(itemList.id, activeSkinId)
                  : itemList.role === "agent"
                  ? this.props.getAgentByUserId(itemList.id, activeSkinId)
                  : this.props.getUserDetail(itemList.id, activeSkinId);
              }}
              className={`fal fa-eye${
                this.state.eyeClicked === true ? "-slash active" : ""
              }`}
              // onClick={() => {
              //   this.setState((state) => ({ eyeClicked: !state.eyeClicked }));
              // }}
            ></i>
          </span>
        </div>
        {itemList &&
          itemList.children?.length > 0 &&
          Array.isArray(itemList.children) &&
          this.state.activateChildren === true &&
          itemList.children.map((child, i, arr) =>
            arr.length - 1 === i ? (
              <div
                className="AdminListaUtentiRow--Complete--Main--Child children Last"
                key={child.id}
              >
                <AdminListaUtentiRow itemList={child} />
              </div>
            ) : (
              <div
                className="AdminListaUtentiRow--Complete--Main--Child children "
                key={child.id}
              >
                <AdminListaUtentiRow itemList={child} />
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
});
export default connect(mstp, { ...AuthActions, ...MainActions })(
  AdminListaUtentiRowForLoop
);

import React from "react";
import "./adminListaUtenti.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import { ListaUtenti } from "../StaticAdminData";
import MainActions from "redux-store/models/main";
import { connect } from "react-redux";

class AdminListaUtenti extends React.Component {
  componentDidMount() {
    const Special =
      this.props.activeSkinId === -1 &&
      this.props.accountInfo?.profile?.role?.name != "support";
    if (Special) {
      this.props.getUsers(null, {
        skin_id: 1,
      });
    } else {
      this.props.getUsers(null, {
        skin_id: this.props.activeSkinId,
        backoffice: true,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeSkinId != prevProps.activeSkinId) {
      const Special =
        this.props.activeSkinId === -1 &&
        this.props.accountInfo?.profile?.role?.name != "support";
      if (Special) {
        this.props.getUsers(null, {
          skin_id: 1,
        });
      } else {
        this.props.getUsers(null, {
          skin_id: this.props.activeSkinId,
          backoffice: true,
        });
      }
    }
  }
  render() {
    const {
      userList,
      LoaderAU,
      screenWidth,
      activeSkinId,
      accountInfo,
    } = this.props;
    const Special =
      activeSkinId === -1 && accountInfo?.profile?.role?.name != "support";
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>USER ID</span>
          <span>USERNAME</span>
          <span
            style={
              screenWidth <= 1700 && screenWidth >= 1320 && Special
                ? {
                    width: "28%",
                  }
                : Special
                ? { width: "16%" }
                : {}
            }
          >
            RAG SOCIALE
          </span>
          <span
            style={
              screenWidth <= 400 && Special
                ? { paddingLeft: "8%" }
                : screenWidth <= 500 && Special
                ? { paddingLeft: "10%" }
                : screenWidth <= 550 && Special
                ? { paddingLeft: "12%" }
                : screenWidth <= 1700 && screenWidth >= 1320 && Special
                ? {
                    width: "14% !important",
                    justifyContent: "flex-end",
                    left: "0%",
                  }
                : screenWidth <= 950 && Special
                ? { justifyContent: "flex-end", left: "-3%" }
                : Special
                ? { width: "10%", justifyContent: "flex-end", left: "-2%" }
                : { justifyContent: "flex-end", left: "-1%" }
            }
          >
            CREDITO
          </span>
          {Special ? null : <span>CITY</span>}
          <span
            className={`${Special ? "none" : ""}`}
            style={
              Special
                ? { width: "14%", justifyContent: "center", left: 0 }
                : { justifyContent: "center", left: 0 }
            }
          >
            ULTIMO DEPOSIT
          </span>
          <span
            className={`${Special ? "none" : ""}`}
            style={
              !Special && screenWidth <= 950
                ? { justifyContent: "center", left: 0, display: "none" }
                : Special
                ? { width: "14%", justifyContent: "center", left: 0 }
                : { justifyContent: "center", left: 0 }
            }
          >
            ULTIMO LOGIN
          </span>
          <span
            style={
              Special && screenWidth <= 950
                ? { width: "38%" }
                : Special
                ? { width: "24%" }
                : {}
            }
            className={`${Special ? "activated" : ""}`}
          >
            AZIONI
          </span>
        </div>
        <div className="AdminListaUtentiRow">
          {LoaderAU && LoaderAU === true ? (
            <div className="loaderAdmin">Loading...</div>
          ) : userList && Array.isArray(userList) && userList.length >= 1 ? (
            userList.map((itemList, i) => {
              return (
                <AdminListaUtentiRow
                  itemList={itemList}
                  key={itemList.id + i}
                />
              );
            })
          ) : (
            <div className="NoData">
              <i className="fal fa-info-circle"></i>
              <span>No Data</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userList: state.main.userList,
  LoaderAU: state.main.LoaderAU,
  screenWidth: state.main.screenWidth,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps, { ...MainActions })(AdminListaUtenti);

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
          <span
            className={`${Special && screenWidth < 1024 ? "SpecSm" : ""}`}
            style={screenWidth <= 850 && Special ? { left: "7%" } : {}}
          >
            USERNAME
          </span>
          <span
            className={`${
              Special && screenWidth < 1024 ? "SpecSm" : Special ? "none" : ""
            }`}
            style={
              Special && screenWidth <= 1440
                ? {
                    width: "calc(43.5% - 230px)",
                    left: "0.2%",
                    marginLeft: "1%",
                  }
                : Special
                ? {
                    width: "calc(36.5% - 230px)",
                    marginLeft: "1%",
                    left: "0.2%",
                  }
                : screenWidth > 1440
                ? {
                    width: "calc(36.5% - 230px)",
                    left: "-0.5%",
                  }
                : {
                    width: "calc(36.5% - 230px)",
                    left: "-0.5%",
                    marginLeft: "1%",
                  }
            }
          >
            RAG SOCIALE
          </span>
          <span
            className={`${Special && screenWidth < 1024 ? "SpecSm" : ""}`}
            style={
              screenWidth >= 2000 && !Special
                ? {
                    width: "4%",
                    justifyContent: "flex-end",
                    marginRight: "1.5%",
                    left: "1%",
                  }
                : screenWidth <= 400 && Special
                ? { paddingLeft: "8%" }
                : screenWidth <= 500 && Special
                ? { paddingLeft: "10%" }
                : screenWidth <= 550 && Special
                ? { paddingLeft: "12%" }
                : screenWidth <= 850 && Special
                ? { justifyContent: "flex-end", left: "-3%" }
                : Special
                ? {
                    width: "7.5%",
                    justifyContent: "flex-end",
                    marginRight: "1%",
                  }
                : {
                    width: "4%",
                    justifyContent: "flex-end",
                    marginRight: "0.8%",
                  }
            }
          >
            CREDITO
          </span>
          {Special ? null : (
            <span style={{ width: "7%", left: "0" }}>CITY</span>
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
            ULTIMO DEPOSIT
          </span>
          <span
            className={`${Special ? "none" : ""}`}
            style={
              !Special && screenWidth <= 850
                ? { justifyContent: "center", left: 0, display: "none" }
                : Special
                ? { width: "13%", justifyContent: "center", marginRight: "1%" }
                : { width: "13%", justifyContent: "center", left: 0 }
            }
          >
            ULTIMO LOGIN
          </span>
          <span
            style={{ width: "210px", justifyContent: "flex-start" }}
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

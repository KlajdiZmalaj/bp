import React from "react";
import "./adminListaUtenti.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import { ListaUtenti } from "../StaticAdminData";
import MainActions from "redux-store/models/main";
import { connect } from "react-redux";

class AdminListaUtenti extends React.Component {
  componentDidMount() {
    if (this.props.activeSkinId === -1) {
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
      if (this.props.activeSkinId === -1) {
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
    const { userList, LoaderAU, screenWidth } = this.props;
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>USER ID</span>
          <span>USERNAME</span>
          <span style={this.props.activeSkinId === -1 ? { width: "16%" } : {}}>
            RAG SOCIALE
          </span>
          <span
            style={
              screenWidth <= 950 && this.props.activeSkinId === -1
                ? { justifyContent: "flex-end", left: "-3%" }
                : this.props.activeSkinId === -1
                ? { width: "10%", justifyContent: "flex-end", left: "-2%" }
                : { justifyContent: "flex-end", left: "-1%" }
            }
          >
            CREDITO
          </span>
          {this.props.activeSkinId === -1 ? null : <span>CITY</span>}
          <span
            style={
              this.props.activeSkinId === -1
                ? { width: "14%", justifyContent: "center", left: 0 }
                : { justifyContent: "center", left: 0 }
            }
          >
            ULTIMO DEPOSIT
          </span>
          <span
            style={
              this.props.activeSkinId != -1 && screenWidth <= 950
                ? { justifyContent: "center", left: 0, display: "none" }
                : this.props.activeSkinId === -1
                ? { width: "14%", justifyContent: "center", left: 0 }
                : { justifyContent: "center", left: 0 }
            }
          >
            ULTIMO LOGIN
          </span>
          <span
            style={
              this.props.activeSkinId === -1 && screenWidth <= 950
                ? { width: "38%" }
                : this.props.activeSkinId === -1
                ? { width: "24%" }
                : {}
            }
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
});
export default connect(mapStateToProps, { ...MainActions })(AdminListaUtenti);

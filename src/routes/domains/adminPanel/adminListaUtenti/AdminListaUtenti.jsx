import React from "react";
import "./adminListaUtenti.css";
import AdminListaUtentiRow from "./AdminListaUtentiRow";
import { ListaUtenti } from "../StaticAdminData";
import MainActions from "redux-store/models/main";
import { connect } from "react-redux";
class AdminListaUtenti extends React.Component {
  componentDidMount() {
    this.props.getUsers(null, {
      skin_id: this.props.activeSkinId,
      backoffice: true,
    });
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props);
    if (this.props.activeSkinId != prevProps.activeSkinId) {
      this.props.getUsers(null, {
        skin_id: this.props.activeSkinId,
        backoffice: true,
      });
    }
  }
  render() {
    const { userList, LoaderAU } = this.props;
    return (
      <div className="AdminListaUtenti">
        <div className="AdminListaUtenti--Header">
          <span>USER ID</span>
          <span>USERNAME</span>
          <span>RAG SOCIALE</span>
          <span>CREDITO</span>
          <span>CITY</span>
          <span>ULTIMO DEPOSIT</span>
          <span>ULTIMO LOGIN</span>
          <span>AZIONI</span>
        </div>
        <div className="AdminListaUtentiRow">
          {LoaderAU && LoaderAU === true ? (
            <div class="loaderAdmin">Loading...</div>
          ) : userList && Array.isArray(userList) && userList.length >= 1 ? (
            userList.map((itemList) => {
              return (
                <AdminListaUtentiRow
                  itemList={itemList}
                  key={itemList.agent_id}
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
});
export default connect(mapStateToProps, { ...MainActions })(AdminListaUtenti);

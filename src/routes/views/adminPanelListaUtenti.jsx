import React from "react";
import AdminListaUtenti from "../domains/adminPanel/adminListaUtenti/AdminListaUtenti";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
import { connect } from "react-redux";
class AdminPanelListaUtenti extends React.Component {
  render() {
    return (
      <AdminPanelDom
        component={
          <AdminListaUtenti
            forAdmin={true}
            activeSkinId={this.props.activeSkinId}
          />
        }
        {...this.props}
      />
    );
  }
}
const mapStatToProps = (state) => ({
  activeSkinId: state.main.activeSkinId,
});
export default connect(mapStatToProps, null)(AdminPanelListaUtenti);

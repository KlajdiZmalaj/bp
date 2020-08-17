import React from "react";
import Tranzacioni from "./Transazioni";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
import { connect } from "react-redux";

class AdminPanelListaUtenti extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    return (
      <AdminPanelDom
        component={
          <Tranzacioni forAdmin={true} activeSkinId={this.props.activeSkinId} />
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

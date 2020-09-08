import React from "react";
import Tranzacioni from "./Transazioni";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
import { connect } from "react-redux";
import MainActions from "redux-store/models/main";

class AdminPanelListaUtenti extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  componentDidMount() {
    this.props.setActiveSkinId(1);
  }
  componentDidUpdate() {
    if (this.props.activeSkinId === -1) {
      this.props.setActiveSkinId(1);
    }
  }
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
export default connect(mapStatToProps, MainActions)(AdminPanelListaUtenti);

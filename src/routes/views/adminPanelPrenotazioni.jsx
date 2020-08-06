import React from "react";
import Prenotazioni from "../domains/adminPanel/Prenotazioni";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
class AdminPanelPrenotazioni extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    return (
      <AdminPanelDom
        component={<Prenotazioni forAdmin={true} />}
        {...this.props}
      />
    );
  }
}
export default AdminPanelPrenotazioni;

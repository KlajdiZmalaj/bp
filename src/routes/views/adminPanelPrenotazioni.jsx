import React from "react";
import Prenotazioni from "../domains/adminPanel/Prenotazioni/Prenotazioni";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
class AdminPanelPrenotazioni extends React.Component {
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

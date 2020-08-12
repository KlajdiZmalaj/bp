import React from "react";
import AdminListaUtenti from "../domains/adminPanel/adminListaUtenti/AdminListaUtenti";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
class AdminPanelListaUtenti extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    return (
      <AdminPanelDom
        component={<AdminListaUtenti forAdmin={true} />}
        {...this.props}
      />
    );
  }
}
export default AdminPanelListaUtenti;

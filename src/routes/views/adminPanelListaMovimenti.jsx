import React from "react";
import Tranzacioni from "./Transazioni";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
class AdminPanelListaUtenti extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    return (
      <AdminPanelDom
        component={<Tranzacioni forAdmin={true} />}
        {...this.props}
      />
    );
  }
}
export default AdminPanelListaUtenti;

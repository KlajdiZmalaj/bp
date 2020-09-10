import React from "react";
import AdminServizi from "../domains/adminPanel/adminServizi/AdminServizi";
import AdminPanelDom from "../domains/adminPanel/adminPanelDom";
class AdminPanelServizi extends React.Component {
  render() {
    return (
      <AdminPanelDom
        component={<AdminServizi forAdmin={true} />}
        {...this.props}
      />
    );
  }
}
export default AdminPanelServizi;

import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader";
import "./styles.css";
class AdminPanelDom extends React.Component {
  render() {
    return (
      <div className="Admin-Panel">
        <AdminHeader />
        <div className="AdminColumns">
          <div className="Left">
            <AdminLeftForm />
          </div>
          <div className="Center"></div>
          <AdminRightForm />
        </div>
      </div>
    );
  }
}
export default AdminPanelDom;

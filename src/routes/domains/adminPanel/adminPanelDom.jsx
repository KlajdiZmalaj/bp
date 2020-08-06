import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader";
import "./styles.css";
class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    return (
      <div className="Admin-Panel">
        <AdminHeader
          history={this.props.history}
          location={this.props.location}
        />
        <div className="AdminColumns">
          <div
            className={`${
              this.state.menuSkinVisible === false ? "Left" : "Left--Min"
            }`}
          >
            <AdminLeftForm
              handleClick={() => {
                this.setState({ menuSkinVisible: !this.state.menuSkinVisible });
              }}
              visible={this.state.menuSkinVisible}
            />
          </div>
          <div
            className={`${
              !this.state.menuSkinVisible ? "Center" : "Center--Big"
            }`}
          >
            {this.props.component}
          </div>
          <AdminRightForm />
        </div>
      </div>
    );
  }
}
export default AdminPanelDom;

import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader";
import { connect } from "react-redux";
import "./styles.css";
class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  render() {
    if (this.state.menuSkinVisible === true && this.props.screenWidth <= 1320) {
      this.setState({ menuSkinVisible: false });
    }
    return (
      <div className="Admin-Panel">
        <AdminHeader
          history={this.props.history}
          location={this.props.location}
        />
        <div className="AdminColumns">
          <div
            className={`${
              this.state.menuSkinVisible === false &&
              this.props.screenWidth <= 1320
                ? "Left--Min"
                : this.state.menuSkinVisible === true
                ? "Left--Min"
                : "Left"
            }`}
          >
            <AdminLeftForm
              handleClick={() => {
                this.setState({
                  menuSkinVisible:
                    this.props.screenWidth >= 1320
                      ? !this.state.menuSkinVisible
                      : false,
                });
              }}
              visible={this.state.menuSkinVisible}
            />
          </div>
          <div
            className={`${
              !this.state.menuSkinVisible && this.props.screenWidth >= 1320
                ? "Center"
                : this.props.screenWidth >= 1320
                ? "Center--Big"
                : "Center--Big"
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
const mapStateToProps = (state) => ({
  screenWidth: state.main.screenWidth,
});
export default connect(mapStateToProps, null)(AdminPanelDom);

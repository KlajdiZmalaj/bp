import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader";
import { connect } from "react-redux";
import AdminRightFormStatisticheDetails from "shared-components/adminSharedComp/AdminRightFormStatisticheDetails";
import AdminRightFormUltimeDetails from "shared-components/adminSharedComp/AdminRightFormUltimeDetails";
import AdminRightFormWalletDetails from "shared-components/adminSharedComp/AdminRightFormWalletDetails";

import "./styles.css";
class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: false,
  };
  componentDidMount() {
    document.body.classList.add("bodyAdmin");
  }
  render() {
    if (this.state.menuSkinVisible === true && this.props.screenWidth <= 1320) {
      this.setState({ menuSkinVisible: false });
    }
    return (
      <div className="Admin-Panel">
        {/* {this.props.statModal && this.props.statModal.visibility === true && (
          <AdminRightFormStatisticheDetails
            graphData={this.props.statModal.statModal.graphData}
            Tranzacioni={this.props.statModal.statModal.Tranzacioni}
            Commisione={this.props.statModal.statModal.Tranzacioni}
            Proviggioni={this.props.statModal.statModal.Tranzacioni}
            ModalOrNo={true}
          />
        )} */}
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
  statModal: state.auth.statModal,
});
export default connect(mapStateToProps, null)(AdminPanelDom);

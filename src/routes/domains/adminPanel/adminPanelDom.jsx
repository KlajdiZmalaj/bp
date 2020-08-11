import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader";
import { connect } from "react-redux";
import AdminRightFormStatisticheDetails from "shared-components/adminSharedComp/AdminRightFormStatisticheDetails";
import AdminRightFormUltimeDetails from "shared-components/adminSharedComp/AdminRightFormUltimeDetails";
import AdminRightFormWalletDetails from "shared-components/adminSharedComp/AdminRightFormWalletDetails";
import AuthActions from "redux-store/models/auth";
import { numberWithCommas } from "./HelperFunc";
import {
  graphData,
  Tranzacioni,
  Commisione,
  Proviggioni,
  leUltimeTransazioniDet,
} from "./StaticAdminData";
import "./styles.css";
class AdminPanelDom extends React.Component {
  state = {
    menuSkinVisible: false,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
  };
  componentDidMount() {
    document.body.classList.add("bodyAdmin");
  }
  componentWillUnmount() {
    document.body.classList.remove("bodyAdmin");
  }
  componentDidUpdate() {
    if (this.state.menuSkinVisible === true && this.props.screenWidth <= 1320) {
      this.setState({ menuSkinVisible: false });
    }
  }
  render() {
    const {
      menuSkinVisible,
      depositoActiveVisibility,
      addebitoActiveVisibility,
    } = this.state;
    const {
      statModal,
      ultModal,
      screenWidth,
      depModal,
      editUltModal,
      editStatModal,
      editDepModal,
    } = this.props;
    return (
      <React.Fragment>
        <div className="Admin-Panel">
          {statModal?.visibility === true && screenWidth <= 1050 && (
            <AdminRightFormStatisticheDetails
              graphData={statModal.data.graphData}
              Tranzacioni={numberWithCommas(statModal.data.Tranzacioni)}
              Commisione={numberWithCommas(statModal.data.Commisione)}
              Proviggioni={numberWithCommas(statModal.data.Proviggioni)}
              ModalOrNo={true}
              Close={editStatModal}
            />
          )}
          {ultModal && ultModal.visibility === true && screenWidth <= 1050 && (
            <AdminRightFormUltimeDetails
              leUltimeTransazioniDet={ultModal.data.leUltimeTransazioniDet}
              ModalOrNo={true}
              Close={editUltModal}
            />
          )}
          {depModal && depModal.visibility === true && screenWidth <= 1050 && (
            <AdminRightFormWalletDetails
              handleDebitoVisibility={() => {
                this.setState({
                  depositoActiveVisibility: true,
                  addebitoActiveVisibility: false,
                });
              }}
              handleDepositoVisibility={() => {
                this.setState({
                  depositoActiveVisibility: false,
                  addebitoActiveVisibility: true,
                });
              }}
              addebitoActiveVisibility={addebitoActiveVisibility}
              depositoActiveVisibility={depositoActiveVisibility}
              ModalOrNo={true}
              Close={editDepModal}
            />
          )}
          <AdminHeader
            history={this.props.history}
            location={this.props.location}
          />
          <div className="AdminColumns">
            <div
              className={`${
                menuSkinVisible === false && screenWidth <= 1320
                  ? "Left--Min"
                  : menuSkinVisible === true
                  ? "Left--Min"
                  : "Left"
              }`}
            >
              <AdminLeftForm
                graphData={graphData}
                leUltimeTransazioniDet={leUltimeTransazioniDet}
                Tranzacioni={numberWithCommas(Tranzacioni)}
                Commisione={numberWithCommas(Commisione)}
                Proviggioni={numberWithCommas(Proviggioni)}
                handleClick={() => {
                  this.setState({
                    menuSkinVisible:
                      screenWidth >= 1320 ? !menuSkinVisible : false,
                  });
                }}
                visible={menuSkinVisible}
              />
            </div>
            <div
              className={`${
                !menuSkinVisible && screenWidth >= 1320
                  ? "Center"
                  : screenWidth >= 1320
                  ? "Center--Big"
                  : "Center--Big"
              }`}
            >
              {this.props.component}
            </div>
            <AdminRightForm
              graphData={graphData}
              leUltimeTransazioniDet={leUltimeTransazioniDet}
              Tranzacioni={numberWithCommas(Tranzacioni)}
              Commisione={numberWithCommas(Commisione)}
              Proviggioni={numberWithCommas(Proviggioni)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  screenWidth: state.main.screenWidth,
  statModal: state.auth.statModal,
  ultModal: state.auth.ultModal,
  depModal: state.auth.depModal,
  openAdminModal: state.auth.openAdminModal,
});
export default connect(mapStateToProps, AuthActions)(AdminPanelDom);

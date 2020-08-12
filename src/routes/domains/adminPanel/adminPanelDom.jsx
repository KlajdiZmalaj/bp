import React from "react";
import AdminRightForm from "shared-components/adminSharedComp/adminRightForm/adminRightForm";
import AdminLeftForm from "shared-components/adminSharedComp/adminLeftForm/adminLeftForm";
import AdminHeader from "shared-components/adminSharedComp/adminHeader/adminHeader";
import { connect } from "react-redux";
import AdminRightFormStatisticheDetails from "shared-components/adminSharedComp/AdminRightFormStatDet/AdminRightFormStatisticheDetails";
import AdminRightFormUltimeDetails from "shared-components/adminSharedComp/AdminRightFormUltDet/AdminRightFormUltimeDetails";
import AdminRightFormWalletDetails from "shared-components/adminSharedComp/AdminRightFormWallDet/AdminRightFormWalletDetails";
import AuthActions from "redux-store/models/auth";
import { numberWithCommas } from "./HelperFunc";
import ModalResponsiveForTables from "shared-components/ModalResponsiveForTables/ModalResponsiveForTables";
import moment from "moment";
import ModalRow from "shared-components/ModalResponsiveForTables/ModalRow";
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
      utentiResModal,
      editUtentiRespModal,
    } = this.props;
    return (
      <React.Fragment>
        <div className="Admin-Panel">
          {utentiResModal?.visibility === true && screenWidth <= 950 ? (
            <ModalResponsiveForTables
              Close={() => {
                editUtentiRespModal({
                  visibility: false,
                  data: "",
                });
              }}
              Rows={
                <React.Fragment>
                  <ModalRow
                    title="User Id"
                    data={utentiResModal.data.user_id}
                  />
                  <ModalRow
                    title="Username"
                    data={utentiResModal.data.username}
                  />

                  <ModalRow title="City" data={utentiResModal.data.city} />
                  <ModalRow
                    title="Credito"
                    data={utentiResModal.data.credito}
                  />
                  <ModalRow
                    title="Rag Sociale"
                    data={utentiResModal.data.rag_sociale}
                  />
                  <ModalRow title="Role" data={utentiResModal.data.role} />
                  <ModalRow
                    title="Ultimo Deposit"
                    data={moment(utentiResModal.data.ultimo_deposit).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  />
                  <ModalRow
                    title="Ultimo Login"
                    data={moment(utentiResModal.data.ultimo_login).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  />
                </React.Fragment>
              }
            />
          ) : null}
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
              handleDepositoVisibility={() => {
                this.setState({
                  depositoActiveVisibility: true,
                  addebitoActiveVisibility: false,
                });
              }}
              handleDebitoVisibility={() => {
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
  utentiResModal: state.auth.utentiResModal,
});
export default connect(mapStateToProps, AuthActions)(AdminPanelDom);

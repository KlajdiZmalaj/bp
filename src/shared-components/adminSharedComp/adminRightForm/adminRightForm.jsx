import React from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Ticket from "./Ticket";
import "./adminRightForm.css";
import AdminRightFormUltimeDetails from "../AdminRightFormUltDet/AdminRightFormUltimeDetails";
import AdminRightFormStatisticheDetails from "../AdminRightFormStatDet/AdminRightFormStatisticheDetails";
import AdminRightFormWalletDetails from "../AdminRightFormWallDet/AdminRightFormWalletDetails";

class AdminRightForm extends React.Component {
  state = {
    dropdownVisibility: false,
    statisticheDropdownVisibility: false,
    leUltimeTransazioni: false,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
  };
  render() {
    const {
      depositoActiveVisibility,
      dropdownVisibility,
      statisticheDropdownVisibility,
      leUltimeTransazioni,
      addebitoActiveVisibility,
    } = this.state;
    const {
      openAdminModal,
      graphData,
      leUltimeTransazioniDet,
      Tranzacioni,
      Proviggioni,
      Commisione,
    } = this.props;

    return (
      <div className="AdminRightForm">
        {openAdminModal === false ? (
          <React.Fragment>
            {" "}
            <div className="AdminRightForm--Box">
              <div className="AdminRightForm--Box--Statistic">
                <i className="fal fa-analytics"></i>
                <span>STATISTICHE</span>
              </div>
              <i
                className={`far fa-chevron-${
                  statisticheDropdownVisibility === false ? "down" : "up"
                }`}
                onClick={() => {
                  this.setState((state) => ({
                    statisticheDropdownVisibility: !state.statisticheDropdownVisibility,
                  }));
                }}
              ></i>
            </div>
            {statisticheDropdownVisibility && (
              <AdminRightFormStatisticheDetails
                graphData={graphData}
                Tranzacioni={Tranzacioni}
                Commisione={Commisione}
                Proviggioni={Proviggioni}
              />
            )}
            <div className="AdminRightForm--Box">
              <div className="AdminRightForm--Box--HeartRate">
                <i className="fal fa-heart-rate"></i>
                <span>LE ULTIME TRANSAZIONI</span>
              </div>

              <i
                className={`far fa-chevron-${
                  leUltimeTransazioni === false ? "down" : "up"
                }`}
                onClick={() => {
                  this.setState((state) => ({
                    leUltimeTransazioni: !state.leUltimeTransazioni,
                  }));
                }}
              ></i>
            </div>
            {leUltimeTransazioni && (
              <AdminRightFormUltimeDetails
                leUltimeTransazioniDet={leUltimeTransazioniDet}
              />
            )}
            <div className="AdminRightForm--Box">
              <div className="AdminRightForm--Box--Wallet">
                {" "}
                <i className="fal fa-wallet"></i>
                <span>DEPOSITO / ADDEBITO</span>
              </div>
              <i
                className={`far fa-chevron-${
                  dropdownVisibility === false ? "down" : "up"
                }`}
                onClick={() => {
                  this.setState((state) => ({
                    dropdownVisibility: !state.dropdownVisibility,
                  }));
                }}
              ></i>
            </div>
            {dropdownVisibility && (
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
              />
            )}
          </React.Fragment>
        ) : (
          <Ticket />
        )}
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  openAdminModal: state.auth.openAdminModal,
});
export default connect(mapsStateToProps, { ...AuthActions })(AdminRightForm);

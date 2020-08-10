import React from "react";
import moment from "moment";
import { Tooltip } from "antd";
import DepositoModal from "./DepositoModal";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Ticket from "./Ticket";
import AdminRightFormUltimeDetails from "./AdminRightFormUltimeDetails";
import AdminRightFormStatisticheDetails from "./AdminRightFormStatisticheDetails";
import AdminRightFormWalletDetails from "./AdminRightFormWalletDetails";

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
    const {openAdminModal,graphData,leUltimeTransazioniDet,Tranzacioni,Proviggioni,Commisione}=this.props;

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
                  this.setState({
                    statisticheDropdownVisibility: !statisticheDropdownVisibility,
                  });
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
                  this.setState({
                    leUltimeTransazioni: !leUltimeTransazioni,
                  });
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
                  this.setState({
                    dropdownVisibility: !dropdownVisibility,
                  });
                }}
              ></i>
            </div>
            {dropdownVisibility && (
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

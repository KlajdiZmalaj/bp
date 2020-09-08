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
    dropdownVisibility: true,
    statisticheDropdownVisibility: true,
    leUltimeTransazioni: true,
    depositoActiveVisibility: true,
    addebitoActiveVisibility: false,
  };
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    const { activeSkinId } = this.props;
    if (this.state.statisticheDropdownVisibility === true) {
      if (
        (this.state.statisticheDropdownVisibility === true &&
          prevState.statisticheDropdownVisibility === false) ||
        (this.props.activeSkinId != prevProps.activeSkinId &&
          this.state.statisticheDropdownVisibility === true)
      ) {
        this.props.getStatistiche(activeSkinId);
      }
    }
    if (this.state.leUltimeTransazioni === true) {
      if (
        (this.state.leUltimeTransazioni === true &&
          prevState.leUltimeTransazioni === false) ||
        (this.props.activeSkinId != prevProps.activeSkinId &&
          this.state.leUltimeTransazioni === true)
      ) {
        this.props.getWidgetPayments(activeSkinId);
      }
    }
  }
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
      leUltimeTransazioniDet,
      screenWidth,
      accountInfo,
      Statistiche,
      TrCoPro,
    } = this.props;
    return (
      <div className="AdminRightForm">
        {screenWidth >= 1320 &&
          (openAdminModal === false ? (
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
                  graphData={Statistiche ? Statistiche : ""}
                  Tranzacioni={TrCoPro?.importo ? TrCoPro?.importo : 0}
                  Commisione={TrCoPro?.commissione ? TrCoPro?.commissione : 0}
                  Proviggioni={TrCoPro?.proviggioni ? TrCoPro.proviggioni : 0}
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
              {accountInfo.profile.role.name != "support" && (
                <React.Fragment>
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
              )}
            </React.Fragment>
          ) : (
            <Ticket />
          ))}
      </div>
    );
  }
}
const mapsStateToProps = (state) => ({
  openAdminModal: state.auth.openAdminModal,
  screenWidth: state.main.screenWidth,
  activeSkinId: state.main.activeSkinId,
  Statistiche: state.auth.Statistiche?.data,
  TrCoPro: state.auth.Statistiche?.total,
  accountInfo: state.auth.accountInfo,
});
export default connect(mapsStateToProps, { ...AuthActions })(AdminRightForm);

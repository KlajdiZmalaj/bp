import React from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { MainActions } from "redux-store/models";
import Ticket from "./Ticket";
import "./adminRightForm.css";
import AdminRightFormUltimeDetails from "../AdminRightFormUltDet/AdminRightFormUltimeDetails";
import AdminRightFormStatisticheDetails from "../AdminRightFormStatDet/AdminRightFormStatisticheDetails";
import AdminRightFormWalletDetails from "../AdminRightFormWallDet/AdminRightFormWalletDetails";
import PrenotazioneBiglietti from "./PrenotazioneBiglietti";
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
    const {
      activeSkinId,
      accountInfo,
      getUsers,
      getStatistiche,
      getWidgetPayments,
    } = this.props;
    const {
      statisticheDropdownVisibility,
      dropdownVisibility,
      leUltimeTransazioni,
    } = this.state;
    if (
      activeSkinId != prevProps.activeSkinId &&
      dropdownVisibility === true &&
      !window.location.href.includes("utenti")
    ) {
      const Special =
        activeSkinId === -1 && accountInfo?.profile?.role?.name != "support";
      if (Special) {
        getUsers(null, {
          skin_id: 1,
        });
      } else {
        getUsers(null, {
          skin_id: activeSkinId,
          backoffice: true,
        });
      }
    }
    if (statisticheDropdownVisibility === true) {
      if (
        (statisticheDropdownVisibility === true &&
          prevState.statisticheDropdownVisibility === false) ||
        (activeSkinId != prevProps.activeSkinId &&
          this.state.statisticheDropdownVisibility === true)
      ) {
        getStatistiche(activeSkinId);
      }
    }
    if (leUltimeTransazioni === true) {
      if (
        (leUltimeTransazioni === true &&
          prevState.leUltimeTransazioni === false) ||
        (activeSkinId != prevProps.activeSkinId && leUltimeTransazioni === true)
      ) {
        getWidgetPayments(activeSkinId);
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
        {/* <PrenotazioneBiglietti /> */}
        {screenWidth > 1024 &&
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
export default connect(mapsStateToProps, { ...AuthActions, ...MainActions })(
  AdminRightForm
);

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import PrintTicket from "./PrintTicket";
import PrintTicketSerap from "./PrintTicketSerap";
import F24 from "./F24";
import Bolletino from "./Bolletino";
//import NewBolletino from "./NewBolletini";

class ModulePopUp1 extends React.Component {
  state = {
    helper: false,
  };
  componentDidMount() {
    document.body.style.overflow = "hidden";
    if (this.props.service.service_id === "BOL001") {
      this.setState({ helper: true });
    }
  }
  componentWillUnmount() {
    document.body.style.removeProperty("overflow");
  }
  render() {
    const { helper } = this.state;
    const { bolletiniBianchi, service, accountInfo } = this.props;
    const isTestAcc =
      accountInfo?.profile?.username === "mynewagency" &&
      accountInfo?.profile?.role?.name === "agency" &&
      accountInfo?.profile?.role?.id === 11;
    const isSepaUser =
      accountInfo?.profile?.username === "sepaagency" ||
      accountInfo?.profile?.username === "sepa_user";
    return (
      <div
        className={`modulePopUP modulePopUP1 ${
          service.service_id === "PAGF24"
            ? isSepaUser || isTestAcc
              ? "test"
              : ""
            : isSepaUser || isTestAcc
            ? "test flex"
            : ""
        }`}
        onClick={() => {
          // this.props.togglePopUp(false);
        }}
      >
        <div
          className="module container-fluid max-width_modulePopUP"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="row">
            {
              service.service_id === "PAGF24" ? (
                <F24 service_id={service.service_id} />
              ) : (
                // isSepaUser || isTestAcc ?
                <Bolletino
                  isTestAcc={isSepaUser || isTestAcc}
                  service={service}
                  service_id={service.service_id}
                  helper={helper}
                ></Bolletino>
              )
              //  : (

              //   <NewBolletino
              //     service={service}
              //     service_id={service.service_id}
              //   ></NewBolletino>
              // )
            }
            {bolletiniBianchi &&
              JSON.stringify(bolletiniBianchi) !== JSON.stringify({}) && (
                <Fragment>
                  {bolletiniBianchi?.receipt_type === "base64" ||
                  bolletiniBianchi?.CheckVerificationDebtPositionId ||
                  service.service_id === "PAGF24" ? (
                    <PrintTicketSerap
                      bolletiniBianchi={bolletiniBianchi}
                      service_id={service.service_id}
                    />
                  ) : (
                    <PrintTicket arr={bolletiniBianchi}></PrintTicket>
                  )}
                </Fragment>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => ({
  isShowing: state.main.isShowing,
  service: state.auth.service_id,
  accountInfo: state.auth.accountInfo,
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp1
);

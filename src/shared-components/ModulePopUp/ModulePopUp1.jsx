import React, { Fragment } from "react";
import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";
import PrintTicket from "./PrintTicket";
import PrintTicketSerap from "./PrintTicketSerap";

import Bolletino from "./Bolletino";

class ModulePopUp1 extends React.Component {
  render() {
    const { bolletiniBianchi, service } = this.props;
    console.log(bolletiniBianchi);
    return (
      <div className="modulePopUP modulePopUP1">
        <div className="module container-fluid max-width_modulePopUP">
          <div className="row">
            <Bolletino
              service={service}
              service_id={service.service_id}
            ></Bolletino>
            {bolletiniBianchi &&
              JSON.stringify(bolletiniBianchi) !== JSON.stringify({}) && (
                <Fragment>
                  {bolletiniBianchi?.receipt_type === "base64" ? (
                    <PrintTicketSerap bolletiniBianchi={bolletiniBianchi} />
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
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp1
);

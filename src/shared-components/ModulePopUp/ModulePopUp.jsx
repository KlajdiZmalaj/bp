import React from "react";

import { connect } from "react-redux";
import { MainActions, AuthActions } from "redux-store/models";

import PrintTicket from "./PrintTicket";
import Bolletino from "./Bolletino";
import "./style.css";

class ModulePopUp extends React.Component {
  render() {
    const { isShowing, service_id } = this.props;
    return isShowing ? (
      <div className="modulePopUP modulePopUP1">
        <div className="module container-fluid max-width_modulePopUP">
          <div className="row">
            <Bolletino service_id={service_id}></Bolletino>
            <PrintTicket></PrintTicket>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapsStateToProps = state => ({
  isShowing: state.main.isShowing,
  service_id: state.auth.service_id
});

export default connect(mapsStateToProps, { ...MainActions, ...AuthActions })(
  ModulePopUp
);

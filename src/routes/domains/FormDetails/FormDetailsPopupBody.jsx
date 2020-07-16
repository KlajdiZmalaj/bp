import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import Voli from "./Voli";
import Treni from "./Treni";
import Eventi from "./Eventi";

import "./style.scss";

export class FormDetailsPopupBody extends Component {
  render() {
    const { typee, TicketByTcketId } = this.props;
    return (
      <div>
        {typee === 1 && (
          <Voli
            TicketByTcketId={TicketByTcketId}
            typee={typee}
            updateDataForm={this.props.updateDataForm}
            ticketId={TicketByTcketId.id}
            editable={this.props.editable}
          />
        )}
        {typee === 2 && (
          <Treni
            TicketByTcketId={TicketByTcketId}
            typee={typee}
            updateDataForm={this.props.updateDataForm}
            ticketId={TicketByTcketId.id}
            editable={this.props.editable}
          />
        )}
        {typee === 3 && (
          <Eventi
            TicketByTcketId={TicketByTcketId}
            typee={typee}
            updateDataForm={this.props.updateDataForm}
            ticketId={TicketByTcketId.id}
            editable={this.props.editable}
          />
        )}
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(FormDetailsPopupBody);
//

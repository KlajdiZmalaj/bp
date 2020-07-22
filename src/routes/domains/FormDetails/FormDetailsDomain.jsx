import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import "./style.scss";
import FormDetailPopup from "./FormDetailPopup";

import DetailRow from "./DetailRow";
class FormDetailsDomain extends Component {
  componentDidMount() {
    this.props.setTicketByTicketId({ data: null });
    this.props.getDataFormDetails();
  }
  render() {
    const { formDetails, TicketByTcketId } = this.props;
    const { my_tickets } = formDetails;
    const { tickets } = formDetails;
    // console.log(formDetails);
    // console.log(my_tickets);
    const allRoles = {
      user: "fal fa-user text-success",
      agency: "fal fa-store text-success",
      agent: "fas fa-user-tie text-success",
      super_admin: "fal fa-store text-success",
    };
    return (
      <div className="ticketDetails">
        <div className="ticketDetails--header">
          <span>Status</span>
          <span>Subject</span>
          <span>Agency</span>
          <span>Ticket ID</span>
          <span>Data</span>
          <span>Biglieto</span>
        </div>
        {(my_tickets || []).map((ticket) => {
          console.log("ticket", ticket);
          return (
            <DetailRow
              getTicketByTicketId={this.props.getTicketByTicketId}
              isNew={true}
              ticket={ticket}
              key={ticket && ticket.id}
            />
          );
        })}
        {(tickets || []).map((ticket) => {
          console.log("ticket", ticket);
          return (
            <DetailRow
              getTicketByTicketId={this.props.getTicketByTicketId}
              ticket={ticket}
              key={ticket && ticket.id}
            />
          );
        })}
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    formDetails: state.auth.formDetails,
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);

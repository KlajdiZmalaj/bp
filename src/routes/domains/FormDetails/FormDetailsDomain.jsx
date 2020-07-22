import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import "./style.scss";

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
        <div className="ticketDetails--filters">
          <div className="ticketDetails--filters__byTicket">
            <i className="fa fa-plane" aria-hidden="true"></i>
            <i className="fa fa-bus" aria-hidden="true"></i>
            <i className="fa fa-train" aria-hidden="true"></i>
            <i className="fas fa-ticket-alt"></i>
            <i className="far fa-shopping-cart" aria-hidden="true"></i>
          </div>
        </div>
        <div className="ticketDetails--header">
          <span>Stato</span>
          <span>Soggetto</span>
          <span>Agenzia</span>
          <span>Nr.Prenotazione</span>
          <span>Data</span>
          <span>Biglietto</span>
        </div>
        {(my_tickets || []).map((ticket) => {
          // console.log("ticket", ticket);
          return (
            <DetailRow
              allRoles={allRoles}
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
              allRoles={allRoles}
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { Switch } from "antd";

import "./style.scss";

import DetailRow from "./DetailRow";
class FormDetailsDomain extends Component {
  state = {
    filterTickets: "all",
    statusRows: "all",
  };
  componentDidMount() {
    this.props.setTicketByTicketId({ data: null });
    this.props.getDataFormDetails();
  }
  render() {
    const { formDetails, TicketByTcketId, formDetailsActives } = this.props;
    const { filterTickets, statusRows } = this.state;
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
          <div className="ticketDetails--filters__byStatus">
            <Switch
              onChange={(on) => {
                if (on) {
                  this.props.getDataFormDetailsActives();
                  this.setState({ statusRows: "active" });
                } else {
                  this.props.getDataFormDetails();
                  this.setState({ statusRows: "all" });
                }
              }}
              checkedChildren={
                <i className="fal fa-check-circle" aria-hidden="true"></i>
              }
              unCheckedChildren={
                <i className="fal fa-times-circle" aria-hidden="true"></i>
              }
            />
          </div>
          <div className="ticketDetails--filters__byTicket">
            <i
              onClick={() => this.setState({ filterTickets: "Voli" })}
              className={
                "fa fa-plane" + (filterTickets === "Voli" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
            <i
              onClick={() => this.setState({ filterTickets: "Treni1" })}
              className={
                "fa fa-bus" + (filterTickets === "Treni1" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
            <i
              onClick={() => this.setState({ filterTickets: "Treni2" })}
              className={
                "fa fa-train" + (filterTickets === "Treni2" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
            <i
              onClick={() => this.setState({ filterTickets: "Eventi" })}
              className={
                "fas fa-ticket-alt" +
                (filterTickets === "Eventi" ? " active" : "")
              }
            ></i>
            <i
              onClick={() => this.setState({ filterTickets: "all" })}
              className={
                "far fa-shopping-cart" +
                (filterTickets === "all" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
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
        {(formDetailsActives || []).map((ticket) => {
          // console.log("ticket", ticket);
          return (
            (filterTickets === "all" || filterTickets.includes(ticket.type)) &&
            statusRows === "active" && (
              <DetailRow
                allRoles={allRoles}
                getTicketByTicketId={this.props.getTicketByTicketId}
                isNew={true}
                ticket={ticket}
                key={ticket && ticket.id}
              />
            )
          );
        })}
        {(my_tickets || []).map((ticket) => {
          return (
            (filterTickets === "all" || filterTickets.includes(ticket.type)) &&
            statusRows === "all" && (
              <DetailRow
                allRoles={allRoles}
                getTicketByTicketId={this.props.getTicketByTicketId}
                isNew={true}
                ticket={ticket}
                key={ticket && ticket.id}
              />
            )
          );
        })}
        {(tickets || []).map((ticket) => {
          return (
            (filterTickets === "all" || filterTickets.includes(ticket.type)) &&
            statusRows === "all" && (
              <DetailRow
                allRoles={allRoles}
                getTicketByTicketId={this.props.getTicketByTicketId}
                ticket={ticket}
                key={ticket && ticket.id}
              />
            )
          );
        })}
      </div>
    );
  }
}
const mstp = (state) => {
  return {
    formDetails: state.auth.formDetails,
    formDetailsActives: state.auth.formDetailsActives,
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);

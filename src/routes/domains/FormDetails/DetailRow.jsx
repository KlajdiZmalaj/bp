import React, { Component } from "react";
import { AuthActions } from "redux-store/models";
import images from "themes/images";
import { connect } from "react-redux";
import Voli from "./Voli";
import Treni from "./Treni";
import Eventi from "./Eventi";
import { Tooltip } from "antd";
export class DetailRow extends Component {
  state = {
    hasDetails: false,
  };
  render() {
    const { hasDetails } = this.state;
    const { ticket, TicketByTcketId } = this.props;
    return (
      ticket && (
        <React.Fragment>
          <div className="ticketDetails--row animated fadeIn">
            <span className="status">
              <Tooltip title={ticket.status}>
                <div data-status={`${ticket.status}`}>
                  <span></span>
                </div>
              </Tooltip>
            </span>

            <span>
              <i
                className={`fas fa-${
                  ticket.type == "Treni"
                    ? "train"
                    : ticket.type == "Eventi"
                    ? "receipt"
                    : ticket.type == "Voli"
                    ? "plane"
                    : ""
                }`}
                aria-hidden="true"
              ></i>
              Prenotazione biglieto <div>{ticket.nome_agenzia}</div>{" "}
              {ticket.status === "Nuova Richiesta" && (
                <div className="new">New</div>
              )}
            </span>

            <span>{ticket.user}</span>
            <span>BP-{ticket.id}</span>
            <span>{ticket.updated_at}</span>
            <span className="options">
              {/* <i className="fal fa-file-pdf"></i> */}
              <Tooltip title="Presto Subito">
                {" "}
                <div>
                  <i className="fal fa-archive"></i>
                </div>
              </Tooltip>
              <Tooltip title="Presto Subito">
                {" "}
                <div>
                  <i className="fal fa-trash" aria-hidden="true"></i>
                </div>
              </Tooltip>

              <div
                className="toggler"
                onClick={() => {
                  if (!hasDetails) {
                    this.props.getTicketByTicketId(ticket.id);
                  } else {
                    this.props.setTicketByTicketId(null);
                  }
                  this.setState({ hasDetails: !this.state.hasDetails });
                }}
              >
                <i
                  className={`fal fa-chevron-${!hasDetails ? "down" : "up"}`}
                  aria-hidden="true"
                ></i>
                {!hasDetails ? "View" : "Close"}
              </div>
            </span>
          </div>
          {hasDetails && (
            <div className="ticketDetails--infos animated fadeIn">
              <div className="ticketDetails--infos__header">
                <img
                  src={images[`${ticket.nome_agenzia.toLowerCase()}-logo`]}
                  alt=""
                />
                <div>
                  <span>ID : BP-{ticket.id}</span>
                  <span>
                    PRESA A CARICO{" "}
                    <i className="fal fa-check-circle" aria-hidden="true"></i>{" "}
                  </span>
                </div>
              </div>
              <div className="ticketDetails--infos__body">
                {TicketByTcketId && TicketByTcketId.type === 1 && (
                  <Voli
                    TicketByTcketId={TicketByTcketId}
                    typee={this.props.TicketByTcketId.type}
                    updateDataForm={this.props.updateDataForm}
                    ticketId={TicketByTcketId.id}
                    editable={this.props.editable}
                  />
                )}
                {TicketByTcketId && TicketByTcketId.type === 2 && (
                  <Treni
                    TicketByTcketId={TicketByTcketId}
                    typee={this.props.TicketByTcketId.type}
                    updateDataForm={this.props.updateDataForm}
                    ticketId={TicketByTcketId.id}
                    editable={this.props.editable}
                  />
                )}
                {TicketByTcketId && TicketByTcketId.type === 3 && (
                  <Eventi
                    TicketByTcketId={TicketByTcketId}
                    typee={this.props.TicketByTcketId.type}
                    updateDataForm={this.props.updateDataForm}
                    ticketId={TicketByTcketId.id}
                    editable={this.props.editable}
                  />
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      )
    );
  }
}
const mstp = (state) => {
  return {
    TicketByTcketId: state.auth.TicketByTcketId,
  };
};
export default connect(mstp, AuthActions)(DetailRow);

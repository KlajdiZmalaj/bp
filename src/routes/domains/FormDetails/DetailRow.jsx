import React, { Component } from "react";
import { AuthActions } from "redux-store/models";
import images from "themes/images";
import { connect } from "react-redux";
import Voli from "./Voli";
import Treni from "./Treni";
import Eventi from "./Eventi";
import ShopOnline from "./ShopOnline";
import { Tooltip } from "antd";
export class DetailRow extends Component {
  render() {
    const { ticket, TicketByTcketId, allRoles, screenWidth } = this.props;

    return (
      ticket && (
        <React.Fragment>
          <div
            onClick={() => {
              if (screenWidth <= 768) {
                this.props.mobilePopUp(ticket);
              }
            }}
            className="ticketDetails--row animated fadeIn"
          >
            <span className="status">
              <Tooltip title={ticket.status}>
                <div data-status={`${ticket.status}`}>
                  <span></span>
                </div>
              </Tooltip>
            </span>
            <span>
              <Tooltip title={ticket.type}>
                <i
                  className={`fas fa-${
                    ticket.type === "Treni"
                      ? "train"
                      : ticket.type === "Eventi"
                      ? "ticket-alt"
                      : ticket.type === "Voli"
                      ? "plane"
                      : ticket.type === "Shop"
                      ? "shopping-bag"
                      : ""
                  }`}
                  aria-hidden="true"
                ></i>
              </Tooltip>
              Prenotazione biglieto <div>{ticket.nome_agenzia}</div>{" "}
              {ticket.status === "Nuova Richiesta" && (
                <div className="new">New</div>
              )}
            </span>
            <span>{ticket.skin}</span>
            <span>
              <i className={`${allRoles[ticket.role]}`} />
              {ticket.user}
            </span>
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (TicketByTcketId && TicketByTcketId.id === ticket.id) {
                    this.props.setTicketByTicketId(null);
                  } else {
                    this.props.getTicketByTicketId(ticket.id);
                  }
                }}
              >
                <i
                  className={`fal fa-chevron-${
                    TicketByTcketId && TicketByTcketId.id === ticket.id
                      ? "up"
                      : "down"
                  }`}
                  aria-hidden="true"
                ></i>
                {TicketByTcketId && TicketByTcketId.id === ticket.id
                  ? "Close"
                  : "View"}
              </div>
            </span>
          </div>
          {TicketByTcketId && TicketByTcketId.id === ticket.id && (
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
                {TicketByTcketId && TicketByTcketId.type === 4 && (
                  <ShopOnline
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
    screenWidth: state.main.screenWidth,
  };
};
export default connect(mstp, AuthActions)(DetailRow);

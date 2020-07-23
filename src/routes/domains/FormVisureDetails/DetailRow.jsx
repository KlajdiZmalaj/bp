import React, { Component } from "react";
import { AuthActions } from "redux-store/models";
import images from "themes/images";
import { connect } from "react-redux";
import { Tooltip } from "antd";
export class DetailRow extends Component {
  state = {
    hasDetails: false,
  };
  render() {
    const { hasDetails } = this.state;
    const { Visure, allRoles } = this.props;

    return (
      Visure && (
        <React.Fragment>
          <div className="ticketDetails--row animated fadeIn">
            <span className="status">
              <Tooltip title={Visure.status}>
                <div data-status={`${Visure.status}`}>
                  <span></span>
                </div>
              </Tooltip>
            </span>

            <span>
              <Tooltip title={Visure.type}>
                <i
                  className={`fas fa-${
                    Visure.type === "Persona Fisica"
                      ? "user"
                      : Visure.type === "Azienda O Impresa"
                      ? "building"
                      : ""
                  }`}
                  aria-hidden="true"
                />
              </Tooltip>
              Visura {Visure.type}
              {Visure.status === "Nuova Richiesta" && (
                <div className="new">New</div>
              )}
            </span>
            <span>
              <i className={`${allRoles[Visure.role]}`} />
              {Visure.user}
            </span>
            <span>BP-{Visure.id}</span>
            <span>{Visure.updated_at}</span>
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
            </span>
          </div>
          {/* <div
                className="toggler"
                onClick={() => {
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
                {Visure && TicketByTcketId.id === ticket.id
                  ? "Close"
                  : "View"} </div>*/}

          {/* {TicketByTcketId && TicketByTcketId.id === ticket.id && (
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
          )} */}
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

import React, { Component } from "react";
import images from "themes/images";
export class DetailRow extends Component {
  state = {
    hasDetails: false,
  };
  render() {
    const { hasDetails } = this.state;
    const { ticket } = this.props;
    return (
      <React.Fragment>
        <div className="ticketDetails--row animated fadeIn">
          <span className="status">
            <div>
              <span></span>
            </div>
          </span>

          <span>
            <i
              className={`fal fa-${
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
            {this.props.isNew && <div className="new">New</div>}
          </span>

          <span>{ticket.user}</span>
          <span>BP-{ticket.id}</span>
          <span>{ticket.updated_at}</span>
          <span>
            {/* <i className="fal fa-file-pdf"></i> */}
            <div
              className="toggler"
              onClick={() => {
                if (!hasDetails) {
                  this.props.getTicketByTicketId(ticket.id);
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
                  <i class="fal fa-check-circle" aria-hidden="true"></i>{" "}
                </span>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default DetailRow;

import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { Switch, Tooltip } from "antd";
import RowDetailsMobile from "./RowDetailsMobile";
import "./style.scss";
import DetailRow from "./DetailRow";
import { allRoles } from "config/index";

export const FilterTypeComponent = ({ filterType, handleClick, title }) => (
  <Tooltip title={`Filtra per ${title === "all" ? "Tutti" : title}`}>
    <span
      className={`status ${filterType === title ? " active" : ""}`}
      data-status={title}
      onClick={handleClick}
    >
      <div
        className={filterType === title ? " active" : ""}
        aria-hidden="true"
        data-status={title}
      >
        <span className={filterType === title ? " active" : ""}></span>
      </div>
      <span>
        {title === "all"
          ? "Tutti"
          : title === "Nuova Richiesta"
          ? "nuove richieste"
          : title === "Eseguibile"
          ? "Eseguibili"
          : title === "In Attesa"
          ? "In Attesa"
          : title === "Completato"
          ? "Completati"
          : title === "Cancellato"
          ? "Cancellati"
          : title}
      </span>
    </span>
  </Tooltip>
);
class FormDetailsDomain extends Component {
  state = {
    filterTickets: "all",
    statusRows: "all",
    filterType: "all",
    filterSkin: "",
    filterAgenzie: "",
    filterRicercaId: "",
    mobilePopUpData: {},
  };
  mobilePopUp = (mobilePopUpData) => {
    this.setState({ mobilePopUpData });
  };
  componentDidMount() {
    this.props.setTicketByTicketId({ data: null });
    this.props.getDataFormDetails();
  }
  render() {
    const { formDetails, formDetailsActives } = this.props;
    const {
      filterTickets,
      statusRows,
      filterSkin,
      filterAgenzie,
      filterRicercaId,
      filterType,
    } = this.state;
    const { my_tickets } = formDetails;
    const { tickets } = formDetails;

    return (
      <React.Fragment>
        <div className="ticketDetails">
          <div className="ticketDetails--filters">
            <div className="ticketDetails--filters__byTicket">
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
                checkedChildren={"Finita"}
                unCheckedChildren={"Incompiuta"}
              />
              <input
                placeholder="Skin"
                onChange={(e) => this.setState({ filterSkin: e.target.value })}
                value={filterSkin}
              />
              <input
                placeholder="Ricerca Agenzia"
                onChange={(e) =>
                  this.setState({ filterAgenzie: e.target.value })
                }
                value={filterAgenzie}
              />
              <input
                placeholder="Ricerca Id"
                onChange={(e) =>
                  this.setState({ filterRicercaId: e.target.value })
                }
                value={filterRicercaId}
              />
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

            <div className="ticketDetails--filters__byTicket">
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() => this.setState({ filterType: "all" })}
                title="all"
              />
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() =>
                  this.setState({ filterType: "Nuova Richiesta" })
                }
                title="Nuova Richiesta"
              />
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() => this.setState({ filterType: "Eseguibile" })}
                title="Eseguibile"
              />
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() => this.setState({ filterType: "In Attesa" })}
                title="In Attesa"
              />
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() => this.setState({ filterType: "Completato" })}
                title="Completato"
              />
              <FilterTypeComponent
                filterType={filterType}
                handleClick={() => this.setState({ filterType: "Cancellato" })}
                title="Cancellato"
              />
            </div>
          </div>
          <div className="ticketDetails--header">
            <span>Stato</span>
            <span>Soggetto</span>
            <span>Skin</span>
            <span>Agenzia</span>
            <span>Nr.Prenotazione</span>
            <span>Data</span>
            <span>Biglietto</span>
          </div>
          {(formDetailsActives || []).map((ticket) => {
            // console.log("ticket", ticket);
            return (
              (filterTickets === "all" ||
                filterTickets.includes(ticket.type)) &&
              statusRows === "active" &&
              (filterType === "all" || filterType === ticket.status) &&
              (filterSkin === "" ||
                ticket.skin.toLowerCase().includes(filterSkin.toLowerCase())) &&
              (filterAgenzie === "" ||
                ticket.user
                  .toLowerCase()
                  .includes(filterAgenzie.toLowerCase())) &&
              (filterRicercaId === "" ||
                `BP-${ticket.id}`
                  .toString()
                  .toLowerCase()
                  .includes(filterRicercaId.toString().toLowerCase())) && (
                <DetailRow
                  mobilePopUp={this.mobilePopUp}
                  allRoles={allRoles}
                  getTicketByTicketId={this.props.getTicketByTicketId}
                  isNew={true}
                  ticket={ticket}
                  key={ticket && ticket.id}
                />
              )
            );
          })}
          {my_tickets &&
            (my_tickets || []).map((ticket) => {
              return (
                (filterTickets === "all" ||
                  filterTickets.includes(ticket.type)) &&
                statusRows === "all" &&
                (filterType === "all" || filterType === ticket.status) &&
                (filterSkin === "" ||
                  ticket.skin
                    .toLowerCase()
                    .includes(filterSkin.toLowerCase())) &&
                (filterAgenzie === "" ||
                  ticket.user
                    .toLowerCase()
                    .includes(filterAgenzie.toLowerCase())) &&
                (filterRicercaId === "" ||
                  `BP-${ticket.id}`
                    .toString()
                    .toLowerCase()
                    .includes(filterRicercaId.toString().toLowerCase())) && (
                  <DetailRow
                    allRoles={allRoles}
                    mobilePopUp={this.mobilePopUp}
                    getTicketByTicketId={this.props.getTicketByTicketId}
                    isNew={true}
                    ticket={ticket}
                    key={ticket && ticket.id}
                  />
                )
              );
            })}
          {tickets &&
            (tickets || []).map((ticket) => {
              return (
                (filterTickets === "all" ||
                  filterTickets.includes(ticket.type)) &&
                statusRows === "all" &&
                (filterType === "all" || filterType === ticket.status) &&
                (filterSkin === "" ||
                  ticket.skin
                    .toLowerCase()
                    .includes(filterSkin.toLowerCase())) &&
                (filterAgenzie === "" ||
                  ticket.user
                    .toLowerCase()
                    .includes(filterAgenzie.toLowerCase())) &&
                (filterRicercaId === "" ||
                  `BP-${ticket.id}`
                    .toString()
                    .toLowerCase()
                    .includes(filterRicercaId.toString().toLowerCase())) && (
                  <DetailRow
                    mobilePopUp={this.mobilePopUp}
                    allRoles={allRoles}
                    getTicketByTicketId={this.props.getTicketByTicketId}
                    ticket={ticket}
                    key={ticket && ticket.id}
                  />
                )
              );
            })}
        </div>
        <RowDetailsMobile
          mobilePopUpData={this.state.mobilePopUpData}
          mobilePopUp={this.mobilePopUp}
        />
      </React.Fragment>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import { Switch, Tooltip } from "antd";
import RowDetailsMobile from "./RowDetailsMobile";
import "./style.scss";
import DetailRow from "./DetailRow";
import DetailRowVisure from "../FormVisureDetails/DetailRow";
import { allRoles } from "config/index";
import { Select, Pagination } from "antd";
const { Option } = Select;

// import AccountInfo from "../../views/AccountInfo";
export const FilterVisureComponent = ({
  filterVisure,
  title,
  handleClick,
  icon,
  type,
}) => {
  // console.log("ca ka filter", filterVisure, title);
  return (
    <Tooltip
      title={`Filtra ${
        title === "all" && icon !== "shopping-cart"
          ? "Tutti"
          : title === "visura"
          ? "Visura"
          : title === "all" && icon === "shopping-cart"
          ? `Tutti ${type}`
          : title === "Treni1"
          ? "FlixBus"
          : title === "Treni2"
          ? "Trenitalia"
          : title
      }`}
    >
      <i
        onClick={handleClick}
        className={`fa fa-${icon}` + (filterVisure === title ? " active" : "")}
        aria-hidden="true"
      ></i>
    </Tooltip>
  );
};
function Filter(
  ticket,
  type,
  mainFilter,
  filterByType,
  statusRow,
  statusRowWanted,
  filterSkin,
  filterAgenzie,
  filterRicercaId,
  nome_agenzia,
  Status,
  filterType
) {
  let newNAg = nome_agenzia === "visura" ? "visura" : "Prenotazioni";
  if (
    (newNAg === type && mainFilter === type) ||
    (mainFilter === "all" && newNAg === type)
  ) {
    if (
      filterByType === "all" ||
      filterByType === ticket.type ||
      filterByType.includes(ticket.type)
    ) {
      if (statusRow === statusRowWanted) {
        if (
          (filterSkin === "" ||
            ticket.skin.toLowerCase().includes(filterSkin.toLowerCase())) &&
          (filterAgenzie === "" ||
            ticket.user.toLowerCase().includes(filterAgenzie.toLowerCase())) &&
          (filterRicercaId === "" ||
            `BP-${ticket.id}`
              .toString()
              .toLowerCase()
              .includes(filterRicercaId.toString().toLowerCase()))
        ) {
          if (Status === filterType || filterType === "all") {
            return true;
          }
        }
      }
    }
  }
  return false;
}
export const FilterTypeComponent = ({ filterType, handleClick, title }) => {
  const active =
    (filterType === "Nuova Richiesta" && title === "Nuove Richieste") ||
    (filterType === "Nuova Offerta" && title === "Nuove Offerte") ||
    filterType === title;
  return (
    <Tooltip title={`Filtra per ${title === "all" ? "Tutti" : title}`}>
      <span
        className={`status ${active ? " active" : ""}`}
        data-status={title}
        onClick={handleClick}
      >
        <div
          className={active ? " active" : ""}
          aria-hidden="true"
          data-status={title}
        >
          <span className={active ? " active" : ""}></span>
        </div>
        <span>
          {title === "all"
            ? "Tutti"
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
};
class FormDetailsDomain extends Component {
  state = {
    filterTickets: "all",
    statusRows: "all",
    filterType: "all",
    filterSkin: "",
    filterAgenzie: "",
    filterRicercaId: "",
    filterVisure: "all",
    MainFilter: "all",
    perPage: 25,
    page_number: 1,
    mobilePopUpData: {},
  };
  mobilePopUp = (mobilePopUpData) => {
    this.setState({ mobilePopUpData });
  };
  componentDidMount() {
    this.props.setTicketByTicketId({ data: null });
    this.props.getDataFormDetails(25, 1);
  }
  render() {
    const { formDetails, formDetailsActives, accountInfo } = this.props;
    const {
      filterTickets,
      statusRows,
      filterSkin,
      filterAgenzie,
      filterRicercaId,
      filterType,
      MainFilter,
      filterVisure,
      page_number,
      perPage,
    } = this.state;
    const { my_tickets, total_pages, tickets } = formDetails;

    return (
      <React.Fragment>
        <div className="ticketDetails">
          <div className="ticketDetails--filters">
            <div className="ticketDetails--filters__byTicket">
              <Switch
                onChange={(on) => {
                  if (on) {
                    this.props.getDataFormDetailsActives(null, 25, 1);
                    this.setState({ statusRows: "active" });
                  } else {
                    this.props.getDataFormDetails(25, 1);
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
              <FilterVisureComponent
                filterVisure={MainFilter}
                handleClick={() =>
                  this.setState({
                    MainFilter: "all",
                    filterTickets: "all",
                    filterVisure: "all",
                  })
                }
                title={"all"}
                icon={"list"}
              />
              <FilterVisureComponent
                filterVisure={MainFilter}
                handleClick={() =>
                  this.setState({ MainFilter: "Prenotazioni" })
                }
                title={"Prenotazioni"}
                icon={"clipboard-check"}
              />
              <FilterVisureComponent
                filterVisure={MainFilter}
                handleClick={() => this.setState({ MainFilter: "visura" })}
                title={"visura"}
                icon={"ballot-check"}
              />
              {MainFilter === "visura" && (
                <React.Fragment>
                  <FilterVisureComponent
                    filterVisure={filterVisure}
                    handleClick={() => {
                      const f = "Persona Fisica";
                      this.setState((state) => ({
                        filterVisure: state.filterVisure === f ? "all" : f,
                      }));
                    }}
                    title={"Persona Fisica"}
                    icon={"user sub"}
                  />
                  <FilterVisureComponent
                    filterVisure={filterVisure}
                    handleClick={() => {
                      const f = "Azienda o Impresa";
                      this.setState((state) => ({
                        filterVisure: state.filterVisure === f ? "all" : f,
                      }));
                    }}
                    title={"Azienda o Impresa"}
                    icon={"building sub"}
                  />
                  {/* <FilterVisureComponent
                    filterVisure={filterVisure}
                    handleClick={() => this.setState({ filterVisure: "all" })}
                    title={"all"}
                    type={"Visura"}
                    icon={"shopping-cart"}
                  /> */}
                </React.Fragment>
              )}
              {MainFilter === "Prenotazioni" && (
                <React.Fragment>
                  <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => {
                      const f = "Voli";
                      this.setState((state) => ({
                        filterTickets: state.filterTickets === f ? "all" : f,
                      }));
                    }}
                    title={"Voli"}
                    icon={"plane sub"}
                  />
                  <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => {
                      const f = "Treni1";
                      this.setState((state) => ({
                        filterTickets: state.filterTickets === f ? "all" : f,
                      }));
                    }}
                    title={"Treni1"}
                    icon={"bus sub"}
                  />
                  <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => {
                      const f = "Treni2";
                      this.setState((state) => ({
                        filterTickets: state.filterTickets === f ? "all" : f,
                      }));
                    }}
                    title={"Treni2"}
                    icon={"train sub"}
                  />

                  <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => {
                      const f = "Eventi";
                      this.setState((state) => ({
                        filterTickets: state.filterTickets === f ? "all" : f,
                      }));
                    }}
                    title={"Eventi"}
                    icon={"ticket-alt sub"}
                  />
                  <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => {
                      const f = "Shop";
                      this.setState((state) => ({
                        filterTickets: state.filterTickets === f ? "all" : f,
                      }));
                    }}
                    title={"Shop"}
                    icon={"shopping-bag sub"}
                  />
                  {/* <FilterVisureComponent
                    filterVisure={filterTickets}
                    handleClick={() => this.setState({ filterTickets: "all" })}
                    title={"all"}
                    icon={"shopping-cart"}
                    type={"Prenotazioni"}
                  /> */}
                </React.Fragment>
              )}
            </div>
            {statusRows === "active" ? (
              <div className="ticketDetails--filters__byTicket">
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() => this.setState({ filterType: "all" })}
                  title="all"
                />
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() =>
                    this.setState({ filterType: "Completato" })
                  }
                  title="Completato"
                />
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() =>
                    this.setState({ filterType: "Cancellato" })
                  }
                  title="Cancellato"
                />
              </div>
            ) : (
              <div className="ticketDetails--filters__byTicket">
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() => this.setState({ filterType: "all" })}
                  title="all"
                />{" "}
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() =>
                    this.setState({
                      filterType:
                        accountInfo?.profile?.role?.name === "support"
                          ? "Nuova Richiesta"
                          : "Nuova Offerta",
                    })
                  }
                  title={
                    accountInfo?.profile?.role?.name === "support"
                      ? "Nuove Richieste"
                      : "Nuove Offerte"
                  }
                />
                {accountInfo?.profile?.role?.name === "support" && (
                  <FilterTypeComponent
                    filterType={filterType}
                    handleClick={() =>
                      this.setState({ filterType: "Eseguibile" })
                    }
                    title="Eseguibile"
                  />
                )}
                <FilterTypeComponent
                  filterType={filterType}
                  handleClick={() => this.setState({ filterType: "In Attesa" })}
                  title="In Attesa"
                />
              </div>
            )}
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
          {(formDetailsActives.tickets || []).map((ticket) => {
            return Filter(
              ticket,
              "visura",
              MainFilter,
              filterVisure,
              statusRows,
              "active",
              filterSkin,
              filterAgenzie,
              filterRicercaId,
              ticket.nome_agenzia,
              ticket.status,
              filterType
            ) ? (
              <DetailRowVisure
                key={ticket.id}
                Visure={ticket}
                allRoles={allRoles}
              />
            ) : Filter(
                ticket,
                "Prenotazioni",
                MainFilter,
                filterTickets,
                statusRows,
                "active",
                filterSkin,
                filterAgenzie,
                filterRicercaId,
                ticket.nome_agenzia,
                ticket.status,
                filterType
              ) ? (
              <DetailRow
                mobilePopUp={this.mobilePopUp}
                allRoles={allRoles}
                getTicketByTicketId={this.props.getTicketByTicketId}
                isNew={true}
                ticket={ticket}
                key={ticket && ticket.id}
              />
            ) : null;
          })}
          {tickets &&
            (tickets || []).map((ticket) => {
              return Filter(
                ticket,
                "visura",
                MainFilter,
                filterVisure,
                statusRows,
                "all",
                filterSkin,
                filterAgenzie,
                filterRicercaId,
                ticket.nome_agenzia,
                ticket.status,
                filterType
              ) ? (
                <DetailRowVisure
                  key={ticket.id}
                  Visure={ticket}
                  allRoles={allRoles}
                />
              ) : Filter(
                  ticket,
                  "Prenotazioni",
                  MainFilter,
                  filterTickets,
                  statusRows,
                  "all",
                  filterSkin,
                  filterAgenzie,
                  filterRicercaId,
                  ticket.nome_agenzia,
                  ticket.status,
                  filterType
                ) ? (
                <DetailRow
                  mobilePopUp={this.mobilePopUp}
                  allRoles={allRoles}
                  getTicketByTicketId={this.props.getTicketByTicketId}
                  isNew={true}
                  ticket={ticket}
                  key={ticket && ticket.id}
                />
              ) : null;
            })}

          {my_tickets &&
            (my_tickets || []).map((ticket) => {
              return Filter(
                ticket,
                "visura",
                MainFilter,
                filterVisure,
                statusRows,
                "all",
                filterSkin,
                filterAgenzie,
                filterRicercaId,
                ticket.nome_agenzia,
                ticket.status,
                filterType
              ) ? (
                <DetailRowVisure
                  key={ticket.id}
                  Visure={ticket}
                  allRoles={allRoles}
                />
              ) : Filter(
                  ticket,
                  "Prenotazioni",
                  MainFilter,
                  filterTickets,
                  statusRows,
                  "all",
                  filterSkin,
                  filterAgenzie,
                  filterRicercaId,
                  ticket.nome_agenzia,
                  ticket.status,
                  filterType
                ) ? (
                <DetailRow
                  mobilePopUp={this.mobilePopUp}
                  allRoles={allRoles}
                  getTicketByTicketId={this.props.getTicketByTicketId}
                  isNew={true}
                  ticket={ticket}
                  key={ticket && ticket.id}
                />
              ) : null;
            })}
        </div>
        <div
          className="paginationWrapper"
          style={{ bottom: 0, top: "auto", background: "#fff" }}
        >
          <Pagination
            onChange={(e) => {
              this.setState({ page_number: parseInt(e) }, () => {
                if (statusRows === "active") {
                  this.props.getDataFormDetailsActives(null, perPage, e);
                } else {
                  this.props.getDataFormDetails(perPage, e);
                }
              });
            }}
            total={
              statusRows === "active"
                ? formDetailsActives?.total_pages * 10 || 10
                : total_pages * 10 || 10
            }
          />
          <Select
            defaultValue={25}
            onChange={(e) => {
              this.setState({ perPage: parseInt(e) }, () => {
                if (statusRows === "active") {
                  this.props.getDataFormDetailsActives(null, e, page_number);
                } else {
                  this.props.getDataFormDetails(e, page_number);
                }
              });
            }}
            value={perPage}
          >
            <Option value={10}>10 / Pagina</Option>
            <Option value={25}>25 / Pagina</Option>
            <Option value={50}>50 / Pagina</Option>
          </Select>
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
    accountInfo: state.auth.accountInfo,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);

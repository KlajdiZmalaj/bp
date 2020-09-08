import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import DetailRowVisure from "./DetailRow";
import { Switch, Tooltip } from "antd";
import "./styles.css";
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

export const FilterVisureComponent = ({
  filterVisure,
  title,
  handleClick,
  icon,
}) => (
  <Tooltip title={`Filtra per ${title === "all" ? "tutti" : title}`}>
    <i
      onClick={handleClick}
      className={`fa fa-${icon}` + (filterVisure === title ? " active" : "")}
      aria-hidden="true"
    ></i>
  </Tooltip>
);
class FormDetailsDomain extends Component {
  state = {
    filterVisure: "all",
    filterType: "all",
    filterSkin: "",
    filterAgenzie: "",
    filterRicercaId: "",
    statusRows: "all",
  };
  componentDidMount() {
    this.props.getVisure();
  }
  render() {
    const {
      filterVisure,
      filterType,
      filterSkin,
      filterAgenzie,
      filterRicercaId,
      statusRows,
    } = this.state;
    const { Visure, formDetailsActives } = this.props;
    // console.log("formDetailsActives", formDetailsActives);
    const { my_visure, visure } = Visure;
    return (
      <div className="ticketDetails">
        <div className="ticketDetails--filters">
          <div className="ticketDetails--filters__byTicket">
            <div>
              <div>
                <Switch
                  onChange={(on) => {
                    if (on) {
                      this.props.getDataFormDetailsActives(true);
                      this.setState({ statusRows: "active" });
                    } else {
                      this.props.getVisure();
                      this.setState({ statusRows: "all" });
                    }
                  }}
                  checkedChildren={"Finita"}
                  unCheckedChildren={"Incompiuta"}
                />
                <input
                  placeholder="Skin"
                  onChange={(e) =>
                    this.setState({ filterSkin: e.target.value })
                  }
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
              </div>
            </div>
            <FilterVisureComponent
              filterVisure={filterVisure}
              handleClick={() =>
                this.setState({ filterVisure: "Persona Fisica" })
              }
              title={"Persona Fisica"}
              icon={"user"}
            />
            <FilterVisureComponent
              filterVisure={filterVisure}
              handleClick={() =>
                this.setState({ filterVisure: "Azienda o Impresa" })
              }
              title={"Azienda o Impresa"}
              icon={"building"}
            />
            <FilterVisureComponent
              filterVisure={filterVisure}
              handleClick={() => this.setState({ filterVisure: "all" })}
              title={"all"}
              icon={"shopping-cart"}
            />
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
        <div className="ticketDetails--header Visura">
          <span>Stato</span>
          <span>soggetto</span>
          <span>BPoint</span>
          <span>utente</span>
          <span>NR.PRENOTAZIONE</span>
          <span>Data</span>
          <span>Visura</span>
        </div>
        {(formDetailsActives.rowsVisure || []).map((visure) => {
          // console.log("ticket", ticket);
          return (
            (filterVisure === "all" || filterVisure === visure.type) &&
            statusRows === "active" &&
            (filterType === "all" || filterType === visure.status) &&
            (filterSkin === "" ||
              visure.skin.toLowerCase().includes(filterSkin.toLowerCase())) &&
            (filterAgenzie === "" ||
              visure.user
                .toLowerCase()
                .includes(filterAgenzie.toLowerCase())) &&
            (filterRicercaId === "" ||
              `BP-${visure.id}`
                .toString()
                .toLowerCase()
                .includes(filterRicercaId.toString().toLowerCase())) && (
              <DetailRowVisure
                key={visure.id}
                Visure={visure}
                allRoles={allRoles}
              />
            )
          );
        })}
        {(my_visure || []).map(
          (visure) =>
            // console.log("ticket", ticket);
            (filterVisure === "all" || filterVisure === visure.type) &&
            statusRows === "all" &&
            (filterType === "all" || filterType === visure.status) &&
            (filterSkin === "" ||
              visure.skin.toLowerCase().includes(filterSkin.toLowerCase())) &&
            (filterAgenzie === "" ||
              visure.user
                .toLowerCase()
                .includes(filterAgenzie.toLowerCase())) &&
            (filterRicercaId === "" ||
              `BP-${visure.id}`
                .toString()
                .toLowerCase()
                .includes(filterRicercaId.toString().toLowerCase())) && (
              <DetailRowVisure
                key={visure.id}
                Visure={visure}
                allRoles={allRoles}
              />
            )
        )}
        {(visure || []).map(
          (vis) =>
            (filterVisure === "all" || filterVisure === vis.type) &&
            statusRows === "all" &&
            (filterType === "all" || filterType === vis.status) &&
            (filterSkin === "" ||
              vis.skin.toLowerCase().includes(filterSkin.toLowerCase())) &&
            (filterAgenzie === "" ||
              vis.user.toLowerCase().includes(filterAgenzie.toLowerCase())) &&
            (filterRicercaId === "" ||
              `BP-${vis.id}`
                .toString()
                .toLowerCase()
                .includes(filterRicercaId.toString().toLowerCase())) && (
              <DetailRowVisure key={vis.id} Visure={vis} allRoles={allRoles} />
            )
        )}
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    Visure: state.auth.Visure,
    formDetailsActives: state.auth.formDetailsActives,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);

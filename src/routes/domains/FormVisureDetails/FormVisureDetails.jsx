import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import DetailRow from "./DetailRow";
import "./styles.css";
class FormDetailsDomain extends Component {
  state = {
    filterVisure: "all",
  };
  componentDidMount() {
    this.props.getVisure();
  }
  render() {
    const allRoles = {
      user: "fal fa-user ",
      agency: "fal fa-store",
      agent: "fas fa-user-tie",
      super_admin: "fal fa-store",
    };
    const { filterVisure } = this.state;
    const { Visure } = this.props;
    const { my_visure, visure } = Visure;
    return (
      <div className="ticketDetails">
        <div className="ticketDetails--filters">
          <div className="ticketDetails--filters__byTicket">
            <i
              onClick={() => this.setState({ filterVisure: "Persona Fisica" })}
              className={
                "fa fa-user" +
                (filterVisure === "Persona Fisica" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
            <i
              onClick={() =>
                this.setState({ filterVisure: "Azienda o Impresa" })
              }
              className={
                "fa fa-building" +
                (filterVisure === "Azienda o Impresa" ? " active" : "")
              }
              aria-hidden="true"
            ></i>

            <i
              onClick={() => this.setState({ filterVisure: "all" })}
              className={
                "far fa-shopping-cart" +
                (filterVisure === "all" ? " active" : "")
              }
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <div className="ticketDetails--header --Visura">
          <span>Stato</span>
          <span>soggetto</span>
          <span>utente</span>
          <span>NR.PRENOTAZIONE</span>
          <span>Data</span>
          <span>Visura</span>
        </div>
        {(my_visure || []).map(
          (visure) =>
            // console.log("ticket", ticket);
            (filterVisure === "all" || filterVisure === visure.type) && (
              <DetailRow key={visure.id} Visure={visure} allRoles={allRoles} />
            )
        )}
        {(visure || []).map(
          (vis) =>
            (filterVisure === "all" || filterVisure === vis.type) && (
              <DetailRow key={vis.id * 2} Visure={vis} allRoles={allRoles} />
            )
        )}
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    Visure: state.auth.Visure,
  };
};
export default connect(mstp, AuthActions)(FormDetailsDomain);

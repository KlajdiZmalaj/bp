import React, { Component } from "react";
import { AuthActions } from "redux-store/models";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import AziendaOImpresoForm from "./AziendaOImpresa";
import PersonaFisicaForm from "./PersonaFisica";

export class DetailRow extends Component {
  state = {
    hasDetails: false,
  };
  render() {
    const { Visure, allRoles, VisureById } = this.props;

    return (
      Visure && (
        <React.Fragment>
          <div className="ticketDetails--row animated fadeIn --Visura">
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
                      : Visure.type === "Azienda o Impresa"
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
            <span>{Visure.skin}</span>
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
              <div
                className="toggler"
                onClick={() => {
                  if (VisureById && VisureById.id === Visure.id) {
                    this.props.setVisureByVisureId(null);
                  } else {
                    this.props.getVisureByVisureId(Visure.id);
                  }
                }}
              >
                <i
                  className={`fal fa-chevron-${
                    VisureById && VisureById.id === Visure.id ? "up" : "down"
                  }`}
                  aria-hidden="true"
                ></i>
                {VisureById && VisureById.id === Visure.id ? "Close" : "View"}
              </div>
            </span>
          </div>
          {VisureById && VisureById.id === Visure.id && (
            <div className="ticketDetails--infos animated fadeIn">
              <div className="ticketDetails--infos__header">
                {/* <img
                  src={images[`${ticket.nome_agenzia.toLowerCase()}-logo`]}
                  alt=""
                /> */}
                <div>
                  <span>ID : BP-{Visure.id}</span>
                  <span>
                    PRESA A CARICO{" "}
                    <i className="fal fa-check-circle" aria-hidden="true"></i>{" "}
                  </span>
                </div>
              </div>
              <div className="ticketDetails--infos__body">
                {VisureById && VisureById.type === 2 && (
                  <AziendaOImpresoForm
                    type={VisureById.type}
                    VisureById={VisureById}
                  />
                )}
                {VisureById && VisureById.type === 1 && (
                  <PersonaFisicaForm
                    type={VisureById.type}
                    VisureById={VisureById}
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
    VisureById: state.auth.VisureByVisureId,
  };
};
export default connect(mstp, AuthActions)(DetailRow);

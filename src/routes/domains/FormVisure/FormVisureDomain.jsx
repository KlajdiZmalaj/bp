import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import AziendaOImpresaForm from "./AziendaOImpresaForm";
import PersonaFisicaForm from "./PersonaFisicaForm";
import { servicesVisure } from "config";

const Item = ({ service, activeService, setActiveService }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={"visures--services__item" + (isOpen ? " active" : "")}>
      <div
        onClick={() => {
          setOpen(!isOpen);
        }}
        className="header"
      >
        <span>{service}</span>{" "}
        {isOpen ? (
          <i className="fas fa-minus-circle" aria-hidden="true"></i>
        ) : (
          <i className="fal fa-plus-circle" aria-hidden="true"></i>
        )}
      </div>
      {isOpen && (
        <ul className="animated fadeIn">
          {servicesVisure[service].services.map((item) => {
            return (
              <li
                className={activeService.name === item.name ? "active" : ""}
                onClick={() => {
                  setActiveService(item);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
class FormVisureDomain extends Component {
  state = {
    activeVisure: 1,
    activeService: "",
  };
  setActiveService = (activeService) => {
    this.setState({ activeService });
  };
  render() {
    const { activeVisure, activeService } = this.state;
    return (
      <div className="formsContainer">
        <h1>Visure e altro</h1>
        <div className="visures">
          <div className="visures--services">
            <div className="visureHeader">
              <span>Servizi</span>
            </div>
            <div className="itemWrapper">
              {Object.keys(servicesVisure).map((service) => {
                return (
                  <Item
                    setActiveService={this.setActiveService}
                    activeService={this.state.activeService}
                    service={service}
                  />
                );
              })}
            </div>
          </div>
          <div className="visures--form">
            <div className="visureHeader">
              <div>visura su:</div>
              <div
                onClick={() => this.setState({ activeVisure: 1 })}
                className={activeVisure === 1 ? "active" : ""}
              >
                {activeVisure === 1 ? (
                  <i className="fal fa-check-circle" aria-hidden="true"></i>
                ) : (
                  <i className="fal fa-circle" aria-hidden="true"></i>
                )}
                Persona Fisica
              </div>
              <div
                onClick={() => this.setState({ activeVisure: 2 })}
                className={activeVisure === 2 ? "active" : ""}
              >
                {activeVisure === 2 ? (
                  <i className="fal fa-check-circle" aria-hidden="true"></i>
                ) : (
                  <i className="fal fa-circle" aria-hidden="true"></i>
                )}
                Azienda o impresa
              </div>
            </div>
            {activeVisure === 1 && (
              <PersonaFisicaForm activeService={activeService} />
            )}
            {activeVisure === 2 && (
              <AziendaOImpresaForm activeService={activeService} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, AuthActions)(FormVisureDomain);

import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import AziendaOImpresaForm from "./AziendaOImpresaForm";
import PersonaFisicaForm from "./PersonaFisicaForm";
class FormVisureDomain extends Component {
  state = {
    change_form: 0,
  };
  resetState = () => {
    this.setState({ change_form: 0 });
  };
  render() {
    const { change_form } = this.state;
    return (
      <div>
        {change_form == 0 ? (
          <div className="formsContainer">
            <h1>Visure</h1>
            <div className="formsContainer--cards">
              <div
                className="formsContainer--cards__item animated fadeIn"
                onClick={() => {
                  this.setState({
                    change_form: 1,
                  });
                }}
              >
                <div className="titleCard">
                  PERSONA FISICA
                  <i className="fas fa-receipt" />
                </div>
                <img className="bgImg" />
                <div className="imageCard">
                  <img className="logoImg" />
                </div>
              </div>
              <div
                className="formsContainer--cards__item animated fadeIn"
                onClick={() => {
                  this.setState({
                    change_form: 2,
                  });
                }}
              >
                <div className="titleCard">
                  AZIENDA O IMPRESA
                  <i className="fas fa-receipt" />
                </div>
                <img className="bgImg" />
                <div className="imageCard">
                  <img className="logoImg" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>
          {" "}
          {change_form == 2 ? (
            <AziendaOImpresaForm type={change_form} goBack={this.resetState} />
          ) : change_form == 1 ? (
            <PersonaFisicaForm type={change_form} goBack={this.resetState} />
          ) : null}
        </div>
      </div>
    );
  }
}
const mstp = (state) => {
  return {};
};
export default connect(mstp, AuthActions)(FormVisureDomain);

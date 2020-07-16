import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "redux-store/models";
import AziendaOImpresaForm from "./AziendaOImpresaForm";
import PersonaFisicaForm from "./PersonaFisicaForm";
class FormVisureDomain extends Component {
  state = {
    persona_fisica: 1,
  };
  render() {
    const { persona_fisica } = this.state;
    return (
      <div>
        <div className="InputContainerChose">
          <div className="VisuraSu">Visura su:</div>
          <div>
            <div className="RadoChose">
              {" "}
              <input
                checked={persona_fisica == 1}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ persona_fisica: e.target.value });
                  }
                }}
                type="radio"
                name="PersonaFisica"
                value={1}
              />
              <span className="inputLabel radiolabel">PERSONA FISICA</span>
            </div>
            <div className="RadoChose">
              {" "}
              <input
                checked={persona_fisica == 2}
                onChange={(e) => {
                  if (e.target.checked) {
                    this.setState({ persona_fisica: e.target.value });
                  }
                }}
                type="radio"
                name="PersonaFisica"
                value={2}
              />
              <span className="inputLabel radiolabel">AZIENDA O IMPRESA</span>
            </div>
          </div>
        </div>

        {persona_fisica == 2 ? <AziendaOImpresaForm /> : <PersonaFisicaForm />}
      </div>
    );
  }
}
const mstp = (state) => {
  return {};
};
export default connect(mstp, AuthActions)(FormVisureDomain);

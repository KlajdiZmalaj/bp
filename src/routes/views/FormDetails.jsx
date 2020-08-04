import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormDetailsDomain from "../domains/FormDetails/FormDetailsDomain";
export class FormDetails extends Component {
  render() {
    return this.props.forAdmin === true ? (
      <FormDetailsDomain />
    ) : (
      <div className="formsDetails">
        <Header></Header>
        <div className="overview">
          <div className="azioni max-width">
            <Azioni active="dettagli-prenotazioni"></Azioni>
          </div>
        </div>
        <FormDetailsDomain />
      </div>
    );
  }
}

export default FormDetails;

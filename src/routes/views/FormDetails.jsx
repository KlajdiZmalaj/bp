import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormDetailsDomain from "../domains/FormDetails/FormDetailsDomain";
import FormVisureDetails from "../domains/FormVisureDetails/FormVisureDetails";

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
        <FormVisureDetails />
      </div>
    );
  }
}

export default FormDetails;

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

        <Azioni activeMain="support" active="dettagli-prenotazioni"></Azioni>
        <FormDetailsDomain />
      </div>
    );
  }
}

export default FormDetails;

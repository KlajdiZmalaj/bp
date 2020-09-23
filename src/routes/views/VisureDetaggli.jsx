import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormVisureDetails from "../domains/FormVisureDetails/FormVisureDetails";
export class VisureDetaggli extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="formsDetails">
        <Header></Header>
        <Azioni active="dettagli-visure"></Azioni>
        <FormVisureDetails />
      </div>
    );
  }
}

export default VisureDetaggli;

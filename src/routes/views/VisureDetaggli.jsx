import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormVisureDetails from "../domains/FormVisureDetails/FormVisureDetails";
export class VisureDetaggli extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="formsDetails">
        <Header></Header>
        <div className="overview">
          <div className="azioni max-width">
            <Azioni active="formsDetails"></Azioni>
          </div>
        </div>
        <FormVisureDetails />
      </div>
    );
  }
}

export default VisureDetaggli;

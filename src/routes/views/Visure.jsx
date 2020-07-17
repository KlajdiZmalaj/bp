import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormVisureDomain from "../domains/FormVisure/FormVisureDomain";
export class Visure extends Component {
  render() {
    return (
      <div className="Visure">
        <Header></Header>
        <div className="overview">
          <div className="azioni max-width">
            <Azioni active="Visure"></Azioni>
          </div>
        </div>
        <FormVisureDomain />
      </div>
    );
  }
}

export default Visure;

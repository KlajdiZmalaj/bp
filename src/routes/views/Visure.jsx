import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormVisureDomain from "../domains/FormVisure/FormVisureDomain";
export class Visure extends Component {
  render() {
    return (
      <div className="Visure">
        <Header></Header>
        <Azioni activeMain="dashboard" active="visure"></Azioni>
        <FormVisureDomain />
      </div>
    );
  }
}

export default Visure;

import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import SupportBody from "../domains/SupportBody/SupportBody";
export class Support extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Azioni activeMain="support" active="support"></Azioni>
        <SupportBody />
      </div>
    );
  }
}

export default Support;

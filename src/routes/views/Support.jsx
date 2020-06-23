import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import SupportBody from "../domains/SupportBody/SupportBody";
export class Support extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="azcont">
          <Azioni active="support" />
        </div>
        <SupportBody />
      </div>
    );
  }
}

export default Support;

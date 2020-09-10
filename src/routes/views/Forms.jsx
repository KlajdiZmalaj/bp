import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormsBody from "../domains/Forms/FormsBody";
// import { UserInfoBar } from "shared-componentsMobile";
export class Forms extends Component {
  render() {
    return (
      <div className="forms">
        <Header></Header>
        <div className="overview">
          <div className="azioni max-width">
            <Azioni active="forms"></Azioni>
          </div>
        </div>
        {/* <UserInfoBar /> */}
        <FormsBody />
      </div>
    );
  }
}

export default Forms;

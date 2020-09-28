import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import FormsBody from "../domains/Forms/FormsBody";
// import { UserInfoBar } from "shared-componentsMobile";
export class Forms extends Component {
  render() {
    return (
      <div className="forms">
        <Header></Header>
        <Azioni activeMain="dashboard" active="forms"></Azioni>
        {/* <UserInfoBar /> */}
        <FormsBody />
      </div>
    );
  }
}

export default Forms;

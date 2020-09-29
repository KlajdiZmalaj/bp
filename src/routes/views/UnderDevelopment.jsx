import React from "react";
import { Header } from "shared-components";
import Azioni from "shared-components/Azioni/Azioni";
class UnderDevelopment extends React.Component {
  render() {
    return (
      <div className="Container">
        <Header></Header>
        <Azioni match={this.props.match} submenu={"noSubmenu"}></Azioni>
        <div>Under Development</div>
      </div>
    );
  }
}

export default UnderDevelopment;

import React, { Component } from "react";
import { Azioni, Header } from "shared-components";
import WalletBody from "../domains/Wallet";
class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div className="azcont">
          <Azioni active="wallet" />
        </div>
        <WalletBody />
      </div>
    );
  }
}

export default Wallet;

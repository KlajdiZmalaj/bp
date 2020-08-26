import React, { Fragment } from "react";
import { Header, Azioni } from "shared-components";
import FaturaDomain from "../domains/FaturaDomain/FaturaDomain";

const Fatura = () => (
  <Fragment>
    <Header />
    <div className="azcont">
      <Azioni active="fatura" />
    </div>
    <FaturaDomain />
  </Fragment>
);
export default Fatura;

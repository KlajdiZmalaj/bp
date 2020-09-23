import React, { Fragment } from "react";
import { Header, Azioni } from "shared-components";
import FaturaDomain from "../domains/FaturaDomain/FaturaDomain";

const Fatura = () => (
  <Fragment>
    <Header />
    <Azioni activeMain="contabilita" active="fatture" />
    <FaturaDomain />
  </Fragment>
);
export default Fatura;

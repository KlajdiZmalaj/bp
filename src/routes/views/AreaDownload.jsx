import React, { Fragment } from "react";
import { Header, Azioni } from "shared-components";
import AreaDownload from "../domains/AreaDownload/AreaDownload";
const AreaDownloadView = () => (
  <Fragment>
    <Header />
    <Azioni activeMain="areaDownload" submenu="noSubmenu"></Azioni>
    <AreaDownload />
  </Fragment>
);

export default AreaDownloadView;

import React from "react";
import { Header, Footer } from "shared-componentsMobile";
import Configura from "routes/views/Configura";
export default () => {
  return (
    <div className="dashboardMobile">
      <Header />
      <Configura isMobile={true} />
      <Footer />
    </div>
  );
};

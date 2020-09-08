import React from "react";
import { Header, Footer } from "shared-componentsMobile";
import DashboardBody from "../domains/Dashboard";
export default () => {
  return (
    <div className="dashboardMobile">
      <Header />
      <DashboardBody />
      <Footer />
    </div>
  );
};

import React from "react";
import { Header } from "shared-components";
import Azioni from "shared-components/Azioni/Azioni";
import DashboardDom from "routes/domains/Dashboard/Dashboard";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Azioni
          activeMain="dashboard"
          active="ricariche"
          match={this.props.match}
        ></Azioni>
        <DashboardDom match={this.props.match} />
      </div>
    );
  }
}

export default Dashboard;

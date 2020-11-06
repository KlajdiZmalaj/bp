import React from "react";
import { Header } from "shared-components";
import Azioni from "shared-components/Azioni/Azioni";
import DashboardDom from "routes/domains/Dashboard/Dashboard";
import StaticDefaultHomePage from "routes/domains/StaticDefaultHomePage/StaticDefaultHomePage";
import { connect } from "react-redux";
class Dashboard extends React.Component {
  render() {
    const { accountInfo } = this.props;
    const isLogged = accountInfo?.token;
    return (
      <div className="animated fadeIn">
        <Header></Header>
        {isLogged && (
          <Azioni
            activeMain="dashboard"
            active="ricariche"
            match={this.props.match}
          ></Azioni>
        )}
        {isLogged ? (
          <DashboardDom match={this.props.match} />
        ) : (
          <StaticDefaultHomePage />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
});
export default connect(mapStateToProps)(Dashboard);

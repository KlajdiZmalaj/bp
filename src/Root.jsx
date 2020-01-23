import React from "react";
import { connect } from "react-redux";

import { AuthActions, MainActions } from "redux-store/models";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  Annunci,
  Dashboard,
  CaricaConto,
  Configura,
  UseCode,
  Transazioni,
  AdminAccount,
  AnnunciAdmin,
  Operazioni,
  Impostazioni,
  Messages,
  AccountInfo
} from "./routes";

class Root extends React.Component {
  componentDidMount() {
    this.getStoredData();
  }

  getStoredData = () => {
    const accountData = localStorage.getItem("accountData");
    const data = JSON.parse(accountData);
    if (data) {
      this.props.setAccountInfo(data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/annunci" />} />
            <Route exact path="/account-info" component={AccountInfo} />
            <Route exact path="/annunci" component={Annunci} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/carica-conto" component={CaricaConto} />
            <Route exact path="/configura" component={Configura} />
            <Route exact path="/use-code" component={UseCode} />
            <Route exact path="/transazioni" component={Transazioni} />

            <Route exact path="/admin-account" component={AdminAccount} />
            <Route exact path="/annunci-admin" component={AnnunciAdmin} />
            <Route exact path="/operazioni" component={Operazioni} />
            <Route exact path="/impostazioni" component={Impostazioni} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = state => ({
  accountInfo: state.auth.accountInfo
});

export default connect(mapsStateToProps, {
  ...AuthActions,
  ...MainActions
})(Root);

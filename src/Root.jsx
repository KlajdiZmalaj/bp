import React from "react";
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
  Impostazioni
} from "./routes";

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/annunci" />} />
            <Route exact path="/annunci" component={Annunci} />
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

export default Root;

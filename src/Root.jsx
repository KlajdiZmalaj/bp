import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  Annunci,
  Dashboard,
  CaricaConto,
  Configura,
  UseCode,
  Transazioni
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
            <Route exact path="/useCode" component={UseCode} />
            <Route exact path="/transazioni" component={Transazioni} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default Root;

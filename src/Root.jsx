import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home, Dashboard } from "./routes";

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default Root;

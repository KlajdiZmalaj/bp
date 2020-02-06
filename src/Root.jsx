import React from "react";
import { connect } from "react-redux";

import { AuthActions, MainActions } from "redux-store/models";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

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
  AccountInfo,
  Register,
  RegisterEndUser,
  Login
} from "./routes";

class Root extends React.Component {
  componentDidMount() {
    this.getStoredData();
  }

  getStoredData = () => {
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);
    if (data) {
      this.props.setAccountInfo(data);
    }
  };

  render() {
    let isLoggedin = false;
    const accountData = localStorage.getItem("accountDataB");
    const data = !this.props.unauthorized && JSON.parse(accountData);
    if (data) {
      isLoggedin = true;
    }
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/annunci" />} />
            {/* <Route exact path="/login" component={Login} /> */}
            {/* <Route exact path="/account-info" component={AccountInfo} /> */}
            {/* <Route exact path="/annunci" component={Annunci} /> */}
            {/* <Route exact path="/messages" component={Messages} /> */}
            {/* <Route exact path="/dashboard" component={Dashboard} /> */}
            {/* <Route exact path="/carica-conto" component={CaricaConto} /> */}
            {/* <Route exact path="/configura" component={Configura} /> */}
            {/* <Route exact path="/use-code" component={UseCode} /> */}
            {/* <Route exact path="/transazioni" component={Transazioni} /> */}
            {/* 
            <Route exact path="/admin-account" component={AdminAccount} /> */}
            {/* <Route exact path="/annunci-admin" component={AnnunciAdmin} /> */}
            {/* <Route exact path="/operazioni" component={Operazioni} /> */}
            {/* <Route exact path="/impostazioni" component={Impostazioni} /> */}
            <Route exact path="/register" component={Register} />
            <PublicRoute
              path="/login"
              component={Login}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/account-info"
              component={AccountInfo}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/annunci"
              component={Annunci}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/use-code"
              component={UseCode}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/admin-account"
              component={AdminAccount}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/annunci-admin"
              component={AnnunciAdmin}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/transazioni"
              component={Transazioni}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/configura"
              component={Configura}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/messages"
              component={Messages}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/carica-conto"
              component={CaricaConto}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/operazioni"
              component={Operazioni}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/impostazioni"
              component={Impostazioni}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/registerUser"
              component={RegisterEndUser}
              isLoggedin={isLoggedin}
            />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = state => ({
  accountInfo: state.auth.accountInfo,
  unauthorized: state.auth.unauthorized
});

export default connect(mapsStateToProps, {
  ...AuthActions,
  ...MainActions
})(Root);

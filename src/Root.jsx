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
  Messages,
  AccountInfo,
  Register,
  RegisterEndUser,
  RegisterAgency,
  RegisterAgent,
  Login,
  Verify,
  Wallet,
} from "./routes";

class Root extends React.Component {
  componentDidMount() {
    this.getStoredData();
    window.addEventListener("resize", () => {
      this.props.setScreenW(window.innerWidth);
    });
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
    const data = JSON.parse(accountData);
    if (data) {
      isLoggedin = true;
    }
    console.log("screenWidth", this.props.screenWidth);
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/register" component={Register} />
            <PublicRoute
              path="/login"
              component={Login}
              isLoggedin={isLoggedin}
            />
            <PublicRoute
              path="/verify?token="
              component={Verify}
              isLoggedin={isLoggedin}
            />
            <PublicRoute
              path="/verify"
              component={Verify}
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
              path="/wallet"
              component={Wallet}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/transazioni"
              component={Transazioni}
              isLoggedin={isLoggedin}
            />
            <Route
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
              path="/registerUser"
              component={RegisterEndUser}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/registerAgency"
              component={RegisterAgency}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/registerAgent"
              component={RegisterAgent}
              isLoggedin={isLoggedin}
            />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
  unauthorizated: state.auth.unauthorizated,
  screenWidth: state.main.screenWidth,
});

export default connect(mapsStateToProps, {
  ...AuthActions,
  ...MainActions,
})(Root);

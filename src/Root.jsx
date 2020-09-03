import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { get } from "lodash";
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
import Support from "./routes/views/Support";
import Forms from "./routes/views/Forms";
import FormDetails from "./routes/views/FormDetails";
import Visure from "./routes/views/Visure";
import loginAdmin from "./routes/views/loginAdmin";
import adminPanel from "./routes/views/adminPanel";
import VisureDetaggli from "./routes/views/VisureDetaggli";
import AdminPanelListaMovimenti from "./routes/views/adminPanelListaMovimenti";
import AdminPanelListaUtenti from "./routes/views/adminPanelListaUtenti";
import AdminPanelPrenotazioni from "./routes/views/adminPanelPrenotazioni";
import AdminPanelServizi from "./routes/views/adminPanelServizi";
import Fatura from "./routes/views/Fatura";

import {
  subscribeSocketUser,
  socket,
  unSubscribeSocketUser,
  subscribeSocketSupport,
  unSubscribeSocketSupport,
} from "config/socket";
import {
  PopUpConfirmation,
  PopUpConfirmationVisure,
  Footer,
} from "shared-components";
import "moment/locale/it";
import moment from "moment";
moment.locale("it", {
  week: {
    dow: 1,
  },
});
class Root extends React.Component {
  state = { top: false };
  componentDidMount() {
    this.getStoredData();
    window.addEventListener("resize", () => {
      this.props.setScreenW(window.innerWidth);
    });
    this.props.getSkinExtras();
    window.addEventListener("scroll", () => {
      if (!this.state.top) {
        if (window.scrollY > 1000) {
          this.setState({ top: true });
        }
      } else {
        if (window.scrollY < 1000) {
          this.setState({ top: false });
        }
      }
    });
    socket(this.props);
    if (get(JSON.parse(localStorage.getItem("accountDataB")), "profile.id")) {
      subscribeSocketUser(
        get(JSON.parse(localStorage.getItem("accountDataB")), "profile.id"),
        this.props
      );
      if (
        get(
          JSON.parse(localStorage.getItem("accountDataB")),
          "profile.role.name"
        ) === "support"
      ) {
        subscribeSocketSupport(this.props);
      }
    }
  }
  componentWillUnmount() {
    unSubscribeSocketUser(
      get(JSON.parse(localStorage.getItem("accountDataB")), "profile.id")
    );
    unSubscribeSocketSupport();
  }
  getStoredData = () => {
    const accountData = localStorage.getItem("accountDataB");
    const data = JSON.parse(accountData);
    if (data) {
      this.props.setAccountInfo(data);
    }
  };

  render() {
    let isLoggedin = JSON.parse(localStorage.getItem("accountDataB"))
      ? true
      : false;
    const role = get(this.props.accountInfo, "profile.role.name");

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
              role={role}
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
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "main_admin"]}
            />
            <PrivateRoute
              path="/annunci"
              component={Annunci}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/use-code"
              component={UseCode}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/wallet"
              component={Wallet}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["agency"]}
            />
            <PrivateRoute
              path="/transazioni"
              component={Transazioni}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent"]}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent"]}
            />
            <PrivateRoute
              path="/configura"
              component={Configura}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent"]}
            />
            <PrivateRoute
              path="/messages"
              component={Messages}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/carica-conto"
              component={CaricaConto}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/registerUser"
              component={RegisterEndUser}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["agency"]}
            />
            <PrivateRoute
              path="/registerAgency"
              component={RegisterAgency}
              role={role}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "agent"]}
            />
            <PrivateRoute
              path="/registerAgent"
              component={RegisterAgent}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin"]}
              role={role}
            />
            <PrivateRoute
              path="/support"
              component={Support}
              isLoggedin={isLoggedin}
              allowedRoles={["support"]}
              role={role}
            />
            <PrivateRoute
              path="/forms"
              component={Forms}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency"]}
              role={role}
            />
            <PrivateRoute
              path="/dettagli-prenotazioni"
              component={FormDetails}
              isLoggedin={isLoggedin}
              allowedRoles={["support", "super_admin", "agency", "user"]}
              role={role}
            />
            <PrivateRoute
              path="/visure"
              component={Visure}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency"]}
              role={role}
            />
            <PrivateRoute
              path="/dettagli-visure"
              component={VisureDetaggli}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency", "support"]}
              role={role}
            />
            <PrivateRoute
              path="/fatture"
              component={Fatura}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin"]}
              role={role}
            />
            {/* <PrivateRoute
              path="/login-admin"
              component={loginAdmin}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency", "support"]}
              role={role}
            /> */}

            <PrivateRoute
              path="/back-office/utenti"
              component={AdminPanelListaUtenti}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
            />
            <PrivateRoute
              path="/back-office/movimenti"
              component={AdminPanelListaMovimenti}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
            />
            <PrivateRoute
              path="/back-office/prenotazioni"
              component={AdminPanelPrenotazioni}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
            />
            <PrivateRoute
              path="/back-office/servizzi"
              component={AdminPanelServizi}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
            />
          </Switch>
        </HashRouter>

        {this.state.top && (
          <div
            className="backTopTop animated slideInUp"
            style={{ animationDuration: "0.3s" }}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <i className="fal fa-chevron-up"></i>
          </div>
        )}
        <PopUpConfirmation
          role={role}
          TicketByTcketId={this.props.TicketByTcketId}
          getTicketByTicketId={this.props.getTicketByTicketId}
          popUpData={this.props.popUpData}
        />
        <PopUpConfirmationVisure
          role={role}
          VisureByVisureId={this.props.VisureByVisureId}
          getVisureByVisureId={this.props.getVisureByVisureId}
          popUpDataVisure={this.props.popUpDataVisure}
        />
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => ({
  accountInfo: state.auth.accountInfo,
  unauthorizated: state.auth.unauthorizated,
  screenWidth: state.main.screenWidth,
  privMsg: state.auth.privMsg,
  popUpData: state.auth.popUpData,
  popUpDataVisure: state.auth.popUpDataVisure,
  TicketByTcketId: state.auth.TicketByTcketId,
  VisureByVisureId: state.auth.VisureByVisureId,
});

export default connect(mapsStateToProps, {
  ...AuthActions,
  ...MainActions,
})(Root);

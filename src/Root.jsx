import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { get } from "lodash";
import * as DesktopView from "routes";
import * as MobileViews from "./routesMobile";

import {
  subscribeSocketUser,
  socket,
  unSubscribeSocketUser,
  subscribeSocketSupport,
  unSubscribeSocketSupport,
} from "config/socket";
import { PopUpConfirmation, PopUpConfirmationVisure } from "shared-components";
import "moment/locale/it";
import moment from "moment";

moment.updateLocale("it", {
  week: {
    dow: 1,
  },
});
class Root extends React.Component {
  state = { top: false };
  componentDidMount() {
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
    if (get(this.props.accountInfo, "profile.id")) {
      subscribeSocketUser(
        get(this.props.accountInfo, "profile.id"),
        this.props
      );
      if (get(this.props.accountInfo, "profile.role.name") === "support") {
        subscribeSocketSupport(this.props);
      }
    }
  }
  componentWillUnmount() {
    unSubscribeSocketUser(get(this.props.accountInfo, "profile.id"));
    unSubscribeSocketSupport();
  }
  render() {
    let isLoggedin = get(this.props.accountInfo, "profile") ? true : false;
    const role = get(this.props.accountInfo, "profile.role.name");
    const isMobile = this.props.screenWidth <= 1025;
    const profile = get(this.props.accountInfo, "profile");
    // console.log("test", process.env, process.env.TEST_T);
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                role === "support" || role === "main_admin" ? (
                  <Redirect to={`/back-office/utenti`} />
                ) : (
                  <Redirect to={`/dashboard/${!isMobile ? "ricariche" : ""}`} />
                )
              }
            />
            <PublicRoute
              path="/qR/:barcode?/"
              component={DesktopView.QRDesktop}
              isLoggedin={false}
              role={role}
            />
            {/* <Route path="/register/:id" component={Register} /> */}
            <PublicRoute
              path="/login"
              component={
                isMobile ? MobileViews.DashboardMobile : DesktopView.Login
              }
              isLoggedin={isLoggedin}
              role={role}
            />
            <PublicRoute
              path="/verify?token="
              component={DesktopView.Verify}
              isLoggedin={isLoggedin}
            />
            <PublicRoute
              path="/verify"
              component={DesktopView.Verify}
              isLoggedin={isLoggedin}
            />
            <PrivateRoute
              path="/account-info"
              component={DesktopView.AccountInfo}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "main_admin"]}
            />
            <PrivateRoute
              path="/annunci"
              component={DesktopView.Annunci}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            <PrivateRoute
              path="/use-code"
              component={DesktopView.UseCode}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/wallet"
              component={DesktopView.Wallet}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["agency"]}
            />
            <PrivateRoute
              path="/transazioni"
              component={DesktopView.Transazioni}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            <PrivateRoute
              path="/underDevelopment"
              component={DesktopView.UnderDevelopment}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            <PrivateRoute
              path="/areaDownload"
              component={DesktopView.AreaDownload}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            {/* // :id?/ , me ?/ qe te beje dhe /dashboard render */}
            <Route
              path={`/dashboard${!isMobile ? "/:id?/" : ""}`}
              // component={Dashboard}
              component={
                isMobile ? MobileViews.DashboardMobile : DesktopView.Dashboard
              }
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            <PrivateRoute
              path="/configura"
              component={
                isMobile ? MobileViews.ConfiguraMobile : DesktopView.Configura
              }
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "agent", "user"]}
            />
            <PrivateRoute
              path="/messages"
              component={DesktopView.Messages}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency"]}
            />
            <PrivateRoute
              path="/carica-conto"
              component={DesktopView.CaricaConto}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["super_admin", "agency", "user"]}
            />
            <PrivateRoute
              path="/registerUser"
              component={DesktopView.RegisterEndUser}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["agency"]}
            />
            <PrivateRoute
              path="/registerAgency"
              component={DesktopView.RegisterAgency}
              role={role}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "agent"]}
            />
            <PrivateRoute
              path="/registerAgent"
              component={DesktopView.RegisterAgent}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin"]}
              role={role}
            />
            <PrivateRoute
              path="/support"
              component={DesktopView.Support}
              isLoggedin={isLoggedin}
              allowedRoles={["support", "main_admin"]}
              role={role}
            />
            <Route
              path="/forms/:id?/"
              component={
                isMobile ? MobileViews.PrenotazioneMobile : DesktopView.Forms
              }
              isLoggedin={isLoggedin}
              allowedRoles={[
                "super_admin",
                "agency",
                "agent",
                "user",
                "noUser",
              ]}
              role={role}
            />
            <PrivateRoute
              path="/dettagli-prenotazioni"
              component={DesktopView.FormDetails}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "agency", "user"]}
              role={role}
            />
            <PrivateRoute
              path="/visure"
              component={DesktopView.Visure}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency"]}
              role={role}
            />
            <PrivateRoute
              path="/dettagli-visure"
              component={DesktopView.VisureDetaggli}
              isLoggedin={isLoggedin}
              allowedRoles={["super_admin", "user", "agency"]}
              role={role}
            />
            <PrivateRoute
              path="/fatture"
              component={DesktopView.Fatura}
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
              component={DesktopView.AdminPanelListaUtenti}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
              profile={profile}
            />
            <PrivateRoute
              path="/back-office/movimenti"
              component={DesktopView.AdminPanelListaMovimenti}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
              profile={profile}
            />
            <PrivateRoute
              path="/back-office/prenotazioni"
              component={DesktopView.AdminPanelPrenotazioni}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
              profile={profile}
            />
            <PrivateRoute
              path="/back-office/servizzi"
              component={DesktopView.AdminPanelServizi}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin", "support"]}
              role={role}
              profile={profile}
            />
            <PrivateRoute
              path="/back-office/support"
              component={DesktopView.AdminPanelErrorList}
              isLoggedin={isLoggedin}
              allowedRoles={["support", "main_admin"]}
              role={role}
              profile={profile}
            />
            <PrivateRoute
              path="/back-office/CreateSkin"
              component={DesktopView.CreateSkin}
              isLoggedin={isLoggedin}
              allowedRoles={["main_admin"]}
              role={role}
              profile={profile}
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

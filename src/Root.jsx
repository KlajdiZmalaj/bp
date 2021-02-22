import React from "react";
import { connect } from "react-redux";
import { AuthActions, MainActions } from "redux-store/models";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { get } from "lodash";
import * as DesktopView from "routes";
import * as MobileViews from "routesMobile";
import * as ShopView from "routesShop";
import AdminTopHeader from "shared-components/adminSharedComp/AdminTopHeader";
import {
  subscribeSocketUser,
  socket,
  unSubscribeSocketUser,
  subscribeSocketSupport,
  unSubscribeSocketSupport,
} from "config/socket";
import { isWinter } from "config";
import { PopUpConfirmation, PopUpConfirmationVisure } from "shared-components";
import "moment/locale/it";
import moment from "moment";
import { Snow } from "shared-components";
import { notification } from "antd";
import PrintTicket from "shared-components/ModulePopUp/PrintTicket";
// import { debounce } from "lodash";
// const handleOrientation = (event) => {
//   var absolute = event.absolute;
//   var alpha = event.alpha;
//   var beta = event.beta;
//   var gamma = event.gamma;
//   console.log("orient", absolute, alpha, beta, gamma);
// };
moment.updateLocale("it", {
  week: {
    dow: 1,
  },
});
class Root extends React.Component {
  state = { top: false, isAdminPanel: false };
  componentDidMount() {
    if (navigator?.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }

    if (window.location.hash.includes("back-office")) {
      this.setState({ isAdminPanel: true });
    } else {
      this.setState({ isAdminPanel: false });
    }
    window.addEventListener("hashchange", () => {
      if (window.location.hash.includes("back-office")) {
        this.setState({ isAdminPanel: true });
      } else {
        this.setState({ isAdminPanel: false });
      }
    });
    if (isWinter) document.body.classList.add("winterMode");
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
    if (this.props.accountInfo.token_id) {
      //api once
      this.props.getAds();
      if (!window.location.hash.includes("back-office")) {
        this.props.getStatisticheMain();
      }
    }

    // window.addEventListener(
    //   "deviceorientation",
    //   debounce((e) => {
    //     handleOrientation(e);
    //   }, 500),
    //   true
    // );
    if (navigator?.connection?.downlink < 0.5) {
      notification["warning"]({
        key: "slowNet",
        message: "Connessione internet lenta",
        placement: "topRight",
      });
    }
    var divInstall = document.getElementById("PWA");
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("👍", "beforeinstallprompt", event);
      window.deferredPrompt = event;

      divInstall.classList.toggle("hidden", false);
    });
    divInstall.addEventListener("click", () => {
      console.log("👍", "butInstall-clicked");
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        return;
      }
      promptEvent.prompt();
      promptEvent.userChoice.then((result) => {
        console.log("👍", "userChoice", result);
        if (result) {
          document.body.classList.add(`pwa-${result.platform}`);
        }
        window.deferredPrompt = null;
        divInstall.classList.toggle("hidden", true);
      });
    });
    window.addEventListener("appinstalled", (event) => {
      console.log("👍", "appinstalled", event);
      notification["success"]({
        message: "l'applicazione è stato installato",
        placement: "bottomLeft",
      });
    });
  }
  componentWillUnmount() {
    unSubscribeSocketUser(get(this.props.accountInfo, "profile.id"));
    unSubscribeSocketSupport();
  }
  componentDidUpdate(prevProps) {
    //login & logout
    //
    if (
      this.props.accountInfo.token_id &&
      this.props.accountInfo.token_id !== prevProps.accountInfo.token_id
    ) {
      this.props.getAds();
      if (!window.location.hash.includes("back-office")) {
        this.props.getStatisticheMain();
      }
    }
  }

  render() {
    let isLoggedin = get(this.props.accountInfo, "profile") ? true : false;
    const role = get(this.props.accountInfo, "profile.role.name");
    const isMobile = this.props.screenWidth <= 1025;
    const profile = get(this.props.accountInfo, "profile");
    // console.log("test", process.env, process.env.TEST_T);
    return (
      <React.Fragment>
        <Snow />
        {Object.keys(this.props.paymentsFromCode).length > 0 &&
          !window.location.href.includes("back-office") && (
            <PrintTicket arr={this.props.paymentsFromCode} />
          )}

        {(role === "support" || role === "main_admin") &&
          window.location.hash.includes("back-office") &&
          this.state.isAdminPanel && <AdminTopHeader />}
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                role === "support" || role === "main_admin" ? (
                  profile?.username === "support_prenotazioni" ? (
                    <Redirect to={`/back-office/prenotazioni`} />
                  ) : (
                    <Redirect to={`/back-office/utenti`} />
                  )
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
              path="/login/:link2?/:c1?/:c2?/"
              component={
                isMobile ? MobileViews.DashboardMobile : DesktopView.Login
              }
              isLoggedin={isLoggedin}
              role={role}
              profile={profile}
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
            <PublicRoute
              path={`/dashboard${!isMobile ? "/:id?/:c1?/:c2?" : ""}`}
              // component={Dashboard}
              component={
                isMobile ? MobileViews.DashboardMobile : DesktopView.Dashboard
              }
              isLoggedin={false}
              role={role}
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
              path="/ru"
              component={DesktopView.RegisterEndUser}
              isLoggedin={isLoggedin}
              role={role}
              allowedRoles={["agency"]}
            />
            <PublicRoute
              exact
              path="/rut/:token?/"
              component={DesktopView.RegisterEndUser}
              isLoggedin={isLoggedin}
              role={role}
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
            <PrivateRoute
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
              allowedRoles={["super_admin", "agency", "agent"]}
              role={role}
            />
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
              path="/back-office/ordine-shop"
              component={ShopView.OrdersShopAdmin}
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

          {/* routes for shop */}

          <PrivateRoute
            path="/products/:tag?/"
            component={!isMobile ? ShopView.Products : MobileViews.Shop}
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            path="/product-filtered/:cat?/:tag?/"
            component={
              !isMobile
                ? ShopView.ProdBycategory
                : MobileViews.ProductsByCategory
            }
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            path="/product/:id?/:supp?/"
            component={
              !isMobile ? ShopView.SingleProduct : MobileViews.SingleProduct
            }
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            exact
            path="/shop-cart"
            component={!isMobile ? ShopView.ShopCart : MobileViews.ShopCart}
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            exact
            path="/shop-fav"
            component={!isMobile ? ShopView.ShopFav : MobileViews.ShopFav}
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            exact
            path="/product-checkout/:id?/:supp?/"
            component={!isMobile ? ShopView.CheckOut : MobileViews.CheckOut}
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
          <PrivateRoute
            path="/orders-shop"
            component={ShopView.OrdersShop}
            isLoggedin={isLoggedin}
            role={role}
            allowedRoles={["super_admin", "agency", "agent", "user"]}
          />
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
  paymentsFromCode: state.auth.paymentsFromCode,
});

export default connect(mapsStateToProps, {
  ...AuthActions,
  ...MainActions,
})(Root);

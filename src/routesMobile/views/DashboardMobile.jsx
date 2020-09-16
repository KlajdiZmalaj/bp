import React, { useState } from "react";
import { Header, Footer } from "shared-componentsMobile";
import DashboardBody from "../domains/Dashboard";
import { subscribeSocketUser, subscribeSocketSupport } from "config/socket.js";
import { AuthActions, MainActions } from "redux-store/models";
import { connect } from "react-redux";
import images from "themes/images";
const Dashboard = (props) => {
  const [username, handleChangeUsername] = useState("");
  const [password, handleChangePassword] = useState("");

  const socketCall = (data) => {
    subscribeSocketUser(data.id, props);
    if (data.role.name === "support") {
      subscribeSocketSupport(props);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signInByEmail(username, password, socketCall);
  };

  return (
    <React.Fragment>
      <div className="dashboardMobile">
        <Header />
        <DashboardBody />
        <Footer />
      </div>
      {window.location.hash.includes("login") && (
        <>
          <div className="loginPopUp animated slideInUp">
            <div className="loginPopUp--header">Accedi</div>
            <div className="loginPopUp--subheader">con le tue credenziali</div>
            <form className="loginPopUp--forms" action="/">
              <div className="loginPopUp--forms__item">
                <div className="label">Username</div>
                <input
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleSubmit(e);
                    }
                  }}
                  autocomplete="on"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => {
                    handleChangeUsername(e.target.value);
                  }}
                  id="loginUserame"
                />
              </div>
              <div className="loginPopUp--forms__item">
                <div className="label">Password</div>
                <input
                  autocomplete="on"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      handleSubmit(e);
                    }
                  }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    handleChangePassword(e.target.value);
                  }}
                />
              </div>
              <div className="loginPopUp--forms__item">
                <button
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Accedi
                </button>
              </div>
              <div className="loginPopUp--forms__item">
                <div className="helper">
                  Non hai un account? <span>Chiedi informazioni</span>
                </div>
              </div>
            </form>
            <div className="loginPopUp--banner">
              <img src={images.mobileLoginGirl} alt="" />
            </div>
          </div>
          <div
            className="backDrop"
            onClick={() => {
              window.location.hash = "dashboard";
            }}
          ></div>
        </>
      )}
    </React.Fragment>
  );
};

export default connect(null, { ...AuthActions, ...MainActions })(Dashboard);

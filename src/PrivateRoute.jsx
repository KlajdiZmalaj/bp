import React from "react";
// import { azioni } from "config";
import { Redirect, Route } from "react-router-dom";
import { includes } from "lodash";
import AdminPanelPrenotazioni from "./routes/views/adminPanelPrenotazioni";

const PrivateRoute = ({
  component: Component,
  isLoggedin,
  role,
  allowedRoles,
  path,
  profile,
  ...rest
}) => {
  // console.log(
  //   "includes(allowedRoles, role)",
  //   isLoggedin,
  //   includes(allowedRoles, role),
  //   allowedRoles,
  //   role
  // );
  //profile.username === "support_prenotazioni"
  return (
    <Route
      path={`${path}`}
      {...rest}
      render={(props) =>
        isLoggedin && includes(allowedRoles, role) ? (
          profile.username === "support_prenotazioni" ? (
            <AdminPanelPrenotazioni {...props} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

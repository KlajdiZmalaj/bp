import React from "react";
// import { azioni } from "config";
import { Redirect, Route } from "react-router-dom";
import { includes } from "lodash";
import { AdminPanelPrenotazioni } from "routes";

const PrivateRoute = ({
  component: Component,
  isLoggedin,
  role,
  allowedRoles,
  path,
  profile,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      path={`${path}`}
      render={(props) =>
        isLoggedin && includes(allowedRoles, role) ? (
          profile?.username === "support_prenotazioni" ? (
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

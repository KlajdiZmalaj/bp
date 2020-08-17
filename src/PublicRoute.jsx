import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedin, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? (
          <Component {...props} />
        ) : role === "support" || role === "main_admin" ? (
          <Redirect
            to={{
              pathname: "/back-office/utenti",
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

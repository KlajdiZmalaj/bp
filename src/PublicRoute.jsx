import React from "react";

import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  isLoggedin,
  role,
  profile,
  ...rest
}) => {
  //console.log("role", role, isLoggedin);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin && role !== "main_admin" && role !== "support" ? (
          <Component {...props} />
        ) : role === "main_admin" ? (
          <Redirect
            to={{
              pathname: "/back-office/utenti",
              state: { from: props.location },
            }}
          />
        ) : role === "support" ? (
          <Redirect
            to={{
              pathname: `/back-office/${
                profile?.username === "support_prenotazioni"
                  ? "prenotazioni"
                  : "support"
              }`,
              state: { from: props.location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard/ricariche",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;

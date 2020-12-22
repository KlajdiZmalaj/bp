import React from "react";

import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  isLoggedin,
  role,
  profile,
  ...rest
}) => {
  //console.log("rest", rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? (
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

import React from "react";
// import { azioni } from "config";
import { Redirect, Route } from "react-router-dom";
import { includes } from "lodash";

const PrivateRoute = ({
  component: Component,
  isLoggedin,
  role,
  allowedRoles,
  ...rest
}) => {
  // console.log(
  //   "includes(allowedRoles, role)",
  //   isLoggedin,
  //   includes(allowedRoles, role),
  //   allowedRoles,
  //   role
  // );
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin && includes(allowedRoles, role) ? (
          <Component {...props} />
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

import React from "react";

import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isLoggedin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedin ? (
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

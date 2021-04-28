import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Home";
import Authentication from "./Authentication";
import { login } from "../store/authentication/authenticationSlice.js";

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isLoggedIn) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const PublicRoute = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default function Screens() {
  const dispatch = useDispatch();

  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(login(token));
      setTokenChecked(true);
    }
  }, []);

  if (!tokenChecked) {
    return null;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth">
          <Authentication />
        </PublicRoute>

        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

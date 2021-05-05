import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../store/authentication/authenticationSlice";
import Menu from "../components/Menu";
import history from "../utils/history";

import Home from "./Home";
import Authentication from "./Authentication";
import Account from "./Account";
import Setup from "./Setup";

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
      dispatch(setToken(token));
    }
    setTokenChecked(true);
  }, [dispatch]);

  if (!tokenChecked) {
    return null;
  }

  return (
    <>
      <Router history={history}>
        <Switch>
          <PublicRoute path="/auth">
            <Authentication />
          </PublicRoute>

          <PrivateRoute path="/" exact>
            <Menu>
              <Home />
            </Menu>
          </PrivateRoute>

          <PrivateRoute path="/setup" exact>
            <Setup />
          </PrivateRoute>

          <PrivateRoute path="/account">
            <Menu>
              <Account />
            </Menu>
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

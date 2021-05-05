import { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import { logout } from "../store/authentication/authenticationSlice.js";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(logout());
    history.push("/auth");
  });

  return null;
};

const AuthenticationScreen = (props) => {
  let { path } = useRouteMatch();

  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  return (
    <Switch>
      <Route path={`${path}/logout`} exact>
        <Logout />
      </Route>

      <Route exact path={path}>
        <Login />
      </Route>

      <Route path={`${path}/register`}>
        <Register />
      </Route>
    </Switch>
  );
};

export default AuthenticationScreen;

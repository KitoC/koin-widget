import { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LoginForm from "../components/Authentication/LoginForm";
import RegisterForm from "../components/Authentication/RegisterForm";
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
        <LoginForm />
      </Route>

      <Route path={`${path}/register`}>
        <RegisterForm />
      </Route>
    </Switch>
  );
};

export default AuthenticationScreen;

import { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "../components/Authentication/login";
import Register from "../components/Authentication/Register";

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

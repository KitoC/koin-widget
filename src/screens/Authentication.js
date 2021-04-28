import { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import get from "lodash/get";
import { useSelector } from "react-redux";

import api from "../_config/api";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

const AuthenticationScreen = (props) => {
  const [isRegistering, setIsRegistering] = useState(false);
  let { path, url } = useRouteMatch();

  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, []);

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

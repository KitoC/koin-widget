import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Profile from "../components/Account/Profile";

const BackNavigatorContainer = styled.div(({ theme }) => ({ height: "100%" }));
const BackNavigator = styled.div(({ theme }) => ({
  ...theme.utils.flexCenter,
  position: "relative",
  height: "60px",
}));

const BackNavigatorContent = styled.div(({ theme }) => ({
  background: theme.colors.card,
  height: "calc(100% - 60px)",
}));

const BackNavigatorLink = styled(Link)(({ theme }) => ({
  ...theme.utils.flexCenter,
  position: "absolute",
  left: "0",
  height: "100%",
  width: "40px",
}));

const RouteWithBackButton = ({ children, backTo, title, ...rest }) => {
  return (
    <Route {...rest}>
      <BackNavigatorContainer>
        <BackNavigator>
          {backTo && (
            <BackNavigatorLink to={backTo}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </BackNavigatorLink>
          )}
          <h4>{title}</h4>
        </BackNavigator>

        <BackNavigatorContent>{children}</BackNavigatorContent>
      </BackNavigatorContainer>
    </Route>
  );
};

const AccountScreen = (props) => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <RouteWithBackButton title="You" exact path={path}>
        <Profile />
      </RouteWithBackButton>

      <RouteWithBackButton
        title="Settings"
        backTo="/account"
        path={`${path}/settings`}
      >
        <div>settings</div>
      </RouteWithBackButton>
    </Switch>
  );
};

export default AccountScreen;

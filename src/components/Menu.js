import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCoins } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useRouteMatch } from "react-router-dom";

const items = [
  { label: "Balances", icon: faCoins, to: "/" },
  { label: "Account", icon: faUser, to: "/account" },
];

const StyledMenuContainer = styled.div(({ theme }) => ({
  background: theme.colors.card,
  boxShadow: "-3px -3px 5px rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "space-around",
  paddingTop: "1rem",
  height: 70,
}));

const Content = styled.div(({ theme }) => ({
  height: "calc(100% - 70px)",
}));

const StyledMenuItem = styled(NavLink)(({ theme }) => ({
  height: "100%",
  width: "20px",
  alignItems: "center",
  fontSize: "1.5rem",
  ...theme.utils.flexColumn,
  opacity: 0.2,
  "&.active": {
    opacity: 1,
  },
}));

const MenuItem = ({ label, icon, to }) => {
  return (
    <StyledMenuItem
      to={to}
      isActive={(match, location) => {
        const { pathname } = location;

        if (!match || (to === "/" && pathname !== "/")) {
          return false;
        }

        return true;
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </StyledMenuItem>
  );
};

const Menu = ({ children }) => {
  return (
    <div className="flex-column fit-parent">
      <Content className="flex-auto">{children}</Content>
      <StyledMenuContainer>
        {items.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </StyledMenuContainer>
    </div>
  );
};

export default Menu;

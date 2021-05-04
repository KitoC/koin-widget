import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { logout as logoutAction } from "../../store/authentication/authenticationSlice.js";

// const Header = styled.h4(({ theme }) => ({
//   padding: `${theme.spacings.m} 0`,
// }));

const ProfileContainer = styled.div(({ theme }) => ({
  ...theme.utils.flexColumn,
  height: "100%",
}));

const Links = styled.div(({ theme }) => ({
  ...theme.utils.flexAuto,
  padding: `${theme.spacings.m} 0`,
  //   background: theme.colors.card,
}));

const StyledLinkContainer = styled(Link)(({ theme }) => ({
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  padding: `${theme.spacings.s} ${theme.spacings.m}`,
  marginBottom: theme.spacings.s,
  background: "rgb(30 28 43)",
  borderTop: "1px solid rgba(255, 255, 255, 0.09)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.09)",
  color: "white",
}));

const Profile = (props) => {
  const dispatch = useDispatch();
  const signOut = () => dispatch(logoutAction());

  return (
    <ProfileContainer>
      <Links>
        <StyledLinkContainer to="/account/settings">
          <span>Settings</span>
        </StyledLinkContainer>
        <StyledLinkContainer onClick={signOut}>
          <span>Sign out</span>
        </StyledLinkContainer>
      </Links>
    </ProfileContainer>
  );
};

export default Profile;

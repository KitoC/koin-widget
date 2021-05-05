import { useEffect } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";
import OverView from "../components/OverView";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalances } from "../store/balances/balancesSlice";
import { fetchUserSettings } from "../store/authentication/authenticationSlice";

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  ...theme.utils.fitParent,
}));

const HomeScreen = ({ setIsAuthorized }) => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.authentication.settings);
  const loading = useSelector((state) => state.balances.loading);
  const error = useSelector((state) => state.balances.error);
  const data = useSelector((state) => state.balances.data);

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  useEffect(() => {
    let timeout;

    if (settings) {
      const getBalances = async () => {
        dispatch(fetchBalances());

        timeout = setTimeout(getBalances, 60000);
      };

      getBalances();
    }

    return () => clearTimeout(timeout);
  }, [settings, dispatch]);

  if (loading) {
    return (
      <div className="fit-parent flex-center">
        <Loader size="md" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="fit-parent flex-center">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <StyledContainer>
      <OverView />
    </StyledContainer>
  );
};

export default HomeScreen;

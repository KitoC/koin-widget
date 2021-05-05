import { useEffect } from "react";
import { Loader } from "rsuite";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import OverView from "../components/OverView";
import { useSelector, useDispatch } from "react-redux";
import { fetchBalances } from "../store/balances/balancesSlice";
import { fetchUserSettings } from "../store/userSettings/userSettingsSlice";

const StyledContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  ...theme.utils.fitParent,
}));

const HomeScreen = ({ setIsAuthorized }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const settings = useSelector((state) => state.userSettings.data);
  const loadingSettings = useSelector((state) => state.userSettings.loading);
  const token = useSelector((state) => state.authentication.token);
  const loadingBalances = useSelector((state) => state.balances.loading);
  const error = useSelector((state) => state.balances.error);
  const balances = useSelector((state) => state.balances.data);

  const hasRequiredSettings =
    settings && settings.coinspotKey && settings.coinspotSecret;

  useEffect(() => {
    if (token) {
      dispatch(fetchUserSettings());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!loadingSettings && !hasRequiredSettings) {
      history.push("/setup");
    }
  }, [settings, history, hasRequiredSettings, loadingSettings]);

  useEffect(() => {
    let timeout;

    if (!loadingSettings && hasRequiredSettings) {
      const getBalances = async () => {
        dispatch(fetchBalances());

        timeout = setTimeout(getBalances, 60000);
      };

      getBalances();
    }

    return () => clearTimeout(timeout);
  }, [settings, dispatch, hasRequiredSettings, loadingSettings]);

  if (loadingBalances && loadingSettings) {
    return (
      <div className="fit-parent flex-center">
        <Loader size="md" />
      </div>
    );
  }

  if (error && !balances) {
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

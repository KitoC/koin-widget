import { useEffect, useState } from "react";
import get from "lodash/get";
import { Loader } from "rsuite";
import styled from "styled-components";
import api from "../_config/api";
import OverView from "../components/OverView";

const StyledContainer = styled.div(({ theme }) => ({
  // ...theme.utils.flexCenter,
  display: "flex",
  justifyContent: "center",
  ...theme.utils.fitParent,
  // padding:
}));

const HomeScreen = ({ setIsAuthorized }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setError] = useState(null);

  useEffect(() => {
    let timeout;

    const getBalances = async () => {
      try {
        const { data } = await api.get("/api/v1/coinspot/balances");

        setData(data.data);
      } catch (error) {
        const message = get(
          error,
          "response.data.error.message",
          error.message
        );

        if (message.includes("key")) {
          localStorage.clear();
          setLoading(true);
          setError(null);
          setIsAuthorized(null);
        }

        if (!data) {
          setError(message);
        }
      } finally {
        if (loading) {
          setLoading(false);
        }
      }

      timeout = setTimeout(getBalances, 60000);
    };

    getBalances();
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="fit-parent flex-center">
        <Loader size="md" />
      </div>
    );
  }

  if (errorMessage && !data) {
    return (
      <div className="fit-parent flex-center">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <StyledContainer>
      <OverView data={data} />
    </StyledContainer>
  );
};

export default HomeScreen;

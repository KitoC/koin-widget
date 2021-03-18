import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import api from "./_config/api";
import mockData from "./data.json";
import get from "lodash/get";
import "rsuite/dist/styles/rsuite-default.css";
import OverView from "./components/OverView";
import { Loader, Input, Button } from "rsuite";

const AuthorisedApp = ({ setIsAuthorized }) => {
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

  return <OverView data={data} />;
};

const NonAuthorisedApp = ({ onAddKey }) => {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");

  return (
    <div className="api-key">
      <h4 style={{ color: "white", marginBottom: "var(--spacing-l)" }}>
        Enter Credentials
      </h4>

      <label>
        <Input placeholder="Api Key" value={key} onChange={setKey} />
      </label>

      <label>
        <Input placeholder="Secret Key" value={secret} onChange={setSecret} />
      </label>

      <label>
        <Button
          disabled={!key || !secret}
          onClick={() => onAddKey({ key, secret })}
        >
          Add Credentials
        </Button>
      </label>
    </div>
  );
};

function App() {
  const [isAuthorised, setIsAuthorized] = useState(
    localStorage.getItem("credentials")
  );

  const onAddKey = (value) => {
    setIsAuthorized(value);

    localStorage.setItem("credentials", JSON.stringify(value));
  };

  return (
    <div className="App flex-column">
      {isAuthorised && <AuthorisedApp setIsAuthorized={setIsAuthorized} />}
      {!isAuthorised && <NonAuthorisedApp onAddKey={onAddKey} />}
    </div>
  );
}

export default App;

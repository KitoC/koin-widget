import axios from "axios";
import get from "lodash/get";
import history from "../utils/history";

const createApi = (getState) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  api.interceptors.request.use(function (config) {
    const { authentication, userSettings } = getState();
    const { data: settings } = userSettings;
    const { token } = authentication;

    if (settings) {
      const { coinspotKey, coinspotSecret } = settings;

      config.headers.common.key = coinspotKey;
      config.headers.common.secret = coinspotSecret;
    }

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.data.error.message === "No Internal Key") &&
        !document.location.pathname.includes("auth")
      ) {
        history.push("/auth/logout", { state: "foo" });
      }

      return Promise.reject(get(error, "response.data.error", error));
    }
  );

  return api;
};

export { default as endpoint } from "./endpoints";
export default createApi;

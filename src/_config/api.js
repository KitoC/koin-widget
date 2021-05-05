import axios from "axios";
import history from "../utils/history";

const createApi = (getState) => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  api.interceptors.request.use(function (config) {
    const { settings } = getState().authentication;

    if (settings) {
      const { coinspotKey, coinspotSecret } = settings;

      config.headers.common.key = coinspotKey;
      config.headers.common.secret = coinspotSecret;
    }

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(
        (error.response.status === 401 ||
          error.response.data.error.message === "No Internal Key") &&
          !document.location.pathname.includes("auth")
      );
      if (
        (error.response.status === 401 ||
          error.response.data.error.message === "No Internal Key") &&
        !document.location.pathname.includes("auth")
      ) {
        history.push("/auth/logout", { state: "foo" });
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export { default as endpoint } from "./endpoints";
export default createApi;

import axios from "axios";
import store from "../store";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(function (config) {
  console.log();
  const { settings } = store.getState().authentication;

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

export { default as endpoint } from "./endpoints";
export default api;

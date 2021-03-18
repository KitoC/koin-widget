import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(function (config) {
  if (localStorage.getItem("credentials")) {
    const credentials = JSON.parse(localStorage.getItem("credentials"));

    config.headers.common.key = credentials.key;
    config.headers.common.secret = credentials.secret;
  }

  return config;
});

export default api;

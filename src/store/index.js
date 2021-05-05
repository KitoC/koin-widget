import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authenticationSlice";
import balancesReducer from "./balances/balancesSlice";
import createApi from "../_config/api";

const initStore = () => {
  let store;
  const api = createApi(() => store.getState());

  store = configureStore({
    reducer: {
      authentication: authenticationReducer,
      balances: balancesReducer,
    },
    middleware: (getDefaultMiddleware) => {
      let middlewares = getDefaultMiddleware();

      middlewares = middlewares.map((middleware) => {
        if (middleware.withExtraArgument) {
          return middleware.withExtraArgument({ api });
        }

        return middleware;
      });

      return middlewares;
    },
  });

  return store;
};

export default initStore;

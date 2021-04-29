import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authenticationSlice";
import balancesReducer from "./balances/balancesSlice";

export default configureStore({
  reducer: { authentication: authenticationReducer, balances: balancesReducer },
});

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "../../_config/endpoints";

const register = createAsyncThunk(
  "authentication/register",
  async (payload, { rejectWithValue, extra: { api } }) => {
    const { data } = await api.post(
      endpoints.api.v1.authentication.register,
      payload
    );

    return data.data.token;
  }
);

const login = createAsyncThunk(
  "authentication/login",
  async (payload, { rejectWithValue, extra: { api } }) => {
    const { data } = await api.post(
      endpoints.api.v1.authentication.login,
      payload
    );

    return data.data.token;
  }
);

const setLogginedState = (state, action) => {
  state.isLoggedIn = true;
  state.token = action.payload;

  localStorage.setItem("token", state.token);
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    user: null,
    settings: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      setLogginedState(state, action);
      state.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      setLogginedState(state, action);
      state.loading = false;
    },
  },
});

const { logout, setToken } = authenticationSlice.actions;

export { login, register, logout, setToken };
export default authenticationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { endpoint } from "../../_config/api";
import getError from "../../utils/getError";

const fetchUserSettings = createAsyncThunk(
  "authentication/fetchUserSettings",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(endpoint.api.v1.myAccount.settings);

      return data.data.settings;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

const updateUserSettings = createAsyncThunk(
  "authentication/updateUserSettings",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        endpoint.api.v1.myAccount.settings,
        payload
      );

      return data.data.settings;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    user: null,
    settings: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;

      localStorage.setItem("token", state.token);
    },
    register: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [fetchUserSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
    },
    [fetchUserSettings.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [fetchUserSettings.pending]: (state, action) => {
      if (!state.settings) {
        state.loading = true;
      }
    },
    [updateUserSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
    },
    [updateUserSettings.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [updateUserSettings.pending]: (state, action) => {
      if (!state.settings) {
        state.loading = true;
      }
    },
  },
});

export const { login, register, logout } = authenticationSlice.actions;
export { fetchUserSettings, updateUserSettings };
export default authenticationSlice.reducer;

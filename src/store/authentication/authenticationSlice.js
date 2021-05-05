import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "../../_config/endpoints";
import getError from "../../utils/getError";

const fetchUserSettings = createAsyncThunk(
  "authentication/fetchUserSettings",
  async (userId, { rejectWithValue, extra: { api } }) => {
    try {
      const { data } = await api.get(endpoints.api.v1.myAccount.settings);

      return data.data.settings;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

const updateUserSettings = createAsyncThunk(
  "authentication/updateUserSettings",
  async (payload, { rejectWithValue, extra: { api } }) => {
    try {
      const { data } = await api.patch(
        endpoints.api.v1.myAccount.settings,
        payload
      );

      return data.data.settings;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

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
    // register: (state, action) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload;
    // },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;

      // state.user = action.payload;
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      // state.user = action.payload;
      state.token = action.payload;

      localStorage.setItem("token", state.token);
      state.loading = false;
    },
    // [login.rejected]: (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
    // [login.pending]: (state, action) => {
    //   state.loading = true;
    // },
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

const { logout, setToken } = authenticationSlice.actions;

export {
  fetchUserSettings,
  updateUserSettings,
  login,
  register,
  logout,
  setToken,
};
export default authenticationSlice.reducer;

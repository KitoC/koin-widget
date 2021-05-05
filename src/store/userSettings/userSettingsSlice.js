import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import endpoints from "../../_config/endpoints";
import getError from "../../utils/getError";

const fetchUserSettings = createAsyncThunk(
  "userSettings/fetch",
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
  "userSettings/update",
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

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState: {
    loading: true,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserSettings.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchUserSettings.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [fetchUserSettings.pending]: (state, action) => {
      if (!state.data) {
        state.loading = true;
      }
    },
    [updateUserSettings.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [updateUserSettings.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [updateUserSettings.pending]: (state, action) => {
      if (!state.data) {
        state.loading = true;
      }
    },
  },
});

export { fetchUserSettings, updateUserSettings };
export default userSettingsSlice.reducer;

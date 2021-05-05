import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../_config/api";
import getError from "../../utils/getError";

const fetchBalances = createAsyncThunk(
  "balances/fetchBalances",
  async (userId, { rejectWithValue, extra: { api } }) => {
    try {
      const { data } = await api.get("/api/v1/coinspot/balances");

      return data.data;
    } catch (error) {
      return rejectWithValue(getError(error));
    }
  }
);

export const authenticationSlice = createSlice({
  name: "balances",
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  extraReducers: {
    [fetchBalances.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchBalances.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [fetchBalances.pending]: (state, action) => {
      if (!state.data) {
        state.loading = true;
      }
    },
  },
});

// export const {} = authenticationSlice.actions;
export { fetchBalances };

export default authenticationSlice.reducer;

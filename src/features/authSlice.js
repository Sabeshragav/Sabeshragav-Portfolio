import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProviders } from "next-auth/react";

// Initial state
const initialState = {
  providers: [],
  loading: false,
  error: null,
};

// Async thunk for fetching providers
export const fetchProviders = createAsyncThunk(
  "authentication/fetchProviders",
  async (_, thunkAPI) => {
    try {
      const response = await getProviders();
      return response; // This will be passed as the payload to extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload; // Update the state with fetched providers
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

export const getAllProviders = (state) => state.auth.providers;

export const authReducer = authSlice.reducer;

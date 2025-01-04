import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeUserSession } from "@services/storage";
import axios from "axios";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

// Async thunk for fetching single user's details
export const fetchUser = createAsyncThunk(
  "session/fetchUser",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?id=${userId}`
      );

      return response.data; // This will be passed as the payload to extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single user's details by JWT
export const fetchUserByToken = createAsyncThunk(
  "session/fetchUserByToken",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/protected/${userId}`
      );

      return response.data; // This will be passed as the payload to extraReducers
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // setSession: (state, action) => {
    //   state = action.payload;
    //   localStorage.setItem("userSession", JSON.stringify(action.payload));
    // },
    // clearSession: (state) => {
    //   state = null;
    //   localStorage.removeItem("userSession");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the state with fetched providers
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        storeUserSession({ user: action.payload });
        state.user = action.payload; // Update the state with fetched providers
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

// export const { setSession, clearSession } = sessionSlice.actions;

// export const getSession = (state) => state.session;

export const getUser = (state) => state.session.user;
export const getUserLoading = (state) => state.session.loading;
export const getUserError = (state) => state.session.error;

export const sessionReducer = sessionSlice.reducer;

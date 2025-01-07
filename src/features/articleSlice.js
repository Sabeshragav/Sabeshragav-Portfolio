import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const articleAdapter = createEntityAdapter();

const initialState = articleAdapter.getInitialState({
  status: "idle", // "idle" || "pending" || "fulfilled" || "rejected"
  error: null,
  message: null,
  enquiryStatus: "idle",
  enquiryError: null,
});

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (initialState, thunkAPI) => {
    try {
      let response;

      if (initialState) {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles?search=${initialState}`
        );
      } else
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
        );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addEnquiry = createAsyncThunk(
  "addEnquiry",
  async (enquiryDataa, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`,
        enquiryDataa
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        if (action.payload.message) {
          state.status = "rejected";
        } else {
          articleAdapter.setAll(state, action.payload);
          state.status = "fulfilled";
        }
      })
      .addCase(addEnquiry.pending, (state) => {
        state.enquiryStatus = "pending";
      })
      .addCase(addEnquiry.rejected, (state, action) => {
        state.enquiryError = action.payload.error;
        state.enquiryStatus = "rejected";
      })
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.enquiryStatus = "fulfilled";
      });
  },
});

export const {
  selectAll: selectAllArticles,
  selectIds: selectAllArticlesIds,
  selectById,
} = articleAdapter.getSelectors((state) => state.articles);
export const getArticleStatus = (state) => state.articles.status;
export const getArticleError = (state) => state.articles.error;

export const getEnquiryMessage = (state) => state.articles.message;
export const getEnquiryStatus = (state) => state.articles.enquiryStatus;
export const getEnquiryError = (state) => state.articles.enquiryError;

export const articleReducer = articleSlice.reducer;

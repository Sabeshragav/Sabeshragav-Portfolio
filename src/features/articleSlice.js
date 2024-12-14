"use client";

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
});

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (initialState) => {
    let response;

    if (initialState) {
      response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/articles?search=${initialState}`
      );
    } else
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`);

    return response.data;
  }
);

export const addEnquiry = createAsyncThunk(
  "addEnquiry",
  async (enquiryDataa) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiry`,
        enquiryDataa
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchArticles.rejected, (state, action) => {
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
      .addCase(addEnquiry.fulfilled, (state, action) => {
        state.message = action.payload.message;
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

export default articleSlice.reducer;

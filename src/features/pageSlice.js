import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewPosition: "",
  searchVal: "",
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    handleScrollToTop: () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    setSearchVal: (state, action) => {
      state.searchVal = action.payload;
    },
    setViewPosition: (state, action) => {
      state.viewPosition = action.payload;
    },
  },
});

export const getSearchVal = (state) => state.pages.searchVal;
export const getViewPosition = (state) => state.pages.viewPosition;

export const { handleScrollToTop, setSearchVal, setViewPosition } =
  pageSlice.actions;

export const pageReducer = pageSlice.reducer;

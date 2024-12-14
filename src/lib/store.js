import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "../features/articleSlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

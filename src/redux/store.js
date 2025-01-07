import { configureStore } from "@reduxjs/toolkit";
import { articleReducer } from "@features/articleSlice";
import { authReducer } from "@features/authSlice";
import { sessionReducer } from "@features/sessionSlice";
import { pageReducer } from "@features/pageSlice";

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    auth: authReducer,
    session: sessionReducer,
    pages: pageReducer,
  },
});

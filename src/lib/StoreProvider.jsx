"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchArticles } from "@/features/articleSlice";

store.dispatch(fetchArticles());

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

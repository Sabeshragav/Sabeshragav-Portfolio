"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchArticles } from "@/features/articleSlice";

store.dispatch(fetchArticles());

export default function StoreProvider({ children }) {
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
  }, []);
  return <Provider store={store}>{children}</Provider>;
}

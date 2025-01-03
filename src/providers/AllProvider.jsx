"use client";

import { fetchArticles } from "@features/articleSlice";
import { fetchProviders } from "@features/authSlice";
import { store } from "@lib/store";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function AllProvider({ children, session }) {
  useEffect(() => {
    // Dispatch the actions on mount
    store.dispatch(fetchArticles());
    store.dispatch(fetchProviders());

    // Handle focusable elements
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ToastContainer />
        {children}
      </SessionProvider>
    </Provider>
  );
}

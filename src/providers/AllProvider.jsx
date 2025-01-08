"use client";

import { fetchArticles } from "@features/articleSlice";
import { fetchProviders } from "@features/authSlice";
import { store } from "@redux/store";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllProvider({ children, session }) {
  useEffect(() => {
    store.dispatch(fetchArticles());
    store.dispatch(fetchProviders());
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ToastContainer
          theme="dark"
          transition={Zoom}
          autoClose={1500}
          closeOnClick
          hideProgressBar={true}
          limit={1}
          newestOnTop={true}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          draggable={true}
        />
        {children}
      </SessionProvider>
    </Provider>
  );
}

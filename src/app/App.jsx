"use client";
import React, { useEffect } from "react";

import ArticleGrid from "@/components/ArticleGrid";
import SearchBar from "@/components/SearchBar";
import Welcome from "@/components/Welcome";

export default function App() {
  useEffect(() => {
    const focusableElements = document.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach((el) => el.setAttribute("tabindex", "-1"));
  }, []);

  return (
    <>
      <div className="m-4 flex flex-col sm:flex-row justify-between border-b border-b-gray-600">
        <Welcome />
        <SearchBar />
      </div>
      <ArticleGrid />
    </>
  );
}

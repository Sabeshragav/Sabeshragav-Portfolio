"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  getArticleError,
  getArticleStatus,
  selectById,
} from "@/features/articleSlice";

export default function FullArticle({ params }) {
  const { articleId } = React.use(params);
  const article = useSelector((state) => selectById(state, articleId));
  const articleStatus = useSelector(getArticleStatus);
  const articleError = useSelector(getArticleError);

  // Default content to prevent SSR/CSR mismatches
  let content = (
    <div
      className="h-screen w-full flex justify-center items-center"
      suppressHydrationWarning={true}
    >
      Loading article...
    </div>
  );

  if (articleStatus === "fulfilled" && article) {
    content = (
      <div
        className="text-white rounded-lg min-h-screen p-4"
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col gap-2" suppressHydrationWarning={true}>
          <h1 className="text-5xl font-semibold basis-auto">
            {article.title || "Unknown Title"}
          </h1>
          <p className="pl-1 text-sm opacity-70">
            Posted at {article.format_date || "N/A"}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="h-96 w-96 rounded-lg mt-10"
            src={article.image || "https://via.placeholder.com/300"}
            alt={article.title || "Default Title"}
          />
        </div>
        <div className="flex justify-center items-center ">
          <div className="flex justify-center items-center mt-10 mx-auto rounded-3xl w-4/5 border p-3">
            <div className="flex justify-center items-center gap-1 m-4 container opacity-90">
              <div>{article.description || "No description available."}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (articleStatus === "rejected") {
    content = (
      <div className="text-red-500 text-center" suppressHydrationWarning={true}>
        {articleError || "Failed to load article."}
      </div>
    );
  }

  return (
    <div className="my-10">
      {content || (
        <div className="text-center" suppressHydrationWarning={true}>
          No articles available
        </div>
      )}
    </div>
  );
}

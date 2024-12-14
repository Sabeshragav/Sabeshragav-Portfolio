"use client";

import React from "react";
import Article from "./Article";
import { useSelector } from "react-redux";
import {
  getArticleError,
  getArticleStatus,
  selectAllArticlesIds,
} from "@/features/articleSlice";

export default function ArticleGrid() {
  const articleIds = useSelector(selectAllArticlesIds);
  const articleStatus = useSelector(getArticleStatus);
  const articleError = useSelector(getArticleError);

  let content;
  const hasArticles = articleStatus === "fulfilled" && articleIds.length > 0;

  if (articleStatus === "pending") {
    content = (
      <div className="h-96 flex items-center" suppressHydrationWarning={true}>
        Loading articles...
      </div>
    );
  } else if (articleStatus === "rejected") {
    content = (
      <div className="text-red-500" suppressHydrationWarning={true}>
        {articleError || "Failed to load articles."}
      </div>
    );
  } else if (hasArticles) {
    content = articleIds.map((articleId) => (
      <Article key={articleId} articleId={articleId} />
    ));
  } else {
    content = (
      <div className="h-96 flex items-center" suppressHydrationWarning={true}>
        No articles available
      </div>
    );
  }

  // Default to a consistent structure
  return (
    <div className="my-20 mx-4 flex justify-center">
      <div
        className={`grid ${hasArticles ? "grid-cols-3 gap-10" : "gap-10"}`}
        suppressHydrationWarning={true}
      >
        {content}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading articles...
      </div>
    );
  }

  let content;
  const hasArticles =
    articleStatus === "fulfilled" && articleIds.length > 0 && isLoaded;

  if (articleStatus === "pending") {
    content = (
      <div className="h-screen flex items-center">Loading articles...</div>
    );
  } else if (articleStatus === "rejected") {
    content = (
      <div className="text-red-500 h-screen w-full flex justify-center items-center">
        {articleError || "Failed to load articles."}
      </div>
    );
  } else if (hasArticles) {
    content = articleIds.map((articleId) => (
      <Article key={articleId} articleId={articleId} />
    ));
  } else {
    content = (
      <div className="h-screen flex items-center">No articles available</div>
    );
  }

  // Default to a consistent structure
  return (
    <div className="my-20 mx-4 flex justify-center">
      <div className={`grid ${hasArticles ? "grid-cols-3 gap-10" : "gap-10"}`}>
        {content}
      </div>
    </div>
  );
}

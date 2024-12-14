"use client";

import {
  getArticleError,
  getArticleStatus,
  selectById,
} from "@/features/articleSlice";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Article({ articleId }) {
  const article = useSelector((state) => selectById(state, articleId));
  const articleStatus = useSelector(getArticleStatus);
  const articleError = useSelector(getArticleError);

  if (!article) {
    return (
      <div
        className="h-96 flex items-center justify-center"
        suppressHydrationWarning={true}
      >
        Loading article...
      </div>
    );
  }

  if (articleStatus === "rejected") {
    return (
      <div className="text-red-500" suppressHydrationWarning={true}>
        {articleError || "Failed to load articles."}
      </div>
    );
  }

  // Only render the Link when the data is ready
  return (
    <Link
      href={`/article/${article.id}`}
      className="text-black relative rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
      suppressHydrationWarning={true}
    >
      <img
        suppressHydrationWarning={true}
        className="h-96 w-96 rounded-lg opacity-85"
        src={article.image || "/default-placeholder.jpg"} // Use a fallback image
        alt={article.title || "Default title"}
      />
      <div
        className="absolute -bottom-1 rounded-t-3xl rounded-b-lg w-full border bg-white p-3"
        suppressHydrationWarning={true}
      >
        <h3 className="text-3xl font-semibold">
          {article.title || "Untitled"}
        </h3>
        <p>
          {article.description
            ? `${article.description.substring(0, 100)}...`
            : "No description available."}
        </p>
      </div>
    </Link>
  );
}

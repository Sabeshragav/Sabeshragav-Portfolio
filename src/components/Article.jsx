"use client";

import {
  getArticleError,
  getArticleStatus,
  selectById,
} from "@/features/articleSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Article({ articleId }) {
  const article = useSelector((state) => selectById(state, articleId));
  const articleStatus = useSelector(getArticleStatus);
  const articleError = useSelector(getArticleError);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  if (articleStatus === "rejected") {
    return (
      <div className="text-red-500">
        {articleError || "Failed to load articles."}
      </div>
    );
  }

  return (
    <Link
      tabIndex={-1}
      href={`/article/${article.id}`}
      className="text-black relative rounded-lg"
    >
      <img
        className="h-96 w-96 rounded-lg opacity-85"
        src={article.image || "/iconify.png"} // Use a fallback image
        alt={article.title || "Untitled"}
      />
      <div className="absolute -bottom-1 rounded-t-3xl rounded-b-lg w-full border bg-white p-3">
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

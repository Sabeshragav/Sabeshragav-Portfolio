"use client";

import {
  fetchArticles,
  getArticleError,
  getArticleStatus,
  selectById,
  setSearchVal,
} from "@/features/articleSlice";
import Loader from "@components/Loader";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Article({ articleId, ignoreId }) {
  const dispatch = useDispatch();

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
        <Loader />
      </div>
    );
  }

  if (articleStatus === "rejected") {
    return (
      <div className="text-red-500">
        {articleError || "Failed to load project."}
      </div>
    );
  }

  return (
    <>
      <Link href={`/article/${article?.id}`} className="group block max-w-96">
        <div className="relative">
          <Image
            height={1000}
            width={1000}
            className="h-52 sm:h-56 md:h-60 w-96 rounded-t-lg opacity-90"
            src={
              article?.images
                ? `/images/${article?.images?.[0]}`
                : "/images/placeholder.jpg"
            }
            alt={article?.title || "Loading..."}
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <span className="text-white text-lg tracking-tight font-semibold">
              Explore More
            </span>
          </div>
        </div>

        <div
          className={`bg-gray-300 text-black p-3 ${
            ignoreId ? "rounded-lg" : "rounded-t-lg"
          } border-t border-gray-400 -translate-y-2`}
        >
          <h3 className="text-3xl font-bold tracking-tight">
            {article?.title || "Loading..."}
          </h3>
          <p className="mt-1">
            {article?.description
              ? `${article?.description.substring(0, 70)}... `
              : "No description available."}
            {article?.description && (
              <span className="text-gray-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                More
              </span>
            )}
          </p>
        </div>
      </Link>

      {!ignoreId && (
        <div className="flex flex-wrap gap-2 bg-gray-300 pb-4 rounded-b-lg p-2 -translate-y-2 max-w-96">
          {article?.technologies?.slice(0, 3).map((tech) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setSearchVal(tech));
                dispatch(fetchArticles(tech));
              }}
              key={tech}
              className="bg-black text-white text-sm px-2 py-1 rounded"
            >
              {tech}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

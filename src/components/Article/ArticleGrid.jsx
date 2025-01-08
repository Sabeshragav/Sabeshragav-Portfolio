"use client";

import React, { useEffect, useState } from "react";
import Article from "./Article";
import { useSelector } from "react-redux";
import {
  getArticleError,
  getArticleStatus,
  selectAllArticlesIds,
} from "@/features/articleSlice";
import { motion, useScroll, useSpring } from "framer-motion";
import Loader from "@components/Loader";

export default function ArticleGrid() {
  const articleIds = useSelector(selectAllArticlesIds);
  const articleStatus = useSelector(getArticleStatus);
  const articleError = useSelector(getArticleError);

  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  let content;
  const hasArticles =
    articleStatus === "fulfilled" && articleIds.length > 0 && isLoaded;

  if (articleStatus === "pending") {
    content = (
      <div className="h-[500px] flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (articleStatus === "rejected") {
    content = (
      <div className="text-red-500 h-screen w-full flex justify-center items-center">
        {articleError || "Failed to load projects."}
      </div>
    );
  } else if (hasArticles) {
    content = articleIds?.map((articleId, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 10, y: 0 }}
        transition={{ delay: index * 0.3 }}
      >
        <div className="transition duration-300 sm:hover:scale-105 sm:hover:shadow-lg">
          <Article key={articleId} articleId={articleId} />
        </div>
      </motion.div>
    ));
  } else {
    content = (
      <div className="h-[500px] flex items-center">No Projects available</div>
    );
  }

  return (
    <div className="my-20 mx-7 flex justify-center">
      <div
        className={`grid ${
          hasArticles
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            : "gap-10"
        }`}
      >
        {content}
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-3 bg-slate-500 origin-left z-50"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}

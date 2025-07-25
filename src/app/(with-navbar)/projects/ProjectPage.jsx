"use client";

import ArticleGrid from "@components/Article/ArticleGrid";
import Loader from "@components/Loader";
import SearchBar from "@components/SearchBar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const text =
    "Discover a curated collection of innovative projects showcasing creativity, technical skill, and inspiration.";

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-7 my-4 flex flex-col md:flex-row justify-between md:border-b md:border-b-gray-800">
        <div className="flex flex-col gap-3 pb-3 md:py-5">
          <h1 className="text-4xl font-bold">Project Highlights</h1>
          <motion.p className="text-gray-400 text-sm md:text-base w-full md:w-11/12">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <SearchBar />
      </div>

      <ArticleGrid />
    </motion.div>
  );
}

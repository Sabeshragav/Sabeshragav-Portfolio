"use client";

import ArticleGrid from "@components/Article/ArticleGrid";
import Loader from "@components/Loader";
import SearchBar from "@components/SearchBar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const text =
    "Dive into a curated selection of projects showcasing creativity, innovation, and technical expertise. Discover the journey behind each creation and gain inspiration from the highlights.";

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
      {/* <div className=" w-full backdrop-blur-lg sticky top-0 z-50"> */}
      <div className="mx-auto max-w-7xl px-7 my-4 flex flex-col md:flex-row justify-between md:border-b md:border-b-gray-800">
        <div className="flex flex-col gap-3 py-5">
          <h1 className="text-4xl">Project Highlights</h1>
          <motion.p className="text-gray-400 w-full md:w-11/12">
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
      {/* </div> */}

      <ArticleGrid />
    </motion.div>
  );
}

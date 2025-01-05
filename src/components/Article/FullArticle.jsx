"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getArticleError,
  getArticleStatus,
  selectById,
} from "@/features/articleSlice";
import Loader from "@components/Loader";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Globe, Calendar, User, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import RelatedArticle from "./RelatedArticle";

export default function FullArticle({ params }) {
  const { articleId } = React.use(params);
  const article = useSelector((state) => selectById(state, articleId));
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
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  let content;

  if (articleStatus === "pending") {
    content = (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  } else if (articleStatus === "fulfilled" && article) {
    content = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 mb-12"
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-400 my-6 transform hover:scale-110 transition-all duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Projects
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {article?.title}
        </h1>
        <div className="mb-10">
          <Image
            src={
              article?.images
                ? `/images/${article?.images?.[0]}`
                : "/images/placeholder.jpg"
            }
            alt={article?.title || "Loading..."}
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg shadow-lg"
            priority
          />
          <div className="flex-center mt-2">
            <h1 className="text-sm text-gray-300">
              {article?.screenshotTitles?.[0]}
            </h1>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-5">Project Overview</h2>
          <p className="text-gray-300 mb-5">{article?.description}</p>
          <div className="">
            <h1 className="text-sm mb-2 font-bold">Technology Stack</h1>
            <div className="flex flex-wrap gap-2 mb-5">
              {article?.technologies.map((tech) => (
                <Link
                  href={`https://www.google.com/search?q=${tech}`}
                  target="_blank"
                  key={tech}
                  className="bg-white text-black hover:text-white hover:black_gray_gradient text-sm px-2 py-1 rounded"
                >
                  {tech}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid mt-7 grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span className="flex items-center">
                Finished : {article?.format_date || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span className="flex items-center">
                Team Size : {article?.teamSize || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2" size={16} />
              <span className="flex items-center">
                Difficulty Level : {article?.difficultyLevel || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2" size={16} />
              <span className="flex items-center gap-1">
                Status :
                <span
                  className={`${
                    article?.deployStatus ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {article?.deployStatus ? "Deployed" : "Not deployed"}
                </span>
              </span>
            </div>
          </div>

          {/* Github / Website */}
          <div className="flex flex-wrap gap-3 mt-5">
            {article?.links ? (
              <>
                {article?.links?.github ? (
                  <Link
                    href={article.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-700 hover:black_gray_gradient text-white font-bold py-2 px-4 rounded"
                  >
                    <FaGithub className="mr-2" size={20} />
                    GitHub
                  </Link>
                ) : (
                  <div className="inline-flex items-center bg-gray-700 text-red-500 font-bold py-2 px-4 rounded">
                    <FaGithub className="mr-2" size={20} />
                    Unavailable
                  </div>
                )}
                {article?.links?.website ? (
                  <Link
                    href={article.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-700 hover:black_gray_gradient text-white font-bold py-2 px-4 rounded"
                  >
                    <Globe className="mr-2" size={20} />
                    Website
                  </Link>
                ) : (
                  <div className="inline-flex items-center bg-gray-700 text-red-500 font-bold py-2 px-4 rounded">
                    <Globe className="mr-2" size={20} />
                    Unavailable
                  </div>
                )}
              </>
            ) : (
              <>No Links</>
            )}
          </div>
        </div>
        <div className="mb-8">
          {/* Project Details */}
          <h2 className="text-2xl font-semibold mb-5">Project Details</h2>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Challenges</h3>
            <ul className="list-disc list-inside mb-4">
              {article?.challenges?.map((challenge, index) => (
                <li key={index} className="mb-2">
                  {challenge}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">Solutions</h3>
            <ul className="list-disc list-inside mb-4">
              {article?.solutions?.map((solution, index) => (
                <li key={index} className="mb-2">
                  {solution}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside">
              {article?.features?.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-5">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:grap-4">
            {article?.images?.slice(1).map((screenshot, index) => (
              <div key={index} className="space-y-2">
                <Image
                  src={
                    screenshot
                      ? `/images/${screenshot}`
                      : "/images/placeholder.jpg"
                  }
                  alt={`${article?.title} screenshot ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full h-auto overflow-hidden rounded-lg shadow-lg"
                  priority
                />
                <p className="text-center text-sm text-gray-300">
                  {article?.screenshotTitles?.[index + 1] ||
                    `Screenshot ${index + 1}`}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Related Projects */}
        <RelatedArticle
          techData={article?.technologies}
          ignoreId={article.id}
        />
      </motion.div>
    );
  } else if (articleStatus === "rejected") {
    content = (
      <div className="text-red-500 h-screen flex justify-center items-center">
        {articleError || "Failed to load page. Try reloading."}
      </div>
    );
  }

  return (
    <>
      {content ? (
        <>
          {content}
          <motion.div
            className="fixed bottom-0 left-0 w-full h-3 bg-gray-100"
            style={{ scaleX }}
          />
        </>
      ) : (
        <div className="text-red-500 text-center text-3xl h-screen gap-10 flex-col flex-center">
          Page unavailable :(
          <Link
            href="/projects"
            className="inline-flex items-center text-base text-blue-400 my-6 transform hover:scale-110 transition-all duration-200"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </Link>
        </div>
      )}
    </>
  );
}

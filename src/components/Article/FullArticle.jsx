"use client";

import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Globe, Calendar, User, Star, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import RelatedArticle from "./RelatedArticle";

export default function FullArticle({ article }) {
  console.log(article);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

  //Function to highlight specific words in the description
  const highlightText = (paragraph, highlightPhrases) => {
    highlightPhrases.forEach((phrase) => {
      const regex = new RegExp(`\\b(${phrase})\\b`, "gi");
      paragraph = paragraph.replace(regex, (match) => {
        return `<span class="font-bold tracking-tight text-lg text-white">${match}</span>`;
      });
    });

    return <span dangerouslySetInnerHTML={{ __html: paragraph }} />;
  };

  let content;

  if (article?.title) {
    content = (
      <>
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
              quality={100}
              priority
            />
            <div className="flex-center mt-2">
              <h1 className="text-sm text-gray-300">
                {article?.screenshotTitles?.[0]}
              </h1>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-3xl font-bold mb-5">Project Overview</h2>
            {article?.description?.split("\n").map((paragraph, index) => (
              <p key={index} className="text-gray-300 mb-5">
                {highlightText(paragraph, article?.specific)}
              </p>
            ))}
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
                <span className="flex items-center gap-1">
                  Difficulty Level :
                  <span
                    className={`${
                      article?.difficultyLevel === "Easy"
                        ? "text-green-500"
                        : article?.difficultyLevel === "Medium"
                        ? "text-orange-500"
                        : article?.difficultyLevel === "Hard"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {article?.difficultyLevel || "N/A"}
                  </span>
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

            {/* Github / Website or No external links*/}
            <div className="flex flex-wrap gap-3 mt-5">
              {article?.links ? (
                <>
                  {article?.links?.github ? (
                    <Link
                      href={article.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center black_gray_gradient text-white font-bold py-2 px-4 rounded"
                    >
                      <FaGithub className="mr-2" size={20} />
                      GitHub
                    </Link>
                  ) : (
                    <div className="inline-flex items-center black_gray_gradient text-red-500 font-bold py-2 px-4 rounded">
                      <FaGithub className="mr-2" size={20} />
                      Unavailable
                    </div>
                  )}
                  {article?.links?.website ? (
                    <Link
                      href={article.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center black_gray_gradient text-white font-bold py-2 px-4 rounded"
                    >
                      <Globe className="mr-2" size={20} />
                      Website
                    </Link>
                  ) : (
                    <div className="inline-flex items-center black_gray_gradient text-red-500 font-bold py-2 px-4 rounded">
                      <Globe className="mr-2" size={20} />
                      Unavailable
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex item-center gap-2">
                    <h1>No External Links</h1>
                    <button
                      type="button"
                      onClick={() => setShowInfo(!showInfo)}
                      className="text-blue-500 hover:text-blue-700 focus:outline-none"
                      title="More Info"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  {showInfo && (
                    <p className="text-sm flex items-center text-blue-700">
                      This project is subject to confidentiality obligations or
                      doesn't fulfill the standards for repository upkeep.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            {/* Project Breakdown */}
            <h2 className="text-3xl font-bold mb-5">Project Breakdown</h2>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
              {/* Challenges */}
              {article?.challenges && (
                <>
                  <h3 className="text-xl font-bold mb-2">Challenges :</h3>
                  <ul className="list-disc list-inside mb-4">
                    {article?.challenges?.map((challenge, index) => (
                      <li key={index} className="mb-2 text-gray-300">
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Solutions */}
              {article?.solutions && (
                <>
                  <h3 className="text-xl font-bold mb-2">Solutions :</h3>
                  <ul className="list-disc list-inside mb-4">
                    {article?.solutions?.map((solution, index) => (
                      <li key={index} className="mb-2 text-gray-300">
                        {solution}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Key Features */}
              {article?.features && (
                <>
                  <h3 className="text-xl font-bold mb-2">Key Features :</h3>
                  <ul className="list-disc list-inside">
                    {article?.features?.map((feature, index) => (
                      <li key={index} className="mb-2 text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Screenshots */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold mb-5">Screenshots</h2>
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

        {/* Scroll progress bar */}
        <motion.div
          className="fixed bottom-0 left-0 w-full h-3 bg-gray-100"
          style={{ scaleX }}
        />
      </>
    );
  } else {
    content = (
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
    );
  }

  return <>{content}</>;
}

"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "./Article";
import { motion } from "framer-motion";
import Loader from "@components/Loader";

export default function RelatedArticle({ techData, ignoreId }) {
  const [articles, setArticles] = useState();
  const [hasArticles, setHasArticles] = useState(false);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/article`,
          techData
        );

        if (response.status === 200 || response.status === 204) {
          // console.log(response.data.filter((data) => data !== ignoreId));
          setArticles(response.data.filter((data) => data !== ignoreId));
          setHasArticles(true);
        }
      } catch (error) {
        console.error(error.response.data);
      }
    };
    if (techData?.length) fetchRelatedArticles();
  }, []);

  return (
    <>
      {articles?.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold mb-5">
            Related {articles?.length > 1 ? "Projects" : "Project"}
          </h2>
          <div
            className={`grid ${
              hasArticles
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                : "gap-3"
            }`}
          >
            {hasArticles ? (
              articles?.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 10, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="flex justify-center transition duration-300 sm:hover:scale-105 sm:hover:shadow-lg">
                    <Article
                      key={article}
                      articleId={article}
                      ignoreId={ignoreId}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <section className="flex-center w-full h-52">
                <Loader />
              </section>
            )}
          </div>
        </>
      ) : articles?.length === 0 ? (
        <></>
      ) : (
        <>
          <section className="flex-center w-full h-52">
            <Loader />
          </section>
        </>
      )}
    </>
  );
}

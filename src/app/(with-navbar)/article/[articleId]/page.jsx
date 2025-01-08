import axios from "axios";
import FullArticle from "@components/Article/FullArticle";

const logo = "/icons/logo.svg";

export async function generateMetadata({ params }) {
  const { articleId } = await params;

  try {
    const article = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/article/${articleId}`
    );

    const articleData = article?.data;

    return {
      title: articleData?.title || "Sabeshragav's Portfolio",
      description: articleData?.description || "Sabeshragav's Portfolio",
      icons: logo,
    };
  } catch (error) {
    return {
      title: "404 - Page not found",
      description: "Page unavailable",
      icons: logo,
    };
  }
}

export default async function FullArticlePage({ params }) {
  const { articleId } = await params;

  const article = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/article/${articleId}`
  );

  const articleData = article?.data;

  return <FullArticle article={articleData} />;
}

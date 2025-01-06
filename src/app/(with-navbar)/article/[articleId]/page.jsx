import axios from "axios";
import Head from "next/head";
import FullArticle from "@components/Article/FullArticle";

const logo = "/main/logo.png";

export async function generateMetadata({ params }) {
  const { articleId } = await params;

  try {
    const article = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/article/${articleId}`
    );

    const articleData = article?.data;

    return {
      title: articleData?.title || "Sabeshragav's Blogspot",
      description: articleData?.description || "Sabeshragav's Blogspot",
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

  try {
    const article = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/article/${articleId}`
    );

    const articleData = article?.data;

    return (
      <>
        <Head>
          <title>{articleData?.title || "Sabeshragav's Blogspot"}</title>
          <meta
            name="description"
            content={articleData?.description || "Sabeshragav's Blogspot"}
          />
          <link rel="icon" href={logo} />
        </Head>

        <FullArticle article={articleData} />
      </>
    );
  } catch (error) {
    console.error("Error fetching article:", error.message);

    return (
      <div>
        <Head>
          <title>404 - Page not found</title>
          <meta name="description" content="Page unavailable" />
          <link rel="icon" href={logo} />
        </Head>
        Error loading page. Please try again later.
      </div>
    );
  }
}

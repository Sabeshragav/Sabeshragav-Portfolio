import ArticleGrid from "@/components/ArticleGrid";
import SearchBar from "@/components/SearchBar";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <section>
      <div className="m-4 flex justify-between border-b border-b-gray-600">
        <Welcome />
        <SearchBar />
      </div>
      <ArticleGrid />
    </section>
  );
}

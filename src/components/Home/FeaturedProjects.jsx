"use client";
import Loader from "@components/Loader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useRouter } from "next/navigation";

const ProjectCard = ({ title, description, image }) => (
  <motion.div
    className="min-w-[300px] h-[400px] m-4 relative overflow-hidden rounded-xl"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Image
      src={image}
      alt={title}
      height={1000}
      width={1000}
      className="z-0 absolute inset-0 object-contain w-full h-full"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />

    <div className="hover:cursor-pointer text-left absolute bottom-0 left-0 p-4 z-20">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  </motion.div>
);

export default function FeaturedProjects({
  articles,
  ParallaxText,
  HorizontalParallaxSection,
}) {
  const { isMobile } = useScreenSize();
  const articlesToShow = isMobile ? 4 : 4;
  const router = useRouter();

  return (
    <section
      id="featured_projects"
      className="home_section pt-20 px-4 md:px-8 bg-slate-900"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText className={"mb-12"}>Featured Projects</ParallaxText>
      </h2>{" "}
      {articles?.length ? (
        <HorizontalParallaxSection>
          {/* Mobile articles - 4*/}
          {/* PC articles - 5*/}
          {articles?.slice(0, articlesToShow).map((article, index) => (
            <div onClick={() => router.push(`/article/${article?.id}`)}>
              <ProjectCard
                key={index}
                title={article?.title || "Loading Title"}
                description={
                  `${article?.description?.slice(0, 70)}...` ||
                  "Loading Description"
                }
                image={`/images/${article?.images?.[0]}`}
                id={article?.id}
                router={router}
              />
            </div>
          ))}
        </HorizontalParallaxSection>
      ) : (
        <div className="h-[500px] flex-center w-full">
          <Loader />
        </div>
      )}
      <div className="flex justify-center mt-10 md:mt-14">
        <Link
          href="/projects"
          className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition duration-300"
        >
          Explore all Projects
        </Link>
      </div>
    </section>
  );
}

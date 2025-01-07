"use client";
import Loader from "@components/Loader";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProjectCard = ({ title, description, image, id }) => (
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
    <Link href={`/article/${id}`}>
      <div className="absolute bottom-0 left-0 p-4 z-20">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </Link>
  </motion.div>
);

export default function FeaturedProjects({
  articles,
  ParallaxText,
  HorizontalParallaxSection,
}) {
  return (
    <section
      id="featured_projects"
      className="home_section pt-20 px-4 md:px-8 bg-slate-900"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText>Featured Projects</ParallaxText>
      </h2>

      {/* Minimum article - 4*/}
      {articles?.length ? (
        <HorizontalParallaxSection>
          {articles?.map((article, index) => (
            <ProjectCard
              key={index}
              title={article?.title || "Loading Title"}
              description={
                `${article?.description?.slice(0, 100)}...` ||
                "Loading Description"
              }
              image={`/images/${article?.images?.[0]}`}
              id={article?.id}
            />
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
          Explore
        </Link>
      </div>
    </section>
  );
}

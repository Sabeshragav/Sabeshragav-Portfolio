"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Loader from "@components/Loader";
// import AnimatedBackground from "./AnimatedBackground";
import FloatingNavigation from "./FloatingNavigation";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAllArticles } from "@features/articleSlice";

const ParallaxText = ({ children, speed = 1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className="inline-block">
      {children}
    </motion.div>
  );
};

const HorizontalParallaxSection = ({ children }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, -width]);

  return (
    <motion.div
      ref={carousel}
      className="relative cursor-grab overflow-hidden max-w-5xl mx-auto"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x }}
        className="flex gap-3 md:gap-10 max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

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
    <div className="absolute bottom-0 left-0 p-4 z-20">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const SkillBubble = ({ skill }) => (
  <motion.div
    className="bg-slate-800 rounded-full px-4 py-2 m-2 inline-block"
    whileHover={{ scale: 1.1, backgroundColor: "#1E293B" }}
    whileTap={{ scale: 0.9 }}
  >
    {skill}
  </motion.div>
);

export default function Home() {
  const articles = useSelector(selectAllArticles);
  // console.log(articles);

  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const text = "Where Creativity Meets Technology";

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNavigation />
      {/* <AnimatedBackground /> */}
      {/* <motion.div
        id="home"
        className="fixed top-0 left-0 right-0 h-3 bg-slate-500 origin-left z-50"
        style={{ scaleX }}
      /> */}

      {/* Welcome */}
      <section className="h-screen flex flex-col justify-center max-w-7xl md:mx-auto mx-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-bold mb-4 text-center flex flex-col items-start"
        >
          <ParallaxText speed={-0.5}>Welcome to</ParallaxText>

          <ParallaxText speed={0.5}>My Digital Page</ParallaxText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl md:text-2xl text-slate-300 mt-3 sm:mt-10"
        >
          {text?.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.3 }}
            >
              {letter}
            </motion.span>
          ))}
          <div className="translate-y-10 flex justify-center">
            <ArrowDown
              className="animate-bounce h-12 w-12"
              onClick={() => setShowInfo(!showInfo)}
            />
          </div>
        </motion.div>
        {showInfo && (
          <p className="text-sm text-center text-blue-700 mt-2 translate-y-10">
            Please Scroll down !
          </p>
        )}
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 px-4 md:px-8 bg-slate-900">
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
            Explore More
          </Link>
        </div>
      </section>

      {/* About me */}
      <section
        id="about"
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-black"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <ParallaxText>About Me</ParallaxText>
        </h2>
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl text-slate-300 mb-8 text-center"
          >
            I'm a visionary developer passionate about pushing the boundaries of
            what's possible in the digital realm. With a keen eye for design and
            a mastery of cutting-edge technologies, I bring ideas to life in
            ways that captivate and inspire.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <Link
              href="/about"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Discover My Journey
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <ParallaxText>Skills & Technologies</ParallaxText>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center"
        >
          {[
            "React",
            "Node.js",
            "Python",
            "JavaScript",
            "TypeScript",
            "GraphQL",
            "Docker",
            "AWS",
            "Machine Learning",
            "Blockchain",
            "VR/AR",
            "IoT",
          ].map((skill) => (
            <SkillBubble key={skill} skill={skill} />
          ))}
        </motion.div>
      </section>

      <section id="contact" className="py-20 px-4 md:px-8 bg-slate-900">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <ParallaxText>Let's Connect</ParallaxText>
        </h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Ready to embark on a digital adventure? Let's create something
            extraordinary together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition duration-300"
          >
            Initiate Contact
          </Link>
        </motion.div>
      </section>

      <section className="py-20 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <ParallaxText>Latest Insights</ParallaxText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "The Future of AI in Web Development",
              excerpt:
                "Exploring how artificial intelligence is reshaping the landscape of web development and user experiences.",
            },
            {
              title: "Mastering the Art of Responsive Design",
              excerpt:
                "Techniques and strategies for creating seamless, adaptive interfaces across all devices and screen sizes.",
            },
          ].map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-slate-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4">{post.title}</h3>
              <p className="text-slate-300 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${index + 1}`}
                className="text-slate-300 hover:text-white underline"
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

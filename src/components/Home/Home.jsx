"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Loader from "@components/Loader";
import FloatingNavigation from "./FloatingNavigation";
import { useDispatch, useSelector } from "react-redux";
import { selectAllArticles } from "@features/articleSlice";
import Welcome from "./Welcome";
import FeaturedProjects from "./FeaturedProjects";
import AboutMe from "./AboutMe";
import SkillsNResume from "./SkillsNResume";
import Services from "./Services";
import { setViewPosition } from "@features/pageSlice";
import Intro from "./Intro";

const ParallaxText = ({ children, speed = 1, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  // console.log(className || "");

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`inline-block ${className || ""}`}
    >
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

export default function Home() {
  const dispatch = useDispatch();

  const articles = useSelector(selectAllArticles);
  // console.log(articles);

  const [isLoaded, setIsLoaded] = useState(false);

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".home_section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          dispatch(setViewPosition(section.id));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Scroll progress bar */}
      {/* <motion.div
        id="home"
        className="fixed top-0 left-0 right-0 h-3 bg-slate-500 origin-left z-50"
        style={{ scaleX }}
      /> */}

      <Welcome ParallaxText={ParallaxText} />

      {/* <Intro /> */}

      <FeaturedProjects
        articles={articles}
        ParallaxText={ParallaxText}
        HorizontalParallaxSection={HorizontalParallaxSection}
      />

      <AboutMe ParallaxText={ParallaxText} />

      <SkillsNResume ParallaxText={ParallaxText} />

      <Services ParallaxText={ParallaxText} />

      {/* Upcomming Projects */}
      <section id="upcomming" className="home_section py-44 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <ParallaxText className={"mb-12"}>Upcomming Projects</ParallaxText>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "No title",
              excerpt: "No description",
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
              <button className="text-slate-300 hover:text-white underline">
                Read More
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

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
import Upcomming from "./Upcomming";

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
  const x = useTransform(scrollYProgress, [0, 1], [0, -width * 1.6]);

  return (
    <motion.div
      ref={carousel}
      className="relative cursor-grab overflow-hidden max-w-6xl mx-auto"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x }}
        className="flex gap-3 md:gap-10 max-w-6xl mx-auto"
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
    <div className="min-h-screen text-white overflow-hidden">
      <FloatingNavigation />

      <Welcome ParallaxText={ParallaxText} />

      <FeaturedProjects
        articles={articles}
        ParallaxText={ParallaxText}
        HorizontalParallaxSection={HorizontalParallaxSection}
      />

      <AboutMe ParallaxText={ParallaxText} />

      <SkillsNResume ParallaxText={ParallaxText} />

      <Services ParallaxText={ParallaxText} />

      <div id="more" className="home_section bg-black">
        <Upcomming ParallaxText={ParallaxText} />
        <Intro />
      </div>
    </div>
  );
}

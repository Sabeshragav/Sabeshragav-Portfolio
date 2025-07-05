"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import Image from "next/image";
import Link from "next/link";
import { FaCode } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { MdOutlinePeopleOutline, MdOutlineTravelExplore } from "react-icons/md";

export default function About() {
  const controls = useAnimation();

  const hobbies = [
    {
      title: "Exploring New Technologies",
      icon: <MdOutlineTravelExplore />,
    },
    {
      title: "Reading Tech Blogs and Articles",
      icon: <GoBook />,
    },
    {
      title: "Collaborating with Peers",
      icon: <MdOutlinePeopleOutline />,
    },
    {
      title: "Problem Solving and Coding Challenges",
      icon: <FaCode />,
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const skillsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <motion.section
      className="relative min-h-[700px] md:mx-auto max-w-7xl mx-4 px-5 sm:px-7 py-10 sm:py-16 my-8 sm:my-12 bg-gradient-to-b from-black/70 to-gray-900/70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-xl rounded-2xl z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-indigo-900/10 rounded-2xl z-1"></div>
      <div className="absolute top-0 right-0 w-full h-full opacity-20 z-0">
        <Image
          src="/main/background.png"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Section header */}
      <motion.div
        className="relative z-10 mb-8 sm:mb-12 flex items-center"
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 font-bold mr-3 sm:mr-5">
          About Me
        </h1>
        <motion.svg
          width="80"
          height="2"
          viewBox="0 0 120 2"
          className="hidden sm:block"
        >
          <motion.path
            d="M0 1 L120 1"
            stroke="url(#gradient)"
            strokeWidth="2"
            variants={pathVariants}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>

      {/* Introduction section */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10 mb-10 sm:mb-16"
        variants={containerVariants}
      >
        <motion.div className="md:w-3/5" variants={textVariants}>
          <div className="prose prose-lg">
            <p className="text-gray-200 leading-relaxed text-sm sm:text-md md:text-lg">
              As a budding Full-Stack Developer, I'm passionate about building
              user-centric web apps with modern tools like{" "}
              <span className="font-bold text-white">React</span>,{" "}
              <span className="font-bold text-white">Next.js</span>, Tailwind
              CSS, Node.js, and Spring Boot. I enjoy solving complex problems
              with clean, scalable solutions across both front-end and back-end.
            </p>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-md md:text-lg mt-4">
              Currently exploring{" "}
              <span className="font-bold text-white">RAG</span> and{" "}
              <span className="font-bold text-white">MCP</span>, I'm driven by a
              deep interest in intelligent, AI-powered Full-Stack systems.
            </p>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-md md:text-lg mt-4">
              Always eager to learn, I bring adaptability, clean code, and fresh
              energy to every team I join. In my free time, I enjoy exploring
              new technologies, and spending time with friends and family.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="md:w-2/5 flex justify-center"
          variants={skillsVariants}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-90 transition duration-1000"></div>
            <Image
              src="/main/sabeshragav.png"
              alt="Profile Picture"
              height={250}
              width={250}
              className="rounded-full relative border-2 border-white/20 w-40 sm:w-48 md:w-52 lg:w-56"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Cards grid for Skills, Hobbies and Experience */}
      <div className="relative z-10 grid md:grid-cols-2 gap-5 sm:gap-8 mt-6 sm:mt-8">
        {/* Skills Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-4 sm:mb-6 flex items-center">
            <span className="mr-2 sm:mr-3 text-blue-400">
              <FaCode className="h-5 w-5 sm:h-7 sm:w-7" />
            </span>
            Skills
          </h2>
          <motion.ul
            className="space-y-2 sm:space-y-3 text-gray-300"
            variants={containerVariants}
          >
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                Java - JavaScript - Python
              </span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                React - Next.js - Vite - Redux-toolkit - TailwindCSS
              </span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                Express - Node.js - SpringBoot
              </span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                MySQL - PostgreSQL - MongoDB
              </span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">Postman - Docker</span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                AWS (S3, Amplify) - Vercel - Netlify
              </span>
            </motion.li>
            <motion.li variants={skillsVariants} className="flex items-start">
              <span className="text-blue-400 mr-2 text-sm sm:text-base">•</span>
              <span className="text-sm sm:text-base">
                Git - GitHub - Gitlab
              </span>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Hobbies Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-4 sm:mb-6 flex items-center">
            <span className="mr-2 sm:mr-3 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Hobbies
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-2 sm:gap-3"
            variants={containerVariants}
          >
            {hobbies.map((hobby, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 flex items-center hover:bg-white/10 transition-all duration-300"
                variants={skillsVariants}
              >
                <div className="text-green-400 mr-2 sm:mr-3">{hobby.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {hobby.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Professional Experience Card - Full width */}
        <motion.div
          className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl text-white font-bold mb-4 sm:mb-6 flex items-center">
            <span className="mr-2 sm:mr-3 text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </span>
            Professional Experience
          </h2>

          {/* Experience Entries - Grid Layout for Multiple Entries */}
          <motion.div
            className="grid sm:grid-cols-2 gap-3 sm:gap-4"
            variants={containerVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-white/5 to-white/10 p-4 sm:p-6 rounded-lg shadow-inner"
              variants={skillsVariants}
            >
              <div className="flex items-start mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Zelosify
                </h3>
              </div>
              <p className="text-base sm:text-lg text-white mb-1">
                Full-Stack Developer Intern
              </p>
              <p className="italic text-xs sm:text-sm text-blue-300 mb-3">
                February 2025 - July 2025
              </p>
            </motion.div>
            {/* <motion.div
              className="bg-gradient-to-br from-white/5 to-white/10 p-4 sm:p-6 rounded-lg shadow-inner"
              variants={skillsVariants}
            >
              <div className="flex items-start mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Future Company
                </h3>
              </div>
              <p className="text-base sm:text-lg text-white mb-1">
                Developer Role
              </p>
              <p className="italic text-xs sm:text-sm text-blue-300 mb-3">
                Month Year - Month Year
              </p>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md mx-auto text-center mt-10 sm:mt-20"
      >
        <Link
          href={"/files/SabeshragavGK.pdf"}
          target="_blank"
          className="inline-block bg-white text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:bg-slate-200 transition duration-300 text-sm sm:text-base"
        >
          <span className="sm:hidden block">Download Resume</span>
          <span className="sm:block hidden">View Resume</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}

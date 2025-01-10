"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

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
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
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
  });

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <motion.section
      className="relative min-h-[700px] md:mx-auto max-w-7xl mx-4 px-7 py-12 my-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl"
      style={{
        backgroundImage:
          "url('/main/background.png'), linear-gradient(to bottom, #000, #111827)",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      {/* Overlay for background blur */}
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-xl rounded-xl"></div>

      <motion.div
        className="relative z-10 mb-8 text-4xl flex items-center"
        variants={itemVariants}
      >
        <h1 className="basis-auto text-white mr-4 font-bold">About Me</h1>
        <motion.svg width="100" height="2" viewBox="0 0 100 2">
          <motion.path
            d="M0 1 L100 1"
            stroke="white"
            strokeWidth="2"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-16"
        variants={containerVariants}
      >
        <motion.div className="md:w-1/2" variants={textVariants}>
          <p className="text-gray-300 leading-relaxed text-lg">
            Hello ! My name is{" "}
            <span className="font-bold text-white">Sabeshragav G K</span> and
            I'm a passionate developer with a love for creating beautiful and
            functional web applications. I have experience in a variety of
            technologies, including{" "}
            <span className="font-bold text-white">React</span>,{" "}
            <span className="font-bold text-white">Next.js</span>, and more. I'm
            always eager to learn new things and take on new challenges.
            <br />
            <br />
            In my free time, I enjoy exploring new technologies, and spending
            time with friends and family. I am also very passionate about
            learning new things and improving myself.
          </p>
        </motion.div>
        <motion.div
          className="md:w-1/3 md:flex md:justify-center"
          variants={skillsVariants}
        >
          <Image
            src={"/main/sabeshragav.png"}
            alt="Profile Picture"
            height={200}
            width={400}
            className="rounded-full w-52"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div className="relative z-10 mt-12" variants={containerVariants}>
        <h2 className="text-3xl text-white font-bold mb-4">Skills</h2>
        <motion.ul
          className="list-disc list-inside text-gray-300"
          variants={containerVariants}
        >
          <motion.li variants={skillsVariants}>Java</motion.li>
          <motion.li variants={skillsVariants}>JavaScript</motion.li>
          <motion.li variants={skillsVariants}>
            React - Next.js - Vite - Redux-toolkit
          </motion.li>
          <motion.li variants={skillsVariants}>Node.js - Express</motion.li>
          <motion.li variants={skillsVariants}>CSS - Tailwind CSS</motion.li>
          <motion.li variants={skillsVariants}>MySQL - MongoDB</motion.li>
          <motion.li variants={skillsVariants}>Git - GitHub</motion.li>
        </motion.ul>
      </motion.div>

      {/* Hobbies Section */}
      <motion.div className="relative z-10 mt-12" variants={containerVariants}>
        <h2 className="text-3xl text-white font-bold mb-4">Hobbies</h2>
        <motion.ul
          className="list-disc list-inside text-gray-300"
          variants={containerVariants}
        >
          <motion.li variants={skillsVariants}>
            Exploring new technologies
          </motion.li>
          <motion.li variants={skillsVariants}>
            Reading tech blogs and books
          </motion.li>
          <motion.li variants={skillsVariants}>
            Working out and other outdoor activities
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* Professional Experience Section */}
      <motion.div className="relative z-10 mt-12" variants={containerVariants}>
        <h2 className="text-3xl text-white font-bold mb-4">
          Professional Experience
        </h2>
        <motion.div
          className="text-gray-300 leading-relaxed text-lg"
          variants={skillsVariants}
        >
          <p>
            As a Freelance Fullstack Developer, I have been working with a
            client, providing expertise in both frontend and backend
            development. I am experienced in building full-fledged web
            applications with technologies like React, Next.js, Node.js,
            Express, and more.
            <br />
            <br />
            My work involves not only developing feature-rich and responsive
            user interfaces but also handling{" "}
            <span className="font-bold text-white">backend APIs</span>,{" "}
            <span className="font-bold text-white">server-side logic</span>, and{" "}
            <span className="font-bold text-white">managing deployments</span>.
            I am also proficient in configuring hosting platforms and
            maintaining applications in production.
            <br />
            <br />I enjoy taking on different roles, offering flexible support
            to meet the unique needs of each project.
          </p>
        </motion.div>
      </motion.div>

      {/* Resume */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md mx-auto text-center mt-20"
      >
        <Link
          href={process.env.NEXT_PUBLIC_STORAGE_SUPABASE}
          target="_blank"
          className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition duration-300"
        >
          <span className="sm:hidden block">Download Resume</span>
          <span className="sm:block hidden">View Resume</span>
        </Link>
      </motion.div>
    </motion.section>
  );
}

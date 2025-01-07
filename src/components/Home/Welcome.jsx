"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Welcome({ ParallaxText }) {
  const [showInfo, setShowInfo] = useState(false);

  const text = "Where Creativity Meets Technology";
  return (
    <section
      id="welcome"
      className="home_section relative h-screen flex flex-col justify-center items-center max-w-7xl md:mx-auto mx-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-8xl font-bold text-center flex flex-col items-start"
      >
        <ParallaxText className={"leading-snug"} speed={-0.5}>
          Welcome t
          <span className="inline-flex items-center mt-3">
            <Image
              src="/main/logo.png"
              alt="SR"
              width={1000}
              height={1000}
              className="animate-pulse object-contain h-[30px] w-[30px] md:h-16 md:w-16 translate-y-1 md:translate-y-2"
              priority
            />
          </span>{" "}
          My Digital Site
        </ParallaxText>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-xl md:text-2xl text-slate-300 text-center"
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
        <div className="translate-y-20 flex justify-center">
          <ArrowDown
            className="animate-bounce h-12 w-12"
            onClick={() => setShowInfo(!showInfo)}
          />
        </div>
      </motion.div>
      {showInfo && (
        <p className="text-sm text-center text-blue-700 mt-2 translate-y-20">
          Please Scroll down !
        </p>
      )}
    </section>
  );
}

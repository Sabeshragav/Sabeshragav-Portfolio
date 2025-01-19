"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = ({ appear, letter }) => (
  <>
    <AnimatePresence mode="wait">
      {appear ? (
        <motion.span
          key="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center mt-3"
        >
          <Image
            src="/icons/logo.svg"
            alt="SR-Logo"
            width={1000}
            height={1000}
            className={`object-contain h-8 w-8 md:h-12 md:w-12 translate-y-1 md:translate-y-[6px]`}
            priority
          />
        </motion.span>
      ) : (
        <motion.span
          key={`text-${letter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="pl-[3px]"
        >
          {letter}
        </motion.span>
      )}
    </AnimatePresence>
  </>
);

export default function Welcome({ ParallaxText }) {
  const [showInfo, setShowInfo] = useState(false);

  const [logo, setLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogo((prevLogo) => !prevLogo);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const text = "“ Where Creativity Meets Technology ”";

  return (
    <section
      id="welcome"
      className="home_section h-screen flex flex-col justify-center items-center max-w-7xl xl:mx-auto mx-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-center flex flex-col items-start"
      >
        <ParallaxText className={"leading-snug"} speed={-0.5}>
          Welcome to My Portfoli
          <Logo appear={logo} letter={"o"} />
        </ParallaxText>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg md:text-2xl text-slate-300 text-center"
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
            onClick={() => {
              if (!showInfo) {
                setShowInfo(true);
                setTimeout(() => {
                  setShowInfo(false);
                }, 3000);
              }
            }}
          />
        </div>
      </motion.div>
      {showInfo && (
        <p className="animate-pulse text-sm text-center text-blue-700 mt-2 translate-y-20">
          Please Scroll down !
        </p>
      )}
    </section>
  );
}

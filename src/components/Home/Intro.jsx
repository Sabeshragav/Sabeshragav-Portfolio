"use client";

import { motion } from "framer-motion";
import Title from "@/components/Title";
import { useSelector } from "react-redux";
import { getWords } from "@/features/pageSlice";
import Image from "next/image";

export default function Intro() {
  const words = useSelector(getWords);

  return (
    <section
      id="intro"
      className="home_section flex min-h-[700px] flex-center max-w-7xl xl:mx-auto mx-6 mb-52"
    >
      <div className="slate_black_slate min-h-[700px] w-full rounded-3xl">
        <div className="relative flex flex-col items-center justify-center min-h-[700px] p-8 text-center gap-32">
          <Image
            src="/icons/logo.svg"
            alt="SR-Logo"
            width={1000}
            height={1000}
            className="absolute left-2 top-2 object-contain h-10 w-10 md:h-16 md:w-16"
            priority
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="h-full"
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-5 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              What's this site about?
            </motion.h2>
            <motion.div
              className="text-xl md:text-2xl text-gray-400 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Title
                name={"This site represents Sabeshragav's"}
                words={words}
                className="text-xl md:text-2xl flex-col md:flex-row justify-center md:gap-2"
                speed={300}
                cursor={true}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-5 sm:mb-8"
            >
              Why should you explore it?
            </motion.div>

            <motion.div
              className="text-xl md:text-2xl text-gray-400 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              To explore Sabeshragav's innovative ideas and insights, this site
              is the place to be.
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

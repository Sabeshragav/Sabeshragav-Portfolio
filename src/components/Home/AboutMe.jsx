"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaQuestion } from "react-icons/fa";
import { ColorTransition } from "./GeometricLogin";

export default function AboutMe({ ParallaxText }) {
  return (
    <section
      id="about"
      className="home_section py-60 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-black"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText>A Glimpse Into Me</ParallaxText>
      </h2>
      <div className="flex justify-center py-10">
        <div className="h-32 w-32 rounded-full flex-center bg-slate-500">
          <FaQuestion className="animate-bounce text-black text-xl" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-slate-300 mb-8 text-center italic"
        >
          “ I'm a visionary developer turning ideas into captivating realities
          through design expertise and cutting-edge technologies. ”
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <Link href="/about">
              <ColorTransition
                className={
                  "text-white font-bold py-3 px-6 rounded-full transition duration-300"
                }
                children={"Know More"}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

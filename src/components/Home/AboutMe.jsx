"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutMe({ ParallaxText }) {
  return (
    <section
      id="about"
      className="home_section py-60 px-4 md:px-8 bg-gradient-to-b from-slate-900 to-black"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText>A Glimpse of Me</ParallaxText>
      </h2>
      <div className="flex justify-center py-10">
        <div className="h-32 w-32 rounded-full overflow-hidden flex-center bg-slate-500 relative">
          <Image
            src="/main/sabeshragav.png"
            alt="Profile Picture"
            fill
            className="object-cover object-[center_5%]"
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-slate-300 mb-8 text-center italic"
        >
          " I'm a visionary developer turning ideas into captivating realities
          through design expertise and cutting-edge technologies. "
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center"
        >
          <Link
            href={"/about"}
            className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-slate-200 transition duration-300"
          >
            Know More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

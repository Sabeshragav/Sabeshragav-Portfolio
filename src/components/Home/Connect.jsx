"use client";

import { motion } from "framer-motion";
import GeometricLogin from "./GeometricLogin";
import Link from "next/link";

export default function Connect({ ParallaxText }) {
  return (
    <section
      id="connect"
      className="home_section py-44 px-4 md:px-8 bg-slate-900"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center">
        <ParallaxText>Let's Connect</ParallaxText>
      </h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-lg md:text-xl text-slate-300 mb-16">
          Excited to connect? Here are the ways you can always reach out.
        </p>
      </motion.div>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <GeometricLogin />
      </div>
      <div className="flex justify-center">
        <Link
          href="/login"
          className="bg-black text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
}

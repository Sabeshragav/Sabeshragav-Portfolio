"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const SkillBubble = ({ skill }) => (
  <motion.div
    className="bg-slate-800 rounded-full px-4 py-2 m-2 inline-block"
    whileHover={{ scale: 1.1, backgroundColor: "#1E293B" }}
    whileTap={{ scale: 0.9 }}
  >
    <Link href={`https://www.google.com/search?q=${skill}`} target="_blank">
      {skill}
    </Link>
  </motion.div>
);

export default function SkillsNResume({ ParallaxText }) {
  const skills = [
    "Java",
    "JavaScript",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "React",
    "Redux-Toolkit",
    "Next.js",
    "Vite",
    "Node.js",
    "Docker",
    "MySQL",
    "JWT",
    "Git",
    "Supabase",
    "Vercel",
    "Netlify",
    "Blockchain",
    "Figma",
  ];

  return (
    <section
      id="skills"
      className="home_section pb-60 px-4 md:px-8 flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText className={"leading-snug mb-10"}>
          Known Skills & Technologies
        </ParallaxText>
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-wrap justify-center max-w-3xl mt-7"
      >
        {skills?.map((skill) => (
          <SkillBubble key={skill} skill={skill} />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto text-center mt-20"
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
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingNavigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed top-2 right-1 bg-slate-700 rounded-full px-6 py-3 z-50"
        >
          <ul className="flex space-x-6">
            <li>
              <Link href="#navbar" className="text-white hover:text-slate-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="text-white hover:text-slate-300"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-white hover:text-slate-300">
                About
              </Link>
            </li>
            <li>
              <Link href="#skills" className="text-white hover:text-slate-300">
                Skills
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-white hover:text-slate-300">
                Contact
              </Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

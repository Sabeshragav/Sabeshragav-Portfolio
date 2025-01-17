"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getViewPosition } from "@features/pageSlice";

const NavList = ({ elementId, label }) => {
  const viewPosition = useSelector(getViewPosition);
  return (
    <li className="float_nav">
      <Link
        href={`#${elementId}`}
        className={`${
          viewPosition === elementId ? "text-blue-500" : "text-white"
        } sm:font-bold`}
      >
        {label}
      </Link>
    </li>
  );
};

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
          className="fixed top-2 z-50 w-full flex-center"
        >
          <div className="flex-center bg-slate-700 w-fit rounded-full px-4 sm:px-6 py-3">
            <ul className="flex space-x-2 sm:space-x-3">
              <NavList elementId={"welcome"} label={"Top"} />
              <NavList elementId={"featured_projects"} label={"Projects"} />
              <NavList elementId={"about"} label={"About"} />
              <NavList elementId={"skills"} label={"Skills"} />
              <NavList elementId={"services"} label={"Service"} />
              <NavList elementId={"upcomming"} label={"Planned"} />
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

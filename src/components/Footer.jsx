"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp, MailIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { handleScrollToTop } from "@features/pageSlice";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const pathName = usePathname();

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const github = "https://github.com/Sabeshragav";
  const linkedIn = "https://linkedin.com/in/sabeshragavgk";
  const gmail = "mailto:sabeshragav289@gmail.com";

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <footer className="border-t border-t-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-500">
              Sabeshragav's Blogspot
            </h2>
            <p className="text-sm">
              Exploring the world of web development, one post at a time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`${pathName === "/" ? "text-blue-500" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={`${
                    pathName === "/projects" ? "text-blue-500" : ""
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`${pathName === "/about" ? "text-blue-500" : ""}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`${
                    pathName === "/contact" ? "text-blue-500" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaGithub size={24} />
              </Link>
              {/* <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTwitter size={24} />
              </Link> */}
              <Link
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </Link>
              <Link
                href={gmail}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <MailIcon size={24} />
              </Link>
            </div>
          </div>
          <div className="flex-center md:block text-white">
            <button
              title="Scroll to Top"
              onClick={() => dispatch(handleScrollToTop())}
            >
              <ArrowUp />
            </button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {currentYear} Sabeshragav's Blogspot. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm hover:text-blue-500 transition-colors duration-200 mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm hover:text-blue-500 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  getToken,
  getUserSession,
  removeToken,
  removeUserSession,
  storeUserSession,
} from "@/services/storage";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchUser } from "@features/sessionSlice";
import { usePathname } from "next/navigation";
import Title from "./Title";
import axios from "axios";

export default function Navbar() {
  const { data: session } = useSession();
  const [localSession, setLocalSession] = useState(
    () => getUserSession() || null
  );

  // useEffect(() => {
  //   console.log(localSession);
  // }, [localSession]);

  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/protected`,
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);
        setLocalSession(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const token = getToken();
    if (token?.length > 1) fetchData();
  }, []);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    // If local session doesn't exist and session from NextAuth is available, store it locally
    if (!localSession?.name && session?.user) {
      dispatch(fetchUser(session.user.id));
      storeUserSession(session);
      setLocalSession(session);
    }
  }, [dispatch, session, localSession]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropdown(false);
        setIsProfileClicked(false); // Reset profile to image when clicking outside
      }
    };

    // Add or remove event listener based on dropdown visibility
    if (toggleDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, [toggleDropdown]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const emailLogout = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
  };

  if (!isLoaded) {
    return <div></div>;
  }

  return (
    <header className="border-b border-b-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/main/logo.png"
                alt="SR"
                width={55}
                height={55}
                className="object-contain"
                priority
              />
              {pathName !== "/" && (
                <h1 className="text-xl md:text-2xl font-bold hidden sm:block">
                  <Title />
                </h1>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4 border-l border-l-gray-800 pl-[14px]">
              <NavItem href="/" title="Home">
                Home
              </NavItem>
              <NavItem href="/projects" title="Projects">
                Projects
              </NavItem>
              <NavItem href="/about" title="About">
                About
              </NavItem>
              <NavItem href="/contact" title="Contact">
                Contact
              </NavItem>
              {session || localSession?.user ? (
                <>
                  {/* Profile Avatar */}
                  <li className="border-l border-l-gray-800 pl-8">
                    {!isProfileClicked ? (
                      <Image
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering document listener
                          setToggleDropdown((prev) => !prev);
                          setIsProfileClicked(true); // Mark profile as clicked
                        }}
                        src={session?.user?.image || "/icons/profile.png"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                        priority
                      />
                    ) : (
                      <X
                        onClick={() => setIsProfileClicked(false)} // Reset on clicking 'X'
                        className="h-[40px] w-[40px] text-white cursor-pointer"
                      />
                    )}
                  </li>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {toggleDropdown && (
                      <motion.div
                        ref={dropdownRef}
                        className="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="py-2 text-gray-300">
                          <div className="flex items-center px-4 py-2 space-x-2 border-b border-b-gray-700">
                            <Image
                              src={session?.user?.image || "/icons/profile.png"}
                              alt="profile"
                              width={35}
                              height={35}
                              className="rounded-full"
                              priority
                            />
                            <div>
                              <p className="text-white">
                                {session?.user?.name ||
                                  localSession?.user?.username ||
                                  "Loading"}
                              </p>
                              <p className="text-sm text-gray-400">
                                {session?.user?.email ||
                                  localSession?.user?.email ||
                                  "Loading"}
                              </p>
                            </div>
                          </div>
                          <button
                            className="px-4 py-2 text-left text-red-500 hover:bg-gray-700"
                            onClick={() => {
                              if (localSession?.user?.handle === "email/pass") {
                                removeToken();
                                emailLogout();
                              }
                              removeUserSession();
                              setToggleDropdown(false);
                              setIsProfileClicked(false); // Reset profile image on logout
                              signOut();
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : session === null && localSession?.user !== null ? (
                <li className="border-l border-l-gray-800 pl-2">
                  <Link href={`/login?path=${pathName}`}>
                    <div
                      className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded"
                      variant="secondary"
                      size="sm"
                    >
                      Login
                    </div>
                  </Link>
                </li>
              ) : (
                <li className="border-l border-l-gray-800 pl-8">
                  {/* Waving Profile Loader */}
                  <div className="w-10 h-10 rounded-full bg-gray-700 custom-animate-pulse"></div>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={"h-8 w-8 bg-gray-800 rounded-lg p-2"}
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            {pathName !== "/" && (
              <div className="w-3/4 pl-[18px] py-3">
                <Title />
              </div>
            )}
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavItem href="/" title="Home" onClick={toggleMenu}>
                Home
              </MobileNavItem>
              <MobileNavItem
                href="/projects"
                title="Projects"
                onClick={toggleMenu}
              >
                Projects
              </MobileNavItem>
              <MobileNavItem href="/about" title="About" onClick={toggleMenu}>
                About
              </MobileNavItem>
              <MobileNavItem
                href="/contact"
                title="Contact"
                onClick={toggleMenu}
              >
                Contact
              </MobileNavItem>
              {session || localSession?.user ? (
                <div className="border-t border-t-gray-800">
                  <li className="flex items-center px-3 py-4 space-x-2">
                    <Image
                      src={
                        session?.user?.image ||
                        localSession?.user?.image ||
                        "/default-avatar.png"
                      }
                      alt="profile"
                      width={35}
                      height={35}
                      className="rounded-full"
                      priority
                    />
                    <div>
                      <p className="text-white">
                        {session?.user?.name || localSession?.user?.username}
                      </p>
                      <p className="text-sm text-gray-400">
                        {session?.user?.email || localSession?.user?.email}
                      </p>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (localSession?.user?.handle === "email/pass") {
                          removeToken();
                          emailLogout();
                        }
                        removeUserSession();
                        toggleMenu();
                        signOut();
                      }}
                      className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </li>
                </div>
              ) : (
                <li className="mt-3 border-t border-t-gray-800 ">
                  <Link href={`/login?path=${pathName}`} onClick={toggleMenu}>
                    <div className="w-16 mt-4 rounded px-3 py-2 ml-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700">
                      Login
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

const NavItem = ({ href, title, children }) => {
  const pathName = usePathname();
  return (
    <li>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link href={href} title={title}>
          <span
            className={`text-blue-500 ${
              pathName === href ? "border-b-2 border-b-blue-500" : ""
            }`}
          >
            {children}
          </span>
        </Link>
      </motion.div>
    </li>
  );
};
const MobileNavItem = ({ href, title, children, onClick }) => {
  const pathName = usePathname();
  return (
    <li>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link href={href} title={title} onClick={onClick}>
          <span
            className={`block px-3 py-2 rounded-md ${
              pathName === href ? "underline" : ""
            } text-base font-medium text-blue-500 hover:text-white hover:bg-gray-700 transition duration-150 ease-in-out`}
          >
            {children}
          </span>
        </Link>
      </motion.div>
    </li>
  );
};

"use client";

import { motion } from "framer-motion";
import { FaGoogle, FaGithub, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export const ColorTransition = ({ children, className }) => (
  <motion.div
    className={`${className} bg-gradient-to-br from-black via-slate-800 to-gray-900`}
    animate={{
      background: [
        "linear-gradient(to bottom right, #000000, #1e293b, #111827)",
        "linear-gradient(to bottom right, #1e293b, #111827, #000000)",
        "linear-gradient(to bottom right, #111827, #000000, #1e293b)",
      ],
    }}
    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
  >
    {children}
  </motion.div>
);

const LoginOption = ({ icon: Icon, color }) => (
  <Link href="/login">
    <motion.div
      className="flex flex-col items-center justify-center w-24 h-24 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={`text-3xl ${color}`} />
    </motion.div>
  </Link>
);

const GeometricLogin = () => {
  return (
    <div className="relative max-w-7xl h-[600px] overflow-hidden rounded-xl">
      <ColorTransition className={"absolute inset-0 p-2"}>
        <Image
          src="/icons/logo.svg"
          alt="SR-Logo"
          width={1000}
          height={1000}
          className="object-contain h-10 w-10 md:h-16 md:w-16"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
          <motion.h2
            className="text-3xl font-bold text-white my-8 basis-3/4 leading-snug"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Supported Services
          </motion.h2>

          <motion.div
            className="flex flex-col items-center w-[269px] space-y-8 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="login_display">
              <LoginOption icon={FaGoogle} color="text-gray-200" />
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold w-20 text-center"
              >
                Google
              </motion.h1>
            </div>
            <div className="login_display">
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold w-20 text-center"
              >
                Github
              </motion.h1>
              <LoginOption icon={FaGithub} color="text-gray-200" />
            </div>
            <div className="login_display">
              <LoginOption icon={FaEnvelope} color="text-gray-200" />
              <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold w-20 text-center"
              >
                Email
              </motion.h1>
            </div>
          </motion.div>
        </div>
      </ColorTransition>
    </div>
  );
};

export default GeometricLogin;

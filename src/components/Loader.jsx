"use client";
import { motion, AnimatePresence } from "framer-motion";

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="loader" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;

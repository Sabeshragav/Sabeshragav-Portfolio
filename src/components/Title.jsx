import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Title({ name, words, className, speed, cursor }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (typing) {
      if (displayText.length < words[currentWordIndex].length) {
        // Add letters one by one
        timeout = setTimeout(() => {
          setDisplayText(
            (prev) => prev + words[currentWordIndex][displayText.length]
          );
        }, speed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1000);
      }
    } else {
      if (displayText.length > 0) {
        // Remove letters one by one
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, speed);
      } else {
        // Move to the next word
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentWordIndex]);

  return (
    <div
      title={`${name || ""} ${displayText || ""}`}
      className={`flex item-center ${className || ""}`}
    >
      <span>{name || ""}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentWordIndex]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${cursor ? "font-bold text-white" : ""} flex-center`}
        >
          {displayText || ""}
          {cursor && <span className="text-sm animate-ping">|</span>}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

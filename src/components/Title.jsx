import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
  "Blogspot",
  "Insights",
  "Sphere",
  "Perspectives",
  "Moments",
  "Display",
  "Ideas",
  "Portfolio",
];

export default function Title() {
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
        }, 100);
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
        }, 100);
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
      title={`Sabeshragav's ${displayText}`}
      className="flex flex-row gap-2 item-center text-2xl"
    >
      <p>Sabeshragav's</p>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentWordIndex]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

"use client";

import ContactForm from "@components/ContactForm";
import { motion } from "framer-motion";
import React from "react";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      exit={{ opacity: 0, y: 50 }} // Fade out and slide down when exiting
      transition={{ duration: 0.5 }} // Smooth animation duration
      className="project-page-container"
    >
      <ContactForm />
    </motion.div>
  );
}

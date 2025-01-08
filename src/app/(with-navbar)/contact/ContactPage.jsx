"use client";

import ContactForm from "@components/ContactForm";
import { motion } from "framer-motion";
import React from "react";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <ContactForm />
    </motion.div>
  );
}

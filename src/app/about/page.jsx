"use client";
import React, { useEffect, useState } from "react";

export default function About() {
  const [text, setText] = useState("");
  const fullText =
    "This is a simple blogspot created using NextJs, Tailwindcss and Redux Library";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="h-screen">
      <div className="m-4 text-4xl flex">
        <h1 className="basis-auto border-b">About Us</h1>
      </div>
      <div className="flex justify-center items-center h-full">
        <p className="text-center text-2xl">
          {text}
          {text.length < fullText.length && (
            <span className="border-r-2 border-white animate-pulse"></span>
          )}
        </p>
      </div>
    </section>
  );
}

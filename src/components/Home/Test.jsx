"use client";
import React, { useEffect, useState, useRef } from "react";

const ScrollView = () => {
  const [currentViewId, setCurrentViewId] = useState(null);
  const sectionsRef = useRef([]);
  console.log(currentViewId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentViewId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold for desired visibility
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h1>Current View: {currentViewId}</h1>
      <div
        id="section1"
        ref={(el) => (sectionsRef.current[0] = el)}
        style={{ height: "100vh", border: "1px solid #ccc" }}
      >
        Section 1
      </div>
      <div
        id="section2"
        ref={(el) => (sectionsRef.current[1] = el)}
        style={{ height: "100vh", border: "1px solid #ccc" }}
      >
        Section 2
      </div>
      <div
        id="section3"
        ref={(el) => (sectionsRef.current[2] = el)}
        style={{ height: "100vh", border: "1px solid #ccc" }}
      >
        Section 3
      </div>
    </div>
  );
};

export default ScrollView;

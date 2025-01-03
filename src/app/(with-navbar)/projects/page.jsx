import React from "react";
import ProjectPage from "./ProjectPage";
const logo = "/logo.png";

export const metadata = {
  icons: logo,
  title: "Sabeshragav's Projects",
  description:
    "Showcasing Sabeshragav G K's innovative projects and professional accomplishments.",
};

export default function page() {
  return <ProjectPage />;
}

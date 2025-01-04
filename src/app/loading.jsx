import React from "react";
import Loader from "@/components/Loader";

export default function ProjectLoading() {
  console.log("Loading component is rendering...");
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}

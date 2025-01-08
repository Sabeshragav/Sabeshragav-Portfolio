import React from "react";
import Loader from "@/components/Loader";

export default function ProjectLoading() {
  return (
    <div className="h-[700px] flex items-center justify-center">
      <Loader />
    </div>
  );
}

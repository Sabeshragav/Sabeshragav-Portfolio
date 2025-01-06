"use client";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return <div></div>;
}

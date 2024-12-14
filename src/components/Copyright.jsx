import React from "react";

const Copyright = () => {
  return (
    <footer className="bottom-0 flex flex-row items-center gap-2 p-3 justify-center mx-4 mt-4 border-t border-t-gray-600">
      <h1 className="flex flex-row items-center gap-3  lg:text-xl font-medium">
        &copy;
        <span suppressHydrationWarning>{new Date().getFullYear()}</span>
      </h1>
      <span className="lg:text-xl font-medium border-r-3 border-r-gray-600 pr-2">
        Blog
      </span>
      <span className="lg:text-xl font-medium"> All rights reserved.</span>
    </footer>
  );
};

export default Copyright;

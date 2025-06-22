import { useState, useEffect } from "react";

/**
 * Custom hook to detect screen size changes
 * @param {number} breakpoint - The breakpoint in pixels to determine desktop/mobile (default: 768)
 * @returns {object} - Object containing isDesktop, isMobile, and screenWidth
 */
export const useScreenSize = (breakpoint = 768) => {
  const [screenData, setScreenData] = useState({
    isDesktop: false,
    isMobile: true,
    screenWidth: 0,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenData({
        isDesktop: width >= breakpoint,
        isMobile: width < breakpoint,
        screenWidth: width,
      });
    };

    // Initial check
    updateScreenSize();

    // Add event listener
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [breakpoint]);

  return screenData;
};

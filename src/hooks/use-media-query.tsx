import { useState, useEffect } from "react";

// Custom hook to listen for media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Add the event listener for changes
    mediaQueryList.addEventListener("change", listener);

    // Cleanup the event listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

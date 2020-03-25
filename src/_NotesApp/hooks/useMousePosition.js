import { useState, useEffect } from "react";

const useMousePosition = () => {
  // Setup state to track x and y position (useState):
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Setup event to listener for mouse movement:
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    // Remove event listenr if unmounted (useEffect):
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return position;
};

export default useMousePosition;

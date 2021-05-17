import { useEffect } from "react";

export const useKeypress = (targetKey, handleKeyPress) => {
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      handleKeyPress();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => window.removeEventListener("keydown", downHandler);
  }, []);
};
